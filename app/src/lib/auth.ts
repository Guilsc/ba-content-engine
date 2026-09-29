import "server-only";

import { redirect } from "next/navigation";

import { getCuratiaSession } from "@/lib/session";

export async function hasEditorSession() {
  return Boolean(await getCuratiaSession());
}

export async function requireEditorSession() {
  const session = await getCuratiaSession();
  if (!session) redirect("/login");
  return session;
}

export async function assertEditorSession() {
  const session = await getCuratiaSession();
  if (!session) throw new Error("Unauthorized.");
  return session;
}
