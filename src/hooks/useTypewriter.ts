import { useEffect, useState } from "react";

/**
 * useTypewriter — animates typing a string (or cycling through several strings).
 * Purely presentational; does not accept user input.
 */
export function useTypewriter(
  words: string | string[],
  options: {
    typeSpeed?: number;
    deleteSpeed?: number;
    pauseMs?: number;
    loop?: boolean;
    startDelayMs?: number;
  } = {},
) {
  const {
    typeSpeed = 65,
    deleteSpeed = 35,
    pauseMs = 1400,
    loop = true,
    startDelayMs = 250,
  } = options;

  const list = Array.isArray(words) ? words : [words];
  const [display, setDisplay] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [started, setStarted] = useState(startDelayMs === 0);

  useEffect(() => {
    if (started) return;
    const t = setTimeout(() => setStarted(true), startDelayMs);
    return () => clearTimeout(t);
  }, [started, startDelayMs]);

  useEffect(() => {
    if (!started) return;
    const current = list[index % list.length];

    if (!deleting && display === current) {
      if (list.length === 1 && !loop) return;
      const t = setTimeout(() => setDeleting(true), pauseMs);
      return () => clearTimeout(t);
    }

    if (deleting && display === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % list.length);
      return;
    }

    const t = setTimeout(
      () => {
        setDisplay((prev) =>
          deleting
            ? current.substring(0, prev.length - 1)
            : current.substring(0, prev.length + 1),
        );
      },
      deleting ? deleteSpeed : typeSpeed,
    );
    return () => clearTimeout(t);
  }, [display, deleting, index, list, loop, pauseMs, typeSpeed, deleteSpeed, started]);

  return display;
}
