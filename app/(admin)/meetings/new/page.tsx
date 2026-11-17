import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Meeting",
};

export default function NewMeetingPage() {
  return (
    <section className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 sm:p-12">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-800">
        Administration
      </p>
      <h2 className="mt-3 font-serif text-2xl font-bold text-slate-900">
        Create Meeting — Coming in Week 04
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
        The administration route is in place. Meeting creation forms and
        database mutations will be added in Week 04.
      </p>
    </section>
  );
}
