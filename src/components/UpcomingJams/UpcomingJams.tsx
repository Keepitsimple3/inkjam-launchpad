import { Folio } from "@/components/Folio/Folio";
import styles from "./UpcomingJams.module.css";

const JAMS = [
  { month: "MAY", day: "24", title: "The Letters We Never Sent", blurb: "A letter, an email, a message you never hit send on.", meta: ["72 hours", "All genres"] },
  { month: "JUN", day: "07", title: "Small Things, Big Impact", blurb: "Stories about the little moments that changed everything.", meta: ["48 hours", "Flash Fiction"] },
  { month: "JUN", day: "21", title: "After the Rain", blurb: "What comes after the storm?", meta: ["24 hours", "Poetry / Prose"] },
];

export function UpcomingJams() {
  return (
    <section id="jams" className={styles.section}>
      <div className={styles.wrap}>
        <Folio no="05" title="Upcoming Jams" page="12" glyph="§" />

        <header className={styles.head}>
          <span className={styles.eyebrow}>— section 05 —</span>
          <h2 className={styles.title}>Upcoming Jams</h2>
          <p className={styles.note}>A preview of the first three prompts.</p>
        </header>

        <ul className={styles.list}>
          {JAMS.map((j) => (
            <li key={j.title} className={styles.row}>
              <div className={styles.date}>
                <span className={styles.month}>{j.month}</span>
                <span className={styles.day}>{j.day}</span>
              </div>
              <div>
                <h3 className={styles.jamTitle}>{j.title}</h3>
                <p className={styles.blurb}>{j.blurb}</p>
                <div className={styles.meta}>
                  {j.meta.map((m) => (
                    <span key={m} className={styles.chip}>{m}</span>
                  ))}
                </div>
              </div>
              <span className={styles.badge}>Coming soon</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
