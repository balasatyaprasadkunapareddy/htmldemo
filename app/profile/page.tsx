"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassComponents";
import { StatCard } from "@/components/ui/StatCard";
import { MapPin, CheckCircle, Clock, Award } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { ISSUE_CATEGORIES, ISSUE_STATUS, BADGE_TYPES } from "@/constants";

export default function ProfilePage() {
  const { currentUser } = useAppStore();

  // Mock user data
  const userIssues = [
    {
      id: "1",
      title: "Broken streetlight on Park Ave",
      category: "electricity" as const,
      status: "resolved" as const,
      createdAt: new Date("2024-03-15"),
    },
    {
      id: "2",
      title: "Pothole on Main Street",
      category: "roads" as const,
      status: "in_progress" as const,
      createdAt: new Date("2024-03-20"),
    },
    {
      id: "3",
      title: "Water leak in residential area",
      category: "water" as const,
      status: "pending" as const,
      createdAt: new Date("2024-03-22"),
    },
  ];

  const userBadges = [
    { ...BADGE_TYPES.reporter_novice, earnedAt: new Date("2024-03-15") },
    { ...BADGE_TYPES.contributor_helpful, earnedAt: new Date("2024-03-20") },
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            My Profile
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Track your contributions and achievements
          </p>
        </motion.div>

        {/* User Info Card */}
        <GlassCard className="mb-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
              {currentUser?.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {currentUser?.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">{currentUser?.email}</p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                Member since {currentUser?.joinedAt.toLocaleDateString()}
              </p>
            </div>
          </div>
        </GlassCard>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Issues Reported"
            value={userIssues.length}
            icon={<MapPin />}
            delay={0.1}
          />
          <StatCard
            title="Resolved"
            value={userIssues.filter((i) => i.status === "resolved").length}
            icon={<CheckCircle />}
            delay={0.2}
          />
          <StatCard
            title="Pending"
            value={userIssues.filter((i) => i.status === "pending").length}
            icon={<Clock />}
            delay={0.3}
          />
          <StatCard
            title="Badges Earned"
            value={userBadges.length}
            icon={<Award />}
            delay={0.4}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* My Issues */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              My Reported Issues
            </h2>
            <div className="space-y-4">
              {userIssues.map((issue, index) => (
                <motion.div
                  key={issue.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <GlassCard hover>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className="px-3 py-1 rounded-full text-xs font-medium"
                            style={{
                              backgroundColor: `${ISSUE_CATEGORIES[issue.category].color}20`,
                              color: ISSUE_CATEGORIES[issue.category].color,
                            }}
                          >
                            {ISSUE_CATEGORIES[issue.category].label}
                          </span>
                          <span
                            className="px-3 py-1 rounded-full text-xs font-medium"
                            style={{
                              backgroundColor: `${ISSUE_STATUS[issue.status].color}20`,
                              color: ISSUE_STATUS[issue.status].color,
                            }}
                          >
                            {ISSUE_STATUS[issue.status].label}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                          {issue.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Reported on {issue.createdAt.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Badges & Achievements */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Badges & Achievements
            </h2>
            <GlassCard className="space-y-4">
              {userBadges.map((badge, index) => (
                <motion.div
                  key={badge.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="glass p-4 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">{badge.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 dark:text-white">
                        {badge.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {badge.description}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        Earned {badge.earnedAt.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Locked badges */}
              <div className="glass p-4 rounded-xl opacity-50">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">🔒</div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 dark:text-white">
                      {BADGE_TYPES.reporter_active.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {BADGE_TYPES.reporter_active.description}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      Progress: {userIssues.length}/{BADGE_TYPES.reporter_active.requirement}
                    </p>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}
