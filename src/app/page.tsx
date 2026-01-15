"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function Home() {
  const router = useRouter();
  const hasNavigated = useRef(false);

  /* ============================
     SCROLL → NAVIGATE TO PRODUCTS
  ============================= */
  useEffect(() => {
    const handleScroll = () => {
      if (!hasNavigated.current) {
        hasNavigated.current = true;
        router.push("/products");
      }
    };

    window.addEventListener("wheel", handleScroll, { passive: true });
    window.addEventListener("touchmove", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
    };
  }, [router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center px-6"
      >
        {/* Title */}
        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-extrabold text-black"
        >
          Welcome to <span className="underline">ShopMart</span>
        </motion.h1>

        {/* Hook */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-lg md:text-xl text-gray-600 max-w-xl mx-auto"
        >
          Discover premium products, unbeatable prices, and a shopping
          experience you’ll love.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-10 flex flex-col sm:flex-row gap-5 justify-center"
        >
          <Link href="/products">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-black text-white rounded-2xl font-semibold shadow-lg hover:shadow-2xl transition"
            >
              Shop Now
            </motion.button>
          </Link>

          <Link href="/categories">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-black border border-black rounded-2xl font-semibold shadow hover:bg-black hover:text-white transition"
            >
              Browse Categories
            </motion.button>
          </Link>
        </motion.div>

        {/* Scroll Hint */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="mt-16 text-gray-400 text-sm"
        >
          Scroll to explore ↓
        </motion.div>
      </motion.div>
    </main>
  );
}
