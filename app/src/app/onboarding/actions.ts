"use server";

import { redirect } from "next/navigation";

import { getSupabaseAdmin } from "@/lib/supabase";
import { requireCuratiaSession } from "@/lib/session";

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 48);
}

export async function completeOnboarding(formData: FormData) {
  const session = await requireCuratiaSession();
  const admin = getSupabaseAdmin();

  const displayName = String(formData.get("displayName") ?? "").trim();
  const roleTitle = String(formData.get("roleTitle") ?? "").trim();
  const bio = String(formData.get("bio") ?? "").trim();
  const avatarKey = String(formData.get("avatarKey") ?? "circuit");
  const workspaceName = String(formData.get("workspaceName") ?? "").trim();
  const customInterests = String(formData.get("customInterests") ?? "").split(",").map((v) => v.trim()).filter(Boolean);\n  const interests = [...new Set([...formData.getAll("interests").map(String), ...customInterests])].map((v) => v.trim()).filter(Boolean);
  const channels = formData.getAll("channels").map(String);
  const primaryChannel = String(formData.get("primaryChannel") ?? "");

  if (!displayName || !workspaceName || interests.length === 0) {
    redirect("/onboarding?error=required");
  }

  const bootstrapOwnerEmail = process.env.CURATIA_BOOTSTRAP_OWNER_EMAIL?.trim().toLowerCase();
  const isBootstrapOwner = Boolean(
    bootstrapOwnerEmail &&
    session.email &&
    session.email.toLowerCase() === bootstrapOwnerEmail
  );

  const { data: existingOwner } = await admin.from("platform_roles").select("user_id").eq("role", "owner").maybeSingle();
  if (isBootstrapOwner && !existingOwner) {
    const { error } = await admin.from("platform_roles").insert({
      user_id: session.userId,
      role: "owner",
      granted_by: session.userId
    });
    if (error) throw new Error(`Unable to bootstrap Owner: ${error.message}`);
  }

  const { error: profileError } = await admin.from("profiles").upsert({
    user_id: session.userId,
    display_name: displayName,
    role_title: roleTitle || null,
    bio: bio || null,
    avatar_key: avatarKey,
    onboarding_completed_at: new Date().toISOString()
  });
  if (profileError) throw new Error(`Unable to save profile: ${profileError.message}`);

  let workspaceId = session.workspaces[0]?.id;
  if (!workspaceId) {
    const baseSlug = slugify(workspaceName) || "workspace";
    const slug = `${baseSlug}-${session.userId.slice(0, 8)}`;
    const { data: workspace, error } = await admin.from("workspaces").insert({
      name: workspaceName,
      slug,
      created_by: session.userId,
      onboarding_completed_at: new Date().toISOString()
    }).select("id").single();
    if (error) throw new Error(`Unable to create workspace: ${error.message}`);
    workspaceId = workspace.id;

    const { error: memberError } = await admin.from("workspace_members").insert({
      workspace_id: workspaceId,
      user_id: session.userId,
      role: "admin",
      invited_by: session.userId
    });
    if (memberError) throw new Error(`Unable to create workspace membership: ${memberError.message}`);

    const { error: entitlementError } = await admin.from("workspace_entitlements").insert({ workspace_id: workspaceId });
    if (entitlementError) throw new Error(`Unable to seed workspace limits: ${entitlementError.message}`);
  }

  const interestRows = interests.map((label) => ({
    workspace_id: workspaceId,
    label,
    source: "user_added",
    active: true,
    created_by: session.userId
  }));
  const { error: interestError } = await admin.from("discovery_interests").upsert(
    interestRows,
    { onConflict: "workspace_id,normalized_label", ignoreDuplicates: true }
  );
  if (interestError) throw new Error(`Unable to save Discovery Interests: ${interestError.message}`);

  // One-time migration of the prototype's canonical data into the initial Owner workspace.
  // This only touches unassigned legacy rows and becomes a no-op after cutover.
  if (isBootstrapOwner) {
    const legacyTables = ["scout_runs", "sources", "signals", "portfolio_publications"] as const;
    const backfillCounts: Record<string, number> = {};

    for (const table of legacyTables) {
      const { data, error } = await admin
        .from(table)
        .update({ workspace_id: workspaceId })
        .is("workspace_id", null)
        .select("workspace_id");

      if (error) throw new Error(`Unable to migrate legacy ${table}: ${error.message}`);
      backfillCounts[table] = data?.length ?? 0;
    }

    await admin.from("audit_events").insert({
      workspace_id: workspaceId,
      actor_user_id: session.userId,
      event_type: "migration.legacy_data_backfilled",
      target_type: "workspace",
      target_id: workspaceId,
      metadata: backfillCounts
    });
  }

  if (channels.length) {
    const channelRows = channels.map((channelKey) => ({
      workspace_id: workspaceId,
      channel_key: channelKey,
      enabled: true,
      is_primary: channelKey === primaryChannel
    }));
    const { error: channelError } = await admin.from("workspace_channels").upsert(channelRows, { onConflict: "workspace_id,channel_key" });
    if (channelError) throw new Error(`Unable to save channels: ${channelError.message}`);
  }

  await admin.from("audit_events").insert({
    workspace_id: workspaceId,
    actor_user_id: session.userId,
    event_type: "onboarding.completed",
    target_type: "workspace",
    target_id: workspaceId
  });

  redirect("/");
}
