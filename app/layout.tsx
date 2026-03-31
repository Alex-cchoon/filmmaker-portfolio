import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter-tight",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ong Chee Choon — Filmmaker",
  description:
    "Freelance filmmaker and cinematographer. Commercial, wedding, documentary and narrative work.",
  openGraph: {
    title: "Ong Chee Choon — Filmmaker",
    description: "Freelance filmmaker and cinematographer.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={interTight.variable}>
      <body className="bg-background text-foreground font-sans antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
