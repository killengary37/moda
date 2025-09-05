import React from "react";

"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type NavItem = {
  label: string;
  href: string;
};

interface NavbarProps {
  items?: NavItem[];
  logoSrc?: string;
  cartCount?: number;
}

const defaultItems: NavItem[] = [
  { label: "Men", href: "#" },
  { label: "Women", href: "#" },
  { label: "Kids", href: "#" },
  { label: "Collections", href: "#" },
  { label: "Contact", href: "#" },
];

export default function Navbar({
  items = defaultItems,
  logoSrc = "/logo.svg",
  cartCount = 0,
}: NavbarProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full border-b border-[--color-light-300] bg-[--color-light-100]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:py-4">
        <div className="flex items-center gap-3">
          <Link href="#" aria-label="Home" className="flex items-center">
            <Image src={logoSrc} alt="Moda logo" width={28} height={28} priority />
          </Link>
        </div>

        <button
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="inline-flex h-10 w-10 items-center justify-center rounded md:hidden"
          onClick={() => setOpen((s) => !s)}
        >
          <span className="sr-only">Toggle navigation</span>
          <span
            className={`block h-0.5 w-6 bg-[--color-dark-900] transition-all ${open ? "translate-y-1.5 rotate-45" : ""}`}
          />
          <span
            className={`mt-1 block h-0.5 w-6 bg-[--color-dark-900] transition-opacity ${open ? "opacity-0" : "opacity-100"}`}
          />
          <span
            className={`mt-1 block h-0.5 w-6 bg-[--color-dark-900] transition-all ${open ? "-translate-y-1.5 -rotate-45" : ""}`}
          />
        </button>

        <ul className="hidden items-center gap-8 md:flex">
          {items.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="text-[--color-dark-900] text-body-medium hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-[--color-dark-900] focus:ring-offset-2 focus:ring-offset-[--color-light-100]"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-6 md:flex">
          <button className="text-body-medium text-[--color-dark-900] hover:opacity-80">Search</button>
          <button className="text-body-medium text-[--color-dark-900]">
            My Cart {cartCount > 0 ? `(${cartCount})` : ""}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={`md:hidden ${open ? "block" : "hidden"} border-t border-[--color-light-300] bg-[--color-light-100]`}
      >
        <ul className="mx-auto max-w-7xl space-y-2 px-4 py-3">
          {items.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="block rounded px-2 py-2 text-body-medium text-[--color-dark-900] hover:bg-[--color-light-200]"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="mt-2 flex items-center justify-between px-2">
            <button className="text-body-medium text-[--color-dark-900]">Search</button>
            <button className="text-body-medium text-[--color-dark-900]">
              My Cart {cartCount > 0 ? `(${cartCount})` : ""}
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
