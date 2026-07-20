import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <a href="#top" className={styles.logo}>InkJam</a>
          <p className={styles.tagline}>Write. Share. Grow.</p>
          <p className={styles.copy}>© {new Date().getFullYear()} InkJam</p>
        </div>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>Explore</h4>
          <a href="#jams">Jams</a>
          <a href="#desk">Prompt Library</a>
          <a href="#community">Community</a>
        </div>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>About</h4>
          <a href="#about">Our story</a>
          <a href="#about">How it works</a>
          <a href="#about">FAQ</a>
        </div>

        <div className={styles.col}>
          <h4 className={styles.colTitle}>Connect</h4>
          <a href="#community">Discord</a>
          <a href="#community">Instagram</a>
          <a href="#community">Contact</a>
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
