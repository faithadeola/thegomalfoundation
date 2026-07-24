import type { Metadata } from "next";
import { GiveScreen } from "@features/give/screen/give-screen";

export const metadata: Metadata = {
  title: "Give",
  description:
    "Give to The GOMAL Foundation. Every gift carries forward the work that Baba and Mama began.",
  openGraph: {
    title: "The GOMAL Foundation",
    description:
      '"Nobody who came for help ever left the way they arrived." Carry the legacy of Baba and Mama GOMAL.',
  },
};

export default function GivePage() {
  return <GiveScreen />;
}
