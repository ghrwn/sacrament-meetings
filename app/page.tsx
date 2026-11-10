import Image from "next/image";
import Link from "next/link";
import MeetingCard from "@/components/MeetingCard";
import { getMeetings } from "@/lib/meetings-db";

export default function Home() {
  const meetings = [...getMeetings()].sort((a, b) =>
    b.date.localeCompare(a.date),
  );

  const recentMeetings = meetings.slice(0, 3);

  return (
    <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
      <section className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-800">
            Worship Together
          </p>

          <h1 className="mt-4 font-serif text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Prepare for a meaningful Sunday.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-slate-600">
            Organize sacrament meeting programs, review upcoming and past
            meetings, and keep every part of your Sunday worship in one place.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/meetings"
              className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
            >
              Browse Meetings
            </Link>

            <Link
              href="/meetings/current"
              className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-amber-500 hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
            >
              This Sunday
            </Link>
          </div>

          <div className="mt-10 grid max-w-md grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-2xl font-bold text-slate-900">
                {meetings.length}
              </p>
              <p className="mt-1 text-xs font-medium text-slate-500">
                Sample meeting programs
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-2xl font-bold text-slate-900">4</p>
              <p className="mt-1 text-xs font-medium text-slate-500">
                Meeting types supported
              </p>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-200 shadow-lg">
          <Image
            src="/meeting-chapel.jpg"
            alt="Interior of a Latter-day Saint chapel prepared for sacrament meeting"
            width={1200}
            height={800}
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="h-72 w-full object-cover sm:h-96 lg:h-[460px]"
          />

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 to-transparent p-6 pt-20">
            <p className="text-sm font-semibold text-white">
              A place for reflection and worship
            </p>
          </div>
        </div>
      </section>

      <section className="mt-20">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-800">
              Meeting Archive
            </p>

            <h2 className="mt-2 font-serif text-3xl font-bold text-slate-900">
              Recent Meeting Programs
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Browse recently recorded sacrament meeting programs.
            </p>
          </div>

          <Link
            href="/meetings"
            className="text-sm font-semibold text-amber-800 hover:text-amber-600"
          >
            View all meetings →
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {recentMeetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>

        {recentMeetings.length === 0 && (
          <p className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
            No meeting programs are available yet.
          </p>
        )}
      </section>

      <section className="mt-16 rounded-2xl bg-amber-50 px-6 py-8 sm:px-10">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-800">
            Simple Meeting Preparation
          </p>

          <h2 className="mt-3 font-serif text-2xl font-bold text-slate-900">
            Every part of the program, organized.
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            Review announcements, hymns, prayers, ward business, speakers,
            musical numbers, and other meeting details in one organized
            program.
          </p>
        </div>
      </section>
    </main>
  );
}