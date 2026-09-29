import { redirect } from "next/navigation";

import { getCuratiaSession } from "@/lib/session";

export default async function HomePage() {
  const session = await getCuratiaSession();
  if (!session) redirect("/login");
  if (!session.onboardingComplete || session.workspaces.length === 0) redirect("/onboarding");
  redirect("/home");
}
