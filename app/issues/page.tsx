"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter, MapPin, Calendar, MessageCircle, ThumbsUp } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassComponents";
import { issueService } from "@/services/issueService";
import { Issue, IssueCategory, IssueStatus } from "@/types";
import { ISSUE_CATEGORIES, ISSUE_STATUS } from "@/constants";
import Link from "next/link";
import { format } from "date-fns";

export default function IssuesPage() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [filteredIssues, setFilteredIssues] = useState<Issue[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<IssueCategory | "all">("all");
  const [statusFilter, setStatusFilter] = useState<IssueStatus | "all">("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadIssues();
  }, []);

  useEffect(() => {
    filterIssues();
  }, [issues, searchQuery, categoryFilter, statusFilter]);

  const loadIssues = async () => {
    setLoading(true);
    const data = await issueService.getAllIssues();
    setIssues(data);
    setLoading(false);
  };

  const filterIssues = () => {
    let filtered = [...issues];

    if (searchQuery) {
      filtered = filtered.filter(
        (issue) =>
          issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          issue.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter((issue) => issue.category === categoryFilter);
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((issue) => issue.status === statusFilter);
    }

    // Sort by date, newest first
    filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    setFilteredIssues(filtered);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading issues...</p>
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
            Community Issues
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Browse and engage with reported civic issues
          </p>
        </motion.div>

        {/* Search and Filters */}
        <GlassCard className="mb-8">
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search issues..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl glass border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value as IssueCategory | "all")}
                  className="w-full px-4 py-2 rounded-xl glass border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="all">All Categories</option>
                  {Object.entries(ISSUE_CATEGORIES).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as IssueStatus | "all")}
                  className="w-full px-4 py-2 rounded-xl glass border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="all">All Status</option>
                  {Object.entries(ISSUE_STATUS).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="text-sm text-gray-600 dark:text-gray-400">
              Showing {filteredIssues.length} of {issues.length} issues
            </div>
          </div>
        </GlassCard>

        {/* Issues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIssues.map((issue, index) => (
            <motion.div
              key={issue.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Link href={`/issues/${issue.id}`}>
                <GlassCard hover className="h-full">
                  {issue.imageUrl && (
                    <img
                      src={issue.imageUrl}
                      alt={issue.title}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
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

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2">
                      {issue.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
                      {issue.description}
                    </p>

                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <MapPin className="w-4 h-4" />
                      <span className="line-clamp-1">{issue.location.address || "Location not specified"}</span>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 pt-3 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="w-4 h-4" />
                        <span>{issue.upvotes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>{issue.comments.length}</span>
                      </div>
                      <div className="flex items-center gap-1 ml-auto">
                        <Calendar className="w-4 h-4" />
                        <span>{format(issue.createdAt, "MMM d")}</span>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredIssues.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 dark:text-gray-400">
              No issues found matching your criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
