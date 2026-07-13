import { useInView } from "@/hooks/useInView";
import styles from "./Perks.module.css";

const PERKS = [
  {
    n: "No. 01",
    title: "Early access",
    body: "First jam invite before the public launch — while the paint is still wet.",
  },
  {
    n: "No. 02",
    title: "A physical zine",
    body: "Your signature and first line printed in the founding issue, mailed to your door.",
  },
  {
    n: "No. 03",
    title: "Credits, forever",
    body: "Your name in the InkJam colophon — recorded as a founding writer.",
  },
];

export function Perks() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section id="perks" className={styles.section}>
      <div ref={ref} className={styles.wrap}>
        <span className={styles.eyebrow}>Founding writers</span>
        <h2 className={styles.title}>
          Three things you get for showing up <em>early</em>.
        </h2>

        <div className={styles.grid}>
          {PERKS.map((p, i) => (
            <div
              key={p.n}
              className={`${styles.stub} ${inView ? styles.visible : ""} ${
                i === 0 ? styles.d1 : i === 1 ? styles.d2 : styles.d3
              }`}
            >
              <span className={styles.num}>{p.n}</span>
              <h3 className={styles.stubTitle}>{p.title}</h3>
              <p className={styles.stubBody}>{p.body}</p>
              <div className={styles.perf}>Admit one · InkJam · founding</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
