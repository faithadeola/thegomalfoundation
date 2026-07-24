import type { Metadata } from "next";
import { PartnershipScreen } from "@features/partnership/screen/partnership-screen";

export const metadata: Metadata = {
  title: "Partner with us",
  description:
    "Apply to partner with The GOMAL Foundation. We are looking for schools, counselling practices, churches, businesses and media organisations committed to the same work.",
};

export default function PartnershipPage() {
  return <PartnershipScreen />;
}
