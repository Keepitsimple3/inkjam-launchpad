"use client";

import { useFastScroll } from "@/hooks/useFastScroll";
import { SketchPlaceholder } from "@/components/SketchPlaceholder";
import LivingHeadline from "./LivingHeadline";
import styles from "./Hero.module.css";

export function Hero() {
  const scrollTo = useFastScroll({ offset: 64 });

  return (
    <section id="top" className={styles.hero}>
      {/* Decorative side marks */}

      <div className={styles.marginLeft} aria-hidden>
        <span className={styles.mark}>§</span>
        <span className={styles.markLabel}>Issue 00</span>
      </div>

      <div className={styles.marginRight} aria-hidden>
        <span className={styles.mark}>⁂</span>
        <span className={styles.markLabel}>Founding</span>
      </div>

      <div className={styles.container}>
        {/* ==========================
            LEFT COLUMN
        =========================== */}

        <div className={styles.left}>

            <h1 className={styles.title}>
              Where
              <br />
              writers meet.
            </h1>


          <p className={styles.lede}>
            InkJam is a home for writers who want to create consistently.
            Participate in timed writing jams, receive thoughtful feedback,
            publish your work, and become part of a community that values
            stories over algorithms.
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
              Join the Waitlist →
            </a>

            <a
              href="#about"
              className={styles.secondary}
              onClick={(e) => {
                e.preventDefault();
                scrollTo("about");
              }}
            >
              Learn More
            </a>
          </div>

          <div className={styles.stats}>
            <div>
              <span className={styles.statNumber}>72 hr</span>
              <span className={styles.statLabel}>Writing Jams</span>
            </div>

            <div>
              <span className={styles.statNumber}>100%</span>
              <span className={styles.statLabel}>Human Feedback</span>
            </div>

            <div>
              <span className={styles.statNumber}>∞</span>
              <span className={styles.statLabel}>Stories</span>
            </div>
          </div>
        </div>

        {/* ==========================
            RIGHT COLUMN
        =========================== */}

        <div className={styles.right}>
          <div className={styles.illustration}>
            <SketchPlaceholder
              label="Editorial Illustration"
              height="100%"
            />

            {/* Optional floating cards */}

            <div className={styles.cardTop}>
              <span className={styles.cardTitle}>
                Next Jam
              </span>

              <span className={styles.cardText}>
                "Write the first page of a forgotten book."
              </span>
            </div>

            <div className={styles.cardBottom}>
              <span className={styles.cardTitle}>
                Community
              </span>

              <span className={styles.cardText}>
                Feedback from writers, not algorithms.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}