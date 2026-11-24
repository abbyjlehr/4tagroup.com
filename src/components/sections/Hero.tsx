"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { HOME_PAGE, IMAGES } from "@/lib/constants";

export function Hero() {
  const { hero } = HOME_PAGE;
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section ref={ref} className="relative flex items-center bg-navy overflow-hidden min-h-[min(88vh,700px)] sm:min-h-[88vh]" style={{ paddingTop: "max(5rem, calc(5rem + env(safe-area-inset-top)))" }}>
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ y: reduce ? 0 : imageY }}
        initial={reduce ? false : { scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src={IMAGES.hero}
          alt="Pilot in cockpit"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </motion.div>
      {/* Directional overlays: keep text readable, let more image show through */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy/92 via-navy/75 to-navy/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/65 via-transparent to-navy/30" />

      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-20 md:py-28"
      >
        <div className="max-w-[640px]">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-red mb-6 sm:mb-8"
          >
            <span className="inline-block w-6 h-px bg-red/50" />
            Certified Women Owned Small Business
          </motion.p>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
            className="font-heading text-4xl font-bold text-white sm:text-5xl md:text-6xl lg:text-[4.5rem] leading-[1.1] tracking-tight"
          >
            {hero.headline}
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="mt-4 sm:mt-6 text-base text-white/65 leading-relaxed sm:text-lg max-w-[480px]"
          >
            {hero.subheadline}
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.65 }}
            className="mt-8 sm:mt-10 flex flex-wrap gap-3"
          >
            <Link
              href={hero.ctaPrimary.href}
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-3 sm:px-6 bg-red text-white text-sm font-bold rounded-xl hover:bg-red-light transition-all duration-200 shadow-lg shadow-red/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              {hero.ctaPrimary.label}
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href={hero.ctaSecondary.href}
              className="inline-flex items-center justify-center min-h-[44px] px-5 py-3 sm:px-6 text-white/85 border border-white/20 text-sm font-semibold rounded-xl hover:bg-white/8 hover:border-white/35 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              {hero.ctaSecondary.label}
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
