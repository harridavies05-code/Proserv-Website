"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { Phone } from "lucide-react";
import heroPhoto from "../../public/images/ev-install-1.jpeg";
import { business } from "@/lib/business";
import Sparks from "./Sparks";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex h-screen min-h-[640px] items-center overflow-hidden bg-brand-green-dark text-white"
    >
      <motion.div
        style={{ y: imageY }}
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1.05, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 -z-20"
      >
        <Image
          src={heroPhoto}
          alt="A ProServ Electrical electrician carrying out domestic electrical work"
          fill
          priority
          placeholder="blur"
          sizes="100vw"
          className="object-cover object-[75%_35%]"
        />
      </motion.div>

      {/* Black opaque overlay for legibility and mood */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black via-black/80 to-black/35 sm:via-black/60" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
      {/* Top vignette keeps the floating nav readable over any part of the photo */}
      <div className="absolute inset-x-0 top-0 -z-10 h-28 bg-gradient-to-b from-black/55 to-transparent" />

      <Sparks />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-6 py-24"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-full bg-white/10 px-4 py-1 text-sm font-medium text-brand-amber ring-1 ring-white/10 backdrop-blur-sm"
        >
          NICEIC Registered Electrician
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="max-w-2xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl"
        >
          Trusted Domestic Electrician in Chester
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="max-w-xl text-lg text-white/85"
        >
          EICRs, emergency call-outs, EV chargers, fault finding, and
          consumer unit upgrades, done right the first time.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="flex flex-wrap items-center gap-6 pt-2"
        >
          <Link
            href="/#contact"
            className="rounded-md bg-brand-amber px-6 py-3 font-semibold text-brand-green-dark shadow-lg shadow-black/30 transition-all hover:-translate-y-0.5 hover:bg-brand-amber-dark hover:text-white"
          >
            Get a Free Quote
          </Link>
          <a
            href={business.phoneHref}
            className="flex items-center gap-2 font-semibold text-white transition-colors hover:text-brand-amber"
          >
            <Phone className="h-5 w-5" strokeWidth={2} />
            {business.phoneDisplay}
          </a>
        </motion.div>
      </motion.div>

      <motion.a
        href="#services"
        aria-label="Scroll to services"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { duration: 0.6, delay: 1.1 },
          y: { duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 1.1 },
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 transition-colors hover:text-white"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-8 w-8"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 5v14m0 0-6-6m6 6 6-6"
          />
        </svg>
      </motion.a>
    </section>
  );
}
