import Link from "next/link";

import { LogoutButton } from "@/components/LogoutButton";

const nav = [
  ["Trend Radar", "/trend-radar"],
  ["Idea Tank", "#"],
  ["Content Pipeline", "#"],
  ["Editorial Studio", "#"],
  ["Publishing & Learnings", "#"]
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-kicker">THE ANALYSIS LAYER</div>
          <div className="brand-subtitle">Signals. Context. Decisions.</div>
        </div>

        <nav className="nav">
          {nav.map(([label, href], index) =>
            href === "#" ? (
              <span className="nav-item nav-item-disabled" key={label}>
                <span>{label}</span>
                <small>Later phase</small>
              </span>
            ) : (
              <Link className={index === 0 ? "nav-item active" : "nav-item"} href={href} key={label}>
                {label}
              </Link>
            )
          )}
        </nav>

        <div className="sidebar-footer-wrap">
          <div className="sidebar-footer">
            <span className="status-dot" />
            Supabase canonical state
          </div>
          <LogoutButton />
        </div>
      </aside>

      <main className="main">{children}</main>
    </div>
  );
}
