"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ScoreBadgeProps {
  score: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeConfig = {
  sm: { dim: 40, stroke: 3, fontSize: "text-xs", radius: 16 },
  md: { dim: 56, stroke: 4, fontSize: "text-sm", radius: 22 },
  lg: { dim: 80, stroke: 5, fontSize: "text-xl", radius: 32 },
};

function getScoreGradient(score: number) {
  if (score >= 80) return { from: "#22C55E", to: "#4ADE80" };
  if (score >= 50) return { from: "#FBBF24", to: "#FCD34D" };
  return { from: "#EF4444", to: "#F87171" };
}

export function ScoreBadge({
  score,
  size = "md",
  className,
}: ScoreBadgeProps) {
  const config = sizeConfig[size];
  const circumference = 2 * Math.PI * config.radius;
  const offset = circumference - (score / 100) * circumference;
  const colors = getScoreGradient(score);
  const gradientId = `score-${size}-${score}`;

  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
    >
      <svg width={config.dim} height={config.dim} className="-rotate-90">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colors.from} />
            <stop offset="100%" stopColor={colors.to} />
          </linearGradient>
        </defs>
        <circle
          cx={config.dim / 2}
          cy={config.dim / 2}
          r={config.radius}
          fill="none"
          stroke="var(--bg-tertiary)"
          strokeWidth={config.stroke}
        />
        <motion.circle
          cx={config.dim / 2}
          cy={config.dim / 2}
          r={config.radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={config.stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </svg>
      <span
        className={cn(
          "absolute font-bold text-text-primary",
          config.fontSize
        )}
      >
        {score}
      </span>
    </div>
  );
}
