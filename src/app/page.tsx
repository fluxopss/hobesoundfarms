import { Prologue } from "@/components/prologue";
import { AppShell } from "@/components/app-shell";
import { HubLanding } from "@/components/hub-landing";
import { AcreageAtlas } from "@/components/acreage-atlas";
import { ArriveStrip } from "@/components/arrive-strip";

export default function HomePage() {
  return (
    <>
      <Prologue />
      <AppShell>
        <main>
          <HubLanding />
          <AcreageAtlas />
          <ArriveStrip />
        </main>
      </AppShell>
    </>
  );
}
