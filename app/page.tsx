"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import Hero from "@/components/home/Hero";
import Work from "@/components/home/Work";
import VideoModal from "@/components/VideoModal";
import { clientCount, videos, type Video } from "@/data/videos";

const slides = videos.filter((v) => v.slide);
const firstCase = videos.find((v) => v.caseStudy)?.id ?? null;
const awardCount = videos.reduce((n, v) => n + (v.awards?.length ?? 0), 0);

export default function Home() {
  const [slide, setSlide] = useState(0);
  const [openCase, setOpenCase] = useState<string | null>(firstCase);
  const [playing, setPlaying] = useState<Video | null>(null);
  const closeModal = useCallback(() => setPlaying(null), []);

  const openFromHero = (v: Video) => {
    if (v.caseStudy) {
      setOpenCase(v.id);
      requestAnimationFrame(() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" }));
    } else {
      setPlaying(v);
    }
  };

  const stats = [
    { value: String(videos.length), label: "Films" },
    { value: String(clientCount), label: "Clients" },
    ...(awardCount > 0 ? [{ value: String(awardCount), label: "Awards & selections" }] : []),
  ];

  return (
    <main id="top" className="bg-ink text-cream">
      <Hero slides={slides} index={slide} onIndex={setSlide} onOpen={openFromHero} />

      <Work openId={openCase} onOpenCase={setOpenCase} onWatch={setPlaying} />

      {/* ── ABOUT ─────────────────────────────────────────── */}
      <section id="about" className="scroll-mt-4 bg-band border-t border-line px-6 md:px-8 py-24 flex flex-wrap gap-16 items-center">
        <div className="relative flex-[0_1_400px] w-full max-w-[400px] aspect-[4/5]">
          <Image src="/images/profile.jpg" alt="Ong Chee Choon" fill sizes="400px" className="object-cover grayscale contrast-[1.05]" />
        </div>
        <div className="flex-[1_1_460px] flex flex-col gap-8">
          <p className="font-mono text-xs tracking-[0.16em] text-gold">ABOUT</p>
          <p className="font-serif text-[clamp(30px,3.2vw,46px)] leading-[1.15]">
            A director who produces — and a producer who shoots, cuts and grades.{" "}
            <em>One person from brief to final delivery.</em>
          </p>
          <p className="text-base leading-relaxed text-cream-2 max-w-[620px]">
            I’m Ong Chee Choon, a freelance filmmaker based in Malaysia. I make documentaries, commercials and brand
            films for clients including Singapore Turf Club, NTU, TAFEP and Nexon.
          </p>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-6 border-t border-line pt-6">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-serif text-[52px] leading-none text-gold">{s.value}</p>
                <p className="mt-1.5 font-mono text-[11px] tracking-[0.12em] text-muted-2 uppercase">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ───────────────────────────────────────── */}
      <footer id="contact" className="scroll-mt-4 border-t border-line px-6 md:px-8 pt-24 pb-8">
        <p className="font-mono text-xs tracking-[0.16em] text-gold mb-4">START A PROJECT</p>
        <a href="mailto:work.cheechoon@gmail.com" className="font-serif text-[clamp(36px,6.4vw,104px)] leading-none break-words hover:text-gold transition-colors">
          work.cheechoon<em>@gmail.com</em>
        </a>
        <div className="flex flex-wrap justify-between gap-4 mt-24 text-xs tracking-[0.1em]">
          <span>© {new Date().getFullYear()} STONE SOUP</span>
          <a href="https://www.instagram.com/stonesoup.cc/" target="_blank" rel="noopener noreferrer" className="hover:text-gold">INSTAGRAM</a>
          <a href="#top" className="hover:text-gold">BACK TO TOP ↑</a>
        </div>
      </footer>

      <VideoModal video={playing} onClose={closeModal} />
    </main>
  );
}
