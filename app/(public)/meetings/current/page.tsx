import { redirect } from "next/navigation";
import { getMeetings } from "@/lib/meetings-db";

function getMostRecentSundayDate(): string {
  const dateParts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Manila",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  const year = Number(dateParts.find((part) => part.type === "year")?.value);
  const month = Number(dateParts.find((part) => part.type === "month")?.value);
  const day = Number(dateParts.find((part) => part.type === "day")?.value);

  const currentDate = new Date(Date.UTC(year, month - 1, day));
  currentDate.setUTCDate(currentDate.getUTCDate() - currentDate.getUTCDay());

  return [
    currentDate.getUTCFullYear(),
    String(currentDate.getUTCMonth() + 1).padStart(2, "0"),
    String(currentDate.getUTCDate()).padStart(2, "0"),
  ].join("-");
}

export default async function CurrentMeetingPage() {
  const sunday = getMostRecentSundayDate();
  const meetings = await getMeetings("", 1, sunday);

  if (meetings.length > 0) {
    redirect(`/meetings/${meetings[0].id}`);
  }

  redirect("/meetings");
}
