"use client";

import { useFormStatus } from "react-dom";
import { deleteMeeting } from "@/lib/actions";

function DeleteButton({ date }: { date: string }) {
  const { pending } = useFormStatus();

  return (
    <>
      <button
        type="submit"
        disabled={pending}
        aria-label={`${pending ? "Deleting" : "Delete"} meeting dated ${date}`}
        className="rounded-full border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Deleting..." : "Delete"}
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {pending ? `Deleting meeting dated ${date}.` : ""}
      </span>
    </>
  );
}

export default function DeleteMeetingForm({ id, date }: { id: number; date: string }) {
  return (
    <form action={deleteMeeting} className="ml-auto">
      <input type="hidden" name="id" value={id} />
      <DeleteButton date={date} />
    </form>
  );
}
