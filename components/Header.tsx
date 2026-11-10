import Link from "next/link";
import { Suspense } from "react";
import { connection } from "next/server";
import NavLinks from "@/components/NavLinks";

async function CurrentDate() {
  await connection();

  const today = new Intl.DateTimeFormat("en-PH", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "Asia/Manila",
  }).format(new Date());

  return <>{today}</>;
}

export default function Header() {
  return (
    <header className="site-header border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <Link href="/" className="inline-block">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
              Sunday Worship
            </p>

            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
              Sacrament Meeting Planner
            </h1>
          </Link>

          <p className="mt-1 text-sm text-slate-500">
            Lucban Ward ·{" "}
            <Suspense fallback={<span>Loading date...</span>}>
              <CurrentDate />
            </Suspense>
          </p>
        </div>

        <Suspense
          fallback={
            <div
              className="h-10 w-48 animate-pulse rounded-full bg-slate-100"
              aria-label="Loading navigation"
            />
          }
        >
          <NavLinks />
        </Suspense>
      </div>
    </header>
  );
}