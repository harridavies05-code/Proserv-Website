import type { Metadata } from "next";
import Link from "next/link";
import { coreServices } from "@/lib/business";
import { serviceIcons } from "@/lib/serviceIcons";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Services | ProServ Electrical",
  description:
    "Full-service domestic electrical work in Chester: EICRs, emergency call-outs, EV charger installation, fault finding, and consumer unit upgrades.",
};

export default function ServicesPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 pb-20 pt-32">
      <Reveal>
        <h1 className="text-4xl font-bold text-white">Our Services</h1>
        <p className="mt-4 max-w-2xl text-white/60">
          Full-service domestic electrical work, carried out by a qualified
          electrician. No single service here is the &ldquo;main&rdquo; one,
          all are core to what we do.
        </p>
      </Reveal>

      <div className="mt-12 space-y-6">
        {coreServices.map((service, i) => {
          const Icon = serviceIcons[service.slug];
          return (
            <Reveal key={service.slug} delay={0.05 * i}>
              <div
                id={service.slug}
                className="scroll-mt-24 rounded-xl border border-white/10 bg-white/5 p-8"
              >
                <div className="flex items-start gap-4">
                  <Icon
                    className="h-8 w-8 shrink-0 text-brand-green"
                    strokeWidth={1.75}
                  />
                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      {service.name}
                    </h2>
                    <p className="mt-2 text-white/70">{service.description}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.05} className="mt-8 text-center text-sm text-white/40">
        More services coming soon.
      </Reveal>

      <Reveal delay={0.1} className="mt-8 rounded-xl border border-brand-green/25 bg-white/5 p-8 text-center">
        <h2 className="text-2xl font-bold text-white">
          Need one of these sorted?
        </h2>
        <p className="mt-2 text-white/60">
          Get a free, no-obligation quote, we usually reply the same day.
        </p>
        <Link
          href="/#contact"
          className="mt-6 inline-block rounded-md bg-brand-amber px-6 py-3 font-semibold text-brand-green-dark shadow-sm transition-all hover:-translate-y-0.5 hover:bg-brand-amber-dark hover:text-white"
        >
          Get a Free Quote
        </Link>
      </Reveal>
    </main>
  );
}
