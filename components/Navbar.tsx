"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/hire", label: "Hire" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex items-center justify-between mix-blend-difference">
      <Link
        href="/"
        className="font-display text-sm tracking-widest uppercase text-foreground hover:text-accent transition-colors duration-300"
      >
        Your Name
      </Link>

      <nav className="flex items-center gap-10">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`relative font-sans text-xs tracking-widest uppercase transition-colors duration-300 group ${
              pathname === href ? "text-accent" : "text-foreground hover:text-accent"
            }`}
          >
            {label}
            <span
              className={`absolute -bottom-0.5 left-0 h-px bg-accent transition-all duration-500 ease-cinematic ${
                pathname === href ? "w-full" : "w-0 group-hover:w-full"
              }`}
            />
          </Link>
        ))}
      </nav>
    </header>
  );
}
