"use client";

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
        className={`text-xs font-medium tracking-widest uppercase px-5 py-2 border rounded-sm transition-all duration-300 hover:scale-105 ${
          isAll
            ? "border-white text-white"
            : "border-stone-800 text-stone-400 hover:border-stone-500 hover:text-white"
        }`}
      >
        All
      </button>
      {tags.map((tag) => {
        const active = selected.includes(tag);
        return (
          <button
            key={tag}
            onClick={() => toggle(tag)}
            className={`text-xs font-medium tracking-widest uppercase px-5 py-2 border rounded-sm transition-all duration-300 hover:scale-105 ${
              active
                ? "border-white text-white"
                : "border-stone-800 text-stone-400 hover:border-stone-500 hover:text-white"
            }`}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}
