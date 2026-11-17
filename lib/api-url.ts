import { headers } from "next/headers";

export async function getBaseUrl(): Promise<string> {
  const headersList = await headers();
  const host =
    headersList.get("x-forwarded-host") ?? headersList.get("host");

  if (!host) {
    throw new Error("Unable to determine the application host.");
  }

  const forwardedProtocol = headersList.get("x-forwarded-proto");
  const protocol =
    forwardedProtocol?.split(",")[0] ??
    (host.includes("localhost") ? "http" : "https");

  return `${protocol}://${host}`;
}