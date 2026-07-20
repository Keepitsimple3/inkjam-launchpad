import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <a href="#top" className={styles.logo}>Ink<span>Jam</span></a>
          <p className={styles.tagline}>Write. Share. Grow.</p>
          <p className={styles.copy}>© {new Date().getFullYear()} InkJam</p>
        </div>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>Explore</h4>
          <a href="#jams">Jams</a>
          <a href="#desk">The Desk</a>
          <a href="#about">About</a>
        </div>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>More</h4>
          <a href="#perks">Perks</a>
          <a href="#waitlist">Waitlist</a>
          <a href="#desk">Prompts</a>
        </div>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>Connect</h4>
          <a href="#waitlist">Discord</a>
          <a href="#waitlist">Instagram</a>
          <a href="#waitlist">Contact</a>
        </div>

        <div className={styles.note}>
          <p className={styles.small}>A weekly note for writers.</p>
          <form className={styles.mini} onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Your email" className={styles.miniInput} aria-label="Email" />
            <button type="submit" className={styles.miniBtn} aria-label="Subscribe">→</button>
          </form>
        </div>
      </div>
    </footer>
  );
}
