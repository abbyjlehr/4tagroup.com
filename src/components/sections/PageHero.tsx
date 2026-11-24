"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { WordReveal } from "@/components/ui";

interface PageHeroProps {
  /** Short page name shown above the headline, e.g. "About". */
  label: string;
  headline: string;
  subheadline?: string;
  image: string;
  imageAlt: string;
  /** CSS object-position for the photo, e.g. "center 30%". */
  imagePosition?: string;
}

const ease = [0.16, 1, 0.3, 1] as const;

/** Full-bleed subpage hero, styled to match the home page hero. */
export function PageHero({ label, headline, subheadline, image, imageAlt, imagePosition = "center" }: PageHeroProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex items-end bg-navy overflow-hidden min-h-[520px] sm:min-h-[600px] lg:min-h-[640px]"
      style={{ paddingTop: "max(5rem, calc(5rem + env(safe-area-inset-top)))" }}
    >
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ y: reduce ? 0 : imageY }}
        initial={reduce ? false : { scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.2, ease }}
      >
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: imagePosition }}
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/60 to-navy/10" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/20 to-navy/30" aria-hidden />

      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pb-14 sm:pb-20 md:pb-24"
      >
        <div className="max-w-3xl">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.2 }}
            className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/80 mb-5 sm:mb-7"
          >
            <span className="inline-block w-8 h-0.5 bg-red" aria-hidden />
            {label}
          </motion.p>

          <h1
            className="font-heading text-4xl font-bold text-white sm:text-5xl md:text-6xl leading-[1.1] tracking-tight text-balance"
          >
            <WordReveal text={headline} delay={0.3} />
          </h1>

          {subheadline && (
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease, delay: 0.7 }}
              className="mt-4 sm:mt-6 text-base text-white/75 leading-relaxed sm:text-lg max-w-[520px]"
            >
              {subheadline}
            </motion.p>
          )}
        </div>
      </motion.div>
    </section>
  );
}
