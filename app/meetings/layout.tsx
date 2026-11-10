import Link from "next/link";
import type { ReactNode } from "react";

export default function MeetingsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div>
      <div className="meeting-section-nav border-b border-slate-200 bg-amber-50/60">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-amber-800">
              Meeting Programs
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Current and past Sunday meetings
            </p>
          </div>

          <nav aria-label="Meeting section navigation" className="flex gap-3">
            <Link
              href="/meetings"
              className="rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-600"
            >
              All Meetings
            </Link>

            <Link
              href="/meetings/current"
              className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500"
            >
              This Sunday
            </Link>
          </nav>
        </div>
      </div>

      {children}
    </div>
  );
}