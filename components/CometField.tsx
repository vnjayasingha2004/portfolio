"use client";

import { useEffect, useRef } from "react";

type Comet = {
  x: number;
  y: number;
  speed: number;
  length: number;
  alpha: number;
};

function resizeCanvas(
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  width: number,
  height: number
) {
  const ratio = Math.min(window.devicePixelRatio || 1, 1.5);

  canvas.width = Math.floor(width * ratio);
  canvas.height = Math.floor(height * ratio);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  context.setTransform(ratio, 0, 0, ratio, 0, 0);
}

export function CometField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationFrame = 0;
    let previousScrollY = window.scrollY;

    const comets: Comet[] = Array.from({ length: 14 }, (_, index) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      speed: 0.18 + index * 0.012,
      length: 95 + Math.random() * 120,
      alpha: 0.16 + Math.random() * 0.28,
    }));

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      resizeCanvas(canvas, context, width, height);
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);

      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - previousScrollY;
      previousScrollY = currentScrollY;

      for (const comet of comets) {
        comet.y += comet.speed + Math.max(0, scrollDelta) * 0.04;
        comet.x += comet.speed * 0.28;

        if (comet.y > height + 160) {
          comet.y = -160;
          comet.x = Math.random() * width;
        }

        const gradient = context.createLinearGradient(
          comet.x,
          comet.y,
          comet.x - comet.length,
          comet.y - comet.length * 0.55
        );

        gradient.addColorStop(0, `rgba(220, 240, 255, ${comet.alpha})`);
        gradient.addColorStop(0.45, `rgba(95, 150, 255, ${comet.alpha * 0.34})`);
        gradient.addColorStop(1, "rgba(95, 150, 255, 0)");

        context.beginPath();
        context.strokeStyle = gradient;
        context.lineWidth = 1;
        context.moveTo(comet.x, comet.y);
        context.lineTo(comet.x - comet.length, comet.y - comet.length * 0.55);
        context.stroke();
      }

      animationFrame = requestAnimationFrame(draw);
    };

    handleResize();
    draw();

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="comet-field" aria-hidden="true" />;
}