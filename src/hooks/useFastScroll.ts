import { useCallback } from "react";

/**
 * useFastScroll — smooth, eased scrolling to an element by id (or to top).
 * Uses requestAnimationFrame with an ease-in-out curve for a snappier,
 * more controlled feel than the browser default.
 */
export function useFastScroll(defaultOptions: { offset?: number; duration?: number } = {}) {
  const { offset: defaultOffset = 0, duration: defaultDuration = 650 } = defaultOptions;

  return useCallback(
    (target: string, options: { offset?: number; duration?: number } = {}) => {
      if (typeof window === "undefined") return;

      const offset = options.offset ?? defaultOffset;
      const duration = options.duration ?? defaultDuration;

      let destinationY = 0;
      if (target !== "top") {
        const id = target.startsWith("#") ? target.slice(1) : target;
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        destinationY = rect.top + window.scrollY - offset;
      }

      const startY = window.scrollY;
      const distance = destinationY - startY;
      if (Math.abs(distance) < 2) return;

      const startTime = performance.now();
      // easeInOutCubic
      const ease = (t: number) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        window.scrollTo(0, startY + distance * ease(progress));
        if (progress < 1) requestAnimationFrame(step);
      };

      requestAnimationFrame(step);
    },
    [defaultOffset, defaultDuration],
  );
}
