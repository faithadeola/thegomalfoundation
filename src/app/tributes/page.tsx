import type { Metadata } from "next";
import { TributesScreen } from "@features/tributes/screen/tributes-screen";

export const metadata: Metadata = {
  title: "Tributes — 1,247 lives, and counting",
  description:
    "Every tribute on this wall is a life that Baba and Mama changed. Read their stories, and add yours.",
};

export default function TributesPage() {
  return <TributesScreen />;
}
