import { useMemo, useState } from "react";
import { usePromptRotator } from "@/hooks/usePromptRotator";
import { useInView } from "@/hooks/useInView";
import styles from "./Desk.module.css";

const PROMPTS = [
  "Write a goodbye in 50 words.",
  "Open with a lie.",
  "A room no one has entered in ten years.",
  "The last thing your character says before the lights go out.",
  "Describe a color without naming it.",
];

export function Desk() {
  const { prompt, next } = usePromptRotator(PROMPTS);
  const [text, setText] = useState("");
  const { ref, inView } = useInView<HTMLDivElement>();

  const wordCount = useMemo(() => {
    const trimmed = text.trim();
    if (!trimmed) return 0;
    return trimmed.split(/\s+/).length;
  }, [text]);

  return (
    <section id="desk" className={styles.section}>
      <div ref={ref} className={`${styles.wrap} ${inView ? styles.visible : ""}`}>
        <span className={styles.eyebrow}>The desk</span>
        <h2 className={styles.title}>
          Write your <em>first line</em>.
        </h2>

        <div className={styles.card}>
          <div className={styles.promptRow}>
            <span className={styles.promptLabel}>Prompt</span>
            <p className={styles.prompt}>"{prompt}"</p>
            <button type="button" className={styles.newBtn} onClick={next}>
              ↻ new
            </button>
          </div>

          <textarea
            className={styles.textarea}
            placeholder="Start typing. No one is watching."
            value={text}
            onChange={(e) => setText(e.target.value)}
            spellCheck={false}
          />

          <div className={styles.meta}>
            <span>{wordCount} {wordCount === 1 ? "word" : "words"}</span>
            {wordCount >= 50 && <span className={styles.nice}>nice.</span>}
          </div>
        </div>

        <p className={styles.footnote}>
          This is just for you — nothing is sent. Real jams open with the waitlist.
        </p>
      </div>
    </section>
  );
}
