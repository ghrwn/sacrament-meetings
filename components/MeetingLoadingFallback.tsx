export default function MeetingLoadingFallback() {
  return (
    <section
      aria-busy="true"
      aria-label="Loading meeting information"
      className="mx-auto max-w-3xl px-5 py-10 sm:px-8"
    >
      <div className="animate-pulse rounded-2xl border border-slate-200 bg-white p-8">
        <div className="mx-auto h-4 w-32 rounded bg-slate-200" />
        <div className="mx-auto mt-5 h-8 w-64 max-w-full rounded bg-slate-200" />
        <div className="mx-auto mt-3 h-4 w-48 rounded bg-slate-200" />

        <div className="mt-10 space-y-6">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item}>
              <div className="h-3 w-36 rounded bg-slate-200" />
              <div className="mt-3 h-5 w-3/4 rounded bg-slate-200" />
            </div>
          ))}
        </div>
      </div>

      <p className="sr-only" role="status">
        Loading meeting information...
      </p>
    </section>
  );
}