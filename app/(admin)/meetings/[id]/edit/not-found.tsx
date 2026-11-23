import Link from "next/link";

export default function MeetingEditNotFound() {
  return (
    <section className="mx-auto max-w-2xl px-5 py-16 text-center sm:px-8">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-800">404 · Meeting not found</p>
      <h1 className="mt-3 font-serif text-3xl font-bold text-slate-900">This meeting program doesn&apos;t exist.</h1>
      <p className="mt-3 text-sm leading-7 text-slate-600">The meeting may have been removed, or the link may contain an invalid meeting ID.</p>
      <Link href="/meetings" className="mt-7 inline-flex rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2">Back to Meetings</Link>
    </section>
  );
}
