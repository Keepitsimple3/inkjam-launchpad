import { useFastScroll } from "@/hooks/useFastScroll";
import heroAsset from "@/assets/hero-desk.png.asset.json";
import styles from "./Hero.module.css";

export function Hero() {
  const scrollTo = useFastScroll({ offset: 64 });

  return (
    <section id="top" className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.left}>
          <span className={styles.badge}>
            <span className={styles.badgeDot} aria-hidden />
            Announcing the next jam
          </span>

          <h1 className={styles.title}>
            Where<br />
            writers meet.<br />
            <em className={styles.italic}>
              Stories evolve.
              <svg className={styles.underline} viewBox="0 0 320 14" aria-hidden preserveAspectRatio="none">
                <path d="M4 8 Q 80 2, 160 6 T 316 8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </em>
          </h1>

          <p className={styles.lede}>
            72-hour writing jams. Real feedback.<br />
            A calm corner of the internet for stories<br />
            and the people who write them.
          </p>

          <div className={styles.actions}>
            <a
              href="#waitlist"
              className={styles.primary}
              onClick={(e) => { e.preventDefault(); scrollTo("waitlist"); }}
            >
              Join the waitlist
            </a>
            <a
              href="#jams"
              className={styles.secondary}
              onClick={(e) => { e.preventDefault(); scrollTo("jams"); }}
            >
              Explore jams <span aria-hidden>→</span>
            </a>
          </div>
        </div>

        <div className={styles.right}>
          <img
            src={heroAsset.url}
            alt="An illustrated writer's desk with typewriter, open book, and window light"
            className={styles.illustration}
            width={1400}
            height={900}
          />

          <span className={`${styles.stickyNote} ${styles.noteA}`}>
            <span className={styles.noteText}>Keep<br />it<br />real.</span>
            <span className={styles.tape} aria-hidden />
          </span>

          <span className={`${styles.stickyNote} ${styles.noteB}`}>
            <span className={styles.noteText}>Make<br />time for<br />stories.</span>
            <span className={styles.tape} aria-hidden />
          </span>

          <span className={styles.quote}>
            <em>"Every story starts somewhere."</em>
          </span>
        </div>
      </div>
    </section>
  );
}
