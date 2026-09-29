import { redirect } from "next/navigation";

import { completeOnboarding } from "@/app/onboarding/actions";
import { requireCuratiaSession } from "@/lib/session";

const avatars = [
  ["circuit", "◉", "Circuit"],
  ["spark", "✦", "Spark"],
  ["node", "⬡", "Node"],
  ["signal", "⌁", "Signal"],
  ["pixel", "▦", "Pixel"],
  ["orbit", "◎", "Orbit"]
] as const;

const interests = [
  "Business Analysis", "AI", "Agentic AI", "Business Process",
  "Decision Intelligence", "BI", "Data", "Automation", "Context Engineering"
];

const channels = [
  ["linkedin", "LinkedIn"], ["instagram", "Instagram"], ["x", "X"],
  ["tiktok", "TikTok"], ["medium", "Medium"]
] as const;

export default async function OnboardingPage() {
  const session = await requireCuratiaSession();
  if (session.onboardingComplete && session.workspaces.length) redirect("/");

  return (
    <main className="onboarding-page">
      <form action={completeOnboarding} className="onboarding-card">
        <p className="eyebrow">WELCOME TO CURATIA</p>
        <h1>Set up your workspace.</h1>
        <p>You can change all of these choices later in Settings.</p>

        <fieldset>
          <legend>1. Your profile</legend>
          <label>Display name<input name="displayName" required /></label>
          <label>Role / title<input name="roleTitle" placeholder="Optional" /></label>
          <label>Short bio<textarea name="bio" rows={2} placeholder="Optional" /></label>
          <div className="avatar-grid">
            {avatars.map(([key, symbol, label], index) => (
              <label className="avatar-option" key={key}>
                <input type="radio" name="avatarKey" value={key} defaultChecked={index === 0} />
                <span className="avatar-symbol">{symbol}</span><span>{label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>2. Your workspace</legend>
          <label>Workspace name<input name="workspaceName" defaultValue={session.displayName ? `${session.displayName}'s Workspace` : ""} required /></label>
        </fieldset>

        <fieldset>
          <legend>3. What should Curatia discover?</legend>
          <div className="choice-grid">
            {interests.map((interest) => (
              <label key={interest}><input type="checkbox" name="interests" value={interest} defaultChecked /> {interest}</label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>4. Where do you publish?</legend>
          <div className="choice-grid">
            {channels.map(([key, label]) => (
              <label key={key}><input type="checkbox" name="channels" value={key} /> {label}</label>
            ))}
          </div>
          <label>Primary channel
            <select name="primaryChannel" defaultValue="">
              <option value="">None yet</option>
              {channels.map(([key, label]) => <option key={key} value={key}>{label}</option>)}
            </select>
          </label>
          <p className="helper-text">Connecting publishing accounts is optional and can be completed later.</p>
        </fieldset>

        <button type="submit">Enter Curatia</button>
      </form>
    </main>
  );
}
