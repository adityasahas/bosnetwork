"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";
import Image from "next/image";
import type { Founder } from "@/lib/types";
import StartupLogo from "./StartupLogo";

interface FounderDetailProps {
  founder: Founder;
  onClose: () => void;
}

export default function FounderDetail({ founder, onClose }: FounderDetailProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const renderBioWithLinks = (bio: string) => {
    const nodes: ReactNode[] = [];
    const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
    let lastIndex = 0;
    let match = linkRegex.exec(bio);

    while (match) {
      const [fullMatch, label, url] = match;
      const matchIndex = match.index;

      if (matchIndex > lastIndex) {
        nodes.push(bio.slice(lastIndex, matchIndex));
      }

      nodes.push(
        <a
          key={`${label}-${url}-${matchIndex}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground hover:text-accent transition-colors underline underline-offset-2 decoration-border"
        >
          {label}
        </a>
      );

      lastIndex = matchIndex + fullMatch.length;
      match = linkRegex.exec(bio);
    }

    if (lastIndex < bio.length) {
      nodes.push(bio.slice(lastIndex));
    }

    return nodes;
  };

  return (
    <div className="animate-fade-up">
      <div className="flex items-center justify-end mb-5">
        <button
          onClick={onClose}
          className="text-[10px] text-muted hover:text-accent transition-colors"
        >
          Close
        </button>
      </div>

      <div className="flex gap-6 flex-col md:flex-row">
        <div className="shrink-0">
          <div className="w-24 h-24 md:w-32 md:h-32 border border-accent/40 overflow-hidden">
            {founder.headshot_url ? (
              <Image
                src={founder.headshot_url}
                alt={founder.name}
                width={128}
                height={128}
                sizes="(min-width: 768px) 128px, 96px"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-elevated flex items-center justify-center text-muted text-lg">
                ?
              </div>
            )}
          </div>
        </div>

        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground">{founder.name}</h1>
          <p className="text-muted text-[12px] mt-1">
            {founder.college}
            {founder.graduation_year && (
              <> &apos;{String(founder.graduation_year).slice(-2)}</>
            )}
          </p>

          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-2 text-[12px]">
              {founder.startup_logo_url && (
                <StartupLogo
                  src={founder.startup_logo_url}
                  alt={founder.startup_name}
                  size="md"
                />
              )}
              {founder.startup_url ? (
                <a
                  href={founder.startup_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary hover:text-accent transition-colors"
                >
                  {founder.startup_name}
                </a>
              ) : (
                <span className="text-secondary">{founder.startup_name}</span>
              )}
            </div>

            {founder.clubs.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {founder.clubs.map((club) => (
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

            {founder.bio && (
              <p className="text-secondary text-[12px] leading-relaxed">
                {renderBioWithLinks(founder.bio)}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 text-[11px] text-muted">
              <a
                href={`mailto:${founder.email}`}
                className="text-secondary hover:text-accent transition-colors"
              >
                {founder.email}
              </a>
              {founder.portfolio_url && (
                <a
                  href={founder.portfolio_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  Portfolio
                </a>
              )}
              {founder.linkedin_url && (
                <a
                  href={founder.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  LinkedIn
                </a>
              )}
              {founder.github_url && (
                <a
                  href={founder.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
