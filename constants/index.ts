export const ISSUE_CATEGORIES = {
  roads: {
    label: "Roads",
    color: "#EF4444",
    keywords: ["pothole", "road", "traffic", "street", "pavement", "crack"],
  },
  water: {
    label: "Water",
    color: "#3B82F6",
    keywords: ["water", "leak", "drainage", "pipe", "supply", "flooding"],
  },
  electricity: {
    label: "Electricity",
    color: "#F59E0B",
    keywords: ["power", "electricity", "light", "streetlight", "outage", "wire"],
  },
  sanitation: {
    label: "Sanitation",
    color: "#10B981",
    keywords: ["garbage", "waste", "trash", "sanitation", "cleaning", "dump"],
  },
  safety: {
    label: "Safety",
    color: "#8B5CF6",
    keywords: ["safety", "crime", "danger", "accident", "security", "vandalism"],
  },
  others: {
    label: "Others",
    color: "#6B7280",
    keywords: [],
  },
};

export const ISSUE_STATUS = {
  pending: {
    label: "Pending",
    color: "#F59E0B",
  },
  in_progress: {
    label: "In Progress",
    color: "#3B82F6",
  },
  resolved: {
    label: "Resolved",
    color: "#10B981",
  },
};

export const BADGE_TYPES = {
  reporter_novice: {
    name: "Novice Reporter",
    description: "Reported your first issue",
    icon: "🌟",
    requirement: 1,
  },
  reporter_active: {
    name: "Active Reporter",
    description: "Reported 10 issues",
    icon: "⭐",
    requirement: 10,
  },
  reporter_champion: {
    name: "Champion Reporter",
    description: "Reported 50 issues",
    icon: "🏆",
    requirement: 50,
  },
  contributor_helpful: {
    name: "Helpful Contributor",
    description: "Upvoted 20 issues",
    icon: "👍",
    requirement: 20,
  },
  contributor_engaged: {
    name: "Engaged Contributor",
    description: "Commented on 30 issues",
    icon: "💬",
    requirement: 30,
  },
  top_contributor: {
    name: "Top Contributor",
    description: "Community leader",
    icon: "👑",
    requirement: 100,
  },
};

export const DEFAULT_MAP_CENTER = {
  lat: 40.7128,
  lng: -74.006,
};

export const MAP_ZOOM_LEVEL = 13;
