"use client";

import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  trend?: number;
  className?: string;
  delay?: number;
  pulse?: boolean;
}

export function StatCard({ title, value, icon, trend, className, delay = 0, pulse = false }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "glass rounded-2xl p-6 glass-tilt",
        pulse && "pulse-glow",
        className
      )}
      data-tilt="true"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{title}</p>
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: delay + 0.2 }}
            className="text-3xl font-bold text-gray-900 dark:text-white counter"
            data-value={typeof value === 'number' ? value : 0}
          >
            {value}
          </motion.h3>
          {trend !== undefined && (
            <p
              className={cn(
                "text-sm mt-2 flex items-center gap-1",
                trend >= 0 ? "text-green-500" : "text-red-500"
              )}
            >
              <span>{trend >= 0 ? "↑" : "↓"}</span>
              <span>{Math.abs(trend)}%</span>
            </p>
          )}
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
    </motion.div>
  );
}
