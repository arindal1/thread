"use client";

/**
 * The Marble & Ember hero backdrop: slow-drifting gold veins through dark
 * stone, warmed near the bottom like candlelight against marble. Reacts
 * gently to cursor position. Single signature shader for the whole app -
 * reused wherever a "living stone" backdrop is needed (hero, section breaks).
 */
import { ShaderBackground } from "./ShaderBackground";

export const MARBLE_FRAGMENT = /* glsl */ `
  precision highp float;
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    float a = hash(i), b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0)), d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }
  float fbm(vec2 p) {
    float v = 0.0, amp = 0.5;
    for (int i = 0; i < 5; i++) { v += amp * noise(p); p *= 2.02; amp *= 0.5; }
    return v;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 p = uv * 3.0;
    p.x += fbm(p + u_time * 0.02) * 1.4;
    float vein = fbm(p * 1.5 - u_mouse * 0.6);
    vein = smoothstep(0.42, 0.62, vein);

    vec3 marble = mix(vec3(0.043, 0.035, 0.031), vec3(0.09, 0.07, 0.055), uv.y);
    vec3 gold = vec3(0.79, 0.64, 0.29);
    vec3 col = mix(marble, gold, vein * 0.16);

    float ember = smoothstep(1.0, 0.0, uv.y) * 0.12;
    col += vec3(0.42, 0.1, 0.05) * ember;

    float vignette = smoothstep(1.15, 0.25, length(uv - 0.5));
    col *= vignette * 0.9 + 0.35;

    gl_FragColor = vec4(col, 1.0);
  }
`;

export function MarbleBackground({ className }: { className?: string }) {
  return <ShaderBackground fragmentShader={MARBLE_FRAGMENT} className={className} />;
}