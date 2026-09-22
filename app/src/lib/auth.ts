import "server-only";

import { createHash, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SESSION_COOKIE = "bace_session";

function getAccessKey() {
  const accessKey = process.env.APP_ACCESS_KEY;

  if (!accessKey || accessKey.length < 20) {
    throw new Error(
      "APP_ACCESS_KEY is missing or too short. Configure a long random value in the hosting environment."
    );
  }

  return accessKey;
}

function expectedToken() {
  return createHash("sha256").update(getAccessKey()).digest("hex");
}

export function verifyAccessKey(candidate: string) {
  const expected = Buffer.from(expectedToken());
  const actual = Buffer.from(
    createHash("sha256").update(candidate).digest("hex")
  );

  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

export async function createEditorSession() {
  const store = await cookies();

  store.set(SESSION_COOKIE, expectedToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  });
}

export async function clearEditorSession() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

export async function hasEditorSession() {
  const store = await cookies();
  const candidate = store.get(SESSION_COOKIE)?.value;

  if (!candidate) return false;

  const expected = Buffer.from(expectedToken());
  const actual = Buffer.from(candidate);

  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

export async function requireEditorSession() {
  if (!(await hasEditorSession())) {
    redirect("/login");
  }
}

export async function assertEditorSession() {
  if (!(await hasEditorSession())) {
    throw new Error("Unauthorized.");
  }
}
