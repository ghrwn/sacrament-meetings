import { Suspense } from "react";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import MeetingLoadingFallback from "@/components/MeetingLoadingFallback";
import { getBaseUrl } from "@/lib/api-url";
import type { SacramentMeeting } from "@/lib/types";

function getMostRecentSundayDate(): string {
  const dateParts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Manila",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  const year = Number(
    dateParts.find((part) => part.type === "year")?.value,
  );
  const month = Number(
    dateParts.find((part) => part.type === "month")?.value,
  );
  const day = Number(
    dateParts.find((part) => part.type === "day")?.value,
  );

  const currentDate = new Date(Date.UTC(year, month - 1, day));
  const daysSinceSunday = currentDate.getUTCDay();

  currentDate.setUTCDate(currentDate.getUTCDate() - daysSinceSunday);

  return [
    currentDate.getUTCFullYear(),
    String(currentDate.getUTCMonth() + 1).padStart(2, "0"),
    String(currentDate.getUTCDate()).padStart(2, "0"),
  ].join("-");
}

async function CurrentMeetingRedirect(): Promise<ReactNode> {
  const baseUrl = await getBaseUrl();
  const sunday = getMostRecentSundayDate();

  const response = await fetch(
    `${baseUrl}/api/meetings?date=${encodeURIComponent(sunday)}`,
    { cache: "no-store" },
  );

  if (!response.ok) {
    throw new Error("Unable to find the current Sunday's meeting.");
  }

  const meetings: SacramentMeeting[] = await response.json();

  if (meetings.length > 0) {
    redirect(`/meetings/${meetings[0].id}`);
  }

  redirect("/meetings");

  return null;
}

export default function CurrentMeetingPage() {
  return (
    <Suspense fallback={<MeetingLoadingFallback />}>
      <CurrentMeetingRedirect />
    </Suspense>
  );
}