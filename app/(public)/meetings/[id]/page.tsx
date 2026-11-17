import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import MeetingDetail from "@/components/MeetingDetail";
import { getMeetingById } from "@/lib/meetings-db";

interface MeetingPageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Meeting Program",
};

function MeetingDetailFallback() {
  return (
    <section
      aria-busy="true"
      aria-label="Loading meeting details"
      className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14"
    >
      <div className="no-print mb-6 h-5 w-40 animate-pulse rounded bg-slate-200" />
      <div className="animate-pulse rounded-2xl border border-slate-200 bg-white p-6 sm:p-10">
        <div className="h-4 w-32 rounded bg-slate-200" />
        <div className="mt-4 h-9 w-72 max-w-full rounded bg-slate-200" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="h-24 rounded-xl bg-slate-100" />
          ))}
        </div>
      </div>
      <p className="sr-only" role="status">
        Loading meeting details...
      </p>
    </section>
  );
}

export default function MeetingPage({ params }: MeetingPageProps) {
  return (
    <Suspense fallback={<MeetingDetailFallback />}>
      <MeetingPageContent params={params} />
    </Suspense>
  );
}

async function MeetingPageContent({ params }: MeetingPageProps) {
  const { id } = await params;
  const meetingId = Number(id);

  if (!Number.isInteger(meetingId) || meetingId <= 0) {
    notFound();
  }

  const meeting = await getMeetingById(meetingId);

  if (!meeting) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
      <div className="no-print mb-6">
        <Link
          href="/meetings"
          className="text-sm font-semibold text-amber-800 hover:text-amber-600"
        >
          ← Back to All Meetings
        </Link>
      </div>
      <MeetingDetail meeting={meeting} />
    </section>
  );
}
