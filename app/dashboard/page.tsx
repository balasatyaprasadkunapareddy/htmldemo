"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassComponents";
import { StatCard } from "@/components/ui/StatCard";
import { issueService } from "@/services/issueService";
import { Issue, DashboardStats, InsightData } from "@/types";
import { MapPin, CheckCircle, TrendingUp, Clock, AlertTriangle, Lightbulb } from "lucide-react";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ISSUE_CATEGORIES } from "@/constants";

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [insights, setInsights] = useState<InsightData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [statsData, issuesData, insightsData] = await Promise.all([
      issueService.getStats(),
      issueService.getAllIssues(),
      issueService.getInsights(),
    ]);
    setStats(statsData);
    setIssues(issuesData);
    setInsights(insightsData);
    setLoading(false);
  };

  const getCategoryData = () => {
    const categoryCount: Record<string, number> = {};
    issues.forEach((issue) => {
      categoryCount[issue.category] = (categoryCount[issue.category] || 0) + 1;
    });

    return Object.entries(categoryCount).map(([key, value]) => ({
      name: ISSUE_CATEGORIES[key as keyof typeof ISSUE_CATEGORIES].label,
      value,
      color: ISSUE_CATEGORIES[key as keyof typeof ISSUE_CATEGORIES].color,
    }));
  };

  const getTimelineData = () => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    });

    // Mock timeline data
    return last7Days.map((day, i) => ({
      date: day,
      issues: Math.floor(Math.random() * 10) + 5,
      resolved: Math.floor(Math.random() * 8) + 2,
    }));
  };

  const getStatusData = () => {
    return [
      { name: "Pending", value: stats?.pendingIssues || 0, color: "#F59E0B" },
      { name: "In Progress", value: stats?.activeIssues || 0, color: "#3B82F6" },
      { name: "Resolved", value: stats?.resolvedIssues || 0, color: "#10B981" },
    ];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Dashboard
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Analytics and insights for civic issues
          </p>
        </motion.div>

        {/* KPI Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Issues"
              value={stats.totalIssues}
              icon={<MapPin />}
              trend={12}
              delay={0.1}
            />
            <StatCard
              title="Resolved"
              value={stats.resolvedIssues}
              icon={<CheckCircle />}
              trend={8}
              delay={0.2}
            />
            <StatCard
              title="In Progress"
              value={stats.activeIssues}
              icon={<TrendingUp />}
              trend={5}
              delay={0.3}
            />
            <StatCard
              title="Avg Resolution Time"
              value={`${stats.avgResolutionTime}d`}
              icon={<Clock />}
              trend={-10}
              delay={0.4}
            />
          </div>
        )}

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Issues Over Time */}
          <GlassCard>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Issues Over Time
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={getTimelineData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                <XAxis dataKey="date" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    border: "none",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="issues"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  name="Reported"
                />
                <Line
                  type="monotone"
                  dataKey="resolved"
                  stroke="#10B981"
                  strokeWidth={2}
                  name="Resolved"
                />
              </LineChart>
            </ResponsiveContainer>
          </GlassCard>

          {/* Category Distribution */}
          <GlassCard>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Category Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={getCategoryData()}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {getCategoryData().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </GlassCard>

          {/* Status Distribution */}
          <GlassCard>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Resolution Rate
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={getStatusData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    border: "none",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {getStatusData().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </GlassCard>

          {/* Resolution Rate Card */}
          <GlassCard>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Success Metrics
            </h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600 dark:text-gray-300">Resolution Rate</span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {stats?.resolutionRate.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full"
                    style={{ width: `${stats?.resolutionRate}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600 dark:text-gray-300">Active Issues</span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {((stats?.activeIssues || 0) / (stats?.totalIssues || 1) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-blue-400 to-blue-600 h-3 rounded-full"
                    style={{ width: `${(stats?.activeIssues || 0) / (stats?.totalIssues || 1) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600 dark:text-gray-300">Community Engagement</span>
                  <span className="font-bold text-gray-900 dark:text-white">87%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-purple-400 to-purple-600 h-3 rounded-full"
                    style={{ width: "87%" }}
                  />
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Smart Insights */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Smart Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {insights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <GlassCard
                  className={`border-l-4 ${
                    insight.severity === "high"
                      ? "border-red-500"
                      : insight.severity === "medium"
                      ? "border-yellow-500"
                      : "border-blue-500"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-3 rounded-xl ${
                        insight.severity === "high"
                          ? "bg-red-100 dark:bg-red-900/20"
                          : insight.severity === "medium"
                          ? "bg-yellow-100 dark:bg-yellow-900/20"
                          : "bg-blue-100 dark:bg-blue-900/20"
                      }`}
                    >
                      {insight.type === "frequency" ? (
                        <AlertTriangle className="w-6 h-6 text-red-500" />
                      ) : insight.type === "trend" ? (
                        <TrendingUp className="w-6 h-6 text-yellow-500" />
                      ) : (
                        <Lightbulb className="w-6 h-6 text-blue-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        {insight.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {insight.description}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
