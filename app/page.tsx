"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import VideoGrid from "@/components/VideoGrid";
import VideoModal from "@/components/VideoModal";
import VideoCard from "@/components/VideoCard";
import { videos } from "@/data/videos";
import type { Video } from "@/data/videos";

const featured = videos.filter((v) => v.featured);

export default function Home() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-8 overflow-hidden">
        {/* Subtle gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,169,110,0.04)_0%,_transparent_70%)] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-xs tracking-widest uppercase text-accent mb-6"
          >
            Filmmaker · Cinematographer
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(3.5rem,10vw,9rem)] font-light leading-none tracking-tight text-foreground"
          >
            Ong Chee Choon
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-6 font-sans text-sm text-muted max-w-md mx-auto leading-relaxed"
          >
            Crafting visual stories — from weddings and brand films to
            documentaries and music videos.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-10 flex items-center justify-center gap-6"
          >
            <Link
              href="/work"
              className="font-sans text-xs tracking-widest uppercase text-foreground border border-white/20 px-8 py-3 hover:border-accent hover:text-accent transition-all duration-400"
            >
              View Work
            </Link>
            <Link
              href="/hire"
              className="font-sans text-xs tracking-widest uppercase text-accent hover:text-foreground transition-colors duration-300"
            >
              Get in Touch →
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-sans text-[10px] tracking-widest uppercase text-muted">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-muted to-transparent"
          />
        </motion.div>
      </section>

      {/* Featured Work */}
      <section className="px-8 md:px-16 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-baseline justify-between mb-12 border-b border-white/5 pb-6"
        >
          <h2 className="font-display text-3xl font-light text-foreground">
            Selected Work
          </h2>
          <Link
            href="/work"
            className="font-sans text-xs tracking-widest uppercase text-muted hover:text-accent transition-colors duration-300"
          >
            All Projects →
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
          {featured.map((video, i) => (
            <VideoCard
              key={video.id}
              video={video}
              index={i}
              onClick={setSelectedVideo}
            />
          ))}
        </div>
      </section>

      <VideoModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </main>
  );
}
