"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/** Two-column grid of stills; click one to view it full screen. */
export default function Stills({ stills, title }: { stills: string[]; title: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (d: number) => setOpen((i) => (i === null ? i : (i + d + stills.length) % stills.length)),
    [stills.length]
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, step]);

  return (
    <>
      <div className="columns-1 sm:columns-2 gap-3 [&>*]:mb-3">
        {stills.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setOpen(i)}
            aria-label={`View still ${i + 1} of ${stills.length}`}
            className="group relative block w-full overflow-hidden break-inside-avoid bg-panel"
          >
            <Image
              src={src}
              alt={`${title} — still ${i + 1}`}
              width={1200}
              height={800}
              sizes="(min-width: 640px) 50vw, 100vw"
              className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.02]"
            />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-ink/95 flex items-center justify-center p-4 md:p-12"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={`${title} — still ${open + 1} of ${stills.length}`}
          >
            <div className="relative w-full h-full" onClick={(e) => e.stopPropagation()}>
              <Image src={stills[open]} alt="" fill sizes="100vw" className="object-contain" />
            </div>
            <button type="button" onClick={close} className="absolute top-5 right-6 font-mono text-xs tracking-[0.12em] text-muted-2 hover:text-cream px-2 py-2">
              CLOSE ✕
            </button>
            {stills.length > 1 && (
              <>
                <button type="button" onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Previous still" className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 font-mono text-xs tracking-[0.12em] px-3 py-6 hover:text-gold">
                  PREV
                </button>
                <button type="button" onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Next still" className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 font-mono text-xs tracking-[0.12em] px-3 py-6 hover:text-gold">
                  NEXT
                </button>
                <span className="absolute bottom-5 left-1/2 -translate-x-1/2 font-mono text-xs text-muted-2">
                  {open + 1} / {stills.length}
                </span>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
