import { useCallback, useEffect, useState } from "react";

export function usePromptRotator(prompts: string[], intervalMs = 8000) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (prompts.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % prompts.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [prompts.length, intervalMs]);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % prompts.length);
  }, [prompts.length]);

  return { prompt: prompts[index], index, next };
}
