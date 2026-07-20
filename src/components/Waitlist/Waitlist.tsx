import { useState } from "react";
import { useSeededCounter } from "@/hooks/useSeededCounter";
import styles from "./Waitlist.module.css";

export function Waitlist() {
  const position = useSeededCounter(231);
  const [email, setEmail] = useState("");

  return (
    <section id="waitlist" className={styles.section}>
      <div className={styles.wrap}>
        <div className={styles.book} aria-hidden>
          <div className={styles.spread}>
            <div className={styles.pageLeft}>
              <span className={styles.pageLabel}>Guestbook</span>
              <div className={styles.stamp}>
                <span className={styles.stampTop}>InkJam</span>
                <span className={styles.stampMid}>Issue 00</span>
              </div>
              <span className={styles.ribbon}>The beginning</span>
            </div>
            <div className={styles.pageRight}>
              <span className={styles.pageLabel}>Add your name</span>
              <p className={styles.penNote}>Be one of the first.<br />Leave your mark in Issue 00.</p>
              <span className={styles.penLine}>Your name here...</span>
            </div>
          </div>
        </div>

        <div className={styles.copy}>
          <h2 className={styles.title}>
            Sign the book <span className={styles.aster}>✻</span>
          </h2>
          <p className={styles.lede}>
            Join the waitlist and become<br />a founding writer of InkJam.
          </p>

          <form
            className={styles.form}
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              className={styles.input}
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email address"
            />
            <button type="submit" className={styles.button}>
              Sign the book
            </button>
          </form>

          <p className={styles.small}>
            You're <em>#{position ?? "—"}</em> in line. We'll be in touch soon.
          </p>

          <span className={styles.tape} aria-hidden>
            <span className={styles.tapeText}>Stories start here.<br />Yours could be next.</span>
          </span>
        </div>
      </div>
    </section>
  );
}
