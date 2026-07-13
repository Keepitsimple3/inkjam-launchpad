import { SketchPlaceholder } from "@/components/SketchPlaceholder";
import styles from "./Waitlist.module.css";

export function Waitlist() {
  return (
    <section id="waitlist" className={styles.section}>
      <div className={styles.wrap}>
        <div className={styles.art}>
          <SketchPlaceholder label="Little mailbox with a letter tucked inside" height={220} />
        </div>

        <div className={styles.copy}>
          <h2 className={styles.title}>
            Get a seat at the <em>desk</em>.
          </h2>
          <p className={styles.lede}>
            The first 100 writers get an invite to our founding jam — before
            anyone else. No spam. No newsletters. Just one email when the door
            opens.
          </p>

          <div className={styles.note}>
            <span className={styles.dot} aria-hidden />
            The waitlist opens soon — this is a preview of the landing page.
          </div>

          <p id="community" className={styles.discord}>
            Rather talk first? Our community chat opens with the first jam.
          </p>
        </div>
      </div>
    </section>
  );
}
