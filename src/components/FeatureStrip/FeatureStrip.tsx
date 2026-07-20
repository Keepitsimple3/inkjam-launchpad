import styles from "./FeatureStrip.module.css";

const ITEMS = [
  { icon: "◐", title: "Thoughtful feedback", body: "Real readers. Kind words. Better stories." },
  { icon: "◷", title: "Timed jams", body: "Short, focused bursts that help you write, not overthink." },
  { icon: "▮", title: "No algorithms", body: "No feeds. No noise. Just writers and what matters." },
  { icon: "❋", title: "A space to grow", body: "Publish your work. Build your voice. Belong." },
];

export function FeatureStrip() {
  return (
    <section className={styles.strip} aria-label="What InkJam is">
      <div className={styles.card}>
        <ul className={styles.list}>
          {ITEMS.map((it) => (
            <li key={it.title} className={styles.item}>
              <span className={styles.icon} aria-hidden>{it.icon}</span>
              <div>
                <h3 className={styles.itemTitle}>{it.title}</h3>
                <p className={styles.itemBody}>{it.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
