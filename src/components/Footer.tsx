import Image from "next/image";
import Link from "next/link";
import React from "react";

type FooterColumn = {
  heading: string;
  links: { label: string; href: string }[];
};

interface FooterProps {
  columns?: FooterColumn[];
  logoSrc?: string;
  social?: { icon: "/x.svg" | "/facebook.svg" | "/instagram.svg"; label: string; href: string }[];
  copyrightName?: string;
}

const defaultColumns: FooterColumn[] = [
  {
    heading: "Featured",
    links: [
      { label: "Air Force 1", href: "#" },
      { label: "Huarache", href: "#" },
      { label: "Air Max 90", href: "#" },
      { label: "Air Max 95", href: "#" },
    ],
  },
  {
    heading: "Shoes",
    links: [
      { label: "All Shoes", href: "#" },
      { label: "Custom Shoes", href: "#" },
      { label: "Jordan Shoes", href: "#" },
      { label: "Running Shoes", href: "#" },
    ],
  },
  {
    heading: "Clothing",
    links: [
      { label: "All Clothing", href: "#" },
      { label: "Modest Wear", href: "#" },
      { label: "Hoodies & Pullovers", href: "#" },
      { label: "Shirts & Tops", href: "#" },
    ],
  },
  {
    heading: "Kids'",
    links: [
      { label: "Infant & Toddler Shoes", href: "#" },
      { label: "Kids' Shoes", href: "#" },
      { label: "Kids' Jordan Shoes", href: "#" },
      { label: "Kids' Basketball Shoes", href: "#" },
    ],
  },
];

const defaultSocial = [
  { icon: "/x.svg" as const, label: "X", href: "#" },
  { icon: "/facebook.svg" as const, label: "Facebook", href: "#" },
  { icon: "/instagram.svg" as const, label: "Instagram", href: "#" },
];

export default function Footer({
  columns = defaultColumns,
  logoSrc = "/logo.svg",
  social = defaultSocial,
  copyrightName = "Moda",
}: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 w-full bg-dark-900 text-light-100">
      <div className="mx-auto max-w-7xl px-4 py-10 md:py-14">
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-12">
          <div className="md:col-span-3">
            <Link href="#" aria-label="Home" className="inline-flex">
              <Image src={logoSrc} alt="Moda logo" width={40} height={40} />
            </Link>
          </div>

          <div className="md:col-span-7 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
            {columns.map((col) => (
              <div key={col.heading}>
                <h4 className="mb-3 text-heading-3 text-[--color-light-100]">{col.heading}</h4>
                <ul className="space-y-2">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-body text-[--color-light-400] hover:text-[--color-light-100]"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="md:col-span-2 flex items-start justify-start md:justify-end">
            <ul className="flex items-center gap-3">
              {social.map((s) => (
                <li key={s.label}>
                  <Link aria-label={s.label} href={s.href} className="inline-flex">
                    <Image src={s.icon} alt={s.label} width={28} height={28} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-[--color-dark-700]/40 pt-6">
          <p className="text-footnote text-[--color-light-400]">&copy; {year} {copyrightName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
