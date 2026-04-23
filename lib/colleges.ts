const COLOR_MAP: [string, string][] = [
  ["mit", "#A31F34"],
  ["harvard", "#C41230"],
  ["northeastern", "#D41B2C"],
  ["boston university", "#CC0000"],
  [" bu ", "#CC0000"],
  ["tufts", "#4A90D9"],
  ["boston college", "#8B1A3A"],
  [" bc ", "#8B1A3A"],
  ["wellesley", "#5B8DEF"],
  ["babson", "#00897B"],
  ["olin", "#FF7043"],
];

const ABBR_MAP: [string, string][] = [
  ["massachusetts institute", "MIT"],
  [" mit ", "MIT"],
  ["harvard", "Harvard"],
  ["northeastern", "NEU"],
  ["boston university", "BU"],
  [" bu ", "BU"],
  ["boston college", "BC"],
  [" bc ", "BC"],
  ["tufts", "Tufts"],
  ["wellesley", "Wellesley"],
  ["babson", "Babson"],
  ["olin", "Olin"],
];

export function getCollegeAbbr(college: string): string {
  const lower = ` ${college.toLowerCase()} `;
  for (const [key, abbr] of ABBR_MAP) {
    if (lower.includes(key)) return abbr;
  }
  // Fall back to first word if no match
  return college.split(" ")[0];
}

export function getCollegeColor(college: string): string {
  const lower = ` ${college.toLowerCase()} `;
  for (const [key, color] of COLOR_MAP) {
    if (lower.includes(key)) return color;
  }
  return "#5C8EF0";
}
