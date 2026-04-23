import type { Metadata } from "next";
import { JetBrains_Mono, Instrument_Sans } from "next/font/google";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "bos.network — Boston/Cambridge Startup Founders",
  description:
    "A curated directory of startup founders from Boston and Cambridge. MIT, Harvard, Northeastern, BU, Tufts, BC.",
  metadataBase: new URL("https://bos.network"),
  openGraph: {
    title: "bos.network",
    description: "Boston/Cambridge Startup Founders Directory",
    type: "website",
    siteName: "bos.network",
  },
  twitter: {
    card: "summary_large_image",
    title: "bos.network",
    description: "Boston/Cambridge Startup Founders Directory",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${instrumentSans.variable} ${jetbrainsMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
