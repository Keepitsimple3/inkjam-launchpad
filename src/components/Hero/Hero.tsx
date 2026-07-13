import { useFastScroll } from "@/hooks/useFastScroll";
import { SketchPlaceholder } from "@/components/SketchPlaceholder";
import { LivingWord } from "./LivingHeadline";
import styles from "./Hero.module.css";

export function Hero() {
  const scrollTo = useFastScroll({ offset: 72 });

  return (
    <section id="top" className={styles.hero}>
      <div className={styles.backdrop} aria-hidden>
        <div className={styles.backdropInner}>
          <SketchPlaceholder
            label="Hand-drawn desk scene: typewriter, coffee, ink bottle, open notebook"
            height="100%"
          />
        </div>
      </div>

      <div className={styles.stack}>
        <span className={styles.eyebrow}>
          <span className={styles.dot} aria-hidden />
          First jam opens soon
        </span>

        <h1 className={styles.title}>
          Where writers <LivingWord words={["meet", "gather", "collide"]} />.
          <span className={styles.titleAlt}>
            Stories <LivingWord words={["grow", "sharpen", "bloom"]} />.
          </span>
        </h1>

        <p className={styles.lede}>
          A cozy space to write, compete, and grow — built for indie and student
          writers. No algorithms. Just prompts, editors, and honest feedback.
        </p>

        <div className={styles.actions}>
          <a
            href="#waitlist"
            className={styles.primary}
            onClick={(e) => { e.preventDefault(); scrollTo("waitlist"); }}
          >
            Join the Waitlist
          </a>
          <a
            href="#desk"
            className={styles.ghost}
            onClick={(e) => { e.preventDefault(); scrollTo("desk"); }}
          >
            Try a prompt
          </a>
        </div>

        <p className={styles.caption}>
          <em>“A blank page is a beginning, not a limit.”</em>
        </p>
      </div>
    </section>
  );
}
