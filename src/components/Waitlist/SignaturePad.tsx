import { useEffect, useRef, useState } from "react";
import styles from "./SignaturePad.module.css";

type Point = { x: number; y: number; t: number };

export function SignaturePad() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const lastRef = useRef<Point | null>(null);
  const drawingRef = useRef(false);
  const [hasInk, setHasInk] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(dpr, dpr);
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.strokeStyle = "#1a1408";
      }
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const getPoint = (e: PointerEvent | React.PointerEvent): Point => {
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
    // Faster stroke → thinner line (ink taper)
    const width = Math.max(0.8, Math.min(3.2, 3.4 - velocity * 3));
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(last.x, last.y);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
    lastRef.current = point;
  };

  const onUp: React.PointerEventHandler<HTMLCanvasElement> = () => {
    drawingRef.current = false;
    lastRef.current = null;
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasInk(false);
  };

  const save = () => {
    const canvas = canvasRef.current;
    if (!canvas || !hasInk) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "inkjam-signature.png";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

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
        <button type="button" className={`${styles.btn} ${styles.save}`} onClick={save}>
          Save signature
        </button>
      </div>
    </div>
  );
}
