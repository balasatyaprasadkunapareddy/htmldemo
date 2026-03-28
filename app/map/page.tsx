"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassComponents";
import { MapPin, Navigation } from "lucide-react";
import { issueService } from "@/services/issueService";
import { Issue } from "@/types";
import { ISSUE_CATEGORIES } from "@/constants";

export default function MapPage() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadIssues();
  }, []);

  const loadIssues = async () => {
    setLoading(true);
    const data = await issueService.getAllIssues();
    setIssues(data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Interactive Map
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Visualize civic issues in your area
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Container */}
          <div className="lg:col-span-2">
            <GlassCard className="h-[600px] flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Interactive Map View
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Map integration with Leaflet.js would be loaded here in production
                </p>
                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                  {issues.slice(0, 4).map((issue) => (
                    <button
                      key={issue.id}
                      onClick={() => setSelectedIssue(issue)}
                      className="glass p-4 rounded-xl hover:bg-white/30 transition-colors text-left"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Navigation className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {issue.location.address?.slice(0, 20)}...
                        </span>
                      </div>
                      <span
                        className="text-xs px-2 py-1 rounded-full inline-block"
                        style={{
                          backgroundColor: `${ISSUE_CATEGORIES[issue.category].color}20`,
                          color: ISSUE_CATEGORIES[issue.category].color,
                        }}
                      >
                        {ISSUE_CATEGORIES[issue.category].label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Issue Details Sidebar */}
          <div>
            <GlassCard className="sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Issue Details
              </h3>

              {selectedIssue ? (
                <div className="space-y-4">
                  {selectedIssue.imageUrl && (
                    <img
                      src={selectedIssue.imageUrl}
                      alt={selectedIssue.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  )}

                  <div>
                    <span
                      className="px-3 py-1 rounded-full text-xs font-medium inline-block mb-3"
                      style={{
                        backgroundColor: `${ISSUE_CATEGORIES[selectedIssue.category].color}20`,
                        color: ISSUE_CATEGORIES[selectedIssue.category].color,
                      }}
                    >
                      {ISSUE_CATEGORIES[selectedIssue.category].label}
                    </span>

                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {selectedIssue.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      {selectedIssue.description}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <MapPin className="w-4 h-4" />
                      <span>{selectedIssue.location.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Status:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {selectedIssue.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Upvotes:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {selectedIssue.upvotes}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  Select an issue marker to view details
                </div>
              )}
            </GlassCard>
          </div>
        </div>

        {/* Map Legend */}
        <GlassCard className="mt-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Category Legend
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Object.entries(ISSUE_CATEGORIES).map(([key, value]) => (
              <div key={key} className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: value.color }}
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">{value.label}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
