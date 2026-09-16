import { business } from "@/lib/business";
import Reveal from "./Reveal";

const baseReasons = [
  {
    title: "Qualified electrician",
    description:
      "All work carried out by a qualified electrician to current UK wiring regulations.",
  },
  {
    title: "Direct & personal",
    description:
      "You deal with the person doing the work, not a call centre or subcontractor.",
  },
  {
    title: "Local service",
    description: "Based locally and focused on doing right by local customers.",
  },
];

export default function WhyChooseUs() {
  const hasAccreditations =
    business.ozevApproved === true || business.certifications.length > 0;

  return (
    <section id="why-us" className="scroll-mt-20 border-t border-brand-green/15 bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <h2 className="text-3xl font-bold text-white">Why Choose Us</h2>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {baseReasons.map((reason, i) => (
            <Reveal key={reason.title} delay={0.1 * i}>
              <h3 className="text-lg font-semibold text-white">
                {reason.title}
              </h3>
              <p className="mt-2 text-white/60">{reason.description}</p>
            </Reveal>
          ))}
        </div>

        {hasAccreditations ? (
          <div className="mt-10 flex flex-wrap gap-3">
            {business.ozevApproved === true && (
              <span className="rounded-full border border-brand-green/50 bg-brand-green/15 px-4 py-1.5 text-sm font-medium text-white shadow-[0_0_16px_-4px_rgba(35,115,26,0.7)]">
                OZEV Approved Installer
              </span>
            )}
            {business.certifications.map((cert) => (
              <span
                key={cert}
                className="rounded-full border border-brand-green/50 bg-brand-green/15 px-4 py-1.5 text-sm font-medium text-white shadow-[0_0_16px_-4px_rgba(35,115,26,0.7)]"
              >
                {cert}
              </span>
            ))}
          </div>
        ) : (
          <p className="mt-10 text-sm italic text-white/40">
            Certifications & accreditations (e.g. NICEIC, OZEV) to be
            confirmed and added here.
          </p>
        )}
      </div>
    </section>
  );
}
