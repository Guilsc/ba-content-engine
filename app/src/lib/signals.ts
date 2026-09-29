import "server-only";

import type { AuthorizationContext } from "@/lib/authorization";
import { assertWorkspaceWrite } from "@/lib/authorization";
import { getSupabaseAdmin } from "@/lib/supabase";
import type { Signal, SignalState } from "@/lib/types";

/**
 * Transitional compatibility:
 * - legacy callers may omit authorization context until managed-auth cutover
 * - Curatia callers MUST pass context and are scoped to context.workspaceId
 * Remove optional context after production auth/tenancy cutover.
 */
export async function listSignals(
  states?: SignalState[],
  context?: AuthorizationContext
) {
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

  if (context) {
    query = query.eq("workspace_id", context.workspaceId);
  }

  if (states?.length) {
    query = query.in("state", states);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(`Unable to load Trend Radar signals: ${error.message}`);
  }

  return (data ?? []) as unknown as Signal[];
}

export async function updateSignalState(
  id: string,
  state: SignalState,
  context?: AuthorizationContext
) {
  if (context) {
    assertWorkspaceWrite(context);
  }

  const supabase = getSupabaseAdmin();

  const patch: Record<string, string> = { state };

  if (state === "Promoted") patch.promoted_at = new Date().toISOString();
  if (state === "Ignored") patch.ignored_at = new Date().toISOString();
  if (state === "Archived") patch.archived_at = new Date().toISOString();

  let query = supabase.from("signals").update(patch).eq("id", id);

  if (context) {
    query = query.eq("workspace_id", context.workspaceId);
  }

  const { error } = await query;

  if (error) {
    throw new Error(`Unable to update Signal state: ${error.message}`);
  }
}
