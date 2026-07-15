// src/components/studio/projects/TagInput.tsx
"use client";

import { useState, type KeyboardEvent } from "react";
import { X } from "lucide-react";

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}

export default function TagInput({
  tags,
  onChange,
  placeholder = "Type and press Enter...",
}: TagInputProps) {
  const [input, setInput] = useState("");

  const addTag = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed || tags.includes(trimmed)) return;
    onChange([...tags, trimmed]);
    setInput("");
  };

  const removeTag = (index: number) => {
    onChange(tags.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(input);
    } else if (e.key === "Backspace" && input === "" && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  };

  return (
    <div
      className="flex flex-wrap gap-2 min-h-11 w-full rounded-lg px-3 py-2 cursor-text"
      style={{
        backgroundColor: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(232,232,232,0.12)",
      }}
      onClick={() => document.getElementById("tag-input")?.focus()}
    >
      {tags.map((tag, index) => (
        <span
          key={index}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs text-[#C9A84C]"
          style={{
            backgroundColor: "rgba(201,168,76,0.1)",
            border: "1px solid rgba(201,168,76,0.25)",
            fontFamily: "var(--font-inter)",
          }}
        >
          {tag}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              removeTag(index);
            }}
            className="text-[#C9A84C]/60 hover:text-[#C9A84C] transition-colors cursor-pointer"
          >
            <X size={15} />
          </button>
        </span>
      ))}
      <input
        id="tag-input"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => addTag(input)}
        placeholder={tags.length === 0 ? placeholder : ""}
        className="flex-1 min-w-30 bg-transparent text-sm text-[#E8E8E8] placeholder-[#E8E8E8]/25 outline-none"
        style={{ fontFamily: "var(--font-inter)" }}
      />
    </div>
  );
}
