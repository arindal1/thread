"use client";

import { useEffect, useRef } from "react";

/** Custom ring cursor with magnetic hover states. Skipped on touch devices. */
export function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;

    let x = 0,
      y = 0,
      tx = 0,
      ty = 0;
    const move = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    window.addEventListener("pointermove", move);

    const onEnter = () => el.classList.add("scale-[2.5]");
    const onLeave = () => el.classList.remove("scale-[2.5]");
    const interactive = document.querySelectorAll("a, button, [data-cursor]");
    interactive.forEach((n) => {
      n.addEventListener("pointerenter", onEnter);
      n.addEventListener("pointerleave", onLeave);
    });

    let raf: number;
    const loop = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener("pointermove", move);
      interactive.forEach((n) => {
        n.removeEventListener("pointerenter", onEnter);
        n.removeEventListener("pointerleave", onLeave);
      });
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="custom-cursor fixed left-0 top-0 z-[9999] hidden md:block transition-transform duration-200 ease-expo"
      aria-hidden="true"
    />
  );
}