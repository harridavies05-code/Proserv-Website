import Hero from "@/components/Hero";
import ServicesOverview from "@/components/ServicesOverview";
import OurWork from "@/components/OurWork";
import WhyChooseUs from "@/components/WhyChooseUs";
import ServiceArea from "@/components/ServiceArea";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <ServicesOverview />
      <OurWork />
      <WhyChooseUs />
      <ServiceArea />
      <Contact />
    </main>
  );
}
