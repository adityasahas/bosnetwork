"use client";

import { useState, useMemo, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Header from "./Header";
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";
import FounderCard from "./FounderCard";
import type { Founder } from "@/lib/types";

gsap.registerPlugin(useGSAP);

interface DirectoryProps {
  founders: Founder[];
}

function getValidClubs(clubs: unknown): string[] {
  if (!Array.isArray(clubs)) return [];
  return clubs.filter(
    (c): c is string => typeof c === "string" && c.trim().length > 0
  );
}

export default function Directory({ founders }: DirectoryProps) {
  const [search, setSearch] = useState("");
  const [collegeFilter, setCollegeFilter] = useState<string | null>(null);
  const [clubFilter, setClubFilter] = useState<string | null>(null);

  const listRef = useRef<HTMLDivElement>(null);

  const colleges = useMemo(
    () => [...new Set(founders.map((f) => f.college))].sort(),
    [founders]
  );

  const clubs = useMemo(() => {
    const all = founders.flatMap((f) => getValidClubs(f.clubs));
    return [...new Set(all)].sort();
  }, [founders]);

  const filtered = useMemo(() => {
    return founders.filter((f) => {
      if (search) {
        const q = search.toLowerCase();
        const hay = [
          f.name,
          f.college,
          f.startup_name,
          ...getValidClubs(f.clubs),
          f.bio ?? "",
        ]
          .join(" ")
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (collegeFilter && f.college !== collegeFilter) return false;
      if (clubFilter && !getValidClubs(f.clubs).includes(clubFilter)) return false;
      return true;
    });
  }, [founders, search, collegeFilter, clubFilter]);

  useGSAP(
    () => {
      gsap.fromTo(
        ".founder-card",
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, stagger: 0.02, duration: 0.3, ease: "power2.out" }
      );
    },
    { scope: listRef, dependencies: [filtered], revertOnUpdate: true }
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-6 md:px-10">

        {/* Two-column header */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 pt-12 pb-10">
          <Header founderCount={founders.length} />
          <div className="flex flex-col justify-end">
            <SearchBar value={search} onChange={setSearch} />
            <FilterBar
              colleges={colleges}
              clubs={clubs}
              activeCollege={collegeFilter}
              activeClub={clubFilter}
              onCollegeFilter={setCollegeFilter}
              onClubFilter={setClubFilter}
            />
          </div>
        </div>

        {/* Table */}
        {/* Column header — must use same grid-cols as FounderCard rows */}
        <div className="grid grid-cols-[32%_22%_32%_14%] border-t border-b border-border py-2 text-xs text-muted uppercase tracking-wider">
          <div className="pr-4">name</div>
          <div className="pr-4">college</div>
          <div className="pr-4">building</div>
          <div>links</div>
        </div>

        <div ref={listRef}>
          {filtered.length > 0 ? (
            filtered.map((founder, i) => (
              <FounderCard key={founder.id} founder={founder} index={i} />
            ))
          ) : (
            <div className="py-16 text-center text-muted text-sm">
              no results
            </div>
          )}
        </div>

        <footer className="py-10 text-muted text-xs">
          made by student founders, for student founders.
        </footer>
      </div>
    </div>
  );
}
