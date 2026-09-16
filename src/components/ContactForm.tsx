"use client";

import { useState, type FocusEvent, type FormEvent } from "react";
import Link from "next/link";
import { business, coreServices } from "@/lib/business";
import { BUSINESS_COORDS, SERVICE_RADIUS_MILES, geocode, haversineMiles } from "@/lib/geo";

type Status = "idle" | "submitting" | "success" | "error";
type LocationCheck = "idle" | "checking" | "ok" | "far" | "unknown";

const inputClasses =
  "mt-1 w-full rounded-md border border-white/15 bg-black/30 px-3 py-2 text-white placeholder:text-white/30 focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [locationCheck, setLocationCheck] = useState<LocationCheck>("idle");
  const [distanceMiles, setDistanceMiles] = useState<number | null>(null);

  async function handleLocationBlur(event: FocusEvent<HTMLInputElement>) {
    const value = event.currentTarget.value.trim();
    if (!value) {
      setLocationCheck("idle");
      setDistanceMiles(null);
      return;
    }

    setLocationCheck("checking");
    const coords = await geocode(`${value}, UK`);
    if (!coords) {
      setLocationCheck("unknown");
      setDistanceMiles(null);
      return;
    }

    const distance = haversineMiles(BUSINESS_COORDS, coords);
    setDistanceMiles(Math.round(distance));
    setLocationCheck(distance > SERVICE_RADIUS_MILES ? "far" : "ok");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Capture the form before the first await: React nulls out
    // event.currentTarget once the synchronous part of the handler finishes.
    const form = event.currentTarget;
    setStatus("submitting");

    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const phone = String(formData.get("phone") ?? "");
    const service = String(formData.get("service") ?? "");
    const location = String(formData.get("location") ?? "");
    const rawMessage = String(formData.get("message") ?? "").trim();

    // quote_requests has no dedicated location column, fold it (and the
    // out-of-area warning, if any) into the message so the job address
    // isn't lost.
    const messageParts = [`Job location: ${location}`];
    if (locationCheck === "far" && distanceMiles !== null) {
      messageParts.push(
        `Note: approximately ${distanceMiles} miles from Chester, outside the usual ${SERVICE_RADIUS_MILES}-mile area.`,
      );
    }
    if (rawMessage) messageParts.push(rawMessage);

    const composedMessage = messageParts.join("\n\n");

    try {
      // The insert (and the notification email) now happen server-side in
      // this route, using the service role key. No client-side Supabase
      // calls for quote_requests, deliberately, see CLAUDE.md for why.
      const res = await fetch("/api/quote-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          service,
          message: composedMessage,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? "Request failed");
      }

      setStatus("success");
      form.reset();
      setLocationCheck("idle");
      setDistanceMiles(null);
    } catch (err) {
      console.error("Failed to submit quote request:", err);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-brand-green/40 bg-brand-green/10 p-6 text-white shadow-[0_0_30px_-10px_rgba(35,115,26,0.7)]">
        Thanks, your enquiry has been received. We&apos;ll be in touch soon.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" required />
        <Field label="Phone" name="phone" type="tel" required />
      </div>
      <Field label="Email" name="email" type="email" required />

      <div>
        <label
          htmlFor="location"
          className="block text-sm font-medium text-white/90"
        >
          Job location (town or postcode)
        </label>
        <input
          id="location"
          name="location"
          type="text"
          required
          placeholder="e.g. CH1 1AB"
          onBlur={handleLocationBlur}
          className={inputClasses}
        />
        {locationCheck === "checking" && (
          <p className="mt-1.5 text-sm text-white/40">Checking distance...</p>
        )}
        {locationCheck === "far" && (
          <p className="mt-1.5 text-sm text-brand-amber">
            That looks to be around {distanceMiles} miles from Chester, outside
            our usual {SERVICE_RADIUS_MILES}-mile area. We may still be able to
            help, but this needs to be confirmed by email first at{" "}
            <a href={business.emailHref} className="underline">
              {business.email}
            </a>
            .
          </p>
        )}
        {locationCheck === "unknown" && (
          <p className="mt-1.5 text-sm text-white/40">
            Couldn&apos;t automatically check that location, we&apos;ll confirm
            distance when we get back to you.
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="service"
          className="block text-sm font-medium text-white/90"
        >
          What do you need help with?
        </label>
        <select
          id="service"
          name="service"
          required
          className={inputClasses}
        >
          <option value="" className="bg-black">Select a service</option>
          {coreServices.map((s) => (
            <option key={s.slug} value={s.name} className="bg-black">
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-white/90"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className={inputClasses}
        />
      </div>

      <label className="flex items-start gap-3 text-sm text-white/70">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-1 h-4 w-4 rounded border-white/20 bg-black/30 accent-brand-green focus:ring-brand-green"
        />
        <span>
          I agree to {business.name} contacting me about my enquiry using the
          details above. See our{" "}
          <Link href="/privacy" className="underline hover:text-brand-green">
            Privacy Policy
          </Link>
          .
        </span>
      </label>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-md bg-brand-amber px-6 py-3 font-semibold text-brand-green-dark shadow-sm transition-colors hover:bg-brand-amber-dark hover:text-white disabled:opacity-60"
      >
        {status === "submitting" ? "Sending..." : "Send Enquiry"}
      </button>

      {status === "error" && (
        <p className="text-sm text-red-400">
          Something went wrong sending your enquiry. Please call or email us
          directly instead.
        </p>
      )}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-white/90"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className={inputClasses}
      />
    </div>
  );
}
