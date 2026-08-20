// Font strategy: next/font/google requires a live fetch to Google Fonts at
// build/dev time, which is unreliable behind restrictive networks/proxies
// (ECONNRESET). Until a concept is chosen and fonts are self-hosted, every
// --font-* variable referenced by styles/concepts/*.css resolves to a safe
// local font stack here - no network dependency, same variable names.
export const fontVariablesClassName = "thread-font-fallbacks";

export const fontFallbackStyles = `
  .thread-font-fallbacks {
    --font-cinzel: Georgia, "Times New Roman", serif;
    --font-cormorant: Georgia, "Times New Roman", serif;
    --font-cormorant-sc: Georgia, serif;
    --font-playfair: Georgia, "Times New Roman", serif;
    --font-bodoni: Georgia, "Times New Roman", serif;
    --font-instrument: Georgia, serif;
    --font-eb-garamond: Georgia, "Times New Roman", serif;
    --font-fraunces: Georgia, serif;
    --font-space-grotesk: -apple-system, "Segoe UI", sans-serif;
    --font-jetbrains-mono: "Consolas", "SFMono-Regular", Menlo, monospace;
    --font-unifraktur: Georgia, serif;
  }
`;