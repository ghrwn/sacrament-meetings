import { neon } from "@neondatabase/serverless";
import type {
  Hymn,
  MeetingType,
  SacramentMeeting,
  SpeakerItem,
  WardBusinessItem,
} from "./types";

const ITEMS_PER_PAGE = 5;
type MeetingRow = Record<string, unknown>;

function getSql() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not configured. Add the Neon connection string to your environment.");
  }
  return neon(databaseUrl);
}

function mapMeeting(row: MeetingRow): SacramentMeeting {
  return {
    id: Number(row.id),
    date: String(row.date).slice(0, 10),
    meetingType: String(row.meetingType) as MeetingType,
    presiding: String(row.presiding ?? ""),
    conducting: String(row.conducting ?? ""),
    announcements: Array.isArray(row.announcements) ? row.announcements as string[] : [],
    openingHymn: row.openingHymn as Hymn,
    openingPrayer: String(row.openingPrayer ?? ""),
    wardBusiness: Array.isArray(row.wardBusiness) ? row.wardBusiness as WardBusinessItem[] : [],
    stakeBusiness: Boolean(row.stakeBusiness),
    sacramentHymn: row.sacramentHymn as Hymn,
    speakers: Array.isArray(row.speakers) ? row.speakers as SpeakerItem[] : [],
    closingHymn: row.closingHymn as Hymn,
    closingPrayer: String(row.closingPrayer ?? ""),
  };
}

export async function getMeetings(
  query: string = "",
  currentPage: number = 1,
  date?: string | null,
): Promise<SacramentMeeting[]> {
  const sql = getSql();
  const searchTerm = `%${query.trim()}%`;
  const safePage = Number.isInteger(currentPage) && currentPage > 0 ? currentPage : 1;
  const offset = (safePage - 1) * ITEMS_PER_PAGE;
  let rows: MeetingRow[];

  // Keep date filtering available for the Week 02 API route.
  if (date) {
    rows = await sql`
      SELECT id, to_char(date, 'YYYY-MM-DD') AS date,
        meeting_type AS "meetingType", presiding, conducting, announcements,
        opening_hymn AS "openingHymn", opening_prayer AS "openingPrayer",
        ward_business AS "wardBusiness", stake_business AS "stakeBusiness",
        sacrament_hymn AS "sacramentHymn", speakers,
        closing_hymn AS "closingHymn", closing_prayer AS "closingPrayer"
      FROM meetings WHERE date = ${date} ORDER BY date DESC
    ` as unknown as MeetingRow[];
  } else if (query.trim()) {
    rows = await sql`
      SELECT id, to_char(date, 'YYYY-MM-DD') AS date,
        meeting_type AS "meetingType", presiding, conducting, announcements,
        opening_hymn AS "openingHymn", opening_prayer AS "openingPrayer",
        ward_business AS "wardBusiness", stake_business AS "stakeBusiness",
        sacrament_hymn AS "sacramentHymn", speakers,
        closing_hymn AS "closingHymn", closing_prayer AS "closingPrayer"
      FROM meetings
      WHERE presiding ILIKE ${searchTerm}
        OR conducting ILIKE ${searchTerm}
        OR meeting_type ILIKE ${searchTerm}
        OR speakers::text ILIKE ${searchTerm}
      ORDER BY date DESC LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    ` as unknown as MeetingRow[];
  } else {
    rows = await sql`
      SELECT id, to_char(date, 'YYYY-MM-DD') AS date,
        meeting_type AS "meetingType", presiding, conducting, announcements,
        opening_hymn AS "openingHymn", opening_prayer AS "openingPrayer",
        ward_business AS "wardBusiness", stake_business AS "stakeBusiness",
        sacrament_hymn AS "sacramentHymn", speakers,
        closing_hymn AS "closingHymn", closing_prayer AS "closingPrayer"
      FROM meetings ORDER BY date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    ` as unknown as MeetingRow[];
  }

  return rows.map(mapMeeting);
}

export async function getMeetingsTotalPages(query: string = ""): Promise<number> {
  const sql = getSql();
  const searchEnabled = query.trim().length > 0;
  const searchTerm = `%${query.trim()}%`;
  const rows = await sql`
    SELECT COUNT(*) AS count FROM meetings
    WHERE ${searchEnabled} = FALSE
      OR presiding ILIKE ${searchTerm}
      OR conducting ILIKE ${searchTerm}
      OR meeting_type ILIKE ${searchTerm}
      OR speakers::text ILIKE ${searchTerm}
  `;
  return Math.max(1, Math.ceil(Number(rows[0]?.count ?? 0) / ITEMS_PER_PAGE));
}

export async function getMeetingById(id: number): Promise<SacramentMeeting | null> {
  const sql = getSql();
  const rows = await sql`
    SELECT id, to_char(date, 'YYYY-MM-DD') AS date,
      meeting_type AS "meetingType", presiding, conducting, announcements,
      opening_hymn AS "openingHymn", opening_prayer AS "openingPrayer",
      ward_business AS "wardBusiness", stake_business AS "stakeBusiness",
      sacrament_hymn AS "sacramentHymn", speakers,
      closing_hymn AS "closingHymn", closing_prayer AS "closingPrayer"
    FROM meetings WHERE id = ${id} LIMIT 1
  ` as unknown as MeetingRow[];

  return rows[0] ? mapMeeting(rows[0]) : null;
}

// Mutation functions remain as Week 04 stubs until meeting forms are implemented.
export async function addMeeting(data: Omit<SacramentMeeting, "id">): Promise<SacramentMeeting> {
  void data;
  throw new Error("addMeeting: database implementation coming in Week 04");
}

export async function updateMeeting(
  id: number,
  updates: Partial<SacramentMeeting>,
): Promise<SacramentMeeting | null> {
  void id;
  void updates;
  throw new Error("updateMeeting: database implementation coming in Week 04");
}

export async function deleteMeeting(id: number): Promise<boolean> {
  void id;
  throw new Error("deleteMeeting: database implementation coming in Week 04");
}
