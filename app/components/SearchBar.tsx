"use client";

import { useRef } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className="search-wrap relative cursor-text pb-2"
      onClick={() => inputRef.current?.focus()}
    >
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="search members..."
        className="w-full bg-transparent text-foreground text-sm placeholder:text-muted border-0 outline-none"
        spellCheck={false}
        autoComplete="off"
      />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-border" />
      <div className="search-line" />
    </div>
  );
}
