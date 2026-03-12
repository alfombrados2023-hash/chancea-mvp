"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ChipProps {
  children: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
  className?: string;
}

export function Chip({
  children,
  selected,
  onClick,
  icon,
  className,
}: ChipProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-200",
        selected
          ? "bg-accent-primary/20 text-accent-primary border border-accent-primary/40"
          : "bg-bg-tertiary text-text-secondary border border-transparent hover:bg-bg-hover",
        className
      )}
    >
      {icon}
      {children}
    </motion.button>
  );
}
