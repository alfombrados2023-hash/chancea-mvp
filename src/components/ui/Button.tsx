"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: React.ReactNode;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  loading,
  icon,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-primary/50",
        {
          "bg-gradient-to-r from-accent-primary to-[#FF8F65] text-white shadow-lg shadow-accent-primary/25 hover:shadow-accent-primary/40":
            variant === "primary",
          "border-2 border-accent-secondary text-accent-secondary hover:bg-accent-secondary/10":
            variant === "secondary",
          "text-text-secondary hover:text-text-primary hover:bg-bg-tertiary":
            variant === "ghost",
          "bg-accent-danger/10 text-accent-danger border border-accent-danger/30 hover:bg-accent-danger/20":
            variant === "danger",
        },
        {
          "h-8 px-4 text-sm": size === "sm",
          "h-11 px-6 text-base": size === "md",
          "h-14 px-8 text-lg": size === "lg",
        },
        (disabled || loading) && "opacity-50 pointer-events-none",
        className
      )}
      disabled={disabled || loading}
      {...(props as React.ComponentProps<typeof motion.button>)}
    >
      {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : icon}
      {children}
    </motion.button>
  );
}
