"use client";

import { Sparkles, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  icon?: LucideIcon;
  title: ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  /** Use light-on-dark styling for dark green sections */
  dark?: boolean;
  className?: string;
};

/** Consistent section heading: eyebrow pill + title + subtitle. */
export function SectionHeading({
  eyebrow,
  icon: Icon = Sparkles,
  title,
  subtitle,
  align = "center",
  dark = false,
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow ? (
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider",
            dark
              ? "border-lime-300/30 bg-white/10 text-lime-300"
              : "border-emerald-200 bg-emerald-50 text-emerald-700"
          )}
        >
          <Icon className="size-3.5" aria-hidden />
          {eyebrow}
        </span>
      ) : null}
      <h2
        className={cn(
          "mt-5 text-balance text-3xl font-extrabold leading-[1.15] tracking-tight sm:text-4xl lg:text-[2.6rem]",
          dark ? "text-white" : "text-emerald-950"
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed sm:text-lg",
            dark ? "text-emerald-100/70" : "text-stone-600",
            align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl"
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </Reveal>
  );
}
