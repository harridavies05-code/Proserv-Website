import { business } from "@/lib/business";

// PLACEHOLDER. Not real legal content. Have this reviewed (or drafted
// properly, e.g. via a solicitor or a service like Rocket Lawyer / Seatbelt)
// before the site goes live. UK GDPR/PECR requires accurate detail on what
// data is collected, why, how long it's kept, and how people can request
// deletion.
export default function PrivacyPolicy() {
  return (
    <main className="mx-auto max-w-3xl px-6 pb-16 pt-28">
      <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
      <p className="mt-4 text-sm text-white/40 italic">
        Placeholder: this page needs proper legal content before launch.
      </p>

      <div className="mt-8 space-y-6 text-white/70">
        <p>
          {business.name} collects the information you submit via our
          contact form (name, phone number, email address, and any message
          you provide) solely to respond to your enquiry and arrange work you
          have requested.
        </p>
        <p>
          We do not sell or share your data with third parties. [Add: how
          long data is retained, where it&apos;s stored, and how someone can
          request their data be deleted (required under UK GDPR).]
        </p>
        <p>
          To ask about the data we hold on you, contact us at{" "}
          {business.email}.
        </p>
      </div>
    </main>
  );
}
