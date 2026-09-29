import "server-only";

import { redirect } from "next/navigation";

import type { AuthorizationContext, PlatformRole, WorkspaceRole } from "@/lib/authorization";
import { getSupabaseAdmin } from "@/lib/supabase";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export interface CuratiaSession {
  userId: string;
  email: string | null;
  displayName: string | null;
  avatarKey: string | null;
  onboardingComplete: boolean;
  platformRole: PlatformRole | null;
  workspaces: Array<{ id: string; name: string; slug: string; role: WorkspaceRole }>;
}

export async function getCuratiaSession(): Promise<CuratiaSession | null> {
  const auth = await createSupabaseServerClient();
  const { data: { user }, error } = await auth.auth.getUser();
  if (error || !user) return null;

  const admin = getSupabaseAdmin();
  const [{ data: profile }, { data: platform }, { data: memberships, error: membershipError }] =
    await Promise.all([
      admin.from("profiles").select("display_name, avatar_key, onboarding_completed_at").eq("user_id", user.id).maybeSingle(),
      admin.from("platform_roles").select("role").eq("user_id", user.id).maybeSingle(),
      admin.from("workspace_members")
        .select("role, workspace:workspaces(id,name,slug)")
        .eq("user_id", user.id)
    ]);

  if (membershipError) throw new Error(`Unable to load workspace membership: ${membershipError.message}`);

  const workspaces = (memberships ?? []).flatMap((row: any) => {
    const workspace = Array.isArray(row.workspace) ? row.workspace[0] : row.workspace;
    return workspace ? [{ ...workspace, role: row.role as WorkspaceRole }] : [];
  });

  return {
    userId: user.id,
    email: user.email ?? null,
    displayName: profile?.display_name ?? null,
    avatarKey: profile?.avatar_key ?? null,
    onboardingComplete: Boolean(profile?.onboarding_completed_at),
    platformRole: (platform?.role as PlatformRole | undefined) ?? null,
    workspaces
  };
}

export async function requireCuratiaSession() {
  const session = await getCuratiaSession();
  if (!session) redirect("/login");
  return session;
}

export async function requireOnboardedSession() {
  const session = await requireCuratiaSession();
  if (!session.onboardingComplete || session.workspaces.length === 0) redirect("/onboarding");
  return session;
}

export function authorizationFor(
  session: CuratiaSession,
  workspaceId: string
): AuthorizationContext {
  const membership = session.workspaces.find((workspace) => workspace.id === workspaceId);
  if (!membership) throw new Error("Workspace access denied.");

  return {
    userId: session.userId,
    workspaceId,
    workspaceRole: membership.role,
    platformRole: session.platformRole
  };
}
