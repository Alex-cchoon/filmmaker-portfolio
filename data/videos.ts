// ─────────────────────────────────────────────────────────────
// All portfolio content lives in this one file.
// To add a project: copy an entry, change the fields, save.
// ─────────────────────────────────────────────────────────────

export type Role =
  | "Director"
  | "Producer"
  | "DP"
  | "Editor"
  | "Colourist";

export type Category = "Documentary" | "Commercial" | "Corporate" | "Other";

export type Metric = { value: string; label: string };

export type CaseStudy = {
  quote: string;
  brief: string;
  approach: string;
  /** Big numbers shown in the case study grid. Leave empty to hide the grid. */
  metrics?: Metric[];
};

export type Video = {
  id: string;
  title: string;
  url: string;
  thumbnail?: string;
  year: number;
  client?: string;
  category: Category;
  /** Short format label, e.g. "Short documentary". */
  format: string;
  /** What you did on this project. */
  roles: Role[];
  description?: string;
  /** Awards / festival selections, e.g. "Official Selection · SGIFF 2024". */
  awards?: string[];
  /** Show in the opening slider. Title is split left / right of the frame. */
  slide?: { left: string; right: string; label: string };
  /** Adds a "Case study" panel for this project. */
  caseStudy?: CaseStudy;
};

// TODO (Chee Choon): roles below are placeholders — confirm before going live.
export const videos: Video[] = [
  {
    id: "unlimited-possibilities",
    title: "Unlimited Possibilities",
    url: "https://www.youtube.com/watch?v=Gg9e4npE7vQ",
    year: 2025,
    client: "NTU / WKWSCI",
    category: "Commercial",
    format: "Promotional film",
    roles: ["Director", "Producer", "Editor", "Colourist"],
    description:
      "A fun and energetic promotional film for WKWSCI's Open House, inspired by board games and blind boxes — showcasing the unlimited possibilities for every student.",
    slide: { left: "Unlimited", right: "Possibilities", label: "Commercial" },
    caseStudy: {
      quote: "Every pick reveals a different future.",
      brief:
        "Show prospective students the range of paths open to them at WKWSCI’s Open House 2025.",
      approach:
        "A playful concept built on board games and blind boxes — each reveal lands on a new possibility.",
      metrics: [],
    },
  },
  {
    id: "baltek",
    title: "Baltek",
    url: "https://www.youtube.com/watch?v=iALANyNEF6c",
    year: 2023,
    client: "Khmer Swimming Federation",
    category: "Documentary",
    format: "Sports documentary",
    roles: ["Director", "Producer", "DP"],
    description:
      "Follows the Cambodia Water Polo team's journey leading up to their debut in the 2023 Southeast Asian Games, held in their home country.",
    slide: { left: "Baltek", right: "Cambodia’s Water Polo Team", label: "TV & Film" },
    caseStudy: {
      quote: "A national team’s first SEA Games, in front of its own country.",
      brief:
        "Follow the Cambodia water polo team’s journey leading up to its debut at the 2023 Southeast Asian Games.",
      approach:
        "Stay close to the players through training and match days, and let the pressure of a home Games carry the story.",
      metrics: [],
    },
  },
  {
    id: "moments-before-magic",
    title: "Moments Before Magic",
    url: "https://www.youtube.com/watch?v=xQyh9HBzHMA",
    year: 2024,
    client: "Theatre of Wonder",
    category: "Documentary",
    format: "Documentary",
    roles: ["Director", "DP", "Editor"],
    description:
      "A feature piece showcasing Kai Emmanuel, a magician from The Magic Bar — a hidden spot for top illusionists to perform to intimate groups.",
    slide: { left: "Moments", right: "Before Magic", label: "Profile" },
    caseStudy: {
      quote: "The minutes before the trick are the story.",
      brief:
        "Showcase magician Kai Emmanuel and The Magic Bar — a hidden spot where top illusionists perform for intimate groups.",
      approach:
        "Warm, intimate coverage before and during the show — hands, faces and the reactions of a small crowd.",
      metrics: [],
    },
  },
  {
    id: "nexon-10",
    title: "Nexon Engineering 10th Anniversary Film",
    url: "https://www.youtube.com/watch?v=ZnqK61xEY1Q",
    year: 2024,
    client: "Nexon",
    category: "Corporate",
    format: "Corporate film",
    roles: ["Director", "Producer"],
    description:
      "A commemorative film taking viewers on a nostalgic journey through Nexon's history — showcasing the growth, achievements, and milestones of their first decade.",
    slide: { left: "Nexon", right: "Ten Years", label: "Corporate" },
  },
  {
    id: "tafep-fwa",
    title: "TAFEP — Flexible Work Arrangements",
    url: "https://www.youtube.com/watch?v=STMEAI608UY",
    year: 2024,
    client: "TAFEP",
    category: "Commercial",
    format: "Commercial",
    roles: ["DP", "Editor"],
  },
  {
    id: "meat-club-1",
    title: "The Meat Club — Video 1",
    url: "https://www.youtube.com/watch?v=M9SxX22xKG4",
    year: 2024,
    client: "The Meat Club",
    category: "Commercial",
    format: "Brand film",
    roles: ["Producer", "DP", "Editor"],
  },
  {
    id: "meat-club-2",
    title: "The Meat Club — Video 2",
    url: "https://www.youtube.com/watch?v=aOl31KmTHWM",
    year: 2024,
    client: "The Meat Club",
    category: "Commercial",
    format: "Brand film",
    roles: ["Producer", "DP", "Editor"],
  },
  {
    id: "meat-club-3",
    title: "The Meat Club — Video 3",
    url: "https://www.youtube.com/watch?v=ia6-3v03wGk",
    year: 2024,
    client: "The Meat Club",
    category: "Commercial",
    format: "Brand film",
    roles: ["Producer", "DP", "Editor"],
  },
  {
    id: "inter-frisWee",
    title: "Inter-FrisWee Teaser",
    url: "https://www.youtube.com/watch?v=FQv12FhUVmA",
    year: 2024,
    category: "Other",
    format: "Event teaser",
    roles: ["Director", "Editor"],
  },
  {
    id: "umea",
    title: "Umeå: First Impressions",
    url: "https://www.youtube.com/watch?v=opRoQSCMVMI",
    year: 2024,
    client: "Personal",
    category: "Other",
    format: "Travel film",
    roles: ["Director", "DP", "Editor"],
  },
];

export const categories: Category[] = ["Documentary", "Commercial", "Corporate", "Other"];
export const allRoles: Role[] = ["Director", "Producer", "DP", "Editor", "Colourist"];

export function youTubeId(url: string): string | null {
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&?/]+)/);
  return m ? m[1] : null;
}

export function thumbnailFor(v: Video): string | null {
  if (v.thumbnail) return v.thumbnail;
  const id = youTubeId(v.url);
  return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : null;
}

export const clientCount = new Set(
  videos.map((v) => v.client).filter((c) => c && c !== "Personal")
).size;
