import { useEffect, useState } from "react";
import BootSequence from "../components/BootSequence";
import StatusBar from "../components/StatusBar";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Experience from "../components/Experience";
import Badges from "../components/Badges";
import Projects from "../components/Projects";
import ContactSection from "../components/ContactSection";
import CustomSections from "../components/CustomSections";
import Footer from "../components/Footer";
import { fetchSiteContent } from "../lib/supabase";
import type { SiteContent } from "../lib/types";
import { seedContent } from "../lib/content";

export default function Portfolio() {
  const [content, setContent] = useState<SiteContent>(seedContent);
  const [booted, setBooted] = useState(() => localStorage.getItem("boot-seen") === "1");

  useEffect(() => {
    fetchSiteContent().then(setContent).catch(() => setContent(seedContent));
  }, []);

  const finishBoot = () => {
    localStorage.setItem("boot-seen", "1");
    setBooted(true);
  };

  return (
    <>
      {!booted && <BootSequence onDone={finishBoot} />}
      <div className={booted ? "opacity-100" : "opacity-0"}>
        <StatusBar name={content.profile.name} />
        <Hero hero={content.hero} metrics={content.metrics} />
        <About text={content.aboutText} facts={content.quickFacts} />
        <Skills skills={content.skills} />
        <Experience
          experience={content.experience}
          certifications={content.certifications}
          achievements={content.achievements}
        />
        <Badges badges={content.badges} />
        <Projects projects={content.projects} />
        <ContactSection contacts={content.contacts} />
        <CustomSections sections={content.customSections} />
        <Footer name={content.profile.name} />
      </div>
    </>
  );
}
