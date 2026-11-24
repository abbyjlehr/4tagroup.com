import Image from "next/image";
import { SectionWrapper, ImageReveal } from "@/components/ui";
import { CompanyProfile, FounderBio, PageHero } from "@/components/sections";
import { ABOUT_PAGE, IMAGES } from "@/lib/constants";
import { aboutMetadata } from "@/lib/metadata";

export const metadata = aboutMetadata;

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About The Fortier Group"
        headline={ABOUT_PAGE.headline}
        subheadline={ABOUT_PAGE.subheadline}
        image={IMAGES.biplane}
        imageAlt="Passenger jet on approach over the mountains"
      />

      {/* Intro text + image mosaic */}
      <SectionWrapper className="py-10 sm:py-14 md:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-center">
            <div>
              <p className="text-xl font-semibold text-navy leading-snug mb-6">{ABOUT_PAGE.intro}</p>
              <p className="text-base text-gray-500 leading-relaxed">{ABOUT_PAGE.body}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100">
                <ImageReveal delay={0.10}><Image src={IMAGES.controlTower} alt="Air traffic control tower" fill className="object-cover" sizes="25vw" /></ImageReveal>
              </div>
              <div className="flex flex-col gap-3 pt-8">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
                  <ImageReveal delay={0.25}><Image src={IMAGES.airplane} alt="Commercial aircraft" fill className="object-cover" sizes="25vw" /></ImageReveal>
                </div>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
                  <ImageReveal delay={0.40}><Image src={IMAGES.cockpit} alt="Aircraft cockpit" fill className="object-cover" sizes="25vw" /></ImageReveal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <FounderBio />
      <CompanyProfile />
    </>
  );
}
