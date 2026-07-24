export interface PartnershipFormData {
  readonly name: string;
  readonly email: string;
  readonly phone: string;
  readonly partnershipType: PartnershipType;
  readonly proposal: string;
}

export type PartnershipType =
  | "education"
  | "marriage-family"
  | "youth-mentorship"
  | "community-outreach"
  | "volunteering"
  | "financial"
  | "media-communications"
  | "other";

export const PARTNERSHIP_TYPE_LABELS: Record<PartnershipType, string> = {
  education: "Education & Scholarship",
  "marriage-family": "Marriage & Family",
  "youth-mentorship": "Youth Mentorship & Leadership",
  "community-outreach": "Community Outreach",
  volunteering: "Volunteering",
  financial: "Financial Partnership",
  "media-communications": "Media & Communications",
  other: "Other",
};
