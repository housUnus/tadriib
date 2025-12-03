"use client";

import { motion } from "framer-motion";

export default function MotionSection({ children, className = "", duration=0.8 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: duration}}
      viewport={{ once: true }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
