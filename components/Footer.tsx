export default function Footer() {
  return (
    <footer className="site-footer mt-auto border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-center sm:px-8 md:flex-row md:items-center md:justify-between md:text-left">
        <p className="text-sm font-semibold text-slate-700">
          Sacrament Meeting Planner
        </p>

        <p className="text-xs text-slate-500">
          A simple tool for organizing and reviewing Sunday meeting programs.
        </p>
      </div>
    </footer>
  );
}