import type { Metadata } from "next";
import { AcreageProvider } from "@/components/acreage-provider";
import "./globals.css";

const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "Hobe Sound Farms";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: {
    default: `${siteName} | Enter the Acreage`,
    template: `%s | ${siteName}`,
  },
  description:
    "A 126-acre working farm in Hobe Sound — farmers market, livestock, Gem Jungle, Bouquet Bunker, live music, and bookable experiences.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: siteName,
    description: "Enter the acreage.",
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
        <link
          rel="preconnect"
          href="https://api.fontshare.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@500,700,800&f[]=satoshi@400,500,700&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full bg-shell text-soil font-sans">
        <AcreageProvider>{children}</AcreageProvider>
      </body>
    </html>
  );
}
