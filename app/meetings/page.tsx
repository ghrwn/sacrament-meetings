import type { Metadata } from "next";
import { Suspense } from "react";
import MeetingCard from "@/components/MeetingCard";
import MeetingLoadingFallback from "@/components/MeetingLoadingFallback";
import { getBaseUrl } from "@/lib/api-url";
import type { SacramentMeeting } from "@/lib/types";

export const metadata: Metadata = {
  title: "All Meetings",
  description: "Browse current and past sacrament meeting programs.",
};

async function MeetingsListContent() {
  const baseUrl = await getBaseUrl();

  const response = await fetch(`${baseUrl}/api/meetings`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Unable to load meeting programs.");
  }

  const meetings: SacramentMeeting[] = await response.json();

  const sortedMeetings = [...meetings].sort((a, b) =>
    b.date.localeCompare(a.date),
  );

  return (
    <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
      <header className="mb-10">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-800">
          Meeting Archive
        </p>

        <h1 className="mt-3 font-serif text-3xl font-bold text-slate-900 sm:text-4xl">
          All Meeting Programs
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
          Browse sacrament meeting programs, review meeting assignments, and
          open individual programs for more details.
        </p>

        <p className="mt-4 text-sm font-semibold text-slate-500">
          {sortedMeetings.length} meeting programs available
        </p>
      </header>

      {sortedMeetings.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {sortedMeetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <h2 className="font-serif text-xl font-semibold text-slate-900">
            No meeting programs yet
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Meeting programs will appear here when they become available.
          </p>
        </div>
      )}
    </section>
  );
}

export default function MeetingsPage() {
  return (
    <Suspense fallback={<MeetingLoadingFallback />}>
      <MeetingsListContent />
    </Suspense>
  );
}