"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import type { SacramentMeeting, SpeakerItem, WardBusinessItem } from "@/lib/types";
import {
  addMeeting as insertMeeting,
  updateMeeting as updateMeetingRecord,
  deleteMeeting as deleteMeetingRecord,
} from "@/lib/meetings-db";

export type MeetingFormField =
  | "date"
  | "meetingType"
  | "presiding"
  | "conducting"
  | "announcements"
  | "openingHymnNumber"
  | "openingHymnTitle"
  | "openingPrayer"
  | "wardBusiness"
  | "stakeBusiness"
  | "sacramentHymnNumber"
  | "sacramentHymnTitle"
  | "speakers"
  | "closingHymnNumber"
  | "closingHymnTitle"
  | "closingPrayer";

export type MeetingFormState = {
  message: string;
  errors?: Partial<Record<MeetingFormField, string[]>>;
  values?: Partial<Record<MeetingFormField, string>>;
};

const dateSchema = z.string().refine((value) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsedDate = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(parsedDate.getTime()) && parsedDate.toISOString().slice(0, 10) === value;
}, "Enter a valid meeting date.");

const announcementsSchema = z.string().max(5000, "Announcements must be 5,000 characters or fewer.").transform((value) =>
  value.split(/\r?\n/).map((item) => item.trim()).filter(Boolean),
);

const wardBusinessSchema = z.string().max(5000, "Ward business must be 5,000 characters or fewer.").transform((value) =>
  value.split(/\r?\n/).map((description) => description.trim()).filter(Boolean).map((description): WardBusinessItem => ({ description })),
);

const speakersSchema = z.string().max(5000, "Speakers must be 5,000 characters or fewer.").transform((value, context) => {
  const items: SpeakerItem[] = [];
  const lines = value.split(/\r?\n/);

  lines.forEach((rawLine, index) => {
    const line = rawLine.trim();
    if (!line) return;

    const parts = line.split("|").map((part) => part.trim());
    if (parts.length !== 3) {
      context.addIssue({
        code: "custom",
        message: `Line ${index + 1}: use exactly Name | Topic | speaker or Name | Topic | musical-number.`,
      });
      return;
    }

    const [name, topic, type] = parts;
    let valid = true;
    const speakerType = type === "speaker" || type === "musical-number" ? type : null;

    if (!name) {
      context.addIssue({ code: "custom", message: `Line ${index + 1}: enter a speaker or musical-number name.` });
      valid = false;
    } else if (name.length > 255) {
      context.addIssue({ code: "custom", message: `Line ${index + 1}: names must be 255 characters or fewer.` });
      valid = false;
    }

    if (!topic) {
      context.addIssue({ code: "custom", message: `Line ${index + 1}: enter a topic.` });
      valid = false;
    } else if (topic.length > 500) {
      context.addIssue({ code: "custom", message: `Line ${index + 1}: topics must be 500 characters or fewer.` });
      valid = false;
    }

    if (speakerType === null) {
      context.addIssue({ code: "custom", message: `Line ${index + 1}: type must be speaker or musical-number.` });
      valid = false;
    }

    if (!valid || speakerType === null) return;
    items.push({ name, topic, type: speakerType });
  });

  return items;
});

const MeetingFormSchema = z.object({
  date: dateSchema,
  meetingType: z.enum(["testimony", "regular", "stake", "general", "special"]),
  presiding: z.string().trim().min(2, "Enter the presiding leader's name.").max(255),
  conducting: z.string().trim().min(2, "Enter the conducting leader's name.").max(255),
  announcements: announcementsSchema,
  openingHymnNumber: z.coerce.number().int().min(1, "Enter a valid opening hymn number.").max(9999),
  openingHymnTitle: z.string().trim().min(2, "Enter the opening hymn title.").max(255),
  openingPrayer: z.string().trim().min(2, "Enter the opening prayer assignment.").max(255),
  wardBusiness: wardBusinessSchema,
  stakeBusiness: z.boolean(),
  sacramentHymnNumber: z.coerce.number().int().min(1, "Enter a valid sacrament hymn number.").max(9999),
  sacramentHymnTitle: z.string().trim().min(2, "Enter the sacrament hymn title.").max(255),
  speakers: speakersSchema,
  closingHymnNumber: z.coerce.number().int().min(1, "Enter a valid closing hymn number.").max(9999),
  closingHymnTitle: z.string().trim().min(2, "Enter the closing hymn title.").max(255),
  closingPrayer: z.string().trim().min(2, "Enter the closing prayer assignment.").max(255),
});

function getRawFormValues(formData: FormData) {
  return {
    date: formData.get("date"),
    meetingType: formData.get("meetingType"),
    presiding: formData.get("presiding"),
    conducting: formData.get("conducting"),
    announcements: formData.get("announcements"),
    openingHymnNumber: formData.get("openingHymnNumber"),
    openingHymnTitle: formData.get("openingHymnTitle"),
    openingPrayer: formData.get("openingPrayer"),
    wardBusiness: formData.get("wardBusiness"),
    stakeBusiness: formData.get("stakeBusiness") === "on",
    sacramentHymnNumber: formData.get("sacramentHymnNumber"),
    sacramentHymnTitle: formData.get("sacramentHymnTitle"),
    speakers: formData.get("speakers"),
    closingHymnNumber: formData.get("closingHymnNumber"),
    closingHymnTitle: formData.get("closingHymnTitle"),
    closingPrayer: formData.get("closingPrayer"),
  };
}

