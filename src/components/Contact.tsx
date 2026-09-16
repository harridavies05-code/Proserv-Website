import { business } from "@/lib/business";
import ContactForm from "./ContactForm";
import Reveal from "./Reveal";

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 border-t border-brand-green/15 bg-surface">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-20 lg:grid-cols-2">
        <Reveal>
          <h2 className="text-3xl font-bold text-white">
            Get a Free Quote
          </h2>
          <p className="mt-4 max-w-md text-white/60">
            Tell us a bit about what you need and we&apos;ll get back to you
            with a free, no-obligation quote.
          </p>

          <dl className="mt-8 space-y-2 text-white/70">
            <div className="flex gap-2">
              <dt className="font-medium text-white">Phone:</dt>
              <dd>
                <a href={business.phoneHref} className="hover:text-brand-green">
                  {business.phoneDisplay}
                </a>
              </dd>
            </div>
            <div className="flex gap-2">
              <dt className="font-medium text-white">Email:</dt>
              <dd>
                <a href={business.emailHref} className="hover:text-brand-green">
                  {business.email}
                </a>
              </dd>
            </div>
          </dl>
        </Reveal>

        <Reveal
          delay={0.15}
          className="rounded-xl border border-brand-green/25 bg-white/5 p-8 shadow-[0_0_40px_-15px_rgba(35,115,26,0.6)] backdrop-blur-sm"
        >
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
