import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const AnimatedChar = ({ char, index, totalChars, scrollYProgress }) => {
  // Localized progress point for this character
  const charProgress = index / totalChars;
  
  // Map the global scroll progress to this character's opacity
  // Staggered range: start revealing slightly before its position and finish slightly after
  const opacity = useTransform(
    scrollYProgress,
    [charProgress - 0.1, charProgress + 0.05],
    [0.2, 1]
  );

  return (
    <motion.span 
      style={{ opacity }} 
      className="inline-block"
    >
      {char}
    </motion.span>
  );
};

const ScrollRevealText = ({ text, className = "" }) => {
  const containerRef = useRef(null);
  
  // Track scroll progress of the container
  // Offset: Animation starts when top is at 80% of viewport, ends when bottom is at 20%
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const words = text.split(' ');
  let charIndexCounter = 0;

  // Calculate total non-space characters for more accurate mapping
  const totalChars = text.length;

  return (
    <div ref={containerRef} className={`${className} leading-relaxed`}>
      {words.map((word, wordIdx) => {
        const characters = word.split('');
        return (
          <span key={wordIdx} className="inline-flex mr-[0.25em] whitespace-nowrap">
            {characters.map((char, charIdx) => {
              const globalIndex = charIndexCounter++;
              return (
                <AnimatedChar
                  key={`${wordIdx}-${charIdx}`}
                  char={char}
                  index={globalIndex}
                  totalChars={totalChars}
                  scrollYProgress={scrollYProgress}
                />
              );
            })}
          </span>
        );
      })}
    </div>
  );
};

export default ScrollRevealText;
