import type { CSSProperties, ReactNode } from "react";
import styles from "./SketchPlaceholder.module.css";

type Props = {
  label: string;
  height?: number | string;
  children?: ReactNode;
  style?: CSSProperties;
  className?: string;
};

/**
 * Hand-drawn illustration placeholder. Stands in for the sketch/typewriter/desk
 * artwork in the reference. Purely decorative.
 */
export function SketchPlaceholder({ label, height = 320, children, style, className }: Props) {
  return (
    <div
      className={`${styles.frame} ${className ?? ""}`}
      style={{ height, ...style }}
      role="img"
      aria-label={label}
    >
      <div className={styles.hatch} aria-hidden />
      <div className={styles.inner}>
        <span className={styles.tag}>illustration</span>
        <span className={styles.label}>{label}</span>
        {children}
      </div>
    </div>
  );
}
