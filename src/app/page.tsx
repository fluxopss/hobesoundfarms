import { Prologue } from "@/components/prologue";
import { AtlasChrome } from "@/components/atlas-chrome";
import { AcreageAtlas } from "@/components/acreage-atlas";
import { ArriveStrip } from "@/components/arrive-strip";
import { SiteFooter } from "@/components/site-footer";

export default function HomePage() {
  return (
    <>
      <Prologue />
      <AtlasChrome />
      <main>
        <AcreageAtlas />
        <ArriveStrip />
      </main>
      <SiteFooter />
    </>
  );
}
