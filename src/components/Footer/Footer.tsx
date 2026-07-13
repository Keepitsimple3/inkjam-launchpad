import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer id="blog" className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.tag}>
          Open to all skill levels. No algorithms. <em>Just writers.</em>
        </p>
        <p className={styles.small}>
          © {new Date().getFullYear()} InkJam — a quiet corner of the internet.
        </p>
      </div>
    </footer>
  );
}
