"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CardProps {
  children: React.ReactNode;
  variant?: "default" | "elevated" | "interactive" | "gradient";
  className?: string;
  onClick?: () => void;
}

export function Card({
  children,
  variant = "default",
  className,
  onClick,
}: CardProps) {
  const Comp = onClick ? motion.div : "div";
  return (
    <Comp
      {...(onClick
        ? {
            whileHover: { y: -2 },
            whileTap: { scale: 0.98 },
            transition: { type: "spring", stiffness: 300, damping: 20 },
            onClick,
          }
        : {})}
      className={cn(
        "rounded-2xl border border-white/5",
        {
          "bg-bg-secondary": variant === "default",
          "bg-bg-secondary shadow-lg shadow-black/20": variant === "elevated",
          "bg-bg-secondary hover:bg-bg-tertiary cursor-pointer":
            variant === "interactive",
          "bg-gradient-to-b from-bg-secondary to-bg-tertiary":
            variant === "gradient",
        },
        className
      )}
    >
      {children}
    </Comp>
  );
}
