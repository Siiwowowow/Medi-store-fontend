import { Metadata } from "next";
import AboutHero from "./_components/AboutHero";
import MissionVision from "./_components/MissionVision";
import ImpactNumbers from "./_components/ImpactNumbers";
import Timeline from "./_components/Timeline";
import Values from "./_components/Values";
import Team from "./_components/Team";
import CTABanner from "./_components/CTABanner";


export const metadata: Metadata = {
  title: "About MediStore | Trusted Online Pharmacy in Bangladesh",
  description: "Learn about MediStore's mission to make healthcare accessible for every Bangladeshi. 10,000+ medicines, 500+ verified sellers, 50,000+ satisfied customers.",
};

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <MissionVision />
      <ImpactNumbers />
      <Timeline />
      <Values />
      <Team />
      <CTABanner />
    </main>
  );
}