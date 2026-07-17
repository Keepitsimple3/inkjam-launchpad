import { useFastScroll } from "@/hooks/useFastScroll";
import { SketchPlaceholder } from "@/components/SketchPlaceholder";
import { Folio } from "@/components/Folio/Folio";
import LivingHeadline from "./LivingHeadline";
import styles from "./Hero.module.css";

export function Hero() {
  const scrollTo = useFastScroll({ offset: 64 });

  return (
    <section id="top" className={styles.hero}>
      <div className={styles.marginLeft} aria-hidden>
        <span className={styles.mark}>§</span>
        <span className={styles.markLabel}>issue 00</span>
      </div>
      <div className={styles.marginRight} aria-hidden>
        <span className={styles.mark}>⁂</span>
        <span className={styles.markLabel}>founding</span>
      </div>

      <div className={styles.backdrop} aria-hidden>
        <div className={styles.backdropInner}>
          <SketchPlaceholder
            label="Flat pastel illustration: writer at a desk, sage & clay tones"
            height="100%"
          />
        </div>
      </div>

      <div className={styles.stack}>
        <Folio no="00" title="Cover" page="01" glyph="⁂" />

        <span className={styles.eyebrow}>
          <span className={styles.dot} aria-hidden />
          First jam opens soon
        </span>

        <h1 className={styles.title}>
          Where writers meet.
          <span className={styles.titleAlt}>
            <LivingHeadline
              prefix="Stories "
              words={["grow.", "flourish.", "evolve.", "connect.", "matter.", "begin."]}
            />
          </span>
        </h1>

        <p className={styles.lede}>
          A cozy space to write, compete, and grow — built for indie and
          student writers. No algorithms. Just prompts, editors, and honest
          feedback.
        </p>

        <div className={styles.actions}>
          <a
            href="#waitlist"
            className={styles.primary}
            onClick={(e) => { e.preventDefault(); scrollTo("waitlist"); }}
          >
            Join the Waitlist →
          </a>
        </div>
      </div>
    </section>
  );
}
