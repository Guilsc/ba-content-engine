import { logout } from "@/app/login/actions";

export function LogoutButton() {
  return (
    <form action={logout}>
      <button className="logout-button" type="submit">
        Sign out
      </button>
    </form>
  );
}
