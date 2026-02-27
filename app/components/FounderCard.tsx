"use client";

import Image from "next/image";
import type { Founder } from "@/lib/types";
import StartupLogo from "./StartupLogo";

interface FounderCardProps {
  founder: Founder;
  index: number;
  onSelect: (founder: Founder) => void;
}

export default function FounderCard({ founder, index, onSelect }: FounderCardProps) {
  const clubs = (Array.isArray(founder.clubs) ? founder.clubs : []).filter(
    (club): club is string =>
      typeof club === "string" && club.trim().length > 0
  );

  return (
    <div
      className="animate-fade-up group border border-border hover:border-border-active bg-surface/50 hover:bg-surface transition-all cursor-pointer"
      style={{ animationDelay: `${0.05 * (index + 1)}s` }}
    >
      <div className="p-4 md:p-5">
        <div className="flex items-start gap-4">
          <div className="shrink-0 relative">
            <div className="w-12 h-12 border border-accent/30 group-hover:border-accent overflow-hidden transition-colors">
              {founder.headshot_url ? (
                <Image
                  src={founder.headshot_url}
                  alt={founder.name}
                  width={48}
                  height={48}
                  sizes="48px"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-elevated flex items-center justify-center text-muted text-[10px]">
                  ?
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2 flex-wrap">
              <button
                onClick={() => onSelect(founder)}
                className="text-foreground font-bold text-[13px] hover:text-accent transition-colors text-left"
              >
                {founder.name}
              </button>
              <span className="text-muted text-[10px]">
                {founder.college}
                {founder.graduation_year && (
                  <> &apos;{String(founder.graduation_year).slice(-2)}</>
                )}
              </span>
            </div>

            <div className="flex items-center gap-2 mt-1.5">
              {founder.startup_logo_url && (
                <StartupLogo
                  src={founder.startup_logo_url}
                  alt={founder.startup_name}
                  size="sm"
                />
              )}
              {founder.startup_url ? (
                <a
                  href={founder.startup_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-secondary text-[11px] hover:text-accent transition-colors"
                >
                  {founder.startup_name}
                </a>
              ) : (
                <span className="text-secondary text-[11px]">
                  {founder.startup_name}
                </span>
              )}
            </div>

            {clubs.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2.5">
                {clubs.map((club) => (
                  <span
                    key={club}
                    className="text-[9px] tracking-wide text-muted"
                  >
                    <span className="text-accent/50">[</span>
                    {club.toLowerCase().replace(/\s+/g, "_")}
                    <span className="text-accent/50">]</span>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 mt-3">
          {founder.portfolio_url && (
            <a
              href={founder.portfolio_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-[10px] text-muted hover:text-accent transition-colors"
            >
              Portfolio
            </a>
          )}
          {founder.linkedin_url && (
            <a
              href={founder.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-[10px] text-muted hover:text-accent transition-colors"
            >
              LinkedIn
            </a>
          )}
          {founder.github_url && (
            <a
              href={founder.github_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-[10px] text-muted hover:text-accent transition-colors"
            >
              GitHub
            </a>
          )}
          <span className="text-[10px] text-secondary ml-auto">
            {founder.email}
          </span>
        </div>
      </div>
    </div>
  );
}
