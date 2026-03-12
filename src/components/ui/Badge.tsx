"use client";

import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "info" | "purple";
  size?: "sm" | "md";
  className?: string;
}

const variantStyles = {
  default: "bg-bg-tertiary text-text-secondary",
  success: "bg-accent-success/15 text-accent-success",
  warning: "bg-accent-warning/15 text-accent-warning",
  danger: "bg-accent-danger/15 text-accent-danger",
  info: "bg-accent-info/15 text-accent-info",
  purple: "bg-accent-secondary/15 text-accent-secondary",
};

export function Badge({
  children,
  variant = "default",
  size = "sm",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full font-medium",
        variantStyles[variant],
        size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3 py-1 text-sm",
        className
      )}
    >
      {children}
    </span>
  );
}
