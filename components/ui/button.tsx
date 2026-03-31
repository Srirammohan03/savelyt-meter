"use client";

import { motion } from "framer-motion";
import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "secondary" | "ghost";
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = "default", ...props },
  ref
) {
  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={cn(
        "inline-flex h-11 items-center justify-center rounded-2xl px-4 text-sm font-semibold transition-all duration-200 disabled:opacity-50",
        variant === "default" &&
          "bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 text-neutral-900 shadow-md hover:shadow-glow",
        variant === "secondary" && "bg-card border border-border text-foreground",
        variant === "ghost" && "bg-transparent text-muted-foreground hover:bg-card",
        className
      )}
      {...props}
    />
  );
});
