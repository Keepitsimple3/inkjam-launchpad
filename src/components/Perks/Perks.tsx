import zineImg from "@/assets/zine.jpg";
import styles from "./Perks.module.css";

const PERKS = [
  { title: "Printed zine", body: "A collectible zine mailed to founding writers." },
  { title: "Founding badge", body: "A special badge on your profile that never goes away." },
  { title: "Priority access", body: "Get early access to jams, prompts, and new features." },
  { title: "Shape the future", body: "Your voice helps guide what InkJam becomes." },
];

export function Perks() {
  return (
    <section id="perks" className={styles.section}>
      <div className={styles.band} aria-hidden />
      <div className={styles.wrap}>
        <header className={styles.head}>
          <div>
            <h2 className={styles.title}>
              The early access<br />issue perks <span className={styles.aster}>✻</span>
            </h2>
            <p className={styles.lede}>
              Join now and be part of InkJam from the beginning.
            </p>
            <p className={styles.hand}>
              Founding writers leave their mark. ↴
            </p>
          </div>

          <img
            src={zineImg}
            alt="A stack of collectible InkJam zines"
            className={styles.zine}
            loading="lazy"
            width={800}
            height={800}
          />
        </header>

        <div className={styles.grid}>
          {PERKS.map((p, i) => (
            <article key={p.title} className={styles.perk}>
              <span className={styles.no}>No. 0{i + 1}</span>
              <h3 className={styles.perkTitle}>{p.title}</h3>
              <p className={styles.perkBody}>{p.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
