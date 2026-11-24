"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform, type Variants } from "framer-motion";

/** Long, soft "expo out" curve used for every scroll reveal on the site. */
export const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Heading text that rises word by word out of a mask as it scrolls into view.
 * Put it inside the heading element: <h2 className=…><WordReveal text="…" /></h2>
 */
export function WordReveal({ text, delay = 0 }: { text: string; delay?: number }) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07, delayChildren: delay } },
  };
  const word: Variants = {
    hidden: { y: "110%" },
    show: { y: "0%", transition: { duration: 1, ease: EASE } },
  };

  return (
    <motion.span
      variants={container}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
      className="inline"
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]">
          <motion.span variants={word} className="inline-block will-change-transform">
            {w}
          </motion.span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </motion.span>
  );
}

/**
 * Photo that unveils with a bottom-up wipe while settling from a slight zoom.
 * The wrapper fills its positioned parent; put a `fill` next/image inside.
 */
export function ImageReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  // Watch an unmasked wrapper: a fully clipped element never registers as on-screen.
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const shown = reduce || inView;

  return (
    <div ref={ref} className={`absolute inset-0 ${className}`}>
      <motion.div
        className="absolute inset-0 overflow-hidden"
        initial={reduce ? false : { clipPath: "inset(100% 0% 0% 0%)" }}
        animate={shown ? { clipPath: "inset(0% 0% 0% 0%)" } : undefined}
        transition={{ duration: 1.3, ease: EASE, delay }}
      >
        <motion.div
          className="absolute inset-0"
          initial={reduce ? false : { scale: 1.2 }}
          animate={shown ? { scale: 1 } : undefined}
          transition={{ duration: 1.8, ease: EASE, delay }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}

/**
 * Background photo that drifts slower than the page while it scrolls past.
 * Fills its positioned parent; put a `fill` next/image inside.
 */
export function ParallaxBg({ children, distance = 60 }: { children: React.ReactNode; distance?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-distance, distance]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden" aria-hidden>
      <motion.div
        className="absolute inset-x-0 will-change-transform"
        style={{ top: -distance, bottom: -distance, y: reduce ? 0 : y }}
      >
        {children}
      </motion.div>
    </div>
  );
}
