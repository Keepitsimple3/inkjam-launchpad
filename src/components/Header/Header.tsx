import { useFastScroll } from "@/hooks/useFastScroll";
import styles from "./Header.module.css";

const NAV = [
  { id: "jams", label: "Jams" },
  { id: "about", label: "About" },
  { id: "community", label: "Community" },
  { id: "blog", label: "Blog" },
];

export function Header() {
  const scrollTo = useFastScroll({ offset: 72 });

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a
          href="#top"
          className={styles.brand}
          onClick={(e) => {
            e.preventDefault();
            scrollTo("top");
          }}
        >
          <span className={styles.brandMark}>Ink</span>
          <span className={styles.brandMarkAlt}>Jam</span>
          <span className={styles.brandLeaf} aria-hidden>
            ✦
          </span>
        </a>

        <nav className={styles.nav} aria-label="Primary">
          {NAV.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={styles.navLink}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(item.id);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#waitlist"
          className={styles.cta}
          onClick={(e) => {
            e.preventDefault();
            scrollTo("waitlist");
          }}
        >
          Join Waitlist
        </a>
      </div>
    </header>
  );
}
