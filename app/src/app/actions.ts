"use server";

import { revalidatePath } from "next/cache";

import { assertEditorSession } from "@/lib/auth";
import { updateSignalState } from "@/lib/signals";
import type { SignalState } from "@/lib/types";

const PHASE_ONE_STATES: SignalState[] = ["Watch", "Explore", "Ignored"];

export async function changeSignalState(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const requestedState = String(formData.get("state") ?? "");

  await assertEditorSession();

  if (!id || !PHASE_ONE_STATES.includes(requestedState as SignalState)) {
    throw new Error("This Trend Radar transition is not available in Phase 1.");
  }

  // Creating Ideas/Candidates remains a separate explicit workflow.
  await updateSignalState(id, requestedState as SignalState);

  revalidatePath("/trend-radar");
}
