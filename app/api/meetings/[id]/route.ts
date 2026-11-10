import { getMeetingById } from "@/lib/meetings-db";

interface MeetingRouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(
  _request: Request,
  context: MeetingRouteContext,
) {
  const { id: idParameter } = await context.params;
  const id = Number(idParameter);

  if (!Number.isInteger(id) || id <= 0) {
    return Response.json(
      { error: "Meeting ID must be a positive integer." },
      { status: 400 },
    );
  }

  const meeting = getMeetingById(id);

  if (!meeting) {
    return Response.json(
      { error: "Meeting not found." },
      { status: 404 },
    );
  }

  return Response.json(meeting);
}