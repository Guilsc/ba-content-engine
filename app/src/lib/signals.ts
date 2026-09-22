import "server-only";

import { getSupabaseAdmin } from "@/lib/supabase";
import type { Signal, SignalState } from "@/lib/types";

export async function listSignals(states?: SignalState[]) {
  const supabase = getSupabaseAdmin();

  let query = supabase
    .from("signals")
    .select(
      `
      *,
      signal_sources (
        role,
        source:sources (
          id,
          source_key,
          canonical_url,
          title,
          publisher,
          author,
          source_type,
          published_at,
          summary
        )
      )
      `
    )
    .order("detected_at", { ascending: false });

  if (states?.length) {
    query = query.in("state", states);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(`Unable to load Trend Radar signals: ${error.message}`);
  }

  return (data ?? []) as unknown as Signal[];
}

export async function updateSignalState(id: string, state: SignalState) {
  const supabase = getSupabaseAdmin();

  const timestamps: Record<string, string | null> = {
    promoted_at: state === "Promoted" ? new Date().toISOString() : null,
    ignored_at: state === "Ignored" ? new Date().toISOString() : null,
    archived_at: state === "Archived" ? new Date().toISOString() : null
  };

  const { error } = await supabase
    .from("signals")
    .update({ state, ...timestamps })
    .eq("id", id);

  if (error) {
    throw new Error(`Unable to update Signal state: ${error.message}`);
  }
}
