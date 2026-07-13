import styles from "./FeatureStrip.module.css";

const ITEMS = [
  { icon: "✿", label: "No algorithm. Just editors." },
  { icon: "◷", label: "24 – 72 hour jams." },
  { icon: "❝", label: "Feedback from readers, not robots." },
  { icon: "⌂", label: "A quiet corner of the internet." },
  { icon: "♡", label: "Open to all skill levels." },
];

export function FeatureStrip() {
  return (
    <section className={styles.strip} aria-label="What InkJam is">
      <ul className={styles.list}>
        {ITEMS.map((it) => (
          <li key={it.label} className={styles.item}>
            <span className={styles.icon} aria-hidden>
              {it.icon}
            </span>
            <span className={styles.label}>{it.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
