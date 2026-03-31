"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import type { Video } from "@/data/videos";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

interface VideoModalProps {
  video: Video | null;
  onClose: () => void;
}

export default function VideoModal({ video, onClose }: VideoModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (video) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [video, onClose]);

  return (
    <AnimatePresence>
      {video && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center p-4 md:p-8"
          onClick={(e) => {
            if (e.target === overlayRef.current) onClose();
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-8 text-muted hover:text-foreground transition-colors duration-200 font-sans text-xs tracking-widest uppercase"
          >
            Close ✕
          </button>

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-5xl"
          >
            {/* Player */}
            <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
              <div className="absolute inset-0">
                <ReactPlayer
                  url={video.url}
                  width="100%"
                  height="100%"
                  playing
                  controls
                  config={{
                    youtube: { playerVars: { rel: 0 } },
                  }}
                />
              </div>
            </div>

            {/* Meta */}
            <div className="mt-5 flex items-start justify-between">
              <div>
                <h2 className="font-display text-2xl text-foreground">
                  {video.title}
                </h2>
                {video.description && (
                  <p className="mt-1 font-sans text-sm text-muted">
                    {video.description}
                  </p>
                )}
              </div>
              <div className="text-right shrink-0 ml-8">
                <span className="font-sans text-xs tracking-widest uppercase text-accent">
                  {video.year}
                </span>
                {video.client && (
                  <p className="font-sans text-xs text-muted mt-0.5">
                    {video.client}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
