"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import VideoCard from "@/components/VideoCard";
import VideoModal from "@/components/VideoModal";
import type { Video } from "@/data/videos";

interface VideoGridProps {
  videos: Video[];
}

export default function VideoGrid({ videos }: VideoGridProps) {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  return (
    <>
      {videos.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-sans text-sm text-muted col-span-2 py-16 text-center"
        >
          No projects match your search.
        </motion.p>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12"
        >
          <AnimatePresence mode="popLayout">
            {videos.map((video, i) => (
              <VideoCard
                key={video.id}
                video={video}
                index={i}
                onClick={setSelectedVideo}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      <VideoModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </>
  );
}
