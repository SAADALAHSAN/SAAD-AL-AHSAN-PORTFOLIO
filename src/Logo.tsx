import React from "react";

const Logo = () => {
  return (
    <div
      className="group flex items-center gap-3 cursor-pointer select-none"
      data-cursor="icons"
    >
      {/* PART 1 — Hexagon icon mark with "S" */}
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <polygon
          points="16,4 26,9.5 26,22.5 16,28 6,22.5 6,9.5"
          fill="none"
          stroke="#eab676"
          strokeWidth="1.5"
          className="logo-hex"
        />
        <text
          x="16"
          y="21"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill="#eab676"
          fontFamily="system-ui"
          className="logo-hex-text"
        >
          S
        </text>
      </svg>

      {/* PART 2 — Text mark */}
      <div className="flex flex-col">
        <span className="text-white font-bold text-[15px] tracking-[0.25em] uppercase leading-none">
          SAAD
        </span>
        <span className="text-white/35 text-[7px] tracking-[0.3em] uppercase leading-none mt-[3px]">
          AL AHSAN
        </span>
      </div>
    </div>
  );
};

export default Logo;
