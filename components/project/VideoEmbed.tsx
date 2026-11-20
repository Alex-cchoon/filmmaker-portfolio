"use client";

import Image from "next/image";
import { useState } from "react";
import { instagramEmbed, thumbnailFor, youTubeId, type Video } from "@/data/videos";

function vimeoId(url: string) {
  const m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return m ? m[1] : null;
}

function Corners() {
  const c = "pointer-events-none absolute w-[18px] h-[18px] border-cream z-10";
  return (
    <>
      <span aria-hidden className={`${c} top-3 left-3 border-t border-l`} />
      <span aria-hidden className={`${c} top-3 right-3 border-t border-r`} />
      <span aria-hidden className={`${c} bottom-3 left-3 border-b border-l`} />
      <span aria-hidden className={`${c} bottom-3 right-3 border-b border-r`} />
    </>
  );
}

export default function VideoEmbed({ v }: { v: Video }) {
  const [playing, setPlaying] = useState(false);
  const ig = instagramEmbed(v.url);
  const yt = youTubeId(v.url);
  const vm = vimeoId(v.url);
  const thumb = thumbnailFor(v);

  if (ig) {
    return (
      <div className="mx-auto w-full max-w-[420px] h-[min(80vh,760px)] bg-black border border-line">
        <iframe src={ig} title={v.title} className="w-full h-full border-0" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
      </div>
    );
  }

  const src = yt
    ? `https://www.youtube-nocookie.com/embed/${yt}?autoplay=1&rel=0&modestbranding=1`
    : vm
      ? `https://player.vimeo.com/video/${vm}?autoplay=1&title=0&byline=0&portrait=0`
      : null;

  if (!src) {
    return (
      <a href={v.url} target="_blank" rel="noopener noreferrer" className="block text-center font-mono text-sm tracking-[0.1em] border-b border-cream w-fit mx-auto">
        ▸ WATCH FILM
      </a>
    );
  }

  return (
    <div className="relative aspect-video w-full bg-black border border-line overflow-hidden">
      {playing ? (
        <iframe
          src={src}
          title={v.title}
          className="absolute inset-0 w-full h-full border-0"
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      ) : (
        <button type="button" onClick={() => setPlaying(true)} aria-label={`Play ${v.title}`} className="group absolute inset-0">
          {thumb && <Image src={thumb} alt="" fill priority sizes="(min-width: 1280px) 1200px, 100vw" className="object-cover" />}
          <span className="absolute inset-0 bg-ink/25 group-hover:bg-ink/10 transition-colors" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="w-20 h-20 rounded-full border border-cream bg-ink/40 flex items-center justify-center group-hover:bg-cream group-hover:text-ink transition-colors">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M7 4l13 8-13 8z" />
              </svg>
            </span>
          </span>
          <Corners />
        </button>
      )}
    </div>
  );
}
