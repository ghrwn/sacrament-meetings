import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import type { ReactNode } from "react";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login?callbackUrl=%2Fmeetings%2Fnew");
  }

  return (
    <div className="min-h-[60vh] bg-slate-50">
      <div className="border-b border-slate-200 bg-slate-900 text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-300">
              Leader Workspace
            </p>
            <h1 className="mt-1 text-xl font-bold">Meeting Administration</h1>
          </div>
          <nav aria-label="Admin navigation" className="flex flex-wrap gap-3">
            <Link
              href="/meetings/new"
              className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-amber-300"
            >
              Create Meeting
            </Link>
            <Link
              href="/meetings"
              className="rounded-full border border-white/30 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-amber-300"
            >
              Public Meetings
            </Link>
          </nav>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">{children}</div>
    </div>
  );
}
