import { useSeededCounter } from "@/hooks/useSeededCounter";
import { SignaturePad } from "./SignaturePad";
import { Folio } from "@/components/Folio/Folio";
import styles from "./Waitlist.module.css";

export function Waitlist() {
  const position = useSeededCounter(231);

  return (
    <section id="waitlist" className={styles.section}>
      <div className={styles.wrap}>
        <span className={styles.corner1} aria-hidden />
        <span className={styles.corner2} aria-hidden />

        <Folio no="07" title="The Guestbook" page="16" glyph="§" />

        <span className={styles.eyebrow}>Founding writers</span>
        <h2 className={styles.title}>
          Sign the <em>guestbook</em>.
        </h2>
        <p className={styles.lede}>
          Founding writers get their signature printed in the first InkJam zine.
          Draw yours below and we'll ink it into the founding issue.
        </p>

        <div className={styles.padWrap}>
          <SignaturePad />
        </div>

        <div className={styles.ticket}>
          <span className={styles.ticketNum}>#{position ?? "—"}</span>
          <span className={styles.ticketLabel}>joining the founding jam</span>
        </div>

        <div>
          <button type="button" className={styles.cta} aria-disabled="true">
            Add me to the waitlist →
          </button>
        </div>

        <p id="community" className={styles.note}>
          Rather talk first? Our community chat opens with the first jam.
        </p>
      </div>
    </section>
  );
}
