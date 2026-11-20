import "server-only";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";
import type { Category, Role, SiteInfo, Video } from "@/data/videos";

const reader = createReader(process.cwd(), keystaticConfig);

const slugify = (s: string, i: number) =>
  `${i}-${s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;

export async function getVideos(): Promise<Video[]> {
  const data = await reader.singletons.portfolio.read();
  const projects = data?.projects ?? [];
  return projects
    .filter((p) => p.title && p.url)
    .map((p, i) => {
      const v: Video = {
        id: slugify(p.title, i),
        title: p.title,
        url: p.url!,
        thumbnail: p.thumbnail || undefined,
        year: p.year ?? undefined,
        client: p.client || undefined,
        location: p.location || undefined,
        category: p.category as Category,
        format: p.format,
        roles: [...p.roles] as Role[],
        description: p.description || undefined,
        awards: p.awards.filter(Boolean),
      };
      if (p.slide.discriminant) v.slide = { ...p.slide.value };
      if (p.caseStudy.discriminant) {
        const c = p.caseStudy.value;
        v.caseStudy = {
          quote: c.quote,
          brief: c.brief,
          approach: c.approach,
          metrics: c.metrics.filter((m) => m.value),
        };
      }
      return v;
    });
}

export async function getSite(): Promise<SiteInfo> {
  const s = await reader.singletons.site.read();
  return {
    tagline: s?.tagline || "Director / Producer",
    aboutHeadline: s?.aboutHeadline || "",
    aboutText: s?.aboutText || "",
    yearsExperience: s?.yearsExperience || "",
    email: s?.email || "work.cheechoon@gmail.com",
    instagram: s?.instagram || "https://www.instagram.com/stonesoup.cc/",
  };
}
