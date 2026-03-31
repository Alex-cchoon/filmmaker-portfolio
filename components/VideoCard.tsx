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
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(video)}
    >
      {/* Thumbnail container */}
      <div className="relative overflow-hidden bg-surface aspect-video">
        {/* Static thumbnail */}
        {thumbnail && (
          <Image
            src={thumbnail}
            alt={video.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className={`object-cover transition-all duration-700 ease-cinematic ${
              hovered ? "scale-105 opacity-30" : "scale-100 opacity-100"
            }`}
          />
        )}
        {!thumbnail && (
          <div className="absolute inset-0 bg-surface-2" />
        )}

        {/* Muted preview player on hover */}
        {hovered && (
          <div
            className={`absolute inset-0 transition-opacity duration-500 ${
              playerReady ? "opacity-80" : "opacity-0"
            }`}
          >
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
                youtube: {
                  playerVars: { rel: 0, modestbranding: 1, controls: 0 },
                },
              }}
            />
          </div>
        )}

        {/* Play icon */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="w-14 h-14 rounded-full border border-foreground/40 flex items-center justify-center backdrop-blur-sm">
            <svg
              className="w-5 h-5 text-foreground ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Tags */}
        <div className="absolute bottom-3 left-3 flex gap-1.5">
          {video.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="font-sans text-[10px] tracking-widest uppercase px-2 py-0.5 bg-black/60 backdrop-blur-sm text-foreground/70 border border-white/10"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Card footer */}
      <div className="mt-3 flex items-baseline justify-between">
        <motion.h3
          className="font-display text-lg text-foreground group-hover:text-accent transition-colors duration-300"
        >
          {video.title}
        </motion.h3>
        <span className="font-sans text-xs text-muted ml-4 shrink-0">
          {video.year}
        </span>
      </div>
      {video.client && (
        <p className="font-sans text-xs text-muted mt-0.5">{video.client}</p>
      )}
    </motion.article>
  );
}
