"use server";

import { redirect } from "next/navigation";

import {
  clearEditorSession,
  createEditorSession,
  verifyAccessKey
} from "@/lib/auth";

export async function login(formData: FormData) {
  const candidate = String(formData.get("accessKey") ?? "");

  if (!verifyAccessKey(candidate)) {
    redirect("/login?error=1");
  }

  await createEditorSession();
  redirect("/trend-radar");
}

export async function logout() {
  await clearEditorSession();
  redirect("/login");
}
