"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { thumbnailFor, type Video } from "@/data/videos";

const pad = (n: number) => String(n).padStart(2, "0");

type Props = {
  slides: Video[];
  index: number;
  onIndex: (i: number) => void;
  onOpen: (v: Video) => void;
};

function Corners() {
  const c = "absolute w-[18px] h-[18px] border-cream";
  return (
    <>
      <span aria-hidden className={`${c} top-3 left-3 border-t border-l`} />
      <span aria-hidden className={`${c} top-3 right-3 border-t border-r`} />
      <span aria-hidden className={`${c} bottom-3 left-3 border-b border-l`} />
      <span aria-hidden className={`${c} bottom-3 right-3 border-b border-r`} />
    </>
  );
}

export default function Hero({ slides, index, onIndex, onOpen }: Props) {
  const L = slides.length;
  const s = ((index % L) + L) % L;
  const cur = slides[s];
  const prev = slides[(s - 1 + L) % L];
  const next = slides[(s + 1) % L];
  const thumb = thumbnailFor(cur);
  const prevThumb = thumbnailFor(prev);
  const nextThumb = thumbnailFor(next);

  return (
    <section className="relative min-h-[max(100svh,760px)] overflow-hidden bg-ink flex flex-col justify-center">
      {/* Blurred background still */}
      <AnimatePresence mode="sync">
        {thumb && (
          <motion.div
            key={cur.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.45 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
            aria-hidden
          >
            <Image src={thumb} alt="" fill priority sizes="100vw" className="object-cover scale-110 blur-2xl" />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="absolute inset-0 bg-ink/40" aria-hidden />

      {/* Header */}
      <header className="absolute top-0 inset-x-0 z-20 flex flex-wrap items-start justify-between gap-6 px-6 md:px-8 py-6">
        <a href="#top" className="font-serif italic text-[28px] leading-none">Ong Chee Choon</a>
        <span className="hidden md:block text-xs tracking-[0.12em] pt-1.5">• DIRECTOR / PRODUCER</span>
        <nav className="flex gap-8 md:gap-10 text-xs tracking-[0.1em] pt-1.5">
          <a href="#work">• WORK</a>
          <a href="#about">ABOUT</a>
          <a href="#contact">CONTACT</a>
        </nav>
      </header>

      {/* Previous / next peeks */}
      <button
        type="button"
        onClick={() => onIndex(index - 1)}
        aria-label={`Previous project: ${prev.title}`}
        className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-[220px] h-[120px] z-10 opacity-80 hover:opacity-100 transition-opacity overflow-hidden bg-panel"
      >
        {prevThumb && <Image src={prevThumb} alt="" fill sizes="220px" className="object-cover" />}
      </button>
      <button
        type="button"
        onClick={() => onIndex(index + 1)}
        aria-label={`Next project: ${next.title}`}
        className="hidden md:block absolute bottom-0 left-1/2 -translate-x-1/2 w-[220px] h-[120px] z-10 opacity-80 hover:opacity-100 transition-opacity overflow-hidden bg-panel"
      >
        {nextThumb && <Image src={nextThumb} alt="" fill sizes="220px" className="object-cover" />}
      </button>

      {/* Title + frame */}
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-6 px-6 md:px-8 pt-32 pb-36 md:py-36">
        <AnimatePresence mode="wait">
          <motion.h1
            key={`l-${cur.id}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="flex-[1_1_280px] text-center md:text-right font-serif font-normal text-[clamp(52px,7vw,116px)] leading-[0.9] tracking-[-0.01em]"
          >
            {cur.slide?.left}
          </motion.h1>
        </AnimatePresence>

        <div className="flex-[0_1_540px] w-full flex flex-col gap-2.5">
          <div className="flex justify-between font-mono text-xs tracking-[0.06em] uppercase">
            <span>{cur.format}</span>
            <span>{cur.slide?.label}</span>
          </div>
          <button
            type="button"
            onClick={() => onOpen(cur)}
            aria-label={cur.caseStudy ? `Open case study: ${cur.title}` : `Watch ${cur.title}`}
            className="group relative aspect-[16/10] w-full overflow-hidden border border-cream/25 bg-panel"
          >
            <AnimatePresence mode="sync">
              {thumb && (
                <motion.div key={cur.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="absolute inset-0">
                  <Image src={thumb} alt="" fill sizes="(min-width: 768px) 540px, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                </motion.div>
              )}
            </AnimatePresence>
            <Corners />
            <span className="absolute inset-x-0 bottom-0 py-4 font-mono text-xs tracking-[0.1em] bg-ink/50 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
              {cur.caseStudy ? "▸ VIEW CASE STUDY" : "▸ WATCH FILM"}
            </span>
          </button>
          <div className="flex justify-between gap-4 font-mono text-[13px] tracking-[0.08em] uppercase">
            <span>{pad(s + 1)}.</span>
            <span className="text-center">{cur.client}</span>
            <span>.{pad(L)}</span>
          </div>
          <div className="flex flex-wrap justify-center gap-2 font-mono text-[11px] tracking-[0.08em] uppercase">
            <span className="text-gold">My role —</span>
            {cur.roles.map((r) => (
              <span key={r}>{r}</span>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.p
            key={`r-${cur.id}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5 }}
            className="flex-[1_1_280px] text-center md:text-left font-serif italic text-[clamp(52px,7vw,116px)] leading-[0.9]"
          >
            {cur.slide?.right}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-0 inset-x-0 z-20 flex flex-wrap items-end justify-between gap-4 px-6 md:px-8 py-5 text-xs tracking-[0.08em]">
        <span className="hidden sm:inline">© {new Date().getFullYear()}</span>
        <span>
          <button type="button" onClick={() => onIndex(index - 1)} className="px-2 py-3 tracking-[0.08em] hover:text-gold">PREV</button>
          /
          <button type="button" onClick={() => onIndex(index + 1)} className="px-2 py-3 tracking-[0.08em] hover:text-gold">NEXT</button>
        </span>
        <a href="#work" className="text-gold">ALL WORK ↓</a>
        <span className="hidden sm:inline font-mono">00:{pad(s + 1)}:24:12</span>
      </div>
    </section>
  );
}
