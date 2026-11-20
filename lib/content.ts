import "server-only";
import { cache } from "react";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";
import type { Category, Role, SiteInfo, Video } from "@/data/videos";

const reader = createReader(process.cwd(), keystaticConfig);

/** Images uploaded in the editor are stored under public/images/projects; the reader returns the bare file name. */
const IMAGE_DIR = "/images/projects/";
const imagePath = (src: string | null | undefined) =>
  !src ? undefined : /^(https?:)?\//.test(src) ? src : IMAGE_DIR + src.replace(/^\/+/, "");

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "project";

export const getVideos = cache(async (): Promise<Video[]> => {
  const data = await reader.singletons.portfolio.read();
  const projects = data?.projects ?? [];
  const used = new Set<string>();
  return projects
    .filter((p) => p.title.name && p.url)
    .map((p) => {
      // Unique page address, even if two projects share a slug by accident
      let slug = slugify(p.title.slug || p.title.name);
      for (let n = 2; used.has(slug); n++) slug = `${slugify(p.title.slug || p.title.name)}-${n}`;
      used.add(slug);

      const v: Video = {
        id: slug,
        slug,
        title: p.title.name,
        url: p.url!,
        thumbnail: imagePath(p.thumbnail),
        year: p.year ?? undefined,
        client: p.client || undefined,
        location: p.location || undefined,
        category: p.category as Category,
        format: p.format,
        roles: [...p.roles] as Role[],
        description: p.description || undefined,
        awards: p.awards.filter(Boolean),
        stills: p.stills.map(imagePath).filter((s): s is string => !!s),
        stats: p.stats.filter((s) => s.value || s.label),
        credits: p.credits.filter((c) => c.role || c.name),
      };
      if (p.slide.discriminant) v.slide = { ...p.slide.value };
      if (p.caseStudy.discriminant) v.caseStudy = { ...p.caseStudy.value };
      return v;
    });
});

export const getSite = cache(async (): Promise<SiteInfo> => {
  const s = await reader.singletons.site.read();
  return {
    tagline: s?.tagline || "Director / Producer",
    aboutHeadline: s?.aboutHeadline || "",
    aboutText: s?.aboutText || "",
    yearsExperience: s?.yearsExperience || "",
    email: s?.email || "work.cheechoon@gmail.com",
    instagram: s?.instagram || "https://www.instagram.com/stonesoup.cc/",
  };
});
