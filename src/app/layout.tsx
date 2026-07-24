import type { Metadata } from "next";
import "./globals.css";
import { AppProviders } from "@shared/services/app-providers";

export const metadata: Metadata = {
  title: {
    default: "The GOMAL Foundation",
    template: "%s | The GOMAL Foundation",
  },
  description:
    "In loving memory and living legacy of Baba and Mama GOMAL. Twenty-five years. Thousands of students. A home always open. A marriage that became a ministry.",
  keywords: [
    "GOMAL Foundation",
    "Gabriel Oyegbola Lasehinde",
    "Margaret Adepegba Lasehinde",
    "Baba GOMAL",
    "Mama GOMAL",
    "GOMAL Baptist College",
    "Ogbomoso",
    "Nigeria",
    "memorial",
    "foundation",
  ],
  openGraph: {
    type: "website",
    siteName: "The GOMAL Foundation",
    title: "The GOMAL Foundation",
    description:
      "Nobody who came for help ever left the way they arrived. A register that never closed.",
  },
  twitter: {
    card: "summary_large_image",
  },
};

interface RootLayoutProps {
  readonly children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full antialiased">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
