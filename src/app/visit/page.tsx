import type { Metadata } from "next";
import { AtlasChrome } from "@/components/atlas-chrome";
import { VisitOS } from "@/components/visit-os";
import { SiteFooter } from "@/components/site-footer";
import { PageTransition } from "@/components/motion/page-transition";

export const metadata: Metadata = {
  title: "Visit",
  description:
    "Plan your visit to Hobe Sound Farms — hours, directions, passes, and inquiries.",
};

export default async function VisitPage({
  searchParams,
}: {
  searchParams: Promise<{ experience?: string }>;
}) {
  const params = await searchParams;
  const experience = params.experience
    ? `I'd like to inquire about: ${params.experience}`
    : "";

  return (
    <>
      <AtlasChrome />
      <PageTransition>
        <main className="pb-20 md:pb-0">
          <VisitOS defaultMessage={experience} />
        </main>
      </PageTransition>
      <SiteFooter />
    </>
  );
}
