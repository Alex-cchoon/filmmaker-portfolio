import type { Metadata } from "next";
import "./globals.css";

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

// Fonts are loaded straight from Google Fonts (see the <link> below);
// the CSS variables they feed are set in globals.css.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=IBM+Plex+Mono:wght@400;500&family=Inter:wght@400;500&display=swap"
        />
      </head>
      <body className="bg-ink text-cream font-sans antialiased">{children}</body>
    </html>
  );
}
