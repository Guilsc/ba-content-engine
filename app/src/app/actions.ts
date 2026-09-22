"use server";

import { revalidatePath } from "next/cache";

import { updateSignalState } from "@/lib/signals";
import { SIGNAL_STATES, type SignalState } from "@/lib/types";

export async function changeSignalState(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const requestedState = String(formData.get("state") ?? "");

  if (!id || !SIGNAL_STATES.includes(requestedState as SignalState)) {
    throw new Error("Invalid Signal state update.");
  }

  // Trend Radar actions may change Radar state only.
  // Creating Ideas/Candidates remains a separate explicit workflow.
  await updateSignalState(id, requestedState as SignalState);

  revalidatePath("/trend-radar");
}
