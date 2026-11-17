"use client";

import { useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export function MeetingSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const urlQuery = searchParams.get("query") ?? "";
  const [term, setTerm] = useState(urlQuery);

  // Keep the input synchronized when the user navigates with Back/Forward.
  useEffect(() => {
    setTerm(urlQuery);
  }, [urlQuery]);

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");

    if (value.trim()) {
      params.set("query", value.trim());
    } else {
      params.delete("query");
    }

    // Push a history entry so Back returns to the previous search.
    router.push(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <label className="block w-full">
      <span className="sr-only">Search meetings</span>
      <input
        type="search"
        placeholder="Search by speaker, presiding, conducting, or meeting type..."
        value={term}
        onChange={(event) => {
          const value = event.target.value;
          setTerm(value);
          handleSearch(value);
        }}
        aria-label="Search meetings"
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-amber-600 focus:ring-2 focus:ring-amber-100"
      />
    </label>
  );
}
