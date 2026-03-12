import type { ScoreAction } from "@/types";
import { xpThresholds, levelNames, scoreDeltas } from "./constants";

// ---------------------------------------------------------------------------
// Level helpers
// ---------------------------------------------------------------------------

const MAX_LEVEL = 12;

/**
 * Return the level a user has reached given their cumulative XP.
 */
export function getLevelForXP(xp: number): number {
  let level = 1;
  for (let l = MAX_LEVEL; l >= 1; l--) {
    if (xp >= xpThresholds[l]) {
      level = l;
      break;
    }
  }
  return level;
}

/**
 * Return the total XP required to reach the next level.
 * If the user is already at the max level, returns the current threshold.
 */
export function getXPForNextLevel(level: number): number {
  const next = Math.min(level + 1, MAX_LEVEL);
  return xpThresholds[next];
}

/**
 * Return a human-readable name for the given level.
 */
export function getLevelName(level: number): string {
  return levelNames[level] ?? "Desconocido";
}

// ---------------------------------------------------------------------------
// Score calculation
// ---------------------------------------------------------------------------

interface ScoreChangeParams {
  /** Rating received (1-5), only relevant for review_received */
  rating?: number;
  /** Current streak length, only relevant for streak_bonus */
  streak?: number;
}

/**
 * Calculate the score delta for a given action.
 *
 * For most actions the delta is a fixed value from `scoreDeltas`.
 * Special cases:
 *  - `review_received` scales with rating (1-5): base * (rating / 3)
 *  - `streak_bonus` scales with streak length: base + floor(streak / 7)
 */
export function calculateScoreChange(
  action: ScoreAction,
  params: ScoreChangeParams = {},
): number {
  const base = scoreDeltas[action];

  switch (action) {
    case "review_received": {
      const rating = params.rating ?? 3;
      return Math.round(base * (rating / 3));
    }
    case "streak_bonus": {
      const streak = params.streak ?? 0;
      return base + Math.floor(streak / 7);
    }
    default:
      return base;
  }
}
