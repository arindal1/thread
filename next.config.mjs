/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [],
  },
  // Baseline security headers (OWASP secure-headers baseline). CSP is
  // intentionally left out for now: the WebGL shader/canvas hero + inline
  // font-fallback <style> would need a carefully tuned policy (nonces or
  // 'unsafe-inline' scoping) that hasn't been validated yet - see
  // docs/Architecture.md "Known limitations".
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;