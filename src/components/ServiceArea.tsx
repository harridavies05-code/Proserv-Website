import { business } from "@/lib/business";
import { SERVICE_RADIUS_MILES } from "@/lib/geo";
import Reveal from "./Reveal";
import ServiceAreaMap from "./ServiceAreaMapLoader";

export default function ServiceArea() {
  return (
    <section id="service-area" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-20">
      <Reveal>
        <h2 className="text-3xl font-bold text-white">Service Area</h2>
        <p className="mt-4 max-w-2xl text-lg text-white/70">
          {business.serviceArea}
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-8">
        <ServiceAreaMap />
        <p className="mt-3 text-sm text-white/50">
          Outside the {SERVICE_RADIUS_MILES}-mile circle? Get in touch, we may
          still be able to help, further distances are just confirmed by
          email first.
        </p>
      </Reveal>
    </section>
  );
}
