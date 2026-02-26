import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${jetbrainsMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
