import styles from "./ThreeThings.module.css";

const CARDS = [
  { title: "Writing Jams", body: "72-hour jams with inspiring prompts and a supportive community.", icon: "◈" },
  { title: "Publish Your Work", body: "Every piece you write lives on your profile. Your words, always yours.", icon: "❝" },
  { title: "Thoughtful Feedback", body: "Feedback that helps you grow. No ratings. No pressure. Just real support.", icon: "✎" },
];

export function ThreeThings() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.wrap}>
        <header className={styles.head}>
          <span className={styles.rule} aria-hidden />
          <h2 className={styles.title}>
            Three things every writer <em>needs</em>
          </h2>
          <p className={styles.sub}>
            A deadline, a place to publish, and honest feedback — nothing more.
          </p>
        </header>

        <div className={styles.grid}>
          {CARDS.map((c, i) => (
            <article key={c.title} className={styles.card}>
              <span className={styles.no}>No. 0{i + 1}</span>
              <span className={styles.icon} aria-hidden>{c.icon}</span>
              <h3 className={styles.cardTitle}>{c.title}</h3>
              <p className={styles.cardText}>{c.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
