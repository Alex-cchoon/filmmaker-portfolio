"use client";

import { motion } from "framer-motion";

const services = [
  { title: "Wedding Films", desc: "Cinematic wedding and elopement films." },
  { title: "Brand & Commercial", desc: "Product videos, brand films, and campaign content." },
  { title: "Documentary", desc: "Short documentaries and narrative projects." },
  { title: "Music Video", desc: "Performance and concept-driven music videos." },
];

export default function HirePage() {
  return (
    <main className="min-h-screen pt-32 px-8 md:px-16 pb-24 flex flex-col items-start max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="font-sans text-xs tracking-widest uppercase text-accent mb-4">
          Let&apos;s Work Together
        </p>
        <h1 className="font-display text-5xl md:text-7xl font-light text-foreground mb-8 leading-tight">
          Hire Me
        </h1>
        <p className="font-sans text-sm text-muted leading-relaxed max-w-lg mb-16">
          Currently accepting projects for [current year]. I work with brands,
          couples, artists, and production companies. Drop me a message and let&apos;s
          talk about what you&apos;re making.
        </p>
      </motion.div>

      {/* Services */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full mb-16"
      >
        <p className="font-sans text-xs tracking-widest uppercase text-foreground/30 mb-6">
          Services
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/5">
          {services.map(({ title, desc }) => (
            <div key={title} className="bg-background p-6">
              <h3 className="font-display text-xl text-foreground mb-1">{title}</h3>
              <p className="font-sans text-xs text-muted">{desc}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.35 }}
        className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
      >
        <a
          href="mailto:your@email.com"
          className="font-sans text-xs tracking-widest uppercase text-foreground border border-white/20 px-10 py-4 hover:border-accent hover:text-accent transition-all duration-300"
        >
          Email Me
        </a>
        <p className="font-sans text-xs text-muted">
          your@email.com
        </p>
      </motion.div>
    </main>
  );
}
