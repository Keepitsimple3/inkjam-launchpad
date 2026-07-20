import { useEffect, useState } from "react";
import { useFastScroll } from "@/hooks/useFastScroll";
import styles from "./Header.module.css";

const NAV = [
  { id: "jams", label: "Jams" },
  { id: "desk", label: "The Desk" },
  { id: "perks", label: "Perks" },
  { id: "about", label: "About" },
];

export function Header() {
  const scrollTo = useFastScroll({ offset: 72 });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.inner}>
        <div className={styles.brandGroup}>
          <a
            href="#top"
            className={styles.logo}
            onClick={(e) => {
              e.preventDefault();
              scrollTo("top");
            }}
          >
            InkJam
          </a>
          <div className={styles.tags} aria-hidden>
            <span className={styles.tag}>#note</span>
            <span className={styles.tag}>#issue00</span>
          </div>
        </div>

        <nav className={styles.nav}>
          {NAV.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={styles.link}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(item.id);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <a href="#login" className={styles.login}>Log in</a>
          <a
            href="#waitlist"
            className={styles.button}
            onClick={(e) => {
              e.preventDefault();
              scrollTo("waitlist");
            }}
          >
            Join the waitlist
          </a>
        </div>
      </div>
    </header>
  );
}
