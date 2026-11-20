import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ong Chee Choon — Director / Producer",
  description:
    "Ong Chee Choon is a director and producer making documentaries, commercials and brand films — and shooting, editing and grading them himself.",
  openGraph: {
    title: "Ong Chee Choon — Director / Producer",
    description: "Documentaries, commercials and brand films. Directed, produced, shot, cut and graded.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${mono.variable} ${sans.variable}`}>
      <body className="bg-ink text-cream font-sans antialiased">{children}</body>
    </html>
  );
}
