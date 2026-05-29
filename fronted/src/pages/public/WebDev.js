import Hero from "../../components/sections/webdev/Hero";
import Services from "../../components/sections/webdev/Services";
import Projects from "../../components/sections/webdev/Projects";
import Contact from "../../components/sections/webdev/Contact";

// 🔥 NEW SECTIONS (you will create)
import Trust from "../../components/sections/webdev/Trust";
import Process from "../../components/sections/webdev/Process";
import Testimonials from "../../components/sections/webdev/Testimonials";
import CTA from "../../components/sections/webdev/CTA";

export default function WebDev() {
  return (
    <>
      <Hero />
      <Trust />         {/* 🔥 credibility */}
      <Services />
      <Process />       {/* 🔥 how you work */}
      <Projects />
      <Testimonials />  {/* 🔥 social proof */}
      <CTA />           {/* 🔥 strong conversion */}
      <Contact />
    </>
  );
}