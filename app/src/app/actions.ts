"use server";

import { revalidatePath } from "next/cache";

import { assertEditorSession } from "@/lib/auth";
import { updateSignalState } from "@/lib/signals";
import type { SignalState } from "@/lib/types";
import { authorizationFor } from "@/lib/session";

const PHASE_ONE_STATES: SignalState[] = ["Watch", "Explore", "Ignored"];

export async function changeSignalState(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const requestedState = String(formData.get("state") ?? "");

  const session = await assertEditorSession();
  const workspace = session.workspaces[0];
  if (!workspace) throw new Error("Workspace required.");

  if (!id || !PHASE_ONE_STATES.includes(requestedState as SignalState)) {
    throw new Error("This Trend Radar transition is not available in Phase 1.");
  }

  // Creating Ideas/Candidates remains a separate explicit workflow.
  await updateSignalState(id, requestedState as SignalState, authorizationFor(session, workspace.id));

  revalidatePath("/trend-radar");
}
