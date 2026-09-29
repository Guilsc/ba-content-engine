import { redirect } from "next/navigation";

import { login, signup } from "@/app/login/actions";
import { getCuratiaSession } from "@/lib/session";

const errors: Record<string, string> = {
  invalid: "Email or password is not valid.",
  password: "Use a password with at least 10 characters.",
  signup: "We could not create that account. It may already exist."
};

export default async function LoginPage({
  searchParams
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const session = await getCuratiaSession();
  if (session) redirect("/");

  const params = await searchParams;

  return (
    <main className="login-page">
      <section className="login-card">
        <p className="eyebrow">CURATIA</p>
        <h1>Signals. Context. Decisions. Creation.</h1>
        <p>Sign in to your editorial intelligence workspace.</p>

        <form className="login-form">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" required />
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" autoComplete="current-password" minLength={10} required />
          {params.error ? <span className="login-error">{errors[params.error] ?? "Authentication failed."}</span> : null}
          <button formAction={login}>Sign in</button>
          <button formAction={signup} className="secondary-button">Create account</button>
        </form>
      </section>
    </main>
  );
}
