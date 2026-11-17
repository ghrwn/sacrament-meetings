import type { Metadata } from "next";
import { Suspense } from "react";
import MeetingCard from "@/components/MeetingCard";
import { MeetingSearch } from "@/components/MeetingSearch";
import { Pagination } from "@/components/Pagination";
import { getMeetings, getMeetingsTotalPages } from "@/lib/meetings-db";

interface MeetingsPageProps {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}

export const metadata: Metadata = {
  title: "All Meetings",
  description: "Browse current and past sacrament meeting programs.",
};

export default async function MeetingsPage({
  searchParams,
}: MeetingsPageProps) {
  const params = await searchParams;
  const query = params?.query?.trim() ?? "";
  const requestedPage = Number(params?.page ?? "1");
  const currentPage =
    Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;

  const [meetings, totalPages] = await Promise.all([
    getMeetings(query, currentPage),
    getMeetingsTotalPages(query),
  ]);

  return (
    <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
      <header className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-800">
          Meeting Archive
        </p>
        <h1 className="mt-3 font-serif text-3xl font-bold text-slate-900 sm:text-4xl">
          All Meeting Programs
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
          Browse meeting programs, review assignments, and search by speaker,
          presiding leader, conducting leader, or meeting type.
        </p>
      </header>

      <div className="mb-8">
        <Suspense fallback={<div className="h-12 animate-pulse rounded-xl bg-slate-100" />}>
          <MeetingSearch />
        </Suspense>
      </div>

      {meetings.length > 0 ? (
        <>
          <p className="mb-5 text-sm font-semibold text-slate-500" aria-live="polite">
            Showing {meetings.length} meeting programs · Page {currentPage} of {totalPages}
          </p>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {meetings.map((meeting) => (
              <MeetingCard key={meeting.id} meeting={meeting} />
            ))}
          </div>
          <Pagination totalPages={totalPages} />
        </>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <h2 className="font-serif text-xl font-semibold text-slate-900">
            No meeting programs found
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Try a different search term or clear your search to view all meetings.
          </p>
        </div>
      )}
    </section>
  );
}
