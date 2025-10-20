
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center py-24 px-6 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
      >
        Shop Smarter. <br className="hidden md:block" /> Pay Easier.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-2xl text-gray-600 dark:text-gray-300 mb-10 text-lg"
      >
        Let AI guide your next purchase — from essentials to splurges — and pay flexibly with our Buy Now, Pay Later options. <br />
        Smart-Buy learns your taste and spending habits to recommend what fits <span className="font-semibold text-indigo-600 dark:text-indigo-400">you</span>.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
        className="flex gap-4 flex-wrap justify-center"
      >
        <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white">
          Start Shopping
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-indigo-900/30"
        >
          Try Smart-Mode →
        </Button>
      </motion.div>

      <p className="mt-10 text-sm text-gray-500 dark:text-gray-400 italic">
        “Trusted by shoppers who prefer smart decisions over impulse buys.”
      </p>
    </section>
  );
}
