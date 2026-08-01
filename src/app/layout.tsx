import type { Metadata } from "next";
import "./globals.css";

const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "Hobe Sound Farms";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: {
    default: `${siteName} | 126 Acres of Real Florida`,
    template: `%s | ${siteName}`,
  },
  description:
    "South Florida’s premier farm destination — weekend farmers market, animal encounters, events, weddings, and Farm After Dark in Hobe Sound, FL.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: siteName,
    description:
      "126 acres of working farmland — market, animals, music, and celebrations.",
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
          href="https://api.fontshare.com/v2/css?f[]=gambarino@400&f[]=satoshi@400,500,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-full flex-col bg-bg text-ink font-sans">{children}</body>
    </html>
  );
}
