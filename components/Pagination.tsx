"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Math.max(1, Number(searchParams.get("page")) || 1);

  function createPageURL(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    return `${pathname}?${params.toString()}`;
  }

  return (
    <nav aria-label="Pagination" className="mt-10 flex flex-wrap items-center justify-center gap-4">
      {currentPage > 1 ? (
        <Link href={createPageURL(currentPage - 1)} className="rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-700 hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-600">
          Previous
        </Link>
      ) : (
        <span aria-disabled="true" className="rounded-full border border-slate-200 bg-slate-100 px-5 py-2 text-sm font-semibold text-slate-400">
          Previous
        </span>
      )}

      <span className="text-sm font-medium text-slate-600" aria-live="polite">
        Page {Math.min(currentPage, totalPages)} of {totalPages}
      </span>

      {currentPage < totalPages ? (
        <Link href={createPageURL(currentPage + 1)} className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500">
          Next
        </Link>
      ) : (
        <span aria-disabled="true" className="rounded-full border border-slate-200 bg-slate-100 px-5 py-2 text-sm font-semibold text-slate-400">
          Next
        </span>
      )}
    </nav>
  );
}
