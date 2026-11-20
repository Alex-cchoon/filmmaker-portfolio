// Types and helpers for portfolio projects.
// The projects themselves are edited at /keystatic and stored in content/portfolio.yaml.

export type Role =
  | "Director"
  | "Producer"
  | "Creative"
  | "Assistant Director"
  | "DP"
  | "Editor"
  | "Colourist";

const ROLE_ORDER: Role[] = ["Director", "Producer", "Creative", "Assistant Director", "DP", "Editor", "Colourist"];

export type Category = "Commercial" | "Documentary" | "Corporate" | "Other";
const CATEGORY_ORDER: Category[] = ["Commercial", "Documentary", "Corporate", "Other"];

export type Stat = { value: string; label: string };
export type Credit = { role: string; name: string };

export type CaseStudy = {
  quote: string;
  brief: string;
  approach: string;
};

export type Video = {
  id: string;
  /** Page address: /work/<slug> */
  slug: string;
  title: string;
  url: string;
  thumbnail?: string;
  year?: number;
  client?: string;
  location?: string;
  category: Category;
  format: string;
  roles: Role[];
  description?: string;
  awards?: string[];
  stills: string[];
  stats: Stat[];
  credits: Credit[];
  slide?: { left: string; right: string; label: string };
  caseStudy?: CaseStudy;
};

export type SiteInfo = {
  tagline: string;
  aboutHeadline: string;
  aboutText: string;
  yearsExperience: string;
  email: string;
  instagram: string;
};

/** Categories / roles that actually appear in the projects, in display order. */
export const categoriesIn = (videos: Video[]) => CATEGORY_ORDER.filter((c) => videos.some((v) => v.category === c));
export const rolesIn = (videos: Video[]) => ROLE_ORDER.filter((r) => videos.some((v) => v.roles.includes(r)));

export const clientCountIn = (videos: Video[]) =>
  new Set(videos.map((v) => v.client).filter((c) => c && c !== "Personal")).size;

export const projectHref = (v: Video) => `/work/${v.slug}`;

export function youTubeId(url: string): string | null {
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([^&?/]+)/);
  return m ? m[1] : null;
}

/** Instagram reel / post link → embeddable URL, or null if not Instagram. */
export function instagramEmbed(url: string): string | null {
  const m = url.match(/instagram\.com\/(reel|p)\/([^/?#]+)/);
  return m ? `https://www.instagram.com/${m[1]}/${m[2]}/embed` : null;
}

export function thumbnailFor(v: Video): string | null {
  if (v.thumbnail) return v.thumbnail;
  const id = youTubeId(v.url);
  return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : null;
}
