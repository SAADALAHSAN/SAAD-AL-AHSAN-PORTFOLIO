import React, { useEffect, useRef } from "react";
import "./Cursor.css";

/**
 * BUG 3 FIX: Removed gsap.to() from inside the RAF loop.
 *   The old code called gsap.to() every animation frame (60/s),
 *   creating 60 new GSAP tweens per second — serious perf lag.
 *   Now using direct DOM style.transform for the smooth follow.
 */
const Cursor = () => {
  const cursorRef = useRef(null);
  
  useEffect(() => {
    let hover = false;
    const cursor = cursorRef.current;
    if (!cursor) return;
    
    const mousePos = { x: 0, y: 0 };
    const cursorPos = { x: 0, y: 0 };
    
    const onMouseMove = (e) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    };
    document.addEventListener("mousemove", onMouseMove);
    
    let animationFrameId;
    const loop = () => {
      if (!hover) {
        const delay = 6;
        cursorPos.x += (mousePos.x - cursorPos.x) / delay;
        cursorPos.y += (mousePos.y - cursorPos.y) / delay;
        // Direct DOM transform instead of gsap.to() — no tween overhead
        cursor.style.transform = `translate(${cursorPos.x}px, ${cursorPos.y}px)`;
      }
      animationFrameId = requestAnimationFrame(loop);
    };
    animationFrameId = requestAnimationFrame(loop);
    
    const handleMouseOver = (e) => {
      const element = e.target.closest('[data-cursor]');
      if (!element) return;
      
      const rect = element.getBoundingClientRect();
      if (element.dataset.cursor === "icons") {
        cursor.classList.add("cursor-icons");
        // Keep direct positioning for snap-to-icon hover
        cursor.style.transform = `translate(${rect.left}px, ${rect.top}px)`;
        cursor.style.setProperty("--cursorH", `${rect.height}px`);
        hover = true;
      }
      if (element.dataset.cursor === "disable") {
        cursor.classList.add("cursor-disable");
      }
    };
    
    const handleMouseOut = (e) => {
      const element = e.target.closest('[data-cursor]');
      if (!element) return;
      cursor.classList.remove("cursor-disable", "cursor-icons");
      hover = false;
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <div className="cursor-main" ref={cursorRef}></div>;
};

export default Cursor;
