"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  allRoles,
  categories,
  thumbnailFor,
  videos,
  type Category,
  type Role,
  type Video,
} from "@/data/videos";

const pad = (n: number) => String(n).padStart(2, "0");

function Pill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`px-4 py-2.5 rounded-full border font-mono text-[11px] tracking-[0.1em] uppercase transition-colors ${
        active ? "bg-cream text-ink border-cream" : "border-line-2 text-cream hover:border-cream"
      }`}
    >
      {children}
    </button>
  );
}

function CasePanel({ v, onClose, onWatch }: { v: Video; onClose: () => void; onWatch: (v: Video) => void }) {
  const cs = v.caseStudy!;
  const thumb = thumbnailFor(v);
  const metrics = cs.metrics ?? [];
  return (
    <motion.section
      id="case"
      key={v.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
      className="mx-6 md:mx-8 mb-12 border border-line bg-panel scroll-mt-6"
    >
      <div className="flex flex-wrap">
        <button
          type="button"
          onClick={() => onWatch(v)}
          aria-label={`Play ${v.title}`}
          className="group relative flex-[1_1_560px] aspect-video bg-ink overflow-hidden"
        >
          {thumb && <Image src={thumb} alt="" fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />}
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="w-16 h-16 rounded-full border border-cream bg-ink/40 flex items-center justify-center group-hover:bg-cream group-hover:text-ink transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M7 4l13 8-13 8z" /></svg>
            </span>
          </span>
        </button>
        <div className="flex-[1_1_420px] p-8 md:p-10 flex flex-col gap-5">
          <div className="flex justify-between items-start gap-4">
            <p className="font-mono text-xs tracking-[0.12em] text-gold uppercase">
              Case study · {v.client} · {v.year}
            </p>
            <button type="button" onClick={onClose} className="font-mono text-xs tracking-[0.1em] text-muted-2 hover:text-cream px-2 py-1">
              CLOSE ✕
            </button>
          </div>
          <h2 className="font-serif font-normal text-[clamp(40px,4vw,64px)] leading-none">{v.title}</h2>
          <blockquote className="font-serif italic text-[26px] leading-tight text-cream-2">“{cs.quote}”</blockquote>
          <div>
            <p className="font-mono text-[11px] tracking-[0.14em] text-gold mb-1.5">THE BRIEF</p>
            <p className="text-base leading-relaxed text-cream-2">{cs.brief}</p>
          </div>
          <div>
            <p className="font-mono text-[11px] tracking-[0.14em] text-gold mb-1.5">THE APPROACH</p>
            <p className="text-base leading-relaxed text-cream-2">{cs.approach}</p>
          </div>
          <div>
            <p className="font-mono text-[11px] tracking-[0.14em] text-gold mb-2">MY ROLE</p>
            <div className="flex flex-wrap gap-1.5">
              {v.roles.map((r) => (
                <span key={r} className="px-3 py-1 border border-line-2 rounded-full text-xs">{r}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      {metrics.length > 0 && (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-px bg-line border-t border-line">
          {metrics.map((m) => (
            <div key={m.label} className="bg-panel px-8 py-7">
              <p className="font-serif text-[56px] leading-none">{m.value}</p>
              <p className="mt-2 font-mono text-[11px] tracking-[0.12em] text-muted-2 uppercase">{m.label}</p>
            </div>
          ))}
        </div>
      )}
      <div className="flex flex-wrap justify-between items-center gap-4 px-8 py-5 border-t border-line">
        <div className="flex flex-wrap gap-4">
          {(v.awards ?? []).map((a) => (
            <span key={a} className="font-serif text-lg"><span className="text-gold">•</span> {a}</span>
          ))}
        </div>
        <button type="button" onClick={() => onWatch(v)} className="font-mono text-[13px] tracking-[0.1em] border-b border-cream pb-1 hover:text-gold hover:border-gold">
          ▸ WATCH FULL FILM
        </button>
      </div>
    </motion.section>
  );
}

type Props = {
  openId: string | null;
  onOpenCase: (id: string | null) => void;
  onWatch: (v: Video) => void;
};

export default function Work({ openId, onOpenCase, onWatch }: Props) {
  const [cat, setCat] = useState<Category | "All">("All");
  const [role, setRole] = useState<Role | "All">("All");

  const tiles = useMemo(
    () =>
      videos
        .map((v, i) => ({ v, n: i + 1 }))
        .filter(({ v }) => (cat === "All" || v.category === cat) && (role === "All" || v.roles.includes(role))),
    [cat, role]
  );
  const open = videos.find((v) => v.id === openId && v.caseStudy) ?? null;

  return (
    <>
      <section id="work" className="scroll-mt-4 border-t border-line px-6 md:px-8 pt-14 pb-6 flex flex-wrap justify-between items-center gap-4">
        <div className="flex flex-wrap gap-2">
          <Pill active={cat === "All"} onClick={() => setCat("All")}>All</Pill>
          {categories.map((c) => (
            <Pill key={c} active={cat === c} onClick={() => setCat(c)}>{c}</Pill>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[11px] tracking-[0.14em] text-gold mr-1.5">MY ROLE —</span>
          <Pill active={role === "All"} onClick={() => setRole("All")}>All</Pill>
          {allRoles.map((r) => (
            <Pill key={r} active={role === r} onClick={() => setRole(r)}>{r}</Pill>
          ))}
        </div>
      </section>

      <AnimatePresence mode="wait">
        {open && <CasePanel v={open} onClose={() => onOpenCase(null)} onWatch={onWatch} />}
      </AnimatePresence>

      <section className="px-6 md:px-8 pb-24">
        <motion.div layout className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-x-5 gap-y-12">
          <AnimatePresence>
            {tiles.map(({ v, n }) => {
              const thumb = thumbnailFor(v);
              const isOpen = v.id === openId;
              return (
                <motion.button
                  layout
                  key={v.id}
                  type="button"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => {
                    if (v.caseStudy) {
                      onOpenCase(v.id);
                      requestAnimationFrame(() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" }));
                    } else onWatch(v);
                  }}
                  className="group text-left flex flex-col"
                >
                  <div className={`relative aspect-video overflow-hidden bg-panel ${isOpen ? "outline outline-1 outline-gold outline-offset-4" : ""}`}>
                    {thumb && (
                      <Image src={thumb} alt="" fill sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                    )}
                    {v.caseStudy && (
                      <span className="absolute left-3 top-3 px-2 py-1 bg-ink/70 font-mono text-[10px] tracking-[0.12em]">CASE STUDY +</span>
                    )}
                    {(v.awards ?? []).length > 0 && (
                      <span className="absolute right-3 bottom-3 max-w-[80%] truncate px-2.5 py-1 rounded-full border border-cream/70 bg-ink/50 font-serif italic text-sm">
                        {v.awards![0]}
                        {v.awards!.length > 1 ? ` +${v.awards!.length - 1}` : ""}
                      </span>
                    )}
                  </div>
                  <div className="mt-4 flex justify-between gap-3 font-mono text-[11px] tracking-[0.1em] text-muted-2 uppercase">
                    <span>{pad(n)}.</span>
                    <span>{v.format}</span>
                  </div>
                  <span className="mt-1.5 font-serif text-[30px] leading-[1.05] group-hover:text-gold transition-colors">{v.title}</span>
                  <span className="mt-1.5 font-mono text-xs tracking-[0.08em] text-cream-3 uppercase">
                    {[v.client, v.year].filter(Boolean).join(" · ")}
                  </span>
                  <span className="mt-1.5 font-mono text-[11px] tracking-[0.1em] text-gold uppercase">{v.roles.join(" · ")}</span>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </motion.div>
        {tiles.length === 0 && <p className="mt-10 text-muted-2">No projects match this filter.</p>}
      </section>
    </>
  );
}
