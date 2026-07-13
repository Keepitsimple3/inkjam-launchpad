import { useFastScroll } from "@/hooks/useFastScroll";
import styles from "./Header.module.css";

const LEFT = [
  { id: "desk", label: "jam" },
  { id: "perks", label: "about" },
];
const RIGHT = [
  { id: "waitlist", label: "community" },
  { id: "jams", label: "blog" },
];

export function Header() {
  const scrollTo = useFastScroll({ offset: 72 });

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <nav className={styles.navLeft} aria-label="Primary left">
          {LEFT.map((item) => (
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

        <a
          href="#top"
          className={styles.brand}
          onClick={(e) => { e.preventDefault(); scrollTo("top"); }}
        >
          Ink Jam
        </a>

        <nav className={styles.navRight} aria-label="Primary right">
          {RIGHT.map((item) => (
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
