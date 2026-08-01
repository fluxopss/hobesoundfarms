import type { Metadata } from "next";
import { Suspense } from "react";
import { AppShell } from "@/components/app-shell";
import { VisitOS } from "@/components/visit-os";

export const metadata: Metadata = {
  title: "Visit",
  description:
    "Plan your visit to Hobe Sound Farms — hours, directions, passes, and inquiries.",
};

export default async function VisitPage({
  searchParams,
}: {
  searchParams: Promise<{ experience?: string; intent?: string }>;
}) {
  const params = await searchParams;
  let defaultMessage = "";
  if (params.experience) {
    defaultMessage = `I'd like to inquire about: ${params.experience}`;
  } else if (params.intent === "vendor") {
    defaultMessage =
      "I'd like to apply as a vendor at the Hobe Sound Farmers Market.";
  }

  return (
    <AppShell>
      <main>
        <Suspense fallback={null}>
          <VisitOS defaultMessage={defaultMessage} />
        </Suspense>
      </main>
    </AppShell>
  );
}
