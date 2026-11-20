// ─────────────────────────────────────────────────────────────
// All portfolio content lives in this one file.
// To add a project: copy an entry, change the fields, save.
// Order here = order on the site.
// ─────────────────────────────────────────────────────────────

export type Role =
  | "Director"
  | "Producer"
  | "Creative"
  | "Assistant Director"
  | "DP"
  | "Editor"
  | "Colourist";

/** Order the role filter buttons appear in (only roles that are used show up). */
const ROLE_ORDER: Role[] = ["Director", "Producer", "Creative", "Assistant Director", "DP", "Editor", "Colourist"];

export type Category = "Commercial" | "Documentary" | "Corporate" | "Other";
const CATEGORY_ORDER: Category[] = ["Commercial", "Documentary", "Corporate", "Other"];

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
  /** YouTube, Vimeo or Instagram reel link. */
  url: string;
  /** Image for the tile. YouTube thumbnails are found automatically; Instagram reels need one here. */
  thumbnail?: string;
  year?: number;
  client?: string;
  /** Where it was shot, e.g. "Singapore + Vietnam". */
  location?: string;
  category: Category;
  /** Short format label, e.g. "Regional campaign". */
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

export const videos: Video[] = [
  // ── From the Canva "Director Portfolio" deck ─────────────────
  {
    id: "carlsberg-grab",
    title: "Carlsberg x Grab — Brewmaster Campaign",
    url: "https://www.youtube.com/watch?v=d6yaRvJecik",
    client: "Carlsberg x Grab",
    location: "Singapore + Vietnam",
    category: "Commercial",
    format: "Regional campaign",
    roles: ["Director"],
    description:
      "A regional campaign for Carlsberg x Grab, built around the Brewmaster as he identifies the perfect dish to pair with each Carlsberg beer. Shot on location in Singapore & Vietnam for their respective markets.",
    slide: { left: "Brewmaster", right: "Carlsberg × Grab", label: "Commercial" },
  },
  {
    id: "lkc-yu-wei",
    title: "Meet Yu Wei — Scholar Feature",
    url: "https://www.youtube.com/watch?v=JpZ4um5q4hg",
    client: "LKC School of Medicine",
    location: "Singapore",
    category: "Corporate",
    format: "Scholar feature",
    roles: ["Director", "Creative"],
    description:
      "A feature video following Tan Yu Wei, a Year 2 student at NTU's Lee Kong Chian School of Medicine and recipient of the Ong Hok Tien Scholarship. It traces his path from early academic setbacks to pursuing his dream of becoming a doctor, with the support of mentors, family, and donors.",
    slide: { left: "Meet", right: "Yu Wei", label: "Feature" },
  },
  {
    id: "adidas-ntu",
    title: "Adidas x NTU uShop",
    url: "https://www.instagram.com/reel/Db4wHNARD_8/",
    client: "Adidas",
    location: "Singapore",
    category: "Commercial",
    format: "Brand spot",
    roles: ["Director", "Producer", "Creative"],
    description:
      "A spot for Adidas' collaboration with NTU, announcing the release of new merchandise — the first-ever partnership between the brand and the institution.",
  },
  {
    id: "boulder-plus",
    title: "Boulder+",
    url: "https://www.instagram.com/reel/DZ2JiFwSiEE/",
    client: "Boulder Plus",
    location: "Singapore",
    category: "Commercial",
    format: "Brand spot",
    roles: ["Director", "Creative"],
    description:
      "A spot for one of Singapore's most popular bouldering gyms, encouraging people to join and promoting the spirit of community within Boulder+.",
  },
  {
    id: "gurasu-house",
    title: "Gurasu House",
    url: "https://www.instagram.com/reel/DXV8jcIiShI/",
    client: "Gurasu House",
    location: "Singapore + Thailand",
    category: "Commercial",
    format: "Brand spot",
    roles: ["Director", "Creative"],
    description:
      "A spot promoting Gurasu House, Singapore's premier lampworking studio. Shot in both Chiang Mai and Singapore.",
  },
  {
    id: "wkwsci-open-house",
    title: "WKWSCI Open House 2025",
    url: "https://www.youtube.com/watch?v=Gg9e4npE7vQ",
    year: 2025,
    client: "Wee Kim Wee School of Communication & Information",
    location: "Singapore",
    category: "Commercial",
    format: "Mixed-media spot",
    roles: ["Director", "Producer"],
    description: "A mixed-media spot for WKWSCI's 2025 Open House, built around the concept of blind boxes.",
    slide: { left: "Unlimited", right: "Possibilities", label: "Mixed media" },
    caseStudy: {
      quote: "Every pick reveals a different future.",
      brief: "Show prospective students the range of paths open to them at WKWSCI’s Open House 2025.",
      approach:
        "A mixed-media concept built around blind boxes — live action and animation, with each reveal landing on a new possibility.",
      metrics: [],
    },
  },
  {
    id: "nexon-10",
    title: "Nexon Engineering 10 Year Anniversary",
    url: "https://www.youtube.com/watch?v=ZnqK61xEY1Q",
    year: 2024,
    client: "Nexon Engineering",
    location: "Singapore",
    category: "Corporate",
    format: "Anniversary film",
    roles: ["Director", "Producer", "Creative"],
    description:
      "A video produced for Nexon Engineering's 10th anniversary, screened at their anniversary dinner celebration.",
    slide: { left: "Nexon", right: "Ten Years", label: "Corporate" },
  },
  {
    id: "baltek",
    title: "Baltek",
    url: "https://www.youtube.com/watch?v=iALANyNEF6c",
    year: 2023,
    client: "Khmer Swimming Federation",
    location: "Cambodia",
    category: "Documentary",
    format: "Documentary",
    roles: ["Director"],
    description:
      "A documentary following Cambodia's national water polo team as they make their debut at the 2023 SEA Games. Shot in Cambodia for the Khmer Swimming Federation.",
    slide: { left: "Baltek", right: "Cambodia’s Water Polo Team", label: "Documentary" },
    caseStudy: {
      quote: "A national team’s first SEA Games, in front of its own country.",
      brief:
        "Follow the Cambodia water polo team’s journey leading up to its debut at the 2023 Southeast Asian Games.",
      approach:
        "Stay close to the players through training and match days, and let the pressure of a home Games carry the story.",
      metrics: [],
    },
  },

  // ── More work ────────────────────────────────────────────────
  // TODO (Chee Choon): roles below are still placeholders — confirm.
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
  },
  {
    id: "tafep-fwa",
    title: "TAFEP — Flexible Work Arrangements",
    url: "https://www.youtube.com/watch?v=STMEAI608UY",
    year: 2024,
    client: "TAFEP",
    category: "Corporate",
    format: "Explainer",
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
];

/** Categories and roles that actually appear in the list above, in display order. */
export const categories: Category[] = CATEGORY_ORDER.filter((c) => videos.some((v) => v.category === c));
export const allRoles: Role[] = ROLE_ORDER.filter((r) => videos.some((v) => v.roles.includes(r)));

export function youTubeId(url: string): string | null {
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&?/]+)/);
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

export const clientCount = new Set(
  videos.map((v) => v.client).filter((c) => c && c !== "Personal")
).size;
