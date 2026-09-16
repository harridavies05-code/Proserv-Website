"use client";

import { motion } from "motion/react";

const sparks = [
  { left: "6%", width: 2, height: 18, delay: 0, duration: 4.5 },
  { left: "15%", width: 3, height: 24, delay: 1.4, duration: 5.2 },
  { left: "24%", width: 2, height: 16, delay: 2.6, duration: 4.8 },
  { left: "33%", width: 2, height: 20, delay: 0.6, duration: 6 },
  { left: "42%", width: 3, height: 26, delay: 3.2, duration: 5 },
  { left: "51%", width: 2, height: 16, delay: 1.9, duration: 4.2 },
  { left: "60%", width: 3, height: 22, delay: 0.3, duration: 5.6 },
  { left: "69%", width: 2, height: 18, delay: 2.9, duration: 4.6 },
  { left: "78%", width: 2, height: 20, delay: 1.1, duration: 5.4 },
  { left: "87%", width: 3, height: 24, delay: 3.7, duration: 4.9 },
  { left: "94%", width: 2, height: 16, delay: 0.9, duration: 5.8 },
];

export default function Sparks({ density = 1 }: { density?: number }) {
  const active = sparks.slice(0, Math.round(sparks.length * density));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {active.map((s, i) => (
        <motion.span
          key={i}
          className="absolute bottom-0 rounded-full"
          style={{
            left: s.left,
            width: s.width,
            height: s.height,
            background:
              "linear-gradient(to bottom, transparent, rgba(245,158,11,0.9))",
            boxShadow: "0 0 8px 1px rgba(245,158,11,0.5)",
          }}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: "-110vh", opacity: [0, 1, 1, 0] }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
