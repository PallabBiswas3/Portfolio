"use client";
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return <motion.div className={className} initial={false} whileInView={reduce ? undefined : { opacity: [0.65, 1], y: [16, 0] }} viewport={{ once: true, amount: 0.08 }} transition={{ duration: 0.55, ease: "easeOut" }}>{children}</motion.div>;
}
