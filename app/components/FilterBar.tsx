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
  const validClubs = clubs.filter(
    (c): c is string => typeof c === "string" && c.trim().length > 0
  );

  return (
    <div className="space-y-2 mt-4">
      <div className="flex gap-1.5 flex-wrap">
        {colleges.map((college) => {
          const active = activeCollege === college;
          return (
            <button
              key={college}
              onClick={() => onCollegeFilter(active ? null : college)}
              className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                active
                  ? "bg-foreground text-background border-foreground"
                  : "border-border text-secondary hover:border-border-hi hover:text-foreground"
              }`}
            >
              {college}
            </button>
          );
        })}
      </div>

      {validClubs.length > 0 && (
        <div className="flex gap-1.5 flex-wrap">
          {validClubs.map((club) => {
            const active = activeClub === club;
            return (
              <button
                key={club}
                onClick={() => onClubFilter(active ? null : club)}
                className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                  active
                    ? "bg-foreground text-background border-foreground"
                    : "border-border text-muted hover:border-border-hi hover:text-secondary"
                }`}
              >
                {club}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
