"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon, LinkSimpleIcon } from "@phosphor-icons/react";
import type { Founder } from "@/lib/types";
import StartupLogo from "./StartupLogo";

interface FounderDetailProps {
  founder: Founder;
}

export default function FounderDetail({ founder }: FounderDetailProps) {
  const clubs = (Array.isArray(founder.clubs) ? founder.clubs : []).filter(
    (c): c is string => typeof c === "string" && c.trim().length > 0
  );

  const renderBio = (bio: string): ReactNode[] => {
    const nodes: ReactNode[] = [];
    const re = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
    let last = 0;
    let m = re.exec(bio);
    while (m) {
      if (m.index > last) nodes.push(bio.slice(last, m.index));
      nodes.push(
        <a
          key={`${m[1]}-${m.index}`}
          href={m[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-foreground transition-colors inline-flex items-center gap-0.5"
        >
          {m[1]} <LinkSimpleIcon size={11} />
        </a>
      );
      last = m.index + m[0].length;
      m = re.exec(bio);
    }
    if (last < bio.length) nodes.push(bio.slice(last));
    return nodes;
  };

  return (
    <div>
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-secondary hover:text-foreground transition-colors mb-8 group"
      >
        <ArrowLeftIcon size={14} className="transition-transform group-hover:-translate-x-0.5" />
        back
      </Link>

      <div className="flex gap-6 items-start flex-col sm:flex-row">
        <div className="shrink-0 w-20 h-20 rounded-full overflow-hidden bg-surface">
          {founder.headshot_url ? (
            <Image
              src={founder.headshot_url}
              alt={founder.name}
              width={80}
              height={80}
              sizes="80px"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-secondary text-xl font-medium">
              {founder.name[0]}
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-semibold text-foreground">{founder.name}</h1>
          <p className="text-secondary text-sm mt-0.5">
            {founder.college}
            {founder.graduation_year &&
              ` · class of '${String(founder.graduation_year).slice(-2)}`}
          </p>

          <div className="mt-4 flex items-center gap-2">
            {founder.startup_logo_url && (
              <StartupLogo src={founder.startup_logo_url} alt={founder.startup_name} size="md" />
            )}
            {founder.startup_url ? (
              <a
                href={founder.startup_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium hover:underline underline-offset-2 inline-flex items-center gap-1"
              >
                {founder.startup_name}
                <LinkSimpleIcon size={12} className="text-muted" />
              </a>
            ) : (
              <span className="text-sm font-medium">{founder.startup_name}</span>
            )}
          </div>

          {clubs.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {clubs.map((club) => (
                <span
                  key={club}
                  className="text-xs px-2 py-0.5 rounded-full border border-border text-secondary"
                >
                  {club}
                </span>
              ))}
            </div>
          )}

          {founder.bio && (
            <p className="mt-4 text-secondary text-sm leading-relaxed">
              {renderBio(founder.bio)}
            </p>
          )}

          <div className="mt-5 pt-5 border-t border-border flex flex-wrap gap-4 text-sm text-secondary">
            <a
              href={`mailto:${founder.email}`}
              className="hover:text-foreground transition-colors hover:underline underline-offset-2"
            >
              {founder.email}
            </a>
            {founder.portfolio_url && (
              <a
                href={founder.portfolio_url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors hover:underline underline-offset-2"
              >
                portfolio
              </a>
            )}
            {founder.linkedin_url && (
              <a
                href={founder.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors hover:underline underline-offset-2"
              >
                linkedin
              </a>
            )}
            {founder.github_url && (
              <a
                href={founder.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors hover:underline underline-offset-2"
              >
                github
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
