import type { SacramentMeeting } from "./types";

const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: "2026-11-08",
    meetingType: "regular",
    presiding: "Bishop Daniel Santos",
    conducting: "Brother Michael Reyes",
    announcements: [
      "Ward temple day will be held next Saturday.",
      "Youth activity is scheduled for Wednesday evening.",
    ],
    openingHymn: {
      number: 2,
      title: "The Spirit of God",
    },
    openingPrayer: "Sister Maria Cruz",
    wardBusiness: [
      {
        description: "Sustaining of the new Primary presidency.",
      },
    ],
    stakeBusiness: false,
    sacramentHymn: {
      number: 193,
      title: "I Stand All Amazed",
    },
    speakers: [
      {
        name: "Brother Joseph Garcia",
        topic: "Strengthening Our Faith in Jesus Christ",
        type: "speaker",
      },
      {
        name: "Sister Angela Ramos",
        topic: "Finding Peace Through the Holy Ghost",
        type: "speaker",
      },
    ],
    closingHymn: {
      number: 85,
      title: "How Firm a Foundation",
    },
    closingPrayer: "Brother David Lim",
  },
  {
    id: 2,
    date: "2026-11-01",
    meetingType: "testimony",
    presiding: "Bishop Daniel Santos",
    conducting: "Brother Michael Reyes",
    announcements: ["Please support the upcoming ward service activity."],
    openingHymn: {
      number: 100,
      title: "Nearer, My God, to Thee",
    },
    openingPrayer: "Brother Peter Mendoza",
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: {
      number: 193,
      title: "I Stand All Amazed",
    },
    speakers: [
      {
        name: "Ward Members",
        topic: "Personal Testimonies",
        type: "speaker",
      },
    ],
    closingHymn: {
      number: 98,
      title: "I Need Thee Every Hour",
    },
    closingPrayer: "Sister Elena Torres",
  },
  {
    id: 3,
    date: "2026-10-25",
    meetingType: "regular",
    presiding: "Bishop Daniel Santos",
    conducting: "Brother Michael Reyes",
    announcements: ["The annual ward Christmas preparation will begin soon."],
    openingHymn: {
      number: 19,
      title: "We Thank Thee, O God, for a Prophet",
    },
    openingPrayer: "Sister Rebecca Flores",
    wardBusiness: [
      {
        description: "Sustaining of ward auxiliary leaders.",
      },
    ],
    stakeBusiness: true,
    sacramentHymn: {
      number: 169,
      title: "As Now We Take the Sacrament",
    },
    speakers: [
      {
        name: "Sister Grace Villanueva",
        topic: "Remembering the Savior",
        type: "speaker",
      },
      {
        name: "Ward Choir",
        topic: "A Musical Message of Faith",
        type: "musical-number",
      },
    ],
    closingHymn: {
      number: 116,
      title: "Come, Follow Me",
    },
    closingPrayer: "Brother Mark Bautista",
  },
  {
    id: 4,
    date: "2026-10-18",
    meetingType: "stake",
    presiding: "Stake President Robert Garcia",
    conducting: "Brother Thomas Lee",
    announcements: ["Stake leadership training follows the meeting."],
    openingHymn: {
      number: 2,
      title: "The Spirit of God",
    },
    openingPrayer: "Brother John Perez",
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: {
      number: 193,
      title: "I Stand All Amazed",
    },
    speakers: [
      {
        name: "Stake President Robert Garcia",
        topic: "Strengthening Our Stakes of Zion",
        type: "speaker",
      },
      {
        name: "Stake Young Men",
        topic: "Musical Number",
        type: "musical-number",
      },
    ],
    closingHymn: {
      number: 100,
      title: "Nearer, My God, to Thee",
    },
    closingPrayer: "Sister Hannah White",
  },
  {
    id: 5,
    date: "2026-10-11",
    meetingType: "general",
    presiding: "Elder Samuel Johnson",
    conducting: "Brother Thomas Lee",
    announcements: ["Welcome to today's special conference meeting."],
    openingHymn: {
      number: 19,
      title: "We Thank Thee, O God, for a Prophet",
    },
    openingPrayer: "Sister Elizabeth Moore",
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: {
      number: 169,
      title: "As Now We Take the Sacrament",
    },
    speakers: [
      {
        name: "Elder Samuel Johnson",
        topic: "Discipleship and Service",
        type: "speaker",
      },
      {
        name: "Church Choir",
        topic: "Musical Number",
        type: "musical-number",
      },
    ],
    closingHymn: {
      number: 85,
      title: "How Firm a Foundation",
    },
    closingPrayer: "Brother Matthew Clark",
  },
];

export function getMeetings(date?: string | null): SacramentMeeting[] {
  if (date) {
    return meetings.filter((meeting) => meeting.date === date);
  }

  return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | null {
  return meetings.find((meeting) => meeting.id === id) ?? null;
}