import { neon } from "@neondatabase/serverless";
import { z } from "zod";
import type { SacramentMeeting } from "./types";

const ITEMS_PER_PAGE = 5;
type MeetingData = Omit<SacramentMeeting, "id">;

const meetingTypeSchema = z.enum(["testimony", "regular", "stake", "general", "special"]);
const hymnSchema = z.object({
  number: z.number().int().positive(),
  title: z.string().min(1),
});
const speakerItemSchema = z.object({
  name: z.string().min(1).max(255),
  topic: z.string().min(1).max(500),
  type: z.enum(["speaker", "musical-number"]),
});
const wardBusinessItemSchema = z.object({
  description: z.string().min(1).max(5000),
});
const meetingRowSchema = z.object({
  id: z.number().int().positive(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine((value) => {
    const parsedDate = new Date(`${value}T00:00:00.000Z`);
    return !Number.isNaN(parsedDate.getTime()) && parsedDate.toISOString().slice(0, 10) === value;
  }),
  meetingType: meetingTypeSchema,
  presiding: z.string().min(1).max(255),
  conducting: z.string().min(1).max(255),
  announcements: z.array(z.string().max(5000)),
  openingHymn: hymnSchema,
  openingPrayer: z.string().min(1).max(255),
  wardBusiness: z.array(wardBusinessItemSchema),
  stakeBusiness: z.boolean(),
  sacramentHymn: hymnSchema,
  speakers: z.array(speakerItemSchema),
  closingHymn: hymnSchema,
  closingPrayer: z.string().min(1).max(255),
});

function getSql() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not configured. Add the Neon connection string to your environment.");
  }
  return neon(databaseUrl);
}

function mapMeeting(row: unknown): SacramentMeeting {
  const parsed = meetingRowSchema.safeParse(row);
  if (!parsed.success) {
    console.error("Meeting database row failed validation:", parsed.error.issues);
    throw new Error("The database returned an invalid meeting record.");
  }
  return parsed.data;
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
  let rows: unknown[];

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
    `;
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
    `;
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
    `;
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
  `;

  return rows[0] ? mapMeeting(rows[0]) : null;
}

export async function addMeeting(data: MeetingData): Promise<SacramentMeeting> {
  const sql = getSql();
  const rows = await sql`
    INSERT INTO meetings (
      date, meeting_type, presiding, conducting, announcements,
      opening_hymn, opening_prayer, ward_business, stake_business,
      sacrament_hymn, speakers, closing_hymn, closing_prayer
    ) VALUES (
      ${data.date}, ${data.meetingType}, ${data.presiding}, ${data.conducting},
      ARRAY(SELECT jsonb_array_elements_text(${JSON.stringify(data.announcements ?? [])}::jsonb)),
      ${JSON.stringify(data.openingHymn)}::jsonb, ${data.openingPrayer},
      ${JSON.stringify(data.wardBusiness)}::jsonb, ${data.stakeBusiness},
      ${JSON.stringify(data.sacramentHymn)}::jsonb, ${JSON.stringify(data.speakers)}::jsonb,
      ${JSON.stringify(data.closingHymn)}::jsonb, ${data.closingPrayer}
    )
    RETURNING id, to_char(date, 'YYYY-MM-DD') AS date,
      meeting_type AS "meetingType", presiding, conducting, announcements,
      opening_hymn AS "openingHymn", opening_prayer AS "openingPrayer",
      ward_business AS "wardBusiness", stake_business AS "stakeBusiness",
      sacrament_hymn AS "sacramentHymn", speakers,
      closing_hymn AS "closingHymn", closing_prayer AS "closingPrayer"
  `;

  if (!rows[0]) {
    throw new Error("The database did not return the created meeting.");
  }

  return mapMeeting(rows[0]);
}

export async function updateMeeting(
  id: number,
  data: MeetingData,
): Promise<SacramentMeeting | null> {
  const sql = getSql();
  const rows = await sql`
    UPDATE meetings SET
      date = ${data.date},
      meeting_type = ${data.meetingType},
      presiding = ${data.presiding},
      conducting = ${data.conducting},
      announcements = ARRAY(SELECT jsonb_array_elements_text(${JSON.stringify(data.announcements ?? [])}::jsonb)),
      opening_hymn = ${JSON.stringify(data.openingHymn)}::jsonb,
      opening_prayer = ${data.openingPrayer},
      ward_business = ${JSON.stringify(data.wardBusiness)}::jsonb,
      stake_business = ${data.stakeBusiness},
      sacrament_hymn = ${JSON.stringify(data.sacramentHymn)}::jsonb,
      speakers = ${JSON.stringify(data.speakers)}::jsonb,
      closing_hymn = ${JSON.stringify(data.closingHymn)}::jsonb,
      closing_prayer = ${data.closingPrayer}
    WHERE id = ${id}
    RETURNING id, to_char(date, 'YYYY-MM-DD') AS date,
      meeting_type AS "meetingType", presiding, conducting, announcements,
      opening_hymn AS "openingHymn", opening_prayer AS "openingPrayer",
      ward_business AS "wardBusiness", stake_business AS "stakeBusiness",
      sacrament_hymn AS "sacramentHymn", speakers,
      closing_hymn AS "closingHymn", closing_prayer AS "closingPrayer"
  `;

  return rows[0] ? mapMeeting(rows[0]) : null;
}

export async function deleteMeeting(id: number): Promise<boolean> {
  const sql = getSql();
  const rows = await sql`DELETE FROM meetings WHERE id = ${id} RETURNING id`;
  return rows.length > 0;
}
