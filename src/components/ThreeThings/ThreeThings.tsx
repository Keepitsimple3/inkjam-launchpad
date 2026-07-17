import { SketchPlaceholder } from "@/components/SketchPlaceholder";
import styles from "./ThreeThings.module.css";

const CARDS = [
  { n: "01", title: "Writing Jams", body: "Timed prompts — 24 to 72 hours — that give you a real deadline and a shared theme.", sketch: "Hourglass with drifting sand" },
  { n: "02", title: "Publish Your Work", body: "Every submission becomes a permanent piece in your InkJam profile. Build your archive, one jam at a time.", sketch: "Stack of stitched notebooks" },
  { n: "03", title: "Real Feedback", body: "Other writers leave comments on your work. Not likes. Not stars. Actual sentences about what resonated.", sketch: "Overlapping speech bubbles" },
];

export function ThreeThings() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.wrap}>
        <header className={styles.head}>
          <span className={styles.eyebrow}>— section 03 —</span>
          <h2 className={styles.title}>
            Three things every writer <em>needs</em>
          </h2>
          <p className={styles.sub}>
            A deadline, a community, and honest feedback. InkJam gives you all three.
          </p>
        </header>

        <div className={styles.grid}>
          {CARDS.map((c) => (
            <article key={c.n} className={styles.card}>
              <SketchPlaceholder label={c.sketch} height={120} />
              <div className={styles.body}>
                <h3 className={styles.cardTitle}>{c.title}</h3>
                <p className={styles.cardText}>{c.body}</p>
              </div>
              <span className={styles.number}>No. {c.n}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
