// src/app/(site)/about/page.tsx
import AboutHero from "@/components/about/AboutHero";
import AboutBio from "@/components/about/AboutBio";
import AboutWhatIDo from "@/components/about/AboutWhatIDo";
import AboutEducation from "@/components/about/AboutEducation";
import AboutPersonal from "@/components/about/AboutPersonal";

export default function AboutPage() {
  return (
    <main
      className="min-h-screen pb-14 md:pb-0"
      style={{ backgroundColor: "#0D1117" }}
    >
      <AboutHero />
      <AboutBio />
      <AboutWhatIDo />
      <AboutEducation />
      <AboutPersonal />
    </main>
  );
}
