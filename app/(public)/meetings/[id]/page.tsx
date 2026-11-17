import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import MeetingDetail from "@/components/MeetingDetail";
import { getMeetingById } from "@/lib/meetings-db";

interface MeetingPageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Meeting Program",
};

export default async function MeetingPage({ params }: MeetingPageProps) {
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
