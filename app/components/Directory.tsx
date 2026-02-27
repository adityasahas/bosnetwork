"use client";

import { useState, useMemo } from "react";
import Header from "./Header";
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";
import FounderCard from "./FounderCard";
import FounderDetail from "./FounderDetail";
import type { Founder } from "@/lib/types";

interface DirectoryProps {
  founders: Founder[];
}

export default function Directory({ founders }: DirectoryProps) {
  const getValidClubs = (clubs: unknown): string[] => {
    if (!Array.isArray(clubs)) return [];
    return clubs.filter(
      (club): club is string =>
        typeof club === "string" && club.trim().length > 0
    );
  };

  const [search, setSearch] = useState("");
  const [collegeFilter, setCollegeFilter] = useState<string | null>(null);
  const [clubFilter, setClubFilter] = useState<string | null>(null);
  const [selectedFounder, setSelectedFounder] = useState<Founder | null>(null);

  const colleges = useMemo(
    () => [...new Set(founders.map((f) => f.college))].sort(),
    [founders]
  );
  const clubs = useMemo(() => {
    const allClubs = founders.flatMap((f) => getValidClubs(f.clubs));
    return [...new Set(allClubs)].sort();
  }, [founders]);

  const filtered = useMemo(() => {
    return founders.filter((f) => {
      if (search) {
        const q = search.toLowerCase();
        const searchable = [
          f.name,
          f.college,
          f.startup_name,
          ...getValidClubs(f.clubs),
          f.bio || "",
        ]
          .join(" ")
          .toLowerCase();
        if (!searchable.includes(q)) return false;
      }
      if (collegeFilter && f.college !== collegeFilter) return false;
      if (clubFilter && !getValidClubs(f.clubs).includes(clubFilter)) return false;
      return true;
    });
  }, [founders, search, collegeFilter, clubFilter]);

  return (
    <div className="min-h-screen bg-background relative">
      <div className="fixed inset-0 grid-bg opacity-30 pointer-events-none" />

      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(196,30,58,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10">
        <Header
          founderCount={founders.length}
          onHomeClick={
            selectedFounder ? () => setSelectedFounder(null) : undefined
          }
        />

        {selectedFounder ? (
          <main
            className="px-6 py-8 md:px-10"
            onClick={() => setSelectedFounder(null)}
          >
            <div
              className="max-w-3xl mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <FounderDetail
                founder={selectedFounder}
                onClose={() => setSelectedFounder(null)}
              />
            </div>
          </main>
        ) : (
          <main className="max-w-6xl mx-auto px-6 py-6 md:px-10 md:py-8">
            <div className="space-y-4 mb-8">
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

            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filtered.map((founder, i) => (
                  <FounderCard
                    key={founder.id}
                    founder={founder}
                    index={i}
                    onSelect={setSelectedFounder}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted text-[11px]">No results found.</p>
              </div>
            )}

            <footer className="mt-16 pt-6 border-t border-border text-center">
              <p className="text-muted text-[10px] tracking-wide">
                made by student founders, for student founders.
              </p>
            </footer>
          </main>
        )}
      </div>
    </div>
  );
}
