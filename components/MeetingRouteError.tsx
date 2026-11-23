"use client";

import { useEffect } from "react";
import Link from "next/link";

interface MeetingRouteErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function MeetingRouteError({ error, reset }: MeetingRouteErrorProps) {
  useEffect(() => {
    console.error("A Sacrament Meeting Planner route error occurred:", error);
  }, [error]);

  return (
    <section className="mx-auto max-w-2xl px-5 py-16 text-center sm:px-8">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-800">Something went wrong</p>
      <h1 className="mt-3 font-serif text-3xl font-bold text-slate-900">We couldn&apos;t complete this request.</h1>
      <p className="mt-3 text-sm leading-7 text-slate-600">An unexpected error occurred while processing your request. You can try again or return to the meetings list.</p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <button type="button" onClick={reset} className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2">Try Again</button>
        <Link href="/meetings" className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">Back to Meetings</Link>
      </div>
    </section>
  );
}
