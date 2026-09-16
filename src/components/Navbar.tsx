"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { business } from "@/lib/business";

const links = [
  { href: "/services", label: "Services" },
  { href: "/#why-us", label: "Why Us" },
  { href: "/#service-area", label: "Service Area" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // The inline nav takes over at the sm breakpoint, so the dropdown
    // should never stay open behind it if the viewport is resized past it.
    const onResize = () => {
      if (window.innerWidth >= 640) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const showSolid = scrolled || menuOpen;

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        showSolid
          ? "border-b border-brand-green/15 bg-black/95 backdrop-blur"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-3 sm:gap-3 sm:px-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-1.5 sm:gap-2"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white p-1.5 shadow-[0_0_16px_-2px_rgba(35,115,26,0.6)] sm:h-11 sm:w-11">
              <Image
                src="/images/logo-icon.png"
                alt="ProServ Electrical logo"
                width={80}
                height={64}
                className="h-full w-full object-contain"
                priority
              />
            </span>
            <span
              className={`text-sm font-bold tracking-tight text-white transition-colors sm:text-lg ${
                showSolid ? "" : "drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]"
              }`}
            >
              {business.name}
            </span>
          </Link>

          <span className="hidden h-11 items-center rounded-lg bg-white px-2 shadow-[0_0_16px_-2px_rgba(35,115,26,0.6)] md:flex">
            <Image
              src="/images/niceic-badge.png"
              alt="NICEIC Registered"
              width={140}
              height={46}
              className="h-6 w-auto object-contain"
            />
          </span>
        </div>

        <nav
          className={`hidden gap-8 text-sm font-medium text-white/90 transition-colors sm:flex ${
            scrolled ? "" : "drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]"
          }`}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative py-1 transition-colors hover:text-brand-green"
            >
              {link.label}
              <span className="absolute inset-x-0 -bottom-0.5 h-0.5 scale-x-0 bg-brand-green shadow-[0_0_6px_1px_rgba(35,115,26,0.9)] transition-transform duration-200 ease-out group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/#contact"
            onClick={() => setMenuOpen(false)}
            className="shrink-0 rounded-md bg-brand-amber px-2 py-2 text-xs font-semibold text-brand-green-dark shadow-sm transition-all hover:-translate-y-0.5 hover:bg-brand-amber-dark hover:text-white sm:px-4 sm:text-sm"
          >
            Get a Quote
          </Link>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-white transition-colors hover:bg-white/10 sm:hidden"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            aria-label="Mobile"
            className="overflow-hidden border-t border-white/10 bg-black/95 backdrop-blur sm:hidden"
          >
            <div className="flex flex-col px-6 py-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-white/10 py-3 text-base font-medium text-white/90 transition-colors last:border-b-0 hover:text-brand-green"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
