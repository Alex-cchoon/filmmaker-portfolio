"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import FilterTags from "@/components/FilterTags";
import SearchBar from "@/components/SearchBar";
import VideoGrid from "@/components/VideoGrid";
import { videos, allTags } from "@/data/videos";

export default function WorkPage() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return videos.filter((v) => {
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((t) => v.tags.includes(t));
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        v.title.toLowerCase().includes(q) ||
        (v.client?.toLowerCase().includes(q) ?? false) ||
        v.tags.some((t) => t.includes(q)) ||
        (v.description?.toLowerCase().includes(q) ?? false);
      return matchesTags && matchesSearch;
    });
  }, [selectedTags, search]);

  return (
    <main className="min-h-screen pt-32 px-8 md:px-16 pb-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12"
      >
        <h1 className="font-display text-5xl md:text-7xl font-light text-foreground mb-2">
          Work
        </h1>
        <p className="font-sans text-sm text-muted">
          {filtered.length} project{filtered.length !== 1 ? "s" : ""}
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="mb-6"
      >
        <FilterTags
          tags={allTags}
          selected={selectedTags}
          onChange={setSelectedTags}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="mb-12 max-w-sm"
      >
        <SearchBar value={search} onChange={setSearch} />
      </motion.div>

      {/* Grid */}
      <VideoGrid videos={filtered} />
    </main>
  );
}
