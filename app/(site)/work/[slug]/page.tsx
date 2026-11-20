import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import VideoEmbed from "@/components/project/VideoEmbed";
import Stills from "@/components/project/Stills";
import { ProjectTile } from "@/components/home/Work";
import { getSite, getVideos } from "@/lib/content";
import { thumbnailFor } from "@/data/videos";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const videos = await getVideos();
  return videos.map((v) => ({ slug: v.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const v = (await getVideos()).find((x) => x.slug === slug);
  if (!v) return {};
  const image = v.stills[0] ?? thumbnailFor(v) ?? undefined;
  return {
    title: `${v.title} — Ong Chee Choon`,
    description: v.description,
    openGraph: {
      title: v.title,
      description: v.description,
      images: image ? [image] : undefined,
    },
  };
}

const Label = ({ children }: { children: React.ReactNode }) => (
  <p className="font-mono text-[11px] tracking-[0.16em] text-gold uppercase mb-3">{children}</p>
);

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const [videos, site] = await Promise.all([getVideos(), getSite()]);
  const i = videos.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const v = videos[i];
  const more = [videos[(i + 1) % videos.length], videos[(i + 2) % videos.length]].filter(
    (x, k, arr) => x.slug !== v.slug && arr.findIndex((y) => y.slug === x.slug) === k
  );
  const [emailUser, emailDomain] = site.email.split("@");

  return (
    <main id="top" className="bg-ink text-cream min-h-screen">
      {/* Header */}
      <header className="flex flex-wrap items-start justify-between gap-6 px-6 md:px-8 py-6">
        <Link href="/" className="flex flex-col gap-1.5">
          <span className="font-serif italic text-[28px] leading-none">Ong Chee Choon</span>
          <span className="text-[11px] tracking-[0.12em] uppercase">• {site.tagline}</span>
        </Link>
        <nav className="flex gap-8 md:gap-10 text-xs tracking-[0.1em] pt-1.5">
          <Link href="/#work" className="hover:text-gold">← ALL WORK</Link>
          <Link href="/#about" className="hover:text-gold">ABOUT</Link>
          <Link href="/#contact" className="hover:text-gold">CONTACT</Link>
        </nav>
      </header>

      {/* Title */}
      <section className="px-6 md:px-8 pt-12 md:pt-20 pb-10 text-center flex flex-col items-center gap-5">
        <p className="font-mono text-xs tracking-[0.12em] uppercase text-muted-2">
          {[v.format, v.category].filter(Boolean).join(" · ")}
        </p>
        <h1 className="font-serif font-normal text-[clamp(44px,7vw,112px)] leading-[0.95] max-w-[1100px]">{v.title}</h1>
        <p className="font-mono text-xs tracking-[0.1em] uppercase text-cream-3">
          {[v.client, v.location, v.year].filter(Boolean).join(" · ")}
        </p>
      </section>

      {/* Film */}
      <section className="px-6 md:px-8 max-w-[1280px] mx-auto">
        <VideoEmbed v={v} />
      </section>

      {/* Role + about */}
      <section className="px-6 md:px-8 max-w-[1100px] mx-auto py-16 md:py-20 flex flex-wrap gap-x-16 gap-y-10">
        <div className="flex-[0_0_220px]">
          <Label>My role</Label>
          <ul className="flex flex-col gap-1.5 font-serif text-2xl">
            {v.roles.map((r) => (
              <li key={r}>{r === "DP" ? "DP / Camera" : r}</li>
            ))}
          </ul>
        </div>
        <div className="flex-[1_1_480px] flex flex-col gap-8">
          {v.caseStudy?.quote && (
            <blockquote className="font-serif italic text-[clamp(26px,2.6vw,36px)] leading-tight">“{v.caseStudy.quote}”</blockquote>
          )}
          {v.description && <p className="text-lg leading-relaxed text-cream-2 whitespace-pre-line">{v.description}</p>}
          {v.caseStudy?.brief && (
            <div>
              <Label>The brief</Label>
              <p className="text-base leading-relaxed text-cream-2 whitespace-pre-line">{v.caseStudy.brief}</p>
            </div>
          )}
          {v.caseStudy?.approach && (
            <div>
              <Label>The approach</Label>
              <p className="text-base leading-relaxed text-cream-2 whitespace-pre-line">{v.caseStudy.approach}</p>
            </div>
          )}
        </div>
      </section>

      {/* Quick facts */}
      {v.stats.length > 0 && (
        <section className="px-6 md:px-8 pb-16 md:pb-20 flex flex-wrap justify-center items-baseline gap-x-6 gap-y-3 text-center">
          {v.stats.map((s, k) => (
            <span key={k} className="flex items-baseline gap-2">
              {k > 0 && <span aria-hidden className="text-line-2 mr-4">|</span>}
              <span className="font-serif text-[clamp(40px,4vw,60px)] leading-none text-gold">{s.value}</span>
              <span className="font-mono text-xs tracking-[0.14em] uppercase">{s.label}</span>
            </span>
          ))}
        </section>
      )}

      {/* Stills */}
      {v.stills.length > 0 && (
        <section className="px-6 md:px-8 pb-20 max-w-[1280px] mx-auto">
          <Stills stills={v.stills} title={v.title} />
        </section>
      )}

      {/* Credits + awards */}
      {(v.credits.length > 0 || (v.awards ?? []).length > 0) && (
        <section className="px-6 md:px-8 pb-24 flex flex-col items-center gap-14 text-center">
          {v.credits.length > 0 && (
            <div className="flex flex-col items-center">
              <h2 className="font-serif font-normal text-[clamp(36px,3.6vw,52px)] mb-8">Credits</h2>
              <dl className="flex flex-col gap-2.5">
                {v.credits.map((c, k) => (
                  <div key={k} className="flex flex-wrap justify-center gap-x-3">
                    <dt className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted-2 pt-1">{c.role}</dt>
                    <dd className="text-base">{c.name}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
          {(v.awards ?? []).length > 0 && (
            <div className="flex flex-col items-center gap-3">
              <Label>Awards &amp; selections</Label>
              {v.awards!.map((a) => (
                <p key={a} className="font-serif text-2xl">
                  <span className="text-gold">•</span> {a}
                </p>
              ))}
            </div>
          )}
        </section>
      )}

      {/* More work */}
      {more.length > 0 && (
        <section className="border-t border-line px-6 md:px-8 pt-16 pb-24">
          <div className="flex flex-wrap justify-between items-baseline gap-4 mb-10">
            <h2 className="font-serif font-normal text-[clamp(32px,3.2vw,48px)]">You may also like</h2>
            <Link href="/#work" className="font-mono text-xs tracking-[0.12em] border-b border-cream pb-1 hover:text-gold hover:border-gold">
              ALL WORK →
            </Link>
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,420px),1fr))] gap-x-5 gap-y-12">
            {more.map((m) => (
              <ProjectTile key={m.slug} v={m} />
            ))}
          </div>
        </section>
      )}

      {/* Contact */}
      <footer className="border-t border-line px-6 md:px-8 pt-16 pb-8">
        <p className="font-mono text-xs tracking-[0.16em] text-gold mb-4">START A PROJECT</p>
        <a href={`mailto:${site.email}`} className="font-serif text-[clamp(32px,5vw,80px)] leading-none break-words hover:text-gold transition-colors">
          {emailUser}
          {emailDomain && <em>@{emailDomain}</em>}
        </a>
        <div className="flex flex-wrap justify-between gap-4 mt-16 text-xs tracking-[0.1em]">
          <span>© {new Date().getFullYear()} STONE SOUP</span>
          <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-gold">INSTAGRAM</a>
          <a href="#top" className="hover:text-gold">BACK TO TOP ↑</a>
        </div>
      </footer>
    </main>
  );
}
