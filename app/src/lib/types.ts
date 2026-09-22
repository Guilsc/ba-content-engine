export const SIGNAL_STATES = [
  "New",
  "Watch",
  "Explore",
  "Promoted",
  "Ignored",
  "Archived"
] as const;

export type SignalState = (typeof SIGNAL_STATES)[number];

export type Source = {
  id: string;
  source_key: string | null;
  canonical_url: string | null;
  title: string;
  publisher: string | null;
  author: string | null;
  source_type: string;
  published_at: string | null;
  summary: string | null;
};

export type SignalSource = {
  role: "primary" | "additional";
  source: Source | null;
};

export type Signal = {
  id: string;
  signal_key: string;
  title: string;
  summary: string | null;
  state: SignalState;
  first_published_at: string | null;
  detected_at: string;
  preliminary_ba_relevance: string | null;
  why_it_may_matter: string | null;
  why_now: string | null;
  ba_impact: string | null;
  second_order_implication: string | null;
  evidence_strength: "Strong" | "Moderate" | "Weak" | null;
  saturation: "Low" | "Medium" | "High" | null;
  backlog_overlap: string | null;
  strongest_editorial_angle: string | null;
  editorial_potential: "Watch" | "Explore" | "Candidate" | null;
  archive_eligible: boolean;
  created_at: string;
  updated_at: string;
  signal_sources: SignalSource[];
};
