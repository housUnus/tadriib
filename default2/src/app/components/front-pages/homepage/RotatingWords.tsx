"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function RotatingWords({words, duration=3000, className=""}: {words: string[], duration?: number, className?: string}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setIndex((prev) => (prev + 1) % words.length),
      duration
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="relative inline-block overflow-hidden sm:h-18 h-12 w-full sm:w-2xl">
  <AnimatePresence mode="wait">
    <motion.span
      key={index}
      initial={{ opacity: 0, y: "0.6em" }}
      animate={{ opacity: 1, y: "0em" }}
      exit={{ opacity: 0, y: "-0.6em" }}
      transition={{ duration: 0.45 }}
      className="absolute inset-0 flex items-center sm:justify-start justify-center text-primary font-bold whitespace-nowrap"
    >
      {words[index]}
    </motion.span>
  </AnimatePresence>
</span>

  );
}
