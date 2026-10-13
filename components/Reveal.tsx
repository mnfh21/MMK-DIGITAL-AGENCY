"use client";
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div initial={reduce ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.4, delay }}>
      {children}
    </motion.div>
  );
}
