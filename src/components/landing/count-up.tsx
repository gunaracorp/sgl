"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

type CountUpProps = {
  end: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
};

const ID_ID = "id-ID";

/** Animated number that counts up when scrolled into view (id-ID formatting). */
export function CountUp({
  end,
  duration = 1.8,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;

    const format = (value: number) =>
      `${prefix}${value.toLocaleString(ID_ID, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}${suffix}`;

    // Reduced motion: set the final value immediately (direct DOM sync).
    if (reduced) {
      el.textContent = format(end);
      return;
    }

    const controls = animate(0, end, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => {
        el.textContent = format(latest);
      },
    });
    return () => controls.stop();
  }, [inView, end, duration, decimals, prefix, suffix, reduced]);

  const initial = (0).toLocaleString(ID_ID, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className={className}>
      {prefix}
      {initial}
      {suffix}
    </span>
  );
}
