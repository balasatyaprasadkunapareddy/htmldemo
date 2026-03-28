"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Map, BarChart3, FileText, User, Moon, Sun, Plus } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { cn } from "@/utils/cn";

export function Navigation() {
  const { theme, toggleTheme } = useAppStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Map", href: "/map", icon: Map },
    { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
    { name: "Issues", href: "/issues", icon: FileText },
    { name: "Profile", href: "/profile", icon: User },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="glass-strong sticky top-0 z-50 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center"
            >
              <span className="text-white font-bold text-lg">C</span>
            </motion.div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              CivicPro
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-white/20 transition-colors flex items-center gap-2"
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </motion.div>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link href="/report">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 font-medium shadow-lg"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Report Issue</span>
              </motion.button>
            </Link>

            {mounted && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-700" />
                )}
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
