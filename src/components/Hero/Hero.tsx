import { useEffect, useState } from "react";
import { useFastScroll } from "@/hooks/useFastScroll";
import { getWaitlistTotal } from "@/lib/supabase";
import heroAsset from "@/assets/hero-desk.png.asset.json";
import styles from "./Hero.module.css";

const THREE = [
  { no: "01", word: "A deadline", note: "72-hour jams." },
  { no: "02", word: "A place to publish", note: "Your words, yours." },
  { no: "03", word: "Honest feedback", note: "No ratings." },
];

export function Hero() {
  const scrollTo = useFastScroll({ offset: 64 });
  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    getWaitlistTotal().then(setTotal).catch(() => setTotal(null));
  }, []);

  return (
    <section id="top" className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.left}>
          <span className={styles.eyebrow}>InkJam · Issue 00</span>

          <h1 className={styles.title}>
            Where writers meet.<br />
            <em className={styles.italic}>
              Stories evolve.
              <svg className={styles.underline} viewBox="0 0 320 14" aria-hidden preserveAspectRatio="none">
                <path d="M4 8 Q 80 2, 160 6 T 316 8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </em>
          </h1>

          <p className={styles.lede}>
            72-hour writing jams and honest feedback — a calm corner of the internet for stories and the people who write them.
          </p>

          <div className={styles.actions}>
            <a
              href="#waitlist"
              className={styles.primary}
              onClick={(e) => { e.preventDefault(); scrollTo("waitlist"); }}
            >
              Join the waitlist
            </a>
            {total !== null && total > 0 && (
              <span className={styles.count}>
                <strong>{total.toLocaleString()}</strong> writers already in line
              </span>
            )}
          </div>

          <ul className={styles.three}>
            {THREE.map((t) => (
              <li key={t.no} className={styles.threeItem}>
                <span className={styles.threeNo}>{t.no}</span>
                <span className={styles.threeWord}>{t.word}</span>
                <span className={styles.threeNote}>{t.note}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.right}>
          <img
            src={heroAsset.url}
            alt="An illustrated writer's desk with typewriter, open book, and window light"
            className={styles.illustration}
            width={1400}
            height={900}
          />
        </div>
      </div>
    </section>
  );
}
