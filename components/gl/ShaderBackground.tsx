"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Full-bleed GLSL shader background. Pauses on prefers-reduced-motion and
 * when off-screen (IntersectionObserver) to stay affordable on low-power /
 * mobile devices.
 */
type ShaderBackgroundProps = {
  fragmentShader: string;
  uniforms?: Record<string, THREE.IUniform>;
  className?: string;
};

const VERTEX_SHADER = /* glsl */ `
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`;

// Stable empty-object default — an inline `= {}` default parameter creates a
// brand-new object on every render, which would sit in the effect's
// dependency array below and tear down/recreate the whole WebGL context on
// every re-render of the parent (MarbleBackground never passes `uniforms`,
// so this was firing constantly).
const EMPTY_UNIFORMS: Record<string, THREE.IUniform> = {};

export function ShaderBackground({
  fragmentShader,
  uniforms = EMPTY_UNIFORMS,
  className,
}: ShaderBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "low-power",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));

    const scene = new THREE.Scene();
    const camera = new THREE.Camera();
    const geometry = new THREE.PlaneGeometry(2, 2);

    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader,
      uniforms: {
        u_time: { value: 0 },
        u_resolution: { value: new THREE.Vector2(1, 1) },
        u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
        ...uniforms,
      },
    });

    scene.add(new THREE.Mesh(geometry, material));

    let visible = true;
    const observer = new IntersectionObserver(
      ([entry]) => (visible = entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(canvas);

    const resize = () => {
      const { clientWidth, clientHeight } = canvas;
      renderer.setSize(clientWidth, clientHeight, false);
      material.uniforms.u_resolution.value.set(clientWidth, clientHeight);
    };
    resize();
    window.addEventListener("resize", resize);

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      material.uniforms.u_mouse.value.set(
        (e.clientX - rect.left) / rect.width,
        1 - (e.clientY - rect.top) / rect.height
      );
    };
    window.addEventListener("pointermove", onPointerMove);

    let frameId: number;
    const clock = new THREE.Clock();
    const tick = () => {
      frameId = requestAnimationFrame(tick);
      if (!visible) return;
      material.uniforms.u_time.value = reduceMotion
        ? 0
        : clock.getElapsedTime();
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      observer.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [fragmentShader, uniforms]);

  return (
    <canvas
      ref={canvasRef}
      className={className ?? "absolute inset-0 h-full w-full"}
      aria-hidden="true"
    />
  );
}