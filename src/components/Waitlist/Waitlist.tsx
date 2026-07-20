import { useRef, useState } from "react";
import { joinWaitlist } from "@/lib/supabase";
import { SignaturePad, type SignaturePadHandle } from "./SignaturePad";
import styles from "./Waitlist.module.css";

type Status = "idle" | "loading" | "success" | "error";

type Result = { position: number; total: number };

export function Waitlist() {
  const padRef = useRef<SignaturePadHandle>(null);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string>("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;

    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus("error");
      setError("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setError("");

    try {
      const signature = padRef.current?.toPng() ?? null;
      const { position, total } = await joinWaitlist(trimmed, signature);
      setResult({ position, total });
      setStatus("success");
      padRef.current?.clear();
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong joining the waitlist. Please try again.",
      );
    }
  };

  return (
    <section id="waitlist" className={styles.section}>
      <div className={styles.wrap}>
        <div className={styles.book}>
          <div className={styles.bookHead}>
            <span className={styles.bookLabel}>Sign the guestbook</span>
            <span className={styles.ticket}>Issue 00</span>
          </div>

          <div className={styles.padFrame}>
            <span className={`${styles.crop} ${styles.cropTL}`} aria-hidden />
            <span className={`${styles.crop} ${styles.cropTR}`} aria-hidden />
            <span className={`${styles.crop} ${styles.cropBL}`} aria-hidden />
            <span className={`${styles.crop} ${styles.cropBR}`} aria-hidden />
            <SignaturePad ref={padRef} />
          </div>
        </div>

        <div className={styles.copy}>
          <span className={styles.eyebrow}>Founding waitlist</span>
          <h2 className={styles.title}>
            Leave your <em>mark</em>.
          </h2>
          <p className={styles.lede}>
            Sign the book and become a founding writer of InkJam. Your signature goes into Issue 00.
          </p>

          <form className={styles.form} onSubmit={onSubmit} noValidate>
            <div className={styles.field}>
              <label htmlFor="waitlist-email" className={styles.label}>Your email</label>
              <input
                id="waitlist-email"
                type="email"
                className={styles.input}
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "loading"}
                autoComplete="email"
              />
            </div>

            <button type="submit" className={styles.button} disabled={status === "loading"}>
              {status === "loading" ? "Signing…" : "Sign the book"}
              {status !== "loading" && <span aria-hidden>→</span>}
            </button>
          </form>

          {status === "success" && result && (
            <div className={styles.result} role="status">
              <p className={styles.resultHead}>
                You're <em>#{result.position}</em> in line.
              </p>
              <p className={styles.resultBody}>
                {result.total > 0 && (
                  <>You're one of {result.total.toLocaleString()} founding writers. </>
                )}
                We'll be in touch when Issue 00 opens.
              </p>
            </div>
          )}

          {status === "error" && (
            <div className={styles.error} role="alert">
              {error}
            </div>
          )}

          {status === "idle" && (
            <span className={styles.tape} aria-hidden>
              Stories start here. Yours could be next.
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
