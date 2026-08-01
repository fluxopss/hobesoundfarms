"use client";

import { motion } from "framer-motion";
import { useAcreage } from "@/components/acreage-provider";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const { reducedMotion } = useAcreage();

  if (reducedMotion) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.985 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
