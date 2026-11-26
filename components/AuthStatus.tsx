import Link from "next/link";
import { connection } from "next/server";
import { auth, signOut } from "@/auth";

async function signOutAction() {
  "use server";
  await signOut({ redirectTo: "/" });
}

export default async function AuthStatus() {
  await connection();

  const authConfigured = Boolean(
    process.env.AUTH_SECRET &&
      process.env.AUTH_ADMIN_USERNAME &&
      process.env.AUTH_ADMIN_PASSWORD_HASH,
  );

  if (!authConfigured) {
    return (
      <Link href="/login" className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2">
        Bishopric sign in
      </Link>
    );
  }

  const session = await auth();
  if (!session?.user) {
    return (
      <Link href="/login" className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2">
        Bishopric sign in
      </Link>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-sm font-medium text-slate-600">
        {session.user.name ?? "Administrator"}
      </span>
      <form action={signOutAction}>
        <button type="submit" className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2">
          Sign out
        </button>
      </form>
    </div>
  );
}
