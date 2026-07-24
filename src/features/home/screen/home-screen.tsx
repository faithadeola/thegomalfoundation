import { SiteNav } from "./parts/navigation/site-nav";
import { HeroSection } from "./parts/hero/hero-section";
import { WhoTheyWereSection } from "./parts/who-they-were/who-they-were-section";
import { FoundationSection } from "./parts/foundation/foundation-section";
import { ProgrammesSection } from "./parts/programmes/programmes-section";
import { MultiplicationWallSection } from "./parts/multiplication-wall/multiplication-wall-section";
import { GiveSection } from "./parts/give/give-section";
import { PartnershipSection } from "./parts/partnership/partnership-section";
import { SiteFooter } from "./parts/footer/site-footer";

// Image paths — drop portraits into /public/images/portraits/
// baba.jpg | mama.jpg | together.jpg
// Leave undefined to show placeholder treatment until photos are ready
const BABA_IMAGE = "/images/portraits/baba.jpg";
const MAMA_IMAGE = "/images/portraits/mama.jpg";
const TOGETHER_IMAGE = "/images/portraits/together.jpg";

export function HomeScreen() {
  return (
    <>
      <SiteNav />
      <main>
        <HeroSection
          babaImageSrc={BABA_IMAGE}
          mamaImageSrc={MAMA_IMAGE}
          togetherImageSrc={TOGETHER_IMAGE}
        />
        <WhoTheyWereSection />
        <FoundationSection />
        <ProgrammesSection />
        <MultiplicationWallSection />
        <GiveSection />
        <PartnershipSection />
      </main>
      <SiteFooter />
    </>
  );
}
