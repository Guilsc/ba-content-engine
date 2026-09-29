import { AppShell } from "@/components/AppShell";
import { requireOnboardedSession } from "@/lib/session";

export default async function CuratiaHomePage() {
  const session = await requireOnboardedSession();
  return (
    <AppShell>
      <section className="page-header">
        <div>
          <p className="eyebrow">CURATIA HOME</p>
          <h1>Good to see you, {session.displayName ?? "Creator"}.</h1>
          <p>Signals. Context. Decisions. Creation.</p>
        </div>
      </section>
      <section className="panel">
        <h2>Your editorial command center</h2>
        <p>New Signals, active editorial work, upcoming publications, learnings and system attention items will converge here as their Alpha phases come online.</p>
      </section>
    </AppShell>
  );
}
