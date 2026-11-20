import Image, { type ImageProps } from "next/image";

/**
 * next/image with an optional "trim": zooms past a 5% black frame on every side
 * (common on YouTube thumbnails of windowboxed uploads). The parent must be
 * relative + overflow-hidden, which every cover slot already is.
 */
export default function Cover({ trim, alt, ...props }: ImageProps & { trim?: boolean }) {
  if (!trim) return <Image alt={alt} {...props} />;
  return (
    <span aria-hidden={alt === "" || undefined} className="absolute block" style={{ inset: "-5.6%" }}>
      <Image alt={alt} {...props} />
    </span>
  );
}
