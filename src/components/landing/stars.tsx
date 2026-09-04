import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

type StarsProps = {
  /** Jumlah bintang terisi (1–5). Default 5. */
  rating?: number;
  className?: string;
  starClassName?: string;
};

/** Row of 5 stars used for ratings — supports partial ratings. */
export function Stars({ rating = 5, className, starClassName }: StarsProps) {
  return (
    <div
      className={cn("flex items-center gap-0.5", className)}
      role="img"
      aria-label={`Rating ${rating} dari 5 bintang`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          aria-hidden
          className={cn(
            "size-4 text-lime-500",
            i < rating ? "fill-lime-400" : "fill-stone-200 text-stone-300",
            starClassName
          )}
        />
      ))}
    </div>
  );
}
