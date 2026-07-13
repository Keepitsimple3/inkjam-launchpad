import { useEffect, useState } from "react";

/**
 * Deterministic client-side counter. Seeds from `base` and grows by ~1 every
 * `intervalMs` based on wall time — same across a session, no backend.
 */
export function useSeededCounter(base = 231, intervalMs = 4 * 60 * 1000) {
  const compute = () => base + Math.floor(Date.now() / intervalMs) % 137;
  const [value, setValue] = useState<number | null>(null);

  useEffect(() => {
    setValue(compute());
    const id = window.setInterval(() => setValue(compute()), 30_000);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return value;
}
