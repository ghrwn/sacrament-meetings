import type { Metadata } from "next";
import Link from "next/link";
import LoginForm from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Bishopric Sign In",
  description: "Sign in to securely create and manage sacrament meeting programs.",
};

interface LoginPageProps {
  searchParams: Promise<{ callbackUrl?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { callbackUrl } = await searchParams;
  const safeCallbackUrl =
    callbackUrl?.startsWith("/") && !callbackUrl.startsWith("//")
      ? callbackUrl
      : "/meetings";

  return (
    <section className="mx-auto flex min-h-[65vh] max-w-7xl items-center justify-center px-5 py-12 sm:px-8">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-800">
          Leader Workspace
        </p>
        <h1 className="mt-3 font-serif text-3xl font-bold text-slate-900">
          Bishopric sign in
        </h1>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          Sign in to create and update meeting programs. Meeting archives remain
          available to visitors without an account.
        </p>
        <div className="mt-8">
          <LoginForm callbackUrl={safeCallbackUrl} />
        </div>
        <Link href="/meetings" className="mt-6 inline-block text-sm font-semibold text-amber-800 hover:text-amber-600">
          ← Return to public meetings
        </Link>
      </div>
    </section>
  );
}
