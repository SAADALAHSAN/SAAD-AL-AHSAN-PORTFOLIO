import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from './hooks/useReducedMotion';

/**
 * 1. WordsPullUp (Staggered Word Reveal)
 * Purpose: For giant hero headings.
 */
export const WordsPullUp = ({ text, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const words = text.split(" ");

  return (
    <div ref={ref} className={`flex flex-wrap ${className}`}>
      {words.map((word, index) => (
        <div key={index} className="overflow-hidden inline-block mr-[0.2em] relative pb-[0.2em] -mb-[0.2em]">
          <motion.div
            initial={{ y: "120%", opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
              delay: index * 0.08,
            }}
          >
            {word}
          </motion.div>
        </div>
      ))}
    </div>
  );
};

/**
 * 2. WordsPullUpMultiStyle (Mixed-Style Staggered Words)
 * Purpose: For headings with mixed font styles.
 */
export const WordsPullUpMultiStyle = ({ segments, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const flattenedWords = segments.flatMap((segment) =>
    segment.text.split(" ").map((word) => ({
      text: word,
      className: segment.className || "",
    }))
  );

  return (
    <div ref={ref} className={`flex flex-wrap ${className}`}>
      {flattenedWords.map((word, index) => (
        <div key={index} className="overflow-hidden inline-block mr-[0.2em] relative pb-[0.2em] -mb-[0.2em]">
          <motion.div
            className={`${word.className} pb-[0.2em]`}
            initial={{ y: "120%", opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
              delay: index * 0.08,
            }}
          >
            {word.text}
          </motion.div>
        </div>
      ))}
    </div>
  );
};

/**
 * 3. ScrollAnimatedText (Scroll-Linked Word Fade)
 * Purpose: For body paragraphs that reveal progressively.
 * BUG 6 FIX: Switched from per-character to per-word animation.
 *   Per-character created 200+ motion.spans causing scroll jitter.
 *   Per-word reduces animated elements to ~30 per paragraph.
 */
const AnimatedWord = ({ word, index, totalWords, scrollYProgress }) => {
  const wordProgress = index / totalWords;
  const opacity = useTransform(
    scrollYProgress,
    [wordProgress - 0.1, wordProgress + 0.05],
    [0.2, 1]
  );

  return (
    <motion.span style={{ opacity }} className="inline-block mr-[0.25em] mb-[0.1em]">
      {word}
    </motion.span>
  );
};

export const ScrollAnimatedText = ({ text, className = "" }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const words = text.split(' ');
  const totalWords = words.length;

  return (
    <div ref={containerRef} className={`${className} leading-relaxed`}>
      {words.map((word, wordIdx) => (
        <AnimatedWord
          key={wordIdx}
          word={word}
          index={wordIdx}
          totalWords={totalWords}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </div>
  );
};

/**
 * 4. Basic Staggered Fade-Up (Hero Sub-elements)
 * Purpose: For description text and CTA buttons.
 */
export const BasicFadeUp = ({ children, delay = 0, className = "" }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={prefersReducedMotion ? { opacity: 0 } : { y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay: delay,
      }}
    >
      {children}
    </motion.div>
  );
};

/**
 * 5. Scroll-Triggered Card Grid (Scale + Fade)
 * Purpose: For revealing a grid of feature cards.
 */
export const CardGrid = ({ children, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className={className}>
      {React.Children.map(children, (child, index) => (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
            delay: index * 0.15,
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
};
