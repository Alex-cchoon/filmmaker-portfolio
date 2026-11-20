"use client";

import Image from "next/image";
import Cover from "@/components/Cover";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projectHref, thumbnailFor, type Category, type Role, type Video } from "@/data/videos";

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

export function ProjectTile({ v, n }: { v: Video; n?: number }) {
  const thumb = thumbnailFor(v);
  return (
    <Link href={projectHref(v)} className="group text-left flex flex-col">
      <div className="relative aspect-video overflow-hidden bg-panel">
        {thumb ? (
          <Cover
            trim={v.trimBorder}
            src={thumb}
            alt=""
            fill
            sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <span className="absolute inset-0 flex flex-col items-center justify-center gap-3 border border-line px-6 text-center transition-colors group-hover:bg-band">
            <span className="font-serif italic text-[clamp(28px,3vw,40px)] leading-none">{v.client ?? v.title}</span>
            <span className="font-mono text-[11px] tracking-[0.14em] text-muted-2">▸ VIEW PROJECT</span>
          </span>
        )}
        {(v.awards ?? []).length > 0 && (
          <span className="absolute right-3 bottom-3 max-w-[80%] truncate px-2.5 py-1 rounded-full border border-cream/70 bg-ink/50 font-serif italic text-sm">
            {v.awards![0]}
            {v.awards!.length > 1 ? ` +${v.awards!.length - 1}` : ""}
          </span>
        )}
      </div>
      <div className="mt-4 flex justify-between gap-3 font-mono text-[11px] tracking-[0.1em] text-muted-2 uppercase">
        <span>{n !== undefined ? `${pad(n)}.` : ""}</span>
        <span>{v.format}</span>
      </div>
      <span className="mt-1.5 font-serif text-[30px] leading-[1.05] group-hover:text-gold transition-colors">{v.title}</span>
      <span className="mt-1.5 font-mono text-xs tracking-[0.08em] text-cream-3 uppercase">
        {[v.client, v.location, v.year].filter(Boolean).join(" · ")}
      </span>
      <span className="mt-1.5 font-mono text-[11px] tracking-[0.1em] text-gold uppercase">{v.roles.join(" · ")}</span>
    </Link>
  );
}

type Props = {
  videos: Video[];
  categories: Category[];
  roles: Role[];
};

export default function Work({ videos, categories, roles: allRoles }: Props) {
  const [cat, setCat] = useState<Category | "All">("All");
  const [role, setRole] = useState<Role | "All">("All");

  const tiles = useMemo(
    () =>
      videos
        .map((v, i) => ({ v, n: i + 1 }))
        .filter(({ v }) => (cat === "All" || v.category === cat) && (role === "All" || v.roles.includes(role))),
    [videos, cat, role]
  );

  return (
    <>
      <section id="work" className="scroll-mt-4 border-t border-line px-6 md:px-8 pt-14 pb-10 flex flex-wrap justify-between items-center gap-4">
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
            <Pill key={r} active={role === r} onClick={() => setRole(r)}>{r === "DP" ? "DP / Camera" : r}</Pill>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-8 pb-24">
        <motion.div layout className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,380px),1fr))] gap-x-5 gap-y-12">
          <AnimatePresence>
            {tiles.map(({ v, n }) => (
              <motion.div
                layout
                key={v.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectTile v={v} n={n} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        {tiles.length === 0 && <p className="mt-10 text-muted-2">No projects match this filter.</p>}
      </section>
    </>
  );
}
