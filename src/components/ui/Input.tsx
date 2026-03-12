"use client";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-text-secondary mb-1.5">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full h-12 px-4 rounded-xl bg-bg-tertiary border text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 transition-all duration-200",
            error
              ? "border-accent-danger focus:ring-accent-danger/50"
              : "border-white/5 focus:ring-accent-primary/50 focus:border-accent-primary/50",
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-xs text-accent-danger">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
