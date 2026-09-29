import "server-only";

import { redirect } from "next/navigation";

import { getCuratiaSession, requireOnboardedSession } from "@/lib/session";

export async function hasEditorSession() {
  return Boolean(await getCuratiaSession());
}

export async function requireEditorSession() {
  return requireOnboardedSession();
}

export async function assertEditorSession() {
  const session = await getCuratiaSession();
  if (!session) throw new Error("Unauthorized.");
  if (!session.onboardingComplete || session.workspaces.length === 0) {
    throw new Error("Onboarding required.");
  }
  return session;
}
