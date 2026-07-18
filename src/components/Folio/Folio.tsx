import styles from "./Folio.module.css";

interface FolioProps {
  no: string;
  title: string;
  page: string;
  glyph?: string;
  onDark?: boolean;
}

/**
 * Editorial running head — sits at the top of a section like a zine masthead:
 * `No. 03  ⁂  THE DESK              inkjam · issue 00  p.12`
 * Rendered in small tracked sans so it never competes with the serif headings.
 */
export function Folio({ no, title, page, glyph = "⁂", onDark = false }: FolioProps) {
  return (
    <div className={`${styles.folio} ${onDark ? styles.onDark : ""}`}>
      <span className={styles.left}>
        <span>No. {no}</span>
        <span className={styles.glyph} aria-hidden>{glyph}</span>
        <span className={styles.title}>{title}</span>
      </span>
      <span className={styles.right}>
        <span>inkjam · issue 00</span>
        <span>p. {page}</span>
      </span>
    </div>
  );
}
