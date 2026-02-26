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
      className="flex items-center border border-border bg-surface px-4 py-2.5 cursor-text focus-within:border-accent transition-colors"
      onClick={() => inputRef.current?.focus()}
    >
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="name, college, startup..."
        className="flex-1 bg-transparent text-foreground text-[12px] placeholder:text-muted/50 border-0 outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
        spellCheck={false}
        autoComplete="off"
      />
    </div>
  );
}
