import { AppShell } from "@/components/AppShell";
import { SignalCard } from "@/components/SignalCard";
import { requireEditorSession } from "@/lib/auth";
import { listSignals } from "@/lib/signals";
import type { Signal, SignalState } from "@/lib/types";

export const dynamic = "force-dynamic";

const columns: Array<{ state: SignalState; label: string; description: string }> = [
  { state: "New", label: "New", description: "Fresh Scout discoveries awaiting editorial triage." },
  { state: "Watch", label: "Watch", description: "Worth tracking as evidence or implications develop." },
  { state: "Explore", label: "Explore", description: "Strong enough for deeper editorial investigation." }
];

export default async function TrendRadarPage() {
  await requireEditorSession();

  let signals: Signal[] = [];
  let errorMessage: string | null = null;

  try {
    signals = await listSignals(["New", "Watch", "Explore"]);
  } catch (error) {
    errorMessage = error instanceof Error ? error.message : "Unable to load Trend Radar.";
  }

  return (
    <AppShell>
      <header className="page-header">
        <div>
          <p className="eyebrow">TREND RADAR</p>
          <h1>Signals before stories.</h1>
          <p className="lede">
            External developments are collected here first. Editorial judgment comes next.
          </p>
        </div>

        <div className="header-stat">
          <strong>{signals.length}</strong>
          <span>active signals</span>
        </div>
      </header>

      {errorMessage ? (
        <section className="error-panel">
          <strong>Trend Radar backend is not ready.</strong>
          <p>{errorMessage}</p>
        </section>
      ) : null}

      <section className="radar-grid">
        {columns.map((column) => {
          const items = signals.filter((signal) => signal.state === column.state);

          return (
            <div className="radar-column" key={column.state}>
              <div className="column-heading">
                <div>
                  <h2>{column.label}</h2>
                  <p>{column.description}</p>
                </div>
                <span>{items.length}</span>
              </div>

              <div className="column-list">
                {items.length ? (
                  items.map((signal) => <SignalCard signal={signal} key={signal.id} />)
                ) : (
                  <div className="empty-state">
                    <p>No {column.label.toLowerCase()} signals yet.</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </section>

      <footer className="page-footer">
        <span>New + Watch + Explore are the active working view.</span>
        <span>Promotion beyond Trend Radar requires an explicit decision.</span>
      </footer>
    </AppShell>
  );
}
