"use client";

import MeetingRouteError from "@/components/MeetingRouteError";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <MeetingRouteError error={error} reset={reset} />;
}
