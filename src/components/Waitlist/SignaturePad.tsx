import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import styles from "./SignaturePad.module.css";

type Point = { x: number; y: number; t: number };

export type SignaturePadHandle = {
  /** Returns the signature as a PNG data URL, or null if empty. */
  toPng: () => string | null;
  clear: () => void;
  hasInk: boolean;
};

export const SignaturePad = forwardRef<SignaturePadHandle>((_props, ref) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const lastRef = useRef<Point | null>(null);
  const drawingRef = useRef(false);
  const inkRef = useRef(false);
  const [hasInk, setHasInk] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      // Preserve existing ink across resize.
      const snapshot = inkRef.current ? canvas.toDataURL("image/png") : null;
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(dpr, dpr);
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.strokeStyle = "#1c1a18";
        if (snapshot) {
          const img = new Image();
          img.onload = () => ctx.drawImage(img, 0, 0, rect.width, rect.height);
          img.src = snapshot;
        }
      }
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const getPoint = (e: React.PointerEvent<HTMLCanvasElement>): Point => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      t: performance.now(),
    };
  };

  const onDown: React.PointerEventHandler<HTMLCanvasElement> = (e) => {
    e.preventDefault();
    (e.target as Element).setPointerCapture(e.pointerId);
    drawingRef.current = true;
    lastRef.current = getPoint(e);
    inkRef.current = true;
    setHasInk(true);
  };

  const onMove: React.PointerEventHandler<HTMLCanvasElement> = (e) => {
    if (!drawingRef.current) return;
    const ctx = canvasRef.current?.getContext("2d");
    const last = lastRef.current;
    if (!ctx || !last) return;
    const point = getPoint(e);
    const dx = point.x - last.x;
    const dy = point.y - last.y;
    const dist = Math.hypot(dx, dy);
    const dt = Math.max(1, point.t - last.t);
    const velocity = dist / dt;
    const width = Math.max(0.9, Math.min(3.2, 3.4 - velocity * 3));
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(last.x, last.y);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
    lastRef.current = point;
  };

  const onUp = () => {
    drawingRef.current = false;
    lastRef.current = null;
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    inkRef.current = false;
    setHasInk(false);
  };

  useImperativeHandle(ref, () => ({
    toPng: () => {
      const canvas = canvasRef.current;
      if (!canvas || !inkRef.current) return null;
      return canvas.toDataURL("image/png");
    },
    clear,
    hasInk,
  }));

  return (
    <div className={styles.pad}>
      <div className={styles.canvasWrap}>
        <canvas
          ref={canvasRef}
          className={styles.canvas}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
        />
        <div className={styles.baseline} aria-hidden />
        <span className={`${styles.hint} ${hasInk ? styles.hidden : ""}`}>
          — sign here —
        </span>
      </div>
      <div className={styles.controls}>
        <button type="button" className={styles.btn} onClick={clear}>
          Clear
        </button>
      </div>
    </div>
  );
});

SignaturePad.displayName = "SignaturePad";
