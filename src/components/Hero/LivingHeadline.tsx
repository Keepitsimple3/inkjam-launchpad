"use client";

import { useEffect, useState } from "react";
import styles from "./LivingHeadline.module.css";

type Props = {
  prefix: string;
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
};

type Mode = "typingPrefix" | "typingWord" | "idle" | "deletingWord";

export default function LivingHeadline({
  prefix,
  words,
  typingSpeed = 55,
  deletingSpeed = 22,
}: Props) {
  const [wordIndex, setWordIndex] = useState(0);

  const [typedPrefix, setTypedPrefix] = useState("");
  const [typedWord, setTypedWord] = useState("");

  const [mode, setMode] = useState<Mode>("typingPrefix");
  const [rewriteRequested, setRewriteRequested] = useState(false);

  const currentWord = words[wordIndex];

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    switch (mode) {
      case "typingPrefix":
        if (typedPrefix.length < prefix.length) {
          timeout = setTimeout(() => {
            setTypedPrefix(prefix.slice(0, typedPrefix.length + 1));
          }, typingSpeed + Math.random() * 25);
        } else {
          setMode("typingWord");
        }
        break;

      case "typingWord":
        if (typedWord.length < currentWord.length) {
          timeout = setTimeout(() => {
            setTypedWord(currentWord.slice(0, typedWord.length + 1));
          }, typingSpeed + Math.random() * 25);
        } else {
          setMode("idle");
        }
        break;

      case "idle":
        if (rewriteRequested) {
          timeout = setTimeout(() => {
            setRewriteRequested(false);
            setMode("deletingWord");
        }, 300);
        }
        break;

      case "deletingWord":
        if (typedWord.length > 0) {
          timeout = setTimeout(() => {
            setTypedWord((w) => w.slice(0, -1));
          }, deletingSpeed);
        } else {
          setWordIndex((i) => (i + 1) % words.length);
          setMode("typingWord");
        }
        break;
    }

    return () => clearTimeout(timeout);
  }, [
    mode,
    typedPrefix,
    typedWord,
    prefix,
    currentWord,
    rewriteRequested,
    typingSpeed,
    deletingSpeed,
    words.length,
  ]);

  return (
    <span
      className={styles.wrapper}
      onMouseEnter={() => {
        if (mode === "idle") {
          setRewriteRequested(true);
        }
      }}
    >
      <span className={styles.prefix}>{typedPrefix}</span>

      <span className={styles.wordContainer}>
        <span>{typedWord}</span>
        <span className={styles.cursor} />
      </span>
    </span>
  );
}