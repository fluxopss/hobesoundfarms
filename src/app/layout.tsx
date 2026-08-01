import type { Metadata } from "next";
import { TrailProvider } from "@/components/trail-provider";
import "./globals.css";

const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "Hobe Sound Farms";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: {
    default: `${siteName} | Open the Gate`,
    template: `%s | ${siteName}`,
  },
  description:
    "Walk 126 acres of real Florida — farmers market, livestock, Gem Jungle, Bouquet Bunker, live music, and celebrations in Hobe Sound.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: siteName,
    description: "Open the gate. Walk the acreage.",
    type: "website",
    url: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@500,600,700&f[]=satoshi@400,500,700&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full bg-bleach text-ink font-sans">
        <TrailProvider>{children}</TrailProvider>
      </body>
    </html>
  );
}
