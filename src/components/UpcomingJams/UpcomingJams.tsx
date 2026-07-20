import lighthouse from "@/assets/jam-lighthouse.jpg";
import cabin from "@/assets/jam-cabin.jpg";
import train from "@/assets/jam-train.jpg";
import balloon from "@/assets/jam-balloon.jpg";
import styles from "./UpcomingJams.module.css";

const JAMS = [
  { img: lighthouse, tag: "Open", title: "Coastal Whispers", genre: "Poetry", hours: "72 hours", dates: "May 24 – May 27", blurb: "Write by the sea." },
  { img: cabin, tag: "Up next", title: "Cabin Fever", genre: "Flash Fiction", hours: "72 hours", dates: "May 31 – Jun 3", blurb: "Stories from isolation." },
  { img: train, tag: "Open", title: "Departures", genre: "Short Story", hours: "72 hours", dates: "Jun 7 – Jun 10", blurb: "Leaving. Arriving. Everything in between." },
  { img: balloon, tag: "Upcoming", title: "Above the Noise", genre: "Nonfiction", hours: "72 hours", dates: "Jun 14 – Jun 17", blurb: "Clarity. Distance. Perspective." },
];

export function UpcomingJams() {
  return (
    <section id="jams" className={styles.section}>
      <div className={styles.wrap}>
        <header className={styles.head}>
          <h2 className={styles.title}>Upcoming jams</h2>
          <a href="#waitlist" className={styles.link}>See all jams <span aria-hidden>→</span></a>
        </header>

        <div className={styles.grid}>
          {JAMS.map((j) => (
            <article key={j.title} className={styles.card}>
              <div className={styles.imgWrap}>
                <img src={j.img} alt={j.title} className={styles.img} loading="lazy" width={800} height={600} />
                <span className={styles.tag}>{j.tag}</span>
              </div>
              <div className={styles.body}>
                <h3 className={styles.cardTitle}>{j.title}</h3>
                <div className={styles.meta}>
                  <span>{j.genre}</span>
                  <span className={styles.dot}>•</span>
                  <span>{j.hours}</span>
                </div>
                <p className={styles.dates}>{j.dates}</p>
                <p className={styles.blurb}>{j.blurb}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
