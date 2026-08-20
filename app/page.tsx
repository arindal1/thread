"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import {
  Feather,
  Hourglass,
  ScrollText,
  Sparkles,
  Fingerprint,
  CalendarClock,
  SearchCode,
} from "lucide-react";
import { MarbleBackground } from "@/components/gl/MarbleBackground";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Reveal } from "@/components/ui/Reveal";
import { SiteNav } from "@/components/layout/SiteNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { useGsapScroll } from "@/lib/gsap/useGsapScroll";

// Generative WebGL hero object - client-only, lazy, skipped entirely if the
// user prefers reduced motion or is on a narrow/low-power viewport.
const EmberRings = dynamic(
  () => import("@/components/gl/EmberRings").then((m) => m.EmberRings),
  { ssr: false }
);

const facts = [
  {
    icon: Feather,
    title: "Every detail, kept",
    body: "Birthdays, blood groups, the name of their dog - the small facts that make someone feel truly known.",
  },
  {
    icon: ScrollText,
    title: "The thread of conversation",
    body: "Notes and events fall into place along a timeline, so nothing said is ever truly forgotten.",
  },
  {
    icon: Hourglass,
    title: "Before you meet again",
    body: "A quiet summary surfaces what matters - last spoken of, what to ask, what to remember.",
  },
];

const capabilities = [
  { icon: Fingerprint, label: "Structured & free-form facts" },
  { icon: CalendarClock, label: "Important dates, tracked" },
  { icon: SearchCode, label: "Semantic search across notes" },
];

export default function LandingPage() {
  useGsapScroll((gsap) => {
    gsap.from("[data-hero-line]", {
      yPercent: 110,
      duration: 1.4,
      ease: "expo.out",
      stagger: 0.12,
      delay: 0.2,
    });
    gsap.from("[data-hero-fade]", {
      opacity: 0,
      y: 16,
      duration: 1.2,
      ease: "power2.out",
      stagger: 0.1,
      delay: 0.6,
    });
  }, []);

  return (
    <div className="relative min-h-screen">
      <CustomCursor />
      <SiteNav />

      {/* Hero */}
      <section className="relative flex h-[100svh] min-h-[640px] flex-col overflow-hidden">
        <MarbleBackground />

        {/* Ember rings - generative WebGL hero object. Only shown from lg
            up: at md the viewport isn't wide enough to fit it beside the
            headline without crowding/overlapping the text. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 top-1/2 hidden h-[420px] w-[420px] -translate-y-1/2 opacity-70 lg:block xl:-right-16 xl:h-[560px] xl:w-[560px]"
        >
          <EmberRings />
        </div>

        <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl flex-1 flex-col justify-center px-6 pt-24 md:justify-between md:px-10 md:pb-14 md:pt-32">
          <div>
            <p data-hero-fade className="lede mb-6 text-lg text-[var(--accent)] md:text-xl">
              For every person who matters -
            </p>
            <h1 className="display overflow-hidden text-[13vw] leading-[0.95] text-[var(--ink)] sm:text-[10vw] md:text-[7vw] lg:text-[var(--step-6)]">
              <span className="block overflow-hidden">
                <span data-hero-line className="block">Remember them</span>
              </span>
              <span className="block overflow-hidden">
                <span data-hero-line className="block italic text-[var(--accent)]">
                  the way they deserve.
                </span>
              </span>
            </h1>
          </div>

          <div data-hero-fade className="mt-12 flex flex-col gap-6 md:mt-0 md:flex-row md:items-end md:justify-between">
            <p className="lede max-w-md text-base text-[var(--muted)] md:text-lg">
              Thread holds the facts, the conversations, and the context -
              so you never walk into a room having forgotten who someone is.
            </p>
            <Link
              href="/signup"
              data-cursor
              className="column-label w-fit border border-[var(--accent)] px-6 py-3 text-[var(--accent)] transition-colors duration-300 hover:bg-[var(--accent)] hover:text-[var(--bg)]"
            >
              ENTER THREAD →
            </Link>
          </div>
        </div>
      </section>

      {/* Thesis strip */}
      <section id="thesis" className="border-y border-[var(--line)] px-6 py-10 md:px-10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-12 gap-y-4">
          {capabilities.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3 text-[var(--muted)]">
              <Icon className="h-4 w-4 text-[var(--accent)]" strokeWidth={1.25} />
              <span className="column-label">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Feature rows - editorial numbered index */}
      <section id="facts" className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
        <Reveal><p className="column-label mb-4">01 - WHAT THREAD REMEMBERS</p></Reveal>
        <div className="rule mb-16" />
        <div className="grid gap-12 md:grid-cols-3 md:gap-16">
          {facts.map(({ icon: Icon, title, body }, i) => (
            <Reveal key={title} delay={i * 0.1} className="border-t border-[var(--line)] pt-6">
              <Icon className="mb-6 h-6 w-6 text-[var(--accent)]" strokeWidth={1.25} />
              <h3 className="display mb-3 text-2xl">{title}</h3>
              <p className="text-[var(--muted)]">{body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Editorial split */}
      <section id="ai" className="mx-auto grid max-w-6xl gap-10 px-6 py-24 md:grid-cols-2 md:gap-12 md:px-10 md:py-32">
        <Reveal>
          <p className="column-label mb-4">02 - THE QUESTION IT ANSWERS</p>
          <h2 className="display text-3xl leading-tight md:text-5xl">
            &ldquo;What did we last talk about?&rdquo;
          </h2>
        </Reveal>
        <Reveal delay={0.15} className="lede text-lg leading-relaxed text-[var(--muted)] md:text-xl">
          <p className="mb-6">
            An AI-generated summary - Gemini, reading only what you&rsquo;ve written -
            surfaces the shape of a relationship: what&rsquo;s changed, what&rsquo;s stayed
            the same, what&rsquo;s worth asking next.
          </p>
          <p className="flex items-center gap-2 text-[var(--accent)]">
            <Sparkles className="h-4 w-4" strokeWidth={1.5} /> Generated, never fabricated.
          </p>
        </Reveal>
      </section>

      {/* CTA */}
      <section id="begin" className="relative overflow-hidden border-t border-[var(--line)] px-6 py-20 text-center md:py-24">
        <Reveal>
          <h2 className="display mx-auto max-w-2xl text-3xl leading-tight md:text-[var(--step-3)]">
            Begin your thread.
          </h2>
          <p className="lede mx-auto mt-6 max-w-md text-base text-[var(--muted)] md:text-lg">
            Private. Yours. Always growing.
          </p>
          <Link
            href="/signup"
            data-cursor
            className="column-label mt-10 inline-block border border-[var(--accent)] px-8 py-4 text-[var(--accent)] transition-colors duration-300 hover:bg-[var(--accent)] hover:text-[var(--bg)]"
          >
            CREATE YOUR ACCOUNT
          </Link>
        </Reveal>
      </section>

      <SiteFooter />
    </div>
  );
}