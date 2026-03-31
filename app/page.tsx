"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import VideoCard from "@/components/VideoCard";
import VideoModal from "@/components/VideoModal";
import FilterTags from "@/components/FilterTags";
import SearchBar from "@/components/SearchBar";
import { videos, allTags } from "@/data/videos";
import type { Video } from "@/data/videos";

export default function Home() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
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
        v.tags.some((t) => t.includes(q));
      return matchesTags && matchesSearch;
    });
  }, [selectedTags, search]);

  return (
    <main>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        id="hero"
        className="min-h-screen flex flex-col items-center justify-center px-6 md:px-12 text-center relative overflow-hidden"
      >
        {/* Background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(5,223,114,0.04)_0%,_transparent_65%)] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xs font-medium tracking-widest uppercase text-accent mb-6"
          >
            Filmmaker · Cinematographer
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="text-[clamp(2.5rem,8vw,7rem)] font-bold tracking-tighter leading-none text-foreground uppercase"
          >
            Capturing The<br />
            <span className="text-accent">Unseen</span> Narrative
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-6 text-sm text-stone-400 max-w-md mx-auto leading-relaxed"
          >
            Crafting visual stories — weddings, brand films, documentaries, and music videos.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            className="mt-10 flex items-center justify-center gap-4 flex-wrap"
          >
            <a
              href="#work"
              className="text-xs font-semibold tracking-widest uppercase px-8 py-3 border border-white text-white hover:bg-white hover:text-black transition-all duration-300 hover:scale-105 rounded-sm"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="text-xs font-semibold tracking-widest uppercase px-8 py-3 border border-stone-700 text-stone-400 hover:border-accent hover:text-accent transition-all duration-300 hover:scale-105 rounded-sm"
            >
              Hire Me
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] tracking-widest uppercase text-stone-600">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-stone-600 to-transparent"
          />
        </motion.div>
      </section>

      {/* ── WORK ─────────────────────────────────────────────── */}
      <section id="work" className="px-6 md:px-12 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <div className="flex items-baseline justify-between mb-2">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase text-foreground">
              Selected Works
            </h2>
            <span className="text-sm text-stone-500">{videos.length} Projects</span>
          </div>
          <div className="h-px bg-stone-800 mt-4 mb-8" />

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between mb-8">
            <FilterTags
              tags={allTags}
              selected={selectedTags}
              onChange={setSelectedTags}
            />
            <div className="w-full sm:w-56 shrink-0">
              <SearchBar value={search} onChange={setSearch} />
            </div>
          </div>
        </motion.div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <p className="text-sm text-stone-500 py-16 text-center">No projects match your search.</p>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((video, i) => (
                <VideoCard key={video.id} video={video} index={i} onClick={setSelectedVideo} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      {/* ── ABOUT ────────────────────────────────────────────── */}
      <section id="about" className="px-6 md:px-12 py-24 border-t border-stone-800">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[3/4] bg-stone-900 border border-stone-800 rounded-sm overflow-hidden"
          >
            <div className="absolute inset-0 flex items-end p-6">
              <p className="text-xs text-stone-600 tracking-widest uppercase">
                Add photo → /public/images/profile.jpg
              </p>
            </div>
            {/* Uncomment once you add the photo:
            <Image src="/images/profile.jpg" alt="Ong Chee Choon" fill className="object-cover" priority />
            */}
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <p className="text-xs font-medium tracking-widest uppercase text-accent mb-4">About</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter uppercase text-foreground mb-6">
              Ong Chee Choon
            </h2>

            <div className="space-y-4 text-sm text-stone-400 leading-relaxed">
              <p>
                I&apos;m a freelance filmmaker and cinematographer based in Malaysia.
                I create visual stories for brands, couples, artists, and independent
                productions — bringing craft and intention to every frame.
              </p>
              <p>
                From weddings and documentaries to brand films and music videos,
                I approach each project with a genuine curiosity and an eye for the
                moments that make a film feel alive.
              </p>
            </div>

            {/* Services */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              {["Direction", "Cinematography", "Editing", "Color Grading"].map((s) => (
                <div key={s} className="border border-stone-800 rounded-sm px-4 py-3">
                  <span className="text-xs font-medium tracking-wide text-stone-300">{s}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex gap-6">
              {["Instagram", "Vimeo", "YouTube"].map((s) => (
                <a key={s} href="#" className="text-xs tracking-widest uppercase text-stone-500 hover:text-accent transition-colors duration-300">
                  {s}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────── */}
      <section id="contact" className="px-6 md:px-12 py-24 border-t border-stone-800">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs font-medium tracking-widest uppercase text-accent mb-4">Get in Touch</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase text-foreground mb-4">
              Let&apos;s Create<br />Together
            </h2>
            <p className="text-sm text-stone-400 mb-10">
              Available for projects. Reach out at{" "}
              <a href="mailto:work.cheechoon@gmail.com" className="text-accent hover:underline">
                work.cheechoon@gmail.com
              </a>
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            action={`mailto:work.cheechoon@gmail.com`}
            method="POST"
            encType="text/plain"
            className="space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-xs tracking-widest uppercase text-stone-500 block mb-2">Name</label>
                <input
                  name="name"
                  type="text"
                  placeholder="Your name"
                  className="w-full bg-transparent border-b border-stone-800 focus:border-white outline-none text-sm text-foreground placeholder:text-stone-700 py-2 transition-colors duration-300"
                />
              </div>
              <div>
                <label className="text-xs tracking-widest uppercase text-stone-500 block mb-2">Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  className="w-full bg-transparent border-b border-stone-800 focus:border-white outline-none text-sm text-foreground placeholder:text-stone-700 py-2 transition-colors duration-300"
                />
              </div>
            </div>
            <div>
              <label className="text-xs tracking-widest uppercase text-stone-500 block mb-2">Project Type</label>
              <input
                name="project"
                type="text"
                placeholder="Wedding film, commercial, documentary..."
                className="w-full bg-transparent border-b border-stone-800 focus:border-white outline-none text-sm text-foreground placeholder:text-stone-700 py-2 transition-colors duration-300"
              />
            </div>
            <div>
              <label className="text-xs tracking-widest uppercase text-stone-500 block mb-2">Message</label>
              <textarea
                name="message"
                rows={4}
                placeholder="Tell me about your project..."
                className="w-full bg-transparent border-b border-stone-800 focus:border-white outline-none text-sm text-foreground placeholder:text-stone-700 py-2 transition-colors duration-300 resize-none"
              />
            </div>
            <button
              type="submit"
              className="text-xs font-semibold tracking-widest uppercase px-10 py-4 border border-white text-white hover:bg-white hover:text-black transition-all duration-300 hover:scale-105 rounded-sm"
            >
              Send Message
            </button>
          </motion.form>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer className="px-6 md:px-12 py-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-stone-600">
          © 2025 Ong Chee Choon. All rights reserved.
        </p>
        <div className="flex gap-6">
          {["Instagram", "Vimeo", "YouTube"].map((s) => (
            <a key={s} href="#" className="text-xs tracking-widest uppercase text-stone-600 hover:text-accent transition-colors duration-300">
              {s}
            </a>
          ))}
        </div>
      </footer>

      <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
    </main>
  );
}
