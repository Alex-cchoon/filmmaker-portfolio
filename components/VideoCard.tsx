"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";
import type { Video } from "@/data/videos";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

function getYouTubeThumbnail(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&?/]+)/
  );
  if (match) return `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`;
  return null;
}

function getVimeoId(url: string): string | null {
  const match = url.match(/vimeo\.com\/(\d+)/);
  return match ? match[1] : null;
}

interface VideoCardProps {
  video: Video;
  onClick: (video: Video) => void;
  index: number;
}

export default function VideoCard({ video, onClick, index }: VideoCardProps) {
  const [hovered, setHovered] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const thumbnail =
    video.thumbnail ||
    getYouTubeThumbnail(video.url) ||
    (getVimeoId(video.url)
      ? `https://vumbnail.com/${getVimeoId(video.url)}.jpg`
      : null);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => setHovered(true), 150);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHovered(false);
    setPlayerReady(false);
  };

  const previewUrl = video.previewUrl || video.url;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.4, 0, 0.2, 1] }}
      className="group cursor-pointer border border-stone-800 rounded-sm overflow-hidden hover:border-stone-600 transition-all duration-300 hover:shadow-xl hover:shadow-black/50"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(video)}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-stone-900 overflow-hidden">
        {thumbnail && (
          <Image
            src={thumbnail}
            alt={video.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className={`object-cover transition-all duration-500 ${
              hovered ? "scale-105 opacity-40" : "scale-100 opacity-100"
            }`}
          />
        )}
        {!thumbnail && <div className="absolute inset-0 bg-stone-900" />}

        {/* Muted hover preview */}
        {hovered && (
          <div className={`absolute inset-0 transition-opacity duration-500 ${playerReady ? "opacity-90" : "opacity-0"}`}>
            <ReactPlayer
              url={previewUrl}
              width="100%"
              height="100%"
              playing
              muted
              loop
              playsinline
              onReady={() => setPlayerReady(true)}
              config={{
                youtube: { playerVars: { rel: 0, modestbranding: 1, controls: 0 } },
              }}
            />
          </div>
        )}

        {/* Play button */}
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${hovered ? "opacity-100" : "opacity-0"}`}>
          <div className="w-12 h-12 rounded-full border border-white/50 flex items-center justify-center backdrop-blur-sm bg-black/20">
            <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Category tag */}
        <div className="absolute top-3 left-3">
          <span className="text-[10px] font-medium tracking-widest uppercase px-2 py-1 bg-black/70 backdrop-blur-sm text-stone-300 border border-stone-700/50 rounded-sm">
            {video.tags[0]}
          </span>
        </div>
      </div>

      {/* Card info */}
      <div className="p-4 bg-stone-950">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-sm font-semibold tracking-tight text-foreground group-hover:text-accent transition-colors duration-300">
            {video.title}
          </h3>
          <span className="text-xs text-stone-500 shrink-0 mt-0.5">{video.year}</span>
        </div>
        {video.client && (
          <p className="text-xs text-stone-500 mt-1">{video.client}</p>
        )}
      </div>
    </motion.article>
  );
}
