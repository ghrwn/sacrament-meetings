import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import MeetingForm from "@/components/MeetingForm";
import { updateMeeting } from "@/lib/actions";
import { getMeetingById } from "@/lib/meetings-db";

interface EditMeetingPageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Edit Meeting",
};

export default async function EditMeetingPage({ params }: EditMeetingPageProps) {
  const { id } = await params;
  const meetingId = Number(id);

  if (!Number.isInteger(meetingId) || meetingId <= 0) {
    notFound();
  }

  const meeting = await getMeetingById(meetingId);
  if (!meeting) {
    notFound();
  }

  const updateAction = updateMeeting.bind(null, meetingId);

  return (
    <section className="mx-auto max-w-4xl">
      <div className="mb-8">
        <Link href="/meetings" className="text-sm font-semibold text-amber-800 hover:text-amber-600">← Back to meetings</Link>
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-amber-800">Administration</p>
        <h1 className="mt-2 font-serif text-3xl font-bold text-slate-900">Edit meeting program</h1>
        <p className="mt-2 text-sm leading-7 text-slate-600">Update the program details. Changes are validated on the server before they are saved.</p>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <MeetingForm action={updateAction} meeting={meeting} />
      </div>
    </section>
  );
}
