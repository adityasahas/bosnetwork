"use client";

import Image from "next/image";
import Link from "next/link";
import type { Founder } from "@/lib/types";
import { toSlug } from "@/lib/slugs";
import StartupLogo from "./StartupLogo";
import { getCollegeAbbr } from "@/lib/colleges";

// Must match TABLE_COLS in Directory.tsx
export const TABLE_COLS = "grid-cols-[28%_19%_33%_20%] md:grid-cols-[32%_22%_32%_14%]";

interface FounderCardProps {
  founder: Founder;
  index: number;
}

export default function FounderCard({ founder }: FounderCardProps) {
  const clubs = (Array.isArray(founder.clubs) ? founder.clubs : []).filter(
    (c): c is string => typeof c === "string" && c.trim().length > 0
  );
  const href = `/${toSlug(founder.name)}`;
  const firstName = founder.name.split(" ")[0];

  return (
    <div className={`founder-card relative grid ${TABLE_COLS} items-center border-b border-border hover:bg-hover transition-colors`}>
      <Link
        href={href}
        className="absolute inset-0"
        aria-label={`View ${founder.name}'s profile`}
      />

      {/* Name + avatar */}
      <div className="relative py-3 pr-3 flex items-center gap-2.5 min-w-0 pointer-events-none">
        <div className="shrink-0 w-7 h-7 rounded-full overflow-hidden bg-surface">
          {founder.headshot_url ? (
            <Image
              src={founder.headshot_url}
              alt={founder.name}
              width={28}
              height={28}
              sizes="28px"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted text-[10px] font-medium">
              {founder.name[0]}
            </div>
          )}
        </div>
        <span className="font-medium text-sm truncate">
          <span className="md:hidden">{firstName}</span>
          <span className="hidden md:inline">{founder.name}</span>
        </span>
      </div>

      {/* College */}
      <div className="relative py-3 pr-3 text-secondary text-sm truncate pointer-events-none">
        <span className="hidden md:inline">{founder.college}</span>
        <span className="md:hidden">{getCollegeAbbr(founder.college)}</span>
        {founder.graduation_year && (
          <span className="text-muted">
            {" "}&apos;{String(founder.graduation_year).slice(-2)}
          </span>
        )}
      </div>

      {/* Startup */}
      <div className="relative py-3 pr-3 flex items-center gap-2 min-w-0 pointer-events-none">
        {founder.startup_logo_url && (
          <span className="hidden md:inline-flex">
            <StartupLogo src={founder.startup_logo_url} alt={founder.startup_name} size="sm" />
          </span>
        )}
        <span className="text-sm text-secondary truncate">{founder.startup_name}</span>
        {clubs.length > 0 && (
          <span className="hidden lg:block text-xs text-muted truncate">
            · {clubs.slice(0, 2).join(", ")}
          </span>
        )}
      </div>

      {/* Links */}
      <div className="relative py-3 flex items-center gap-2.5 text-xs text-muted pointer-events-none">
        {founder.portfolio_url && (
          <a
            href={founder.portfolio_url}
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto hover:text-foreground transition-colors"
          >
            site
          </a>
        )}
        {founder.linkedin_url && (
          <a
            href={founder.linkedin_url}
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto hover:text-foreground transition-colors"
          >
            li
          </a>
        )}
        {founder.github_url && (
          <a
            href={founder.github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto hover:text-foreground transition-colors"
          >
            gh
          </a>
        )}
      </div>
    </div>
  );
}
