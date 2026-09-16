"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import workPhoto from "../../public/images/ev-install-2.jpeg";
import Reveal from "./Reveal";
import Sparks from "./Sparks";

export default function OurWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-screen items-center overflow-hidden bg-brand-green-dark text-white"
    >
      <motion.div style={{ y: imageY }} className="absolute inset-0 -z-20 scale-[1.15]">
        <Image
          src={workPhoto}
          alt="ProServ Electrical carrying out domestic electrical work"
          fill
          placeholder="blur"
          sizes="100vw"
          className="object-cover object-[35%_25%]"
        />
      </motion.div>

      <div className="absolute inset-0 -z-10 bg-gradient-to-l from-black from-40% via-black/85 to-black/35" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-transparent to-black/40" />

      <Sparks density={0.5} />

      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="ml-auto max-w-md text-right">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-amber">
              Real work, done right
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Hands-on, on every job
            </h2>
            <p className="mt-4 text-white/80">
              Every job is carried out and tested by a qualified electrician,
              not a subcontractor. What you see here is the actual work,
              wired and checked to current regulations.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
