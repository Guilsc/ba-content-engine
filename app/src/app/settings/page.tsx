import { saveSettings } from "@/app/settings/actions";
import { AppShell } from "@/components/AppShell";
import { getSupabaseAdmin } from "@/lib/supabase";
import { requireOnboardedSession } from "@/lib/session";

const avatarOptions = ["circuit","spark","node","signal","pixel","orbit"];
const defaultInterests = ["Business Analysis","AI","Agentic AI","Business Process","Decision Intelligence","BI","Data","Automation","Context Engineering"];
const channelOptions = [["linkedin","LinkedIn"],["instagram","Instagram"],["x","X"],["tiktok","TikTok"],["medium","Medium"]] as const;

export default async function SettingsPage() {
  const session = await requireOnboardedSession();
  const workspace = session.workspaces[0];
  const admin = getSupabaseAdmin();

  const [{ data: profile }, { data: interests }, { data: channels }] = await Promise.all([
    admin.from("profiles").select("display_name,role_title,bio,avatar_key").eq("user_id", session.userId).single(),
    admin.from("discovery_interests").select("label,active").eq("workspace_id", workspace.id),
    admin.from("workspace_channels").select("channel_key,enabled,is_primary").eq("workspace_id", workspace.id)
  ]);

  const activeInterests = new Set((interests ?? []).filter((i) => i.active).map((i) => i.label));
  const enabledChannels = new Set((channels ?? []).filter((c) => c.enabled).map((c) => c.channel_key));
  const primaryChannel = (channels ?? []).find((c) => c.is_primary)?.channel_key ?? "";

  return (
    <AppShell>
      <section className="page-header"><div><p className="eyebrow">SETTINGS</p><h1>Profile & workspace</h1><p>Changes to Discovery Interests affect future Scout runs only.</p></div></section>
      <form action={saveSettings} className="panel settings-form">
        <h2>Your profile</h2>
        <label>Display name<input name="displayName" defaultValue={profile?.display_name ?? ""} required /></label>
        <label>Role / title<input name="roleTitle" defaultValue={profile?.role_title ?? ""} /></label>
        <label>Short bio<textarea name="bio" rows={2} defaultValue={profile?.bio ?? ""} /></label>
        <label>Avatar<select name="avatarKey" defaultValue={profile?.avatar_key ?? "circuit"}>{avatarOptions.map((a)=><option key={a} value={a}>{a}</option>)}</select></label>

        <h2>Discovery Interests</h2>
        <div className="choice-grid">{defaultInterests.map((interest)=><label key={interest}><input type="checkbox" name="interests" value={interest} defaultChecked={activeInterests.has(interest)} /> {interest}</label>)}</div>

        <h2>Publishing channels</h2>
        <div className="choice-grid">{channelOptions.map(([key,label])=><label key={key}><input type="checkbox" name="channels" value={key} defaultChecked={enabledChannels.has(key)} /> {label}</label>)}</div>
        <label>Primary channel<select name="primaryChannel" defaultValue={primaryChannel}><option value="">None</option>{channelOptions.map(([key,label])=><option key={key} value={key}>{label}</option>)}</select></label>

        <button type="submit">Save settings</button>
      </form>
    </AppShell>
  );
}
