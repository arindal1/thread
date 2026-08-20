import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Thread — A Personal CRM",
    short_name: "Thread",
    description:
      "A private memory system for people — facts, notes, and context about everyone you know.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0908",
    theme_color: "#0b0908",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}