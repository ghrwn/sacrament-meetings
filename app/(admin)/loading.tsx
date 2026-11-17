export default function AdminLoading() {
  return (
    <section
      aria-busy="true"
      aria-label="Loading administration workspace"
      className="mx-auto max-w-7xl px-5 py-10 sm:px-8"
    >
      <div className="animate-pulse rounded-2xl border border-slate-200 bg-white p-8">
        <div className="h-3 w-28 rounded bg-slate-200" />
        <div className="mt-4 h-8 w-64 max-w-full rounded bg-slate-200" />
        <div className="mt-8 h-24 w-full rounded-xl bg-slate-100" />
      </div>
      <p className="sr-only" role="status">
        Loading administration workspace...
      </p>
    </section>
  );
}
