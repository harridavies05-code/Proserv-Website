// Central place for real-world business facts. Everything marked TBC or
// TODO is a placeholder. Confirm with Harri's dad before launch, don't guess.

export const business = {
  name: "ProServ Electrical",
  tagline: "Trusted Domestic Electrician in Chester",

  phoneDisplay: "+44 7834 909338",
  phoneHref: "tel:+447834909338",
  email: "Proservchester@sky.com",
  emailHref: "mailto:Proservchester@sky.com",

  // 25-mile radius confirmed by Harri, 2026-09-14. The actual circle is
  // drawn from src/lib/geo.ts (BUSINESS_COORDS, SERVICE_RADIUS_MILES),
  // this is just the display copy.
  serviceArea: "We cover a 25-mile radius around Chester (CH4 7HB).",

  pricing: "Free quotes and estimates",

  // Confirmed by Harri, 2026-09-14: not approved yet, so no grant-eligibility
  // messaging. Revisit if that changes.
  ozevApproved: false as boolean,

  certifications: [
    "NICEIC Registered",
    "Part P Registered",
    "Fully Insured",
    "Professional Indemnity Insurance",
  ] as string[],

  // Confirmed by Harri, 2026-09-14: "Pod Point, Tesla, Zappi, pretty much
  // everything." Keep this generic rather than implying an exhaustive list.
  chargerBrands: ["Pod Point", "Tesla", "Zappi", "and more"] as string[],

  addressLine: "12 Eaton Avenue, Handbridge, Chester, CH4 7HB",

  // TODO: placeholder URLs. Harri to supply the real Facebook/Instagram
  // page links, then swap these in.
  socialLinks: {
    facebook: "https://facebook.com/TODO-add-real-page-url",
    instagram: "https://instagram.com/TODO-add-real-page-url",
  },
} as const;

// Updated 2026-09-15: full-service domestic electrician positioning, not
// EV-first. These five are shown as equal core services, none is the lead
// offer, on both the homepage overview cards and the /services page. Copy
// confirmed by Harri, 2026-09-15. More may be added later, see the "More
// services coming soon" line on /services and the open question in
// CLAUDE.md about the broader secondary-service list.
export const coreServices = [
  {
    slug: "eicr",
    name: "EICRs (Electrical Installation Condition Reports)",
    description:
      "Full property electrical safety inspections, for landlords, homebuyers, and routine safety checks, with a detailed report on any faults or hazards.",
  },
  {
    slug: "emergency-callouts",
    name: "24/7 Call Outs",
    description:
      "Emergency electrical callouts any time, day or night, for urgent faults, power loss, or safety issues.",
  },
  {
    slug: "ev-chargers",
    name: "EV Charger Installation",
    description:
      "Supply and installation of home EV charging points, from consultation through to certification.",
  },
  {
    slug: "fault-finding",
    name: "Fault Finding",
    description:
      "Diagnosis and repair of electrical faults, from tripping circuits to intermittent power issues.",
  },
  {
    slug: "consumer-units",
    name: "Consumer Unit Upgrades",
    description:
      "Replacement of old or unsafe fuse boards to current safety standards.",
  },
] as const;
