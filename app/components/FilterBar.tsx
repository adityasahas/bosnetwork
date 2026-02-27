"use client";

interface FilterBarProps {
  colleges: string[];
  clubs: string[];
  activeCollege: string | null;
  activeClub: string | null;
  onCollegeFilter: (college: string | null) => void;
  onClubFilter: (club: string | null) => void;
}

export default function FilterBar({
  colleges,
  clubs,
  activeCollege,
  activeClub,
  onCollegeFilter,
  onClubFilter,
}: FilterBarProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-1.5 flex-wrap">
        {colleges.map((college) => (
          <button
            key={college}
            onClick={() =>
              onCollegeFilter(activeCollege === college ? null : college)
            }
            className={`text-[10px] tracking-wide px-2 py-0.5 border transition-all ${
              activeCollege === college
                ? "border-accent text-accent bg-accent/5"
                : "border-border text-secondary hover:border-border-active hover:text-foreground"
            }`}
          >
            {college}
          </button>
        ))}
      </div>

      <div className="flex gap-1.5 flex-wrap">
        {clubs
          .filter((club): club is string => typeof club === "string" && club.trim().length > 0)
          .map((club) => (
          <button
            key={club}
            onClick={() => onClubFilter(activeClub === club ? null : club)}
            className={`text-[10px] tracking-wide px-2 py-0.5 border transition-all ${
              activeClub === club
                ? "border-accent text-accent bg-accent/5"
                : "border-border text-secondary hover:border-border-active hover:text-foreground"
            }`}
          >
            {club.toLowerCase().replace(/\s+/g, "_")}
          </button>
        ))}
      </div>
    </div>
  );
}
