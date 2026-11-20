"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Hero from "@/components/home/Hero";
import Work from "@/components/home/Work";
import { categoriesIn, clientCountIn, projectHref, rolesIn, type SiteInfo, type Video } from "@/data/videos";

/** First sentence upright, the rest in italics — matches the original design. */
function Headline({ text }: { text: string }) {
  const i = text.search(/[.!?—]\s/);
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i + 1)} <em>{text.slice(i + 2)}</em>
    </>
  );
}

export default function HomeClient({ videos, site }: { videos: Video[]; site: SiteInfo }) {
  const slides = videos.filter((v) => v.slide);
  const awardCount = videos.reduce((n, v) => n + (v.awards?.length ?? 0), 0);

  const [slide, setSlide] = useState(0);
  const router = useRouter();
  const openFromHero = (v: Video) => router.push(projectHref(v));

  const stats = [
    { value: String(videos.length), label: "Films" },
    { value: String(clientCountIn(videos)), label: "Clients" },
    ...(site.yearsExperience ? [{ value: site.yearsExperience, label: "Years" }] : []),
    ...(awardCount > 0 ? [{ value: String(awardCount), label: "Awards & selections" }] : []),
  ];
  const [emailUser, emailDomain] = site.email.split("@");

  return (
    <main id="top" className="bg-ink text-cream">
      {slides.length > 0 && (
        <Hero slides={slides} index={slide} onIndex={setSlide} onOpen={openFromHero} tagline={site.tagline} />
      )}

      <Work
        videos={videos}
        categories={categoriesIn(videos)}
        roles={rolesIn(videos)}
      />

      {/* ── ABOUT ─────────────────────────────────────────── */}
      <section id="about" className="scroll-mt-4 bg-band border-t border-line px-6 md:px-8 py-24 flex flex-wrap gap-16 items-center">
        <div className="relative flex-[0_1_400px] w-full max-w-[400px] aspect-[4/5]">
          <Image src="/images/profile.jpg" alt="Ong Chee Choon" fill sizes="400px" className="object-cover grayscale contrast-[1.05]" />
        </div>
        <div className="flex-[1_1_460px] flex flex-col gap-8">
          <p className="font-mono text-xs tracking-[0.16em] text-gold">ABOUT</p>
          {site.aboutHeadline && (
            <p className="font-serif text-[clamp(30px,3.2vw,46px)] leading-[1.15]">
              <Headline text={site.aboutHeadline} />
            </p>
          )}
          {site.aboutText && (
            <p className="text-base leading-relaxed text-cream-2 max-w-[620px] whitespace-pre-line">{site.aboutText}</p>
          )}
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
        <a href={`mailto:${site.email}`} className="font-serif text-[clamp(36px,6.4vw,104px)] leading-none break-words hover:text-gold transition-colors">
          {emailUser}
          {emailDomain && <em>@{emailDomain}</em>}
        </a>
        <div className="flex flex-wrap justify-between gap-4 mt-24 text-xs tracking-[0.1em]">
          <span>© {new Date().getFullYear()} STONE SOUP</span>
          <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-gold">INSTAGRAM</a>
          <a href="#top" className="hover:text-gold">BACK TO TOP ↑</a>
        </div>
      </footer>
    </main>
  );
}
