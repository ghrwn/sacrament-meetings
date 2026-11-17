import { getMeetings } from "@/lib/meetings-db";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const date = url.searchParams.get("date");
  const query = url.searchParams.get("query") ?? "";
  const requestedPage = Number(url.searchParams.get("page") ?? "1");
  const currentPage = Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;

  const meetings = await getMeetings(query, currentPage, date);
  return Response.json(meetings);
}
