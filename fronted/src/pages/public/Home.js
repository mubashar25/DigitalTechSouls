import Hero from "../../components/sections/home/Hero";
import Trust from "../../components/sections/home/Trust";
import Services from "../../components/sections/home/Services";
import Pricing from "../../components/sections/home/Pricing";
import Features from "../../components/sections/home/Features";
import Testimonials from "../../components/sections/home/Testimonials";
import FAQ from "../../components/sections/home/FAQ";

export default function Home() {
  return (
    <>
    <main className="flex flex-col">

      <Hero />

      <div className="space-y-24">

      <Trust />
      <Services />
      <Pricing />
      <Features />
      <Testimonials />
      <FAQ />

      </div>

      </main>
    </>
  );
}