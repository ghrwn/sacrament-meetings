import type { Metadata } from "next";
import Link from "next/link";
import MeetingForm from "@/components/MeetingForm";
import { createMeeting } from "@/lib/actions";

export const metadata: Metadata = {
  title: "Create Meeting",
};

export default function NewMeetingPage() {
  return (
    <section className="mx-auto max-w-4xl">
      <div className="mb-8">
        <Link href="/meetings" className="text-sm font-semibold text-amber-800 hover:text-amber-600">← Back to meetings</Link>
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-amber-800">Administration</p>
        <h1 className="mt-2 font-serif text-3xl font-bold text-slate-900">Create a meeting program</h1>
        <p className="mt-2 text-sm leading-7 text-slate-600">Enter the meeting details below. Required fields are validated on the server before the meeting is saved.</p>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <MeetingForm action={createMeeting} />
      </div>
    </section>
  );
}
