"use client";

import { useEffect, useState } from "react";
import { AtlasChrome } from "@/components/atlas-chrome";
import { SiteFooter } from "@/components/site-footer";
import { PageTransition } from "@/components/motion/page-transition";
import { site } from "@/lib/content";

function useOpenStatus() {
  const [status, setStatus] = useState(site.marketHours);
  useEffect(() => {
    const d = new Date();
    const day = d.getDay();
    const hour = d.getHours();
    if ((day === 6 || day === 0) && hour >= 9 && hour < 14) {
      setStatus("Market open now · until 2pm");
    } else if (day === 6 || day === 0) {
      setStatus(hour < 9 ? "Market opens today 9am" : "Market closed today");
    } else if (day >= 1 && day <= 5 && hour >= 9 && hour < 16) {
      setStatus("Farm Stand open · until 4pm");
    } else {
      setStatus(`Market ${site.marketHours}`);
    }
  }, []);
  return status;
}

export function AppShell({
  children,
  showStatus = true,
}: {
  children: React.ReactNode;
  showStatus?: boolean;
}) {
  const status = useOpenStatus();

  return (
    <>
      <AtlasChrome />
      {showStatus && (
        <div className="pointer-events-none fixed left-1/2 top-[4.25rem] z-40 hidden -translate-x-1/2 md:block">
          <p className="font-atlas pointer-events-auto rounded-full border border-shell/15 bg-soil/80 px-4 py-1.5 text-[9px] text-citrus backdrop-blur-md">
            {status}
          </p>
        </div>
      )}
      <PageTransition>
        <div className="pb-20 md:pb-0">{children}</div>
      </PageTransition>
      <SiteFooter />
    </>
  );
}
