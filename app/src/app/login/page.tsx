import { redirect } from "next/navigation";

import { login } from "@/app/login/actions";
import { hasEditorSession } from "@/lib/auth";

export default async function LoginPage({
  searchParams
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await hasEditorSession()) {
    redirect("/trend-radar");
  }

  const params = await searchParams;

  return (
    <main className="login-page">
      <section className="login-card">
        <p className="eyebrow">THE ANALYSIS LAYER</p>
        <h1>Private editorial workspace.</h1>
        <p>
          Enter the personal access key configured in the hosting environment.
        </p>

        <form action={login} className="login-form">
          <label htmlFor="accessKey">Access key</label>
          <input
            id="accessKey"
            name="accessKey"
            type="password"
            autoComplete="current-password"
            required
          />
          {params.error ? (
            <span className="login-error">That access key is not valid.</span>
          ) : null}
          <button type="submit">Open BA Content Engine</button>
        </form>
      </section>
    </main>
  );
}
