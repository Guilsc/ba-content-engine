import { AppShell } from "@/components/AppShell";
import { requireOnboardedSession } from "@/lib/session";

export default async function SettingsPage() {
  const session = await requireOnboardedSession();
  const workspace = session.workspaces[0];

  return (
    <AppShell>
      <section className="page-header">
        <div>
          <p className="eyebrow">SETTINGS</p>
          <h1>{session.displayName ?? "Your profile"}</h1>
          <p>{workspace?.name}</p>
        </div>
      </section>
      <section className="panel">
        <h2>Workspace configuration</h2>
        <p>Profile, avatars, Discovery Interests, publishing channels and connections live here. Editing controls are the next Settings increment; onboarding values are already persisted in the Curatia model.</p>
      </section>
    </AppShell>
  );
}
