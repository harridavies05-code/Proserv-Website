import Link from "next/link";
import { FacebookIcon, InstagramIcon } from "./SocialIcons";
import { business } from "@/lib/business";

export default function Footer() {
  return (
    <footer className="border-t border-brand-green/25 bg-black text-white/60 shadow-[0_-1px_30px_-10px_rgba(35,115,26,0.5)]">
      <div className="mx-auto max-w-6xl px-6 py-12 text-sm">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div>
            <p className="font-semibold text-white">{business.name}</p>
            <p className="mt-2">{business.addressLine}</p>
          </div>

          <div className="flex flex-col gap-1">
            <a href={business.phoneHref} className="hover:text-brand-green">
              {business.phoneDisplay}
            </a>
            <a href={business.emailHref} className="hover:text-brand-green">
              {business.email}
            </a>
          </div>

          <div className="flex flex-col gap-4 sm:items-end">
            {/* TODO: placeholder social URLs, swap in the real page links
                from business.socialLinks once Harri supplies them. */}
            <div className="flex gap-4">
              <a
                href={business.socialLinks.facebook}
                aria-label="ProServ Electrical on Facebook"
                title="TODO: add real Facebook page URL"
                className="text-white/60 transition-colors hover:text-brand-green"
              >
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a
                href={business.socialLinks.instagram}
                aria-label="ProServ Electrical on Instagram"
                title="TODO: add real Instagram page URL"
                className="text-white/60 transition-colors hover:text-brand-green"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
            </div>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-brand-green">
                Privacy Policy
              </Link>
              <Link href="/#contact" className="hover:text-brand-green">
                Contact
              </Link>
            </div>
          </div>
        </div>

        <p className="mt-10 border-t border-white/10 pt-6">
          © {new Date().getFullYear()} {business.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
