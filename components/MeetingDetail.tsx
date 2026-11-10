import PrintButton from "@/components/PrintButton";
import type { ReactNode } from "react";
import type { SacramentMeeting } from "@/lib/types";

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

function formatMeetingDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  const localDate = new Date(Date.UTC(year, month - 1, day, 12));

  return new Intl.DateTimeFormat("en-PH", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(localDate);
}

function AgendaSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="agenda-section border-b border-slate-200 py-5 last:border-b-0">
      <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-amber-800">
        {title}
      </h3>

      {children}
    </section>
  );
}

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
  const meetingType =
    meeting.meetingType.charAt(0).toUpperCase() +
    meeting.meetingType.slice(1);

  return (
    <div className="mx-auto max-w-3xl">
      <div className="no-print mb-5 flex justify-end">
        <PrintButton />
      </div>

      <article className="print-content rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        <header className="border-b border-slate-200 pb-6 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-800">
            Lucban Ward
          </p>

          <h1 className="mt-3 font-serif text-2xl font-bold text-slate-900 sm:text-3xl">
            Sacrament Meeting
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            {formatMeetingDate(meeting.date)}
          </p>

          <span className="mt-4 inline-block rounded-full bg-amber-50 px-4 py-1.5 text-xs font-semibold text-amber-800">
            {meetingType} Meeting
          </span>
        </header>

        <section className="grid gap-4 border-b border-slate-200 py-5 sm:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Presiding
            </p>
            <p className="mt-1 font-semibold text-slate-900">
              {meeting.presiding}
            </p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Conducting
            </p>
            <p className="mt-1 font-semibold text-slate-900">
              {meeting.conducting}
            </p>
          </div>
        </section>

        <AgendaSection title="Announcements">
          {meeting.announcements && meeting.announcements.length > 0 ? (
            <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700">
              {meeting.announcements.map((announcement, index) => (
                <li key={`${announcement}-${index}`}>{announcement}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-500">
              No announcements scheduled.
            </p>
          )}
        </AgendaSection>

        <AgendaSection title="Opening Hymn">
          <p className="font-semibold text-slate-900">
            Hymn {meeting.openingHymn.number}: {meeting.openingHymn.title}
          </p>
        </AgendaSection>

        <AgendaSection title="Opening Prayer">
          <p className="text-sm text-slate-700">{meeting.openingPrayer}</p>
        </AgendaSection>

        <AgendaSection title="Ward Business">
          {meeting.wardBusiness.length > 0 ? (
            <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700">
              {meeting.wardBusiness.map((item, index) => (
                <li key={`${item.description}-${index}`}>
                  {item.description}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-500">
              No ward business scheduled.
            </p>
          )}
        </AgendaSection>

        <AgendaSection title="Stake Business">
          <p className="text-sm text-slate-700">
            {meeting.stakeBusiness
              ? "Stake business will be conducted."
              : "No stake business scheduled."}
          </p>
        </AgendaSection>

        <AgendaSection title="Sacrament Hymn">
          <p className="font-semibold text-slate-900">
            Hymn {meeting.sacramentHymn.number}:{" "}
            {meeting.sacramentHymn.title}
          </p>
        </AgendaSection>

        <AgendaSection title="Speakers and Musical Numbers">
          {meeting.speakers.length > 0 ? (
            <div className="space-y-4">
              {meeting.speakers.map((item, index) => (
                <div
                  key={`${item.name}-${index}`}
                  className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between"
                >
                  <div>
                    <p className="font-semibold text-slate-900">
                      {item.name}
                    </p>

                    {item.topic && (
                      <p className="text-sm text-slate-600">{item.topic}</p>
                    )}
                  </div>

                  <span className="text-xs font-medium text-amber-800">
                    {item.type === "speaker" ? "Speaker" : "Musical Number"}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">
              No speakers or musical numbers listed.
            </p>
          )}
        </AgendaSection>

        <AgendaSection title="Closing Hymn">
          <p className="font-semibold text-slate-900">
            Hymn {meeting.closingHymn.number}: {meeting.closingHymn.title}
          </p>
        </AgendaSection>

        <AgendaSection title="Closing Prayer">
          <p className="text-sm text-slate-700">{meeting.closingPrayer}</p>
        </AgendaSection>
      </article>
    </div>
  );
}