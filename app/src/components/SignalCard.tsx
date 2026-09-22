import { changeSignalState } from "@/app/actions";
import type { Signal, SignalState } from "@/lib/types";

const activeActions: Array<{ label: string; state: SignalState }> = [
  { label: "Keep Watching", state: "Watch" },
  { label: "Explore", state: "Explore" },
  { label: "Ignore", state: "Ignored" }
];

function formatDate(value: string | null) {
  if (!value) return "Unknown date";

  return new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(new Date(value));
}

export function SignalCard({ signal }: { signal: Signal }) {
  const primary =
    signal.signal_sources?.find((item) => item.role === "primary")?.source ??
    signal.signal_sources?.[0]?.source ??
    null;

  return (
    <article className="signal-card">
      <div className="signal-card-top">
        <span className={`state-pill state-${signal.state.toLowerCase()}`}>
          {signal.state}
        </span>
        <span className="signal-date">{formatDate(signal.first_published_at ?? signal.detected_at)}</span>
      </div>

      <h3>{signal.title}</h3>

      {signal.summary ? <p className="signal-summary">{signal.summary}</p> : null}

      {signal.why_it_may_matter ? (
        <div className="insight-block">
          <span>Why it may matter</span>
          <p>{signal.why_it_may_matter}</p>
        </div>
      ) : null}

      {(signal.evidence_strength || signal.saturation) ? (
        <div className="meta-row">
          {signal.evidence_strength ? <span>Evidence: {signal.evidence_strength}</span> : null}
          {signal.saturation ? <span>Saturation: {signal.saturation}</span> : null}
        </div>
      ) : null}

      {primary ? (
        <div className="source">
          <span className="source-label">Primary source</span>
          {primary.canonical_url ? (
            <a href={primary.canonical_url} target="_blank" rel="noreferrer">
              {primary.publisher || primary.title}
            </a>
          ) : (
            <span>{primary.publisher || primary.title}</span>
          )}
        </div>
      ) : null}

      {["New", "Watch", "Explore"].includes(signal.state) ? (
        <div className="card-actions">
          {activeActions
            .filter((action) => action.state !== signal.state)
            .map((action) => (
              <form action={changeSignalState} key={action.state}>
                <input type="hidden" name="id" value={signal.id} />
                <input type="hidden" name="state" value={action.state} />
                <button type="submit">{action.label}</button>
              </form>
            ))}
        </div>
      ) : null}
    </article>
  );
}
