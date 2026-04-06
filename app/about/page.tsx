"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const gear = [
  "Sony FX3 / FX6",
  "Canon EOS R5",
  "DJI Ronin Gimbal",
  "DJI Mini 4 Pro",
  "Atomos Shogun Monitor",
  "Various Prime Lenses",
];

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/stonesoup.cc/" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-32 px-8 md:px-16 pb-24">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-[3/4] bg-surface-2 overflow-hidden"
        >
          {/* Replace /images/profile.jpg with your actual photo */}
          <div className="absolute inset-0 bg-gradient-to-br from-surface to-surface-2 flex items-end p-6">
            <p className="font-sans text-xs text-muted tracking-widest uppercase">
              Add your photo to /public/images/profile.jpg
            </p>
          </div>
          {/* Uncomment once you add the photo:
          <Image
            src="/images/profile.jpg"
            alt="Ong Chee Choon"
            fill
            className="object-cover"
            priority
          />
          */}
        </motion.div>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="pt-4"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-sans text-xs tracking-widest uppercase text-accent mb-4"
          >
            About
          </motion.p>

          <h1 className="font-display text-4xl md:text-5xl font-light text-foreground mb-8 leading-tight">
            Ong Chee Choon
          </h1>

          <div className="space-y-4 font-sans text-sm text-muted leading-relaxed">
            <p>
              I&apos;m a Singapore-based film director with a fresh, exciting visual
              sensibility and a strong storytelling instinct. I specialise in
              performance-driven narratives and mixed-media work that blends live
              action with animation or VFX.
            </p>
            <p>
              My work is grounded in human stories and authentic moments — often
              focusing on the craft, relationships, and journeys behind the brand.
            </p>
            <p>
              With a background in communications, I approach filmmaking with the
              audience in mind, crafting stories that resonate emotionally and leave
              viewers feeling inspired, moved, or deeply connected to the narrative.
            </p>
          </div>

          {/* Gear */}
          <div className="mt-10">
            <p className="font-sans text-xs tracking-widest uppercase text-foreground/40 mb-4">
              Equipment
            </p>
            <ul className="grid grid-cols-2 gap-y-2">
              {gear.map((item) => (
                <li key={item} className="font-sans text-xs text-muted flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-accent shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="mt-10 flex items-center gap-6">
            {socialLinks.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-xs tracking-widest uppercase text-muted hover:text-accent transition-colors duration-300"
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="mt-10">
            <Link
              href="/hire"
              className="inline-block font-sans text-xs tracking-widest uppercase text-foreground border border-white/20 px-8 py-3 hover:border-accent hover:text-accent transition-all duration-300"
            >
              Work Together →
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
