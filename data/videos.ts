export type Video = {
  id: string;
  title: string;
  url: string;
  previewUrl?: string;
  thumbnail?: string;
  tags: string[];
  year: number;
  client?: string;
  description?: string;
  featured?: boolean;
};

export const videos: Video[] = [
  {
    id: "1",
    title: "Kranji Cats Awareness Video",
    url: "https://www.youtube.com/watch?v=1istFJpTvTc",
    tags: ["documentary", "awareness"],
    year: 2024,
    client: "Singapore Turf Club",
    description: "A film raising awareness about the plight of the wild cats at the Singapore Turf Club as it prepares to end its operations.",
    featured: true,
  },
  {
    id: "2",
    title: "Moments Before Magic",
    url: "https://www.youtube.com/watch?v=xQyh9HBzHMA",
    tags: ["documentary"],
    year: 2024,
    client: "Theatre of Wonder",
    description: "A feature piece showcasing Kai Emmanuel, a magician from The Magic Bar — a hidden spot for top illusionists to perform to intimate groups.",
    featured: true,
  },
  {
    id: "3",
    title: "NTU Open House 2025 — WKWSCI Unlimited Possibilities",
    url: "https://www.youtube.com/watch?v=Gg9e4npE7vQ",
    tags: ["commercial", "promotional"],
    year: 2025,
    client: "NTU / WKWSCI",
    description: "A fun and energetic promotional film for WKWSCI's Open House, inspired by board games and blind boxes — showcasing the unlimited possibilities for every student.",
    featured: true,
  },
  {
    id: "4",
    title: "Baltek — Cambodian National Team Documentary",
    url: "https://www.youtube.com/watch?v=iALANyNEF6c",
    tags: ["documentary", "sports"],
    year: 2023,
    client: "Khmer Swimming Federation",
    description: "Follows the Cambodia Water Polo team's journey leading up to their debut in the 2023 Southeast Asian Games, held in their home country.",
    featured: true,
  },
  {
    id: "5",
    title: "Nexon Engineering 10th Anniversary Film",
    url: "https://www.youtube.com/watch?v=ZnqK61xEY1Q",
    tags: ["corporate", "documentary"],
    year: 2024,
    client: "Nexon",
    description: "A commemorative film taking viewers on a nostalgic journey through Nexon's history — showcasing the growth, achievements, and milestones of their first decade.",
  },
  {
    id: "6",
    title: "TAFEP — Flexible Work Arrangements",
    url: "https://www.youtube.com/watch?v=STMEAI608UY",
    tags: ["commercial", "awareness"],
    year: 2024,
    client: "TAFEP",
    description: "A 60-second commercial and series of 9 shorts raising awareness about Flexible Work Arrangement policies available to employees.",
  },
  {
    id: "7",
    title: "Inter-FrisWee Teaser",
    url: "https://www.youtube.com/watch?v=FQv12FhUVmA",
    tags: ["event", "short film"],
    year: 2024,
    description: "A short teaser film for a school frisbee event.",
  },
  {
    id: "8",
    title: "Umeå: First Impressions",
    url: "https://www.youtube.com/watch?v=opRoQSCMVMI",
    tags: ["vlog", "personal"],
    year: 2024,
    description: "A fun vlog featuring friends made during a university exchange semester in the beautiful Umeå, Sweden.",
  },
  {
    id: "9",
    title: "The Meat Club — Video 1",
    url: "https://www.youtube.com/watch?v=M9SxX22xKG4",
    tags: ["commercial", "brand"],
    year: 2024,
    client: "The Meat Club",
  },
  {
    id: "10",
    title: "The Meat Club — Video 2",
    url: "https://www.youtube.com/watch?v=aOl31KmTHWM",
    tags: ["commercial", "brand"],
    year: 2024,
    client: "The Meat Club",
  },
  {
    id: "11",
    title: "The Meat Club — Video 3",
    url: "https://www.youtube.com/watch?v=ia6-3v03wGk",
    tags: ["commercial", "brand"],
    year: 2024,
    client: "The Meat Club",
  },
];

export const allTags = Array.from(
  new Set(videos.flatMap((v) => v.tags))
).sort();
