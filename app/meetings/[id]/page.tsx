import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import MeetingDetail from "@/components/MeetingDetail";
import MeetingLoadingFallback from "@/components/MeetingLoadingFallback";
import { getBaseUrl } from "@/lib/api-url";
import type { SacramentMeeting } from "@/lib/types";

interface MeetingPageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Meeting Program",
};

async function MeetingPageContent({ params }: MeetingPageProps) {
  const { id } = await params;
  const baseUrl = await getBaseUrl();

  const response = await fetch(
    `${baseUrl}/api/meetings/${encodeURIComponent(id)}`,
    { cache: "no-store" },
  );

  if (response.status === 400 || response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error("Unable to load the meeting program.");
  }

  const meeting: SacramentMeeting = await response.json();

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

export default function MeetingPage({ params }: MeetingPageProps) {
  return (
    <Suspense fallback={<MeetingLoadingFallback />}>
      <MeetingPageContent params={params} />
    </Suspense>
  );
}