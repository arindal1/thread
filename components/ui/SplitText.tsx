"use client";

/** Splits text into per-character spans for kinetic-type / GSAP reveals. */
export function SplitChars({
  text,
  className,
  charClassName,
}: {
  text: string;
  className?: string;
  charClassName?: string;
}) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          data-char
          className={charClassName}
          style={{ display: "inline-block", whiteSpace: "pre" }}
          aria-hidden="true"
        >
          {char}
        </span>
      ))}
    </span>
  );
}

/** Splits text into per-word spans - cheaper, better for long headlines. */
export function SplitWords({
  text,
  className,
  wordClassName,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
}) {
  return (
    <span className={className} aria-label={text}>
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          data-word
          className={wordClassName}
          style={{ display: "inline-block", overflow: "hidden" }}
        >
          <span style={{ display: "inline-block" }} aria-hidden="true">
            {word}&nbsp;
          </span>
        </span>
      ))}
    </span>
  );
}