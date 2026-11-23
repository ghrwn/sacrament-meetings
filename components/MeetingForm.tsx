"use client";

import Link from "next/link";
import { useActionState } from "react";
import type { MeetingFormField, MeetingFormState } from "@/lib/actions";
import type { SacramentMeeting } from "@/lib/types";

interface MeetingFormProps {
  action: (previousState: MeetingFormState, formData: FormData) => Promise<MeetingFormState>;
  meeting?: SacramentMeeting;
}

const initialState: MeetingFormState = { message: "", errors: {} };
const inputClassName = "mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-200";
const labelClassName = "block text-sm font-semibold text-slate-800";

function FieldError({ field, errors }: { field: MeetingFormField; errors?: string[] }) {
  return (
    <p id={`${field}-error`} aria-live="polite" className="mt-1 min-h-5 text-sm text-red-700">
      {errors?.join(" ") ?? ""}
    </p>
  );
}

export default function MeetingForm({ action, meeting }: MeetingFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialState);
  const errors = state.errors ?? {};
  const value = (field: MeetingFormField) => errors[field];
  const fieldValue = (field: MeetingFormField, fallback: string) => state.values?.[field] ?? fallback;

  return (
    <form action={formAction} noValidate className="space-y-8">
      {state.message && (
        <p role="alert" aria-live="polite" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-800">
          {state.message}
        </p>
      )}

      <section className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="date" className={labelClassName}>Meeting date</label>
          <input id="date" name="date" type="date" required defaultValue={fieldValue("date", meeting?.date ?? "")} aria-invalid={Boolean(value("date")?.length)} aria-describedby="date-error" className={inputClassName} />
          <FieldError field="date" errors={value("date")} />
        </div>
        <div>
          <label htmlFor="meetingType" className={labelClassName}>Meeting type</label>
          <select id="meetingType" name="meetingType" required defaultValue={fieldValue("meetingType", meeting?.meetingType ?? "regular")} aria-invalid={Boolean(value("meetingType")?.length)} aria-describedby="meetingType-error" className={inputClassName}>
            <option value="regular">Regular</option>
            <option value="testimony">Testimony</option>
            <option value="stake">Stake</option>
            <option value="general">General</option>
            <option value="special">Special</option>
          </select>
          <FieldError field="meetingType" errors={value("meetingType")} />
        </div>
        <div>
          <label htmlFor="presiding" className={labelClassName}>Presiding leader</label>
          <input id="presiding" name="presiding" required maxLength={255} defaultValue={fieldValue("presiding", meeting?.presiding ?? "")} aria-invalid={Boolean(value("presiding")?.length)} aria-describedby="presiding-error" className={inputClassName} />
          <FieldError field="presiding" errors={value("presiding")} />
        </div>
        <div>
          <label htmlFor="conducting" className={labelClassName}>Conducting leader</label>
          <input id="conducting" name="conducting" required maxLength={255} defaultValue={fieldValue("conducting", meeting?.conducting ?? "")} aria-invalid={Boolean(value("conducting")?.length)} aria-describedby="conducting-error" className={inputClassName} />
          <FieldError field="conducting" errors={value("conducting")} />
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="font-serif text-xl font-bold text-slate-900">Opening of the meeting</h2>
        <div>
          <label htmlFor="announcements" className={labelClassName}>Announcements <span className="font-normal text-slate-500">(one per line)</span></label>
          <textarea id="announcements" name="announcements" rows={3} maxLength={5000} defaultValue={fieldValue("announcements", meeting?.announcements?.join("\n") ?? "")} aria-invalid={Boolean(value("announcements")?.length)} aria-describedby="announcements-error" className={inputClassName} />
          <FieldError field="announcements" errors={value("announcements")} />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="openingHymnNumber" className={labelClassName}>Opening hymn number</label>
            <input id="openingHymnNumber" name="openingHymnNumber" type="number" min="1" max="9999" required defaultValue={fieldValue("openingHymnNumber", String(meeting?.openingHymn.number ?? ""))} aria-invalid={Boolean(value("openingHymnNumber")?.length)} aria-describedby="openingHymnNumber-error" className={inputClassName} />
            <FieldError field="openingHymnNumber" errors={value("openingHymnNumber")} />
          </div>
          <div>
            <label htmlFor="openingHymnTitle" className={labelClassName}>Opening hymn title</label>
            <input id="openingHymnTitle" name="openingHymnTitle" required maxLength={255} defaultValue={fieldValue("openingHymnTitle", meeting?.openingHymn.title ?? "")} aria-invalid={Boolean(value("openingHymnTitle")?.length)} aria-describedby="openingHymnTitle-error" className={inputClassName} />
            <FieldError field="openingHymnTitle" errors={value("openingHymnTitle")} />
          </div>
        </div>
        <div>
          <label htmlFor="openingPrayer" className={labelClassName}>Opening prayer</label>
          <input id="openingPrayer" name="openingPrayer" required maxLength={255} defaultValue={fieldValue("openingPrayer", meeting?.openingPrayer ?? "")} aria-invalid={Boolean(value("openingPrayer")?.length)} aria-describedby="openingPrayer-error" className={inputClassName} />
          <FieldError field="openingPrayer" errors={value("openingPrayer")} />
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="font-serif text-xl font-bold text-slate-900">Ward and stake business</h2>
        <div>
          <label htmlFor="wardBusiness" className={labelClassName}>Ward business <span className="font-normal text-slate-500">(one item per line)</span></label>
          <textarea id="wardBusiness" name="wardBusiness" rows={3} maxLength={5000} defaultValue={fieldValue("wardBusiness", meeting?.wardBusiness.map((item) => item.description).join("\n") ?? "")} aria-invalid={Boolean(value("wardBusiness")?.length)} aria-describedby="wardBusiness-error" className={inputClassName} />
          <FieldError field="wardBusiness" errors={value("wardBusiness")} />
        </div>
        <div>
          <label className="flex items-center gap-3 text-sm font-medium text-slate-800" htmlFor="stakeBusiness">
            <input id="stakeBusiness" name="stakeBusiness" type="checkbox" aria-invalid={Boolean(value("stakeBusiness")?.length)} defaultChecked={state.values?.stakeBusiness !== undefined ? state.values.stakeBusiness === "on" : (meeting?.stakeBusiness ?? false)} aria-describedby="stakeBusiness-error" className="h-4 w-4 rounded border-slate-300 text-amber-700 focus:ring-amber-600" />
            Stake business will be conducted
          </label>
          <FieldError field="stakeBusiness" errors={value("stakeBusiness")} />
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="font-serif text-xl font-bold text-slate-900">Sacrament and speakers</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="sacramentHymnNumber" className={labelClassName}>Sacrament hymn number</label>
            <input id="sacramentHymnNumber" name="sacramentHymnNumber" type="number" min="1" max="9999" required defaultValue={fieldValue("sacramentHymnNumber", String(meeting?.sacramentHymn.number ?? ""))} aria-invalid={Boolean(value("sacramentHymnNumber")?.length)} aria-describedby="sacramentHymnNumber-error" className={inputClassName} />
            <FieldError field="sacramentHymnNumber" errors={value("sacramentHymnNumber")} />
          </div>
          <div>
            <label htmlFor="sacramentHymnTitle" className={labelClassName}>Sacrament hymn title</label>
            <input id="sacramentHymnTitle" name="sacramentHymnTitle" required maxLength={255} defaultValue={fieldValue("sacramentHymnTitle", meeting?.sacramentHymn.title ?? "")} aria-invalid={Boolean(value("sacramentHymnTitle")?.length)} aria-describedby="sacramentHymnTitle-error" className={inputClassName} />
            <FieldError field="sacramentHymnTitle" errors={value("sacramentHymnTitle")} />
          </div>
        </div>
        <div>
          <label htmlFor="speakers" className={labelClassName}>Speakers and musical numbers</label>
          <p id="speakers-hint" className="mt-1 text-xs text-slate-500">One per line, using: Name | Topic | speaker or Name | Topic | musical-number</p>
          <textarea id="speakers" name="speakers" rows={4} maxLength={5000} defaultValue={fieldValue("speakers", meeting?.speakers.map((item) => `${item.name} | ${item.topic} | ${item.type}`).join("\n") ?? "")} aria-invalid={Boolean(value("speakers")?.length)} aria-describedby="speakers-hint speakers-error" className={inputClassName} />
          <FieldError field="speakers" errors={value("speakers")} />
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="font-serif text-xl font-bold text-slate-900">Closing of the meeting</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="closingHymnNumber" className={labelClassName}>Closing hymn number</label>
            <input id="closingHymnNumber" name="closingHymnNumber" type="number" min="1" max="9999" required defaultValue={fieldValue("closingHymnNumber", String(meeting?.closingHymn.number ?? ""))} aria-invalid={Boolean(value("closingHymnNumber")?.length)} aria-describedby="closingHymnNumber-error" className={inputClassName} />
            <FieldError field="closingHymnNumber" errors={value("closingHymnNumber")} />
          </div>
          <div>
            <label htmlFor="closingHymnTitle" className={labelClassName}>Closing hymn title</label>
            <input id="closingHymnTitle" name="closingHymnTitle" required maxLength={255} defaultValue={fieldValue("closingHymnTitle", meeting?.closingHymn.title ?? "")} aria-invalid={Boolean(value("closingHymnTitle")?.length)} aria-describedby="closingHymnTitle-error" className={inputClassName} />
            <FieldError field="closingHymnTitle" errors={value("closingHymnTitle")} />
          </div>
        </div>
        <div>
          <label htmlFor="closingPrayer" className={labelClassName}>Closing prayer</label>
          <input id="closingPrayer" name="closingPrayer" required maxLength={255} defaultValue={fieldValue("closingPrayer", meeting?.closingPrayer ?? "")} aria-invalid={Boolean(value("closingPrayer")?.length)} aria-describedby="closingPrayer-error" className={inputClassName} />
          <FieldError field="closingPrayer" errors={value("closingPrayer")} />
        </div>
      </section>

      <div className="flex flex-wrap items-center gap-3 border-t border-slate-200 pt-6">
        <button type="submit" disabled={isPending} className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60">
          {isPending ? "Saving meeting..." : meeting ? "Save changes" : "Create meeting"}
        </button>
        <Link href="/meetings" className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
          Cancel
        </Link>
      </div>
    </form>
  );
}
