import { useState } from "react";
import styles from "./LivingHeadline.module.css";

type Props = {
  words: string[];
  className?: string;
};

/**
 * A single word that, on hover, cycles to the next synonym with an ink-bleed swap.
 * Falls back to the first word with no interaction if JS is off.
 */
export function LivingWord({ words, className }: Props) {
  const [index, setIndex] = useState(0);
  const [nonce, setNonce] = useState(0);

  const cycle = () => {
    setIndex((i) => (i + 1) % words.length);
    setNonce((n) => n + 1);
  };

  return (
    <span
      className={`${styles.word} ${className ?? ""}`}
      onMouseEnter={cycle}
      onFocus={cycle}
      tabIndex={0}
      role="button"
      aria-label={`Rewrite word: currently ${words[index]}`}
    >
      <span key={nonce} className={styles.swap}>
        {words[index]}
      </span>
    </span>
  );
}
