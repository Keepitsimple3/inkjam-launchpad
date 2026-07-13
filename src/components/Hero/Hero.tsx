import { useTypewriter } from "@/hooks/useTypewriter";
import { useFastScroll } from "@/hooks/useFastScroll";
import { SketchPlaceholder } from "@/components/SketchPlaceholder";
import styles from "./Hero.module.css";

export function Hero() {
  const typed = useTypewriter(
    ["Stories grow.", "Drafts finish.", "Voices sharpen."],
    { typeSpeed: 70, deleteSpeed: 30, pauseMs: 1600 },
  );
  const scrollTo = useFastScroll({ offset: 72 });

  return (
    <section id="top" className={styles.hero}>
      <div className={styles.grid}>
        <div className={styles.copy}>
          <span className={styles.eyebrow}>
            <span className={styles.dot} aria-hidden />
            First jam opens soon
          </span>

          <h1 className={styles.title}>
            Where writers meet.
            <br />
            <span className={styles.typed}>
              {typed}
              <span className={styles.caret} aria-hidden />
            </span>
          </h1>

          <p className={styles.lede}>
            A cozy space to write, compete, and grow — built for indie and
            student writers. No algorithms. Just editors, prompts, and honest
            feedback.
          </p>

          <div className={styles.actions}>
            <a
              href="#waitlist"
              className={styles.primary}
              onClick={(e) => {
                e.preventDefault();
                scrollTo("waitlist");
              }}
            >
              Join the Waitlist
            </a>
            <a
              href="#about"
              className={styles.ghost}
              onClick={(e) => {
                e.preventDefault();
                scrollTo("about");
              }}
            >
              See what's coming
            </a>
          </div>
        </div>

        <div className={styles.art}>
          <SketchPlaceholder
            label="Hand-drawn desk scene: typewriter, coffee, ink bottle, open notebook"
            height={440}
          />
          <p className={styles.caption}>
            <em>“A blank page is a beginning, not a limit.”</em>
          </p>
        </div>
      </div>
    </section>
  );
}
