import { useFastScroll } from "@/hooks/useFastScroll";
import styles from "./Header.module.css";

const NAV = [
  { id: "desk", label: "jam" },
  { id: "about", label: "about" },
  { id: "jams", label: "prompts" },
  { id: "waitlist", label: "waitlist" },
];

export function Header() {
  const scrollTo = useFastScroll({ offset: 64 });

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a
          href="#top"
          className={styles.brand}
          onClick={(e) => { e.preventDefault(); scrollTo("top"); }}
        >
          Ink Jam
        </a>

        <nav className={styles.nav} aria-label="Primary">
          {NAV.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={styles.navLink}
              onClick={(e) => { e.preventDefault(); scrollTo(item.id); }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
