export default function MeetingsLoading() {
  return (
    <section
      aria-busy="true"
      aria-label="Loading meeting programs"
      className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14"
    >
      <div className="animate-pulse">
        <div className="h-3 w-32 rounded bg-slate-200" />
        <div className="mt-4 h-9 w-72 max-w-full rounded bg-slate-200" />
        <div className="mt-4 h-4 w-full max-w-xl rounded bg-slate-200" />

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-slate-200 bg-white p-6"
            >
              <div className="h-5 w-28 rounded bg-slate-200" />
              <div className="mt-6 h-7 w-48 rounded bg-slate-200" />
              <div className="mt-4 h-4 w-full rounded bg-slate-200" />
              <div className="mt-3 h-4 w-3/4 rounded bg-slate-200" />
              <div className="mt-7 h-4 w-36 rounded bg-slate-200" />
            </div>
          ))}
        </div>
      </div>

      <p className="sr-only" role="status">
        Loading meeting programs...
      </p>
    </section>
  );
}