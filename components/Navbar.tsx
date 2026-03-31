"use client";

import Link from "next/link";

const links = [
  { href: "#hero", label: "Home" },
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 flex items-center justify-between border-b border-stone-800/50 backdrop-blur-sm bg-background/80">
      <Link
        href="/"
        className="text-sm font-semibold tracking-widest uppercase text-foreground hover:text-accent transition-colors duration-300"
      >
        Ong Chee Choon
      </Link>

      <nav className="hidden md:flex items-center gap-8">
        {links.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            className="text-xs font-medium tracking-widest uppercase text-stone-400 hover:text-foreground transition-colors duration-300"
          >
            {label}
          </a>
        ))}
      </nav>

      {/* Mobile: just contact link */}
      <a
        href="#contact"
        className="md:hidden text-xs font-medium tracking-widest uppercase text-stone-400 hover:text-foreground transition-colors duration-300"
      >
        Contact
      </a>
    </header>
  );
}
