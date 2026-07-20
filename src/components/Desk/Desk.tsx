import { useEffect, useRef, useState } from "react";
import { usePromptRotator } from "@/hooks/usePromptRotator";
import styles from "./Desk.module.css";

const PROMPTS = [
  "A door you didn't know was there.",
  "The last message you sent today, but in 1942.",
  "Two strangers, one umbrella, and a city that's forgetting them.",
  "Write the silence after the question.",
  "Something you stole, and what it cost.",
  "The map of a place that no longer exists.",
];

const STORAGE_KEY = "inkjam:desk-draft";
const MAX_WORDS = 500;

function countWords(text: string): number {
  const t = text.trim();
  if (!t) return 0;
  return t.split(/\s+/).length;
}

export function Desk() {
  const { prompt, next } = usePromptRotator(PROMPTS, 12000);
  const [text, setText] = useState("");
  const [saved, setSaved] = useState(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Hydrate from localStorage so the writer's draft survives reloads.
  useEffect(() => {
    try {
      const draft = localStorage.getItem(STORAGE_KEY);
      if (draft) setText(draft);
    } catch {
      /* ignore */
    }
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setText(value);
    setSaved(false);
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, value);
        setSaved(true);
      } catch {
        /* ignore */
      }
    }, 500);
  };

  const words = countWords(text);
  const remaining = MAX_WORDS - words;
  const over = remaining < 0;

  const clear = () => {
    setText("");
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    setSaved(false);
  };

  return (
    <section id="desk" className={styles.section}>
      <div className={styles.wrap}>
        <div className={styles.copy}>
          <span className={styles.eyebrow}>The Desk</span>
          <h2 className={styles.title}>
            Write your<br />
            <em>first line</em>.
          </h2>
          <p className={styles.lede}>
            A prompt is already on the page. No accounts, no pressure — just the quiet part of writing. Your draft saves itself here as you go.
          </p>
          <p className={styles.hand}>↳ It's just for you.</p>
        </div>

        <div className={styles.notebook}>
          <div className={styles.notebookHead}>
            <span className={styles.promptLabel}>Today's prompt</span>
            <button type="button" className={styles.newPrompt} onClick={next}>
              New prompt <span aria-hidden>↻</span>
            </button>
          </div>

          <p className={styles.promptText} key={prompt}>
            "{prompt}"
          </p>

          <div className={styles.page}>
            <textarea
              className={styles.textarea}
              placeholder="Begin here…"
              value={text}
              onChange={onChange}
              spellCheck
              aria-label="Your writing"
            />
            <div className={styles.ruled} aria-hidden />
          </div>

          <div className={styles.status}>
            <span className={`${styles.counter} ${over ? styles.over : ""}`}>
              {over ? "+" : ""}{Math.abs(remaining)} {over ? "over" : "words left"}
            </span>
            <span className={styles.saved}>
              {saved ? "Draft saved on this device" : text ? "Saving…" : "\u00A0"}
            </span>
            {text && (
              <button type="button" className={styles.clear} onClick={clear}>
                Clear page
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
