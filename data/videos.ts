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
    title: "Golden Hour",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    tags: ["wedding", "cinematic"],
    year: 2024,
    client: "Private",
    description: "An intimate wedding film shot across a single golden afternoon.",
    featured: true,
  },
  {
    id: "2",
    title: "Brand Manifesto",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    tags: ["commercial", "brand"],
    year: 2024,
    client: "Sample Brand",
    description: "A visual identity film exploring the soul of a new brand.",
    featured: true,
  },
  {
    id: "3",
    title: "Between Frames",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    tags: ["documentary", "short film"],
    year: 2023,
    description: "A short documentary on the act of seeing.",
    featured: true,
  },
  {
    id: "4",
    title: "Pulse",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    tags: ["music video"],
    year: 2023,
    client: "Sample Artist",
    description: "High-energy performance music video.",
  },
  {
    id: "5",
    title: "Corporate Reel 2024",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    tags: ["commercial", "corporate"],
    year: 2024,
    client: "Various",
    description: "Compilation of corporate work from 2024.",
  },
  {
    id: "6",
    title: "Still Waters",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    tags: ["wedding", "cinematic"],
    year: 2023,
    description: "A contemplative wedding film.",
    featured: true,
  },
];

export const allTags = Array.from(
  new Set(videos.flatMap((v) => v.tags))
).sort();
