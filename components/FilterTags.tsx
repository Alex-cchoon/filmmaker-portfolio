"use client";

import { motion } from "framer-motion";

interface FilterTagsProps {
  tags: string[];
  selected: string[];
  onChange: (tags: string[]) => void;
}

export default function FilterTags({ tags, selected, onChange }: FilterTagsProps) {
  const toggle = (tag: string) => {
    if (selected.includes(tag)) {
      onChange(selected.filter((t) => t !== tag));
    } else {
      onChange([...selected, tag]);
    }
  };

  const isAll = selected.length === 0;

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange([])}
        className={`font-sans text-[11px] tracking-widest uppercase px-4 py-1.5 border transition-all duration-300 ${
          isAll
            ? "border-accent text-accent"
            : "border-white/10 text-muted hover:border-white/30 hover:text-foreground"
        }`}
      >
        All
      </button>
      {tags.map((tag) => {
        const active = selected.includes(tag);
        return (
          <motion.button
            key={tag}
            onClick={() => toggle(tag)}
            whileTap={{ scale: 0.96 }}
            className={`font-sans text-[11px] tracking-widest uppercase px-4 py-1.5 border transition-all duration-300 ${
              active
                ? "border-accent text-accent"
                : "border-white/10 text-muted hover:border-white/30 hover:text-foreground"
            }`}
          >
            {tag}
          </motion.button>
        );
      })}
    </div>
  );
}