function toMeetingData(data: z.output<typeof MeetingFormSchema>): Omit<SacramentMeeting, "id"> {
  return {
    date: data.date,
    meetingType: data.meetingType,
    presiding: data.presiding,
    conducting: data.conducting,
    announcements: data.announcements,
    openingHymn: { number: data.openingHymnNumber, title: data.openingHymnTitle },
    openingPrayer: data.openingPrayer,
    wardBusiness: data.wardBusiness,
    stakeBusiness: data.stakeBusiness,
    sacramentHymn: { number: data.sacramentHymnNumber, title: data.sacramentHymnTitle },
    speakers: data.speakers,
    closingHymn: { number: data.closingHymnNumber, title: data.closingHymnTitle },
    closingPrayer: data.closingPrayer,
  };
}

function validationFailure(
  error: z.ZodError,
  rawValues: ReturnType<typeof getRawFormValues>,
): MeetingFormState {
  return {
    message: "Please correct the highlighted fields and submit the form again.",
    errors: error.flatten().fieldErrors as MeetingFormState["errors"],
    values: preserveFormValues(rawValues),
  };
}

function preserveFormValues(
  rawValues: ReturnType<typeof getRawFormValues>,
): MeetingFormState["values"] {
  return Object.fromEntries(
    Object.entries(rawValues).map(([field, value]) => [
      field,
      typeof value === "boolean" ? (value ? "on" : "") : String(value ?? ""),
    ]),
  ) as Partial<Record<MeetingFormField, string>>;
}

function isMeetingDateUniqueViolation(error: unknown): boolean {
  if (typeof error !== "object" || error === null) return false;
  const databaseError = error as { code?: unknown; constraint?: unknown };
  return databaseError.code === "23505" && databaseError.constraint === "meetings_date_key";
}

function duplicateMeetingDateFailure(
  rawValues: ReturnType<typeof getRawFormValues>,
): MeetingFormState {
  return {
    message: "A meeting is already scheduled for this date.",
    errors: { date: ["Choose a date that does not already have a meeting."] },
    values: preserveFormValues(rawValues),
  };
}

export async function createMeeting(
  _previousState: MeetingFormState,
  formData: FormData,
): Promise<MeetingFormState> {
  const rawValues = getRawFormValues(formData);
  const parsed = MeetingFormSchema.safeParse(rawValues);
  if (!parsed.success) return validationFailure(parsed.error, rawValues);

  try {
    await insertMeeting(toMeetingData(parsed.data));
  } catch (error) {
    if (isMeetingDateUniqueViolation(error)) {
      return duplicateMeetingDateFailure(rawValues);
    }
    console.error("createMeeting database operation failed:", error);
    throw new Error("We couldn't create the meeting because of a server error. Please try again.");
  }

  revalidatePath("/");
  revalidatePath("/meetings");
  redirect("/meetings");
}

export async function updateMeeting(
  id: number,
  _previousState: MeetingFormState,
  formData: FormData,
): Promise<MeetingFormState> {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("The meeting ID is invalid. Return to the meetings list and try again.");
  }

  const rawValues = getRawFormValues(formData);
  const parsed = MeetingFormSchema.safeParse(rawValues);
  if (!parsed.success) return validationFailure(parsed.error, rawValues);

  let updatedMeeting: SacramentMeeting | null;
  try {
    updatedMeeting = await updateMeetingRecord(id, toMeetingData(parsed.data));
  } catch (error) {
    if (isMeetingDateUniqueViolation(error)) {
      return duplicateMeetingDateFailure(rawValues);
    }
    console.error("updateMeeting database operation failed:", error);
    throw new Error("We couldn't update this meeting because of a server error. Please try again.");
  }

  if (!updatedMeeting) {
    throw new Error("This meeting could not be found. It may have been deleted already.");
  }

  revalidatePath("/");
  revalidatePath("/meetings");
  revalidatePath(`/meetings/${id}`);
  redirect("/meetings");
}

export async function deleteMeeting(formData: FormData): Promise<void> {
  const id = Number(formData.get("id"));
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("The meeting ID is invalid. Refresh the page and try again.");
  }

  let deleted: boolean;
  try {
    deleted = await deleteMeetingRecord(id);
  } catch (error) {
    console.error("deleteMeeting database operation failed:", error);
    throw new Error("We couldn't delete this meeting. Please try again.");
  }

  if (!deleted) {
    throw new Error("This meeting no longer exists. Refresh the meetings list.");
  }

  revalidatePath("/");
  revalidatePath("/meetings");
  redirect("/meetings");
}
