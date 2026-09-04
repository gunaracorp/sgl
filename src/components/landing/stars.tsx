import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

type StarsProps = {
  className?: string;
  starClassName?: string;
};

/** Row of 5 lime stars used for ratings. */
export function Stars({ className, starClassName }: StarsProps) {
  return (
    <div
      className={cn("flex items-center gap-0.5", className)}
      role="img"
      aria-label="Rating 5 dari 5 bintang"
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          aria-hidden
          className={cn("size-4 fill-lime-400 text-lime-500", starClassName)}
        />
      ))}
    </div>
  );
}
