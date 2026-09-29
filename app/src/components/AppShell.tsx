import Link from "next/link";

import { LogoutButton } from "@/components/LogoutButton";

const nav = [
  ["Home", "/home"],
  ["Trend Radar", "/trend-radar"],
  ["Idea Tank", "#"],
  ["Editorial Studio", "#"],
  ["Publishing & Learnings", "#"],
  ["Settings", "/settings"]
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-kicker">CURATIA</div>
          <div className="brand-subtitle">Signals. Context. Decisions. Creation.</div>
        </div>
        <nav className="nav">
          {nav.map(([label, href]) =>
            href === "#" ? (
              <span className="nav-item nav-item-disabled" key={label}>
                <span>{label}</span><small>Later Alpha phase</small>
              </span>
            ) : (
              <Link className="nav-item" href={href} key={label}>{label}</Link>
            )
          )}
        </nav>
        <div className="sidebar-footer-wrap">
          <div className="sidebar-footer"><span className="status-dot" />Curatia workspace</div>
          <LogoutButton />
        </div>
      </aside>
      <main className="main">{children}</main>
    </div>
  );
}
