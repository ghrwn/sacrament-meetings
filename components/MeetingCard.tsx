import Link from "next/link";
import type { SacramentMeeting } from "@/lib/types";
import DeleteMeetingForm from "@/components/DeleteMeetingForm";

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

function formatMeetingDate(date: string) {
  return new Intl.DateTimeFormat("en-PH", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "Asia/Manila",
  }).format(new Date(`${date}T12:00:00+08:00`));
}

function formatMeetingType(type: SacramentMeeting["meetingType"]) {
  return type.charAt(0).toUpperCase() + type.slice(1);
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-amber-300 hover:shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800">
          {formatMeetingType(meeting.meetingType)} Meeting
        </span>
        <span className="text-xs font-medium text-slate-500">{meeting.date}</span>
      </div>

      <h3 className="mt-5 text-xl font-bold text-slate-900">{formatMeetingDate(meeting.date)}</h3>
      <div className="mt-4 space-y-2 text-sm text-slate-600">
        <p><span className="font-semibold text-slate-800">Presiding:</span> {meeting.presiding}</p>
        <p><span className="font-semibold text-slate-800">Conducting:</span> {meeting.conducting}</p>
        <p><span className="font-semibold text-slate-800">Speakers and musical numbers:</span> {meeting.speakers.length}</p>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-4">
        <Link href={`/meetings/${meeting.id}`} className="text-sm font-semibold text-amber-800 transition group-hover:text-amber-600">View program <span aria-hidden="true">→</span></Link>
        <Link href={`/meetings/${meeting.id}/edit`} aria-label={`Edit meeting dated ${meeting.date}`} className="text-sm font-semibold text-slate-700 underline-offset-4 hover:underline">Edit</Link>
        <DeleteMeetingForm id={meeting.id} date={meeting.date} />
      </div>
    </article>
  );
}
