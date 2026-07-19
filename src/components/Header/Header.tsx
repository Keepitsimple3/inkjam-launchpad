import { useFastScroll } from "@/hooks/useFastScroll";
import styles from "./Header.module.css";

const NAV = [
  { id: "jams", label: "Jams", dropdown: true },
  { id: "prompts", label: "Prompt Library", dropdown: true },
  { id: "community", label: "Community", dropdown: true },
  { id: "about", label: "About", dropdown: true },
];

export function Header() {
  const scrollTo = useFastScroll({ offset: 72 });

  return (
    <header className={styles.header}>
      <div className={styles.inner}>

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
              {item.dropdown && (
                <span className={styles.arrow}>⌄</span>
              )}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <a
            href="#login"
            className={styles.login}
          >
            Log in
          </a>

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