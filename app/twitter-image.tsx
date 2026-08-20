import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Thread — A Personal CRM";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "#0b0908",
          padding: "80px",
        }}
      >
        <div style={{ display: "flex", color: "#c9a24b", fontSize: 28, letterSpacing: 6 }}>
          FOR EVERY PERSON WHO MATTERS
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            color: "#f3ecdf",
            fontSize: 96,
            fontFamily: "Georgia, serif",
            lineHeight: 1.05,
          }}
        >
          Remember them the way they deserve.
        </div>
      </div>
    ),
    size
  );
}