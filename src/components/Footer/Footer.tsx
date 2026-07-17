import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer id="blog" className={styles.footer}>
      <div className={styles.inner}>
        <span className={styles.folio}>inkjam</span>
        <span className={styles.dot}>·</span>
        <span>issue 00</span>
        <span className={styles.dot}>·</span>
        <span>founding waitlist</span>
        <span className={styles.dot}>·</span>
        <span>© {new Date().getFullYear()}</span>
        <span className={styles.dot}>·</span>
        <span className={styles.glyph}>⁂</span>
      </div>
    </footer>
  );
}
