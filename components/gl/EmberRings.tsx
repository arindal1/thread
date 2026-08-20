"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Generative WebGL "hero object": a slowly rotating cluster of thin gold
 * rings (like an orrery / astrolabe) rendered with raw three.js - no r3f
 * overhead. Stands in for the "person constellation" motif without the
 * heavier particle-line system. Disabled on prefers-reduced-motion (renders
 * one static frame) and skipped entirely below a width threshold to protect
 * mobile performance.
 */
export function EmberRings({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 9);

    const group = new THREE.Group();
    const goldMat = new THREE.LineBasicMaterial({ color: 0xc9a24b, transparent: true, opacity: 0.55 });
    const emberMat = new THREE.LineBasicMaterial({ color: 0x7a1f2b, transparent: true, opacity: 0.4 });

    // Each ring gets its own orbital pivot (revolves around the cluster
    // center) plus spins on its own tilted axis - like a small orrery
    // rather than one rigid rotating disc. Speeds/directions/tilts are
    // deliberately varied per ring so the motion reads as independent.
    const ringCount = 5;
    const rings: {
      pivot: THREE.Group;
      mesh: THREE.Line;
      spinSpeed: number;
      orbitSpeed: number;
      orbitOffset: number;
    }[] = [];

    for (let i = 0; i < ringCount; i++) {
      const radius = 1.6 + i * 0.55;
      const points: THREE.Vector3[] = [];
      const segments = 96;
      for (let s = 0; s <= segments; s++) {
        const a = (s / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(a) * radius, Math.sin(a) * radius * 0.38, 0));
      }
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      const ring = new THREE.Line(geo, i % 2 === 0 ? goldMat : emberMat);
      const direction = i % 2 === 0 ? 1 : -1;
      ring.rotation.x = Math.PI / 2.4 + (i - ringCount / 2) * 0.12;
      ring.rotation.z = (i / ringCount) * Math.PI * 0.5;

      const pivot = new THREE.Group();
      // Small orbital offset so the pivot's own rotation visibly carries
      // each ring around the shared center, distinct from the ring's own
      // spin around its own axis.
      ring.position.set(0.18 * direction * (i * 0.4), 0.1 * direction, 0);
      pivot.add(ring);
      pivot.rotation.z = (i / ringCount) * Math.PI * 2;
      group.add(pivot);

      rings.push({
        pivot,
        mesh: ring,
        spinSpeed: (0.6 + i * 0.35) * direction * 0.01,
        orbitSpeed: (0.25 + (ringCount - i) * 0.12) * direction * 0.006,
        orbitOffset: i * 1.3,
      });
    }
    scene.add(group);

    let visible = true;
    const observer = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0 });
    observer.observe(canvas);

    const resize = () => {
      const { clientWidth, clientHeight } = canvas;
      renderer.setSize(clientWidth, clientHeight, false);
      camera.aspect = clientWidth / (clientHeight || 1);
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);

    let frameId: number;
    const tick = () => {
      frameId = requestAnimationFrame(tick);
      if (!visible) return;
      if (!reduceMotion) {
        const t = Date.now() * 0.001;
        group.rotation.y += 0.0012;
        group.rotation.x = Math.sin(t * 0.1) * 0.15;
        for (const r of rings) {
          // Revolve: pivot carries the ring around the shared center.
          r.pivot.rotation.z += r.orbitSpeed;
          // Spin: the ring also turns on its own tilted axis, plus a
          // gentle bob so no two rings ever look perfectly in sync.
          r.mesh.rotation.z += r.spinSpeed;
          r.mesh.rotation.x += Math.sin(t + r.orbitOffset) * 0.0006;
        }
      }
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      observer.disconnect();
      rings.forEach((r) => r.mesh.geometry.dispose());
      goldMat.dispose();
      emberMat.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className={className ?? "h-full w-full"} aria-hidden="true" />;
}