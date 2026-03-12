import type { MissionCategory, ScoreAction } from "@/types";

// ---------------------------------------------------------------------------
// Category colors
// ---------------------------------------------------------------------------
export const categoryColors: Record<MissionCategory, string> = {
  coffee: "#A0522D",
  running: "#2E8B57",
  afteroffice: "#DAA520",
  brunch: "#F4A460",
  cultural: "#6A5ACD",
  sports: "#1E90FF",
  nightlife: "#8B008B",
  study: "#4682B4",
};

// ---------------------------------------------------------------------------
// Level names
// ---------------------------------------------------------------------------
export const levelNames: Record<number, string> = {
  1: "Novato",
  2: "Curioso",
  3: "Iniciado",
  4: "Sociable",
  5: "Explorador",
  6: "Aventurero",
  7: "Veterano",
  8: "Embajador",
  9: "Maestro",
  10: "Referente",
  11: "Elite",
  12: "Leyenda",
};

// ---------------------------------------------------------------------------
// XP thresholds – cumulative XP required to REACH each level
// ---------------------------------------------------------------------------
export const xpThresholds: Record<number, number> = {
  1: 0,
  2: 200,
  3: 600,
  4: 1200,
  5: 1600,
  6: 2000,
  7: 2600,
  8: 3200,
  9: 3600,
  10: 4200,
  11: 4800,
  12: 5600,
};

// ---------------------------------------------------------------------------
// Review tags (shown to users after events)
// ---------------------------------------------------------------------------
export const reviewTags: string[] = [
  "Puntual",
  "Buena conversaci\u00F3n",
  "Divertido/a",
  "Respetuoso/a",
  "Buena energ\u00EDa",
  "Organizado/a",
  "Generoso/a",
  "Simp\u00E1tico/a",
  "Interesante",
  "Buen anfitri\u00F3n/a",
];

// ---------------------------------------------------------------------------
// Score deltas per action
// ---------------------------------------------------------------------------
export const scoreDeltas: Record<ScoreAction, number> = {
  event_completed: 5,
  review_received: 2,
  streak_bonus: 3,
  no_show_penalty: -10,
  badge_earned: 4,
  check_in: 1,
};
