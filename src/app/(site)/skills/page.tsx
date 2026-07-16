// src/app/(site)/skills/page.tsx
import SkillsHero from "@/components/skills/SkillsHero";
import TechnicalSkills from "@/components/skills/TechnicalSkills";
import Certifications from "@/components/skills/Certifications";
import SoftSkills from "@/components/skills/SoftSkills";
import SkillsClosingQuote from "@/components/skills/SkillsClosingQuote";

export default function SkillsPage() {
  return (
    <main
      className="min-h-screen pb-14 md:pb-0"
      style={{ backgroundColor: "#0D1117" }}
    >
      <SkillsHero />
      <TechnicalSkills />
      <Certifications />
      <SoftSkills />
      <SkillsClosingQuote />
    </main>
  );
}
