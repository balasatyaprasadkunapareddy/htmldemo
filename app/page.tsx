"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MapPin, TrendingUp, Users, CheckCircle } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassComponents";
import { StatCard } from "@/components/ui/StatCard";
import { useEffect, useState } from "react";
import { issueService } from "@/services/issueService";
import { DashboardStats } from "@/types";

export default function Home() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    loadStats();
  }, []);

  const loadStats = async () => {
    const data = await issueService.getStats();
    setStats(data);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 dark:from-blue-500/5 dark:via-purple-500/5 dark:to-pink-500/5" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6"
            >
              Transform Your
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                {" "}Community
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
            >
              Report civic issues, track progress, and make a difference in your neighborhood.
              Join thousands making cities better.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/report">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl flex items-center gap-2 font-semibold text-lg shadow-2xl"
                >
                  Report an Issue
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>

              <Link href="/map">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="glass px-8 py-4 rounded-2xl flex items-center gap-2 font-semibold text-lg"
                >
                  <MapPin className="w-5 h-5" />
                  View Map
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats Section */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
              <StatCard
                title="Total Issues"
                value={stats.totalIssues}
                icon={<MapPin />}
                trend={12}
                delay={0.8}
              />
              <StatCard
                title="Resolved"
                value={stats.resolvedIssues}
                icon={<CheckCircle />}
                trend={8}
                delay={0.9}
              />
              <StatCard
                title="Active Issues"
                value={stats.activeIssues}
                icon={<TrendingUp />}
                trend={-3}
                delay={1.0}
              />
              <StatCard
                title="Community Members"
                value="2.5K+"
                icon={<Users />}
                trend={15}
                delay={1.1}
              />
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-16"
          >
            Why Choose CivicPro?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Smart Reporting",
                description: "AI-powered category suggestions and auto-location detection make reporting seamless.",
                icon: "🎯",
              },
              {
                title: "Real-Time Tracking",
                description: "Track your reported issues from submission to resolution with live updates.",
                icon: "📊",
              },
              {
                title: "Community Driven",
                description: "Upvote, comment, and engage with issues that matter to your community.",
                icon: "🤝",
              },
              {
                title: "Interactive Maps",
                description: "Visualize civic issues on an interactive map with smart clustering.",
                icon: "🗺️",
              },
              {
                title: "Insights & Analytics",
                description: "Get intelligent insights about problem areas and trends in your city.",
                icon: "💡",
              },
              {
                title: "Gamification",
                description: "Earn badges and recognition for being an active community contributor.",
                icon: "🏆",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GlassCard hover tilt className="h-full">
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <GlassCard className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Ready to Make a Difference?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Join our community and help create a better city for everyone.
              </p>
              <Link href="/report">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-10 py-4 rounded-2xl font-semibold text-lg shadow-2xl"
                >
                  Get Started Now
                </motion.button>
              </Link>
            </motion.div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}
