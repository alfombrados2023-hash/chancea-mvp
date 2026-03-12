"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface XPBarProps {
  current: number;
  max: number;
  level: number;
  showLabel?: boolean;
  className?: string;
}

export function XPBar({
  current,
  max,
  level,
  showLabel = true,
  className,
}: XPBarProps) {
  const percentage = Math.min((current / max) * 100, 100);

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-bold text-accent-secondary">
            Nivel {level}
          </span>
          <span className="text-xs text-text-muted">
            {current}/{max} XP
          </span>
        </div>
      )}
      <div className="h-2 w-full rounded-full bg-bg-tertiary overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-accent-secondary to-[#A78BFA]"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
