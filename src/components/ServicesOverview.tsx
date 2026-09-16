"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { coreServices } from "@/lib/business";
import { serviceIcons } from "@/lib/serviceIcons";
import Reveal from "./Reveal";

export default function ServicesOverview() {
  return (
    <section id="services" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-20">
      <Reveal>
        <h2 className="text-3xl font-bold text-white">Our Services</h2>
        <p className="mt-3 max-w-2xl text-white/60">
          Full-service domestic electrical work, from routine safety checks
          to EV charger installs, all carried out by a qualified electrician.
        </p>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {coreServices.map((service, i) => {
          const Icon = serviceIcons[service.slug];
          return (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.08 * i, ease: "easeOut" }}
            >
              <Link
                href={`/services#${service.slug}`}
                className="group flex h-full flex-col rounded-xl border border-white/10 bg-white/5 p-6 transition-all hover:-translate-y-1 hover:border-brand-green/50 hover:shadow-[0_0_35px_-12px_rgba(35,115,26,0.7)]"
              >
                <Icon
                  className="h-8 w-8 text-brand-green transition-transform group-hover:scale-110"
                  strokeWidth={1.75}
                />
                <h3 className="mt-4 text-lg font-semibold text-white">
                  {service.name}
                </h3>
                <p className="mt-2 text-sm text-white/60">
                  {service.description}
                </p>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <Reveal delay={0.2} className="mt-10 text-center">
        <Link
          href="/services"
          className="inline-block rounded-md bg-brand-amber px-6 py-3 font-semibold text-brand-green-dark shadow-sm transition-all hover:-translate-y-0.5 hover:bg-brand-amber-dark hover:text-white"
        >
          View All Services
        </Link>
      </Reveal>
    </section>
  );
}
