"use client";
import { motion, useScroll, useSpring, useReducedMotion } from "motion/react";
export function ReadingProgress() { const { scrollYProgress } = useScroll(); const smooth = useSpring(scrollYProgress, { stiffness: 180, damping: 30 }); const reduce = useReducedMotion(); return <motion.div aria-hidden="true" className="reading-progress" style={{ scaleX: reduce ? scrollYProgress : smooth }} />; }
