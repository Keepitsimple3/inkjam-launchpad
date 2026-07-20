import notebookImg from "@/assets/notebook.jpg";
import styles from "./Desk.module.css";

export function Desk() {
  return (
    <section id="desk" className={styles.section}>
      <div className={styles.wrap}>
        <div className={styles.copy}>
          <span className={styles.eyebrow}>The Desk</span>
          <h2 className={styles.title}>
            Write your<br />
            <em>first line</em>.
          </h2>
          <p className={styles.lede}>
            Open the notebook. A prompt is already waiting on the page — no accounts, no pressure, just the quiet part of writing.
          </p>
          <p className={styles.hand}>↳ It's just for you.</p>
        </div>

        <div className={styles.figure}>
          <img
            src={notebookImg}
            alt="An open notebook with a pencil and a small flower"
            className={styles.img}
            loading="lazy"
            width={1200}
            height={800}
          />
          <span className={styles.prompt}>
            <span className={styles.promptLabel}>Today's prompt</span>
            <span className={styles.promptText}>"A door you didn't know was there."</span>
          </span>
        </div>
      </div>
    </section>
  );
}
