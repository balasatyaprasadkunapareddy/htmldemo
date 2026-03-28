import { Issue, IssueCategory, IssueStatus, InsightData, DashboardStats } from "@/types";

// Mock data generator
const generateMockIssues = (): Issue[] => {
  const issues: Issue[] = [
    {
      id: "1",
      title: "Large pothole on Main Street",
      description: "There's a significant pothole near the intersection that's causing damage to vehicles.",
      category: "roads",
      status: "pending",
      location: { lat: 40.7128, lng: -74.006, address: "Main St, New York, NY" },
      imageUrl: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800",
      upvotes: 23,
      userId: "user1",
      userName: "John Doe",
      createdAt: new Date("2024-03-20"),
      updatedAt: new Date("2024-03-20"),
      comments: [],
      upvotedBy: [],
      statusHistory: [{ status: "pending", timestamp: new Date("2024-03-20") }],
    },
    {
      id: "2",
      title: "Water leak in residential area",
      description: "Continuous water leakage from underground pipe causing water wastage and road damage.",
      category: "water",
      status: "in_progress",
      location: { lat: 40.7258, lng: -73.9975, address: "5th Ave, New York, NY" },
      imageUrl: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=800",
      upvotes: 45,
      userId: "user2",
      userName: "Jane Smith",
      createdAt: new Date("2024-03-18"),
      updatedAt: new Date("2024-03-22"),
      comments: [],
      upvotedBy: [],
      statusHistory: [
        { status: "pending", timestamp: new Date("2024-03-18") },
        { status: "in_progress", timestamp: new Date("2024-03-22") },
      ],
    },
    {
      id: "3",
      title: "Broken streetlight on Park Avenue",
      description: "Streetlight has been non-functional for weeks, creating safety concerns at night.",
      category: "electricity",
      status: "resolved",
      location: { lat: 40.7378, lng: -73.9918, address: "Park Ave, New York, NY" },
      upvotes: 18,
      userId: "user3",
      userName: "Mike Johnson",
      createdAt: new Date("2024-03-15"),
      updatedAt: new Date("2024-03-25"),
      comments: [],
      upvotedBy: [],
      statusHistory: [
        { status: "pending", timestamp: new Date("2024-03-15") },
        { status: "in_progress", timestamp: new Date("2024-03-20") },
        { status: "resolved", timestamp: new Date("2024-03-25") },
      ],
    },
    {
      id: "4",
      title: "Overflowing garbage bins",
      description: "Multiple garbage bins overflowing in the neighborhood, attracting pests.",
      category: "sanitation",
      status: "pending",
      location: { lat: 40.7489, lng: -73.9680, address: "Lexington Ave, New York, NY" },
      imageUrl: "https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=800",
      upvotes: 32,
      userId: "user4",
      userName: "Sarah Williams",
      createdAt: new Date("2024-03-22"),
      updatedAt: new Date("2024-03-22"),
      comments: [],
      upvotedBy: [],
      statusHistory: [{ status: "pending", timestamp: new Date("2024-03-22") }],
    },
    {
      id: "5",
      title: "Poor visibility at intersection",
      description: "Overgrown trees blocking traffic signs, creating potential safety hazards.",
      category: "safety",
      status: "in_progress",
      location: { lat: 40.7614, lng: -73.9776, address: "Broadway, New York, NY" },
      upvotes: 27,
      userId: "user5",
      userName: "David Brown",
      createdAt: new Date("2024-03-21"),
      updatedAt: new Date("2024-03-24"),
      comments: [],
      upvotedBy: [],
      statusHistory: [
        { status: "pending", timestamp: new Date("2024-03-21") },
        { status: "in_progress", timestamp: new Date("2024-03-24") },
      ],
    },
    {
      id: "6",
      title: "Drainage system blocked",
      description: "Heavy rain causes flooding due to blocked drainage in our street.",
      category: "water",
      status: "pending",
      location: { lat: 40.7308, lng: -74.0020, address: "Hudson St, New York, NY" },
      upvotes: 41,
      userId: "user6",
      userName: "Emily Davis",
      createdAt: new Date("2024-03-23"),
      updatedAt: new Date("2024-03-23"),
      comments: [],
      upvotedBy: [],
      statusHistory: [{ status: "pending", timestamp: new Date("2024-03-23") }],
    },
    {
      id: "7",
      title: "Cracked sidewalk causing trips",
      description: "Multiple sections of sidewalk are severely cracked and uneven.",
      category: "roads",
      status: "resolved",
      location: { lat: 40.7180, lng: -73.9950, address: "Canal St, New York, NY" },
      upvotes: 15,
      userId: "user7",
      userName: "Tom Wilson",
      createdAt: new Date("2024-03-10"),
      updatedAt: new Date("2024-03-26"),
      comments: [],
      upvotedBy: [],
      statusHistory: [
        { status: "pending", timestamp: new Date("2024-03-10") },
        { status: "in_progress", timestamp: new Date("2024-03-18") },
        { status: "resolved", timestamp: new Date("2024-03-26") },
      ],
    },
    {
      id: "8",
      title: "Illegal dumping site",
      description: "Construction waste being illegally dumped in vacant lot.",
      category: "sanitation",
      status: "pending",
      location: { lat: 40.7450, lng: -73.9830, address: "3rd Ave, New York, NY" },
      imageUrl: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=800",
      upvotes: 52,
      userId: "user8",
      userName: "Lisa Anderson",
      createdAt: new Date("2024-03-24"),
      updatedAt: new Date("2024-03-24"),
      comments: [],
      upvotedBy: [],
      statusHistory: [{ status: "pending", timestamp: new Date("2024-03-24") }],
    },
  ];
  return issues;
};

const generateInsights = (issues: Issue[]): InsightData[] => {
  return [
    {
      type: "frequency",
      title: "High Activity Zone",
      description: "Main Street area has 8 reported issues in the past month",
      severity: "high",
      location: { lat: 40.7128, lng: -74.006 },
      relatedIssues: ["1", "7"],
    },
    {
      type: "trend",
      title: "Water Issues Trending Up",
      description: "Water-related problems increased by 35% this month",
      severity: "medium",
    },
    {
      type: "prediction",
      title: "Recurring Problem Area",
      description: "Park Avenue likely to see streetlight issues based on pattern",
      severity: "low",
      location: { lat: 40.7378, lng: -73.9918 },
    },
  ];
};

const calculateStats = (issues: Issue[]): DashboardStats => {
  const total = issues.length;
  const resolved = issues.filter((i) => i.status === "resolved").length;
  const active = issues.filter((i) => i.status === "in_progress").length;
  const pending = issues.filter((i) => i.status === "pending").length;

  return {
    totalIssues: total,
    resolvedIssues: resolved,
    activeIssues: active,
    pendingIssues: pending,
    resolutionRate: total > 0 ? (resolved / total) * 100 : 0,
    avgResolutionTime: 5.2, // days
  };
};

// Mock API functions
export const issueService = {
  getAllIssues: async (): Promise<Issue[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return generateMockIssues();
  },

  getIssueById: async (id: string): Promise<Issue | null> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const issues = generateMockIssues();
    return issues.find((issue) => issue.id === id) || null;
  },

  createIssue: async (issue: Omit<Issue, "id" | "createdAt" | "updatedAt" | "upvotes" | "comments" | "upvotedBy" | "statusHistory">): Promise<Issue> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const newIssue: Issue = {
      ...issue,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      upvotes: 0,
      comments: [],
      upvotedBy: [],
      statusHistory: [{ status: issue.status, timestamp: new Date() }],
    };
    return newIssue;
  },

  updateIssue: async (id: string, updates: Partial<Issue>): Promise<Issue | null> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const issues = generateMockIssues();
    const issue = issues.find((i) => i.id === id);
    if (!issue) return null;
    return { ...issue, ...updates, updatedAt: new Date() };
  },

  upvoteIssue: async (id: string, userId: string): Promise<Issue | null> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const issues = generateMockIssues();
    const issue = issues.find((i) => i.id === id);
    if (!issue) return null;

    const hasUpvoted = issue.upvotedBy.includes(userId);
    return {
      ...issue,
      upvotes: hasUpvoted ? issue.upvotes - 1 : issue.upvotes + 1,
      upvotedBy: hasUpvoted
        ? issue.upvotedBy.filter((uid) => uid !== userId)
        : [...issue.upvotedBy, userId],
    };
  },

  getStats: async (): Promise<DashboardStats> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const issues = generateMockIssues();
    return calculateStats(issues);
  },

  getInsights: async (): Promise<InsightData[]> => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const issues = generateMockIssues();
    return generateInsights(issues);
  },

  searchIssues: async (query: string, filters?: {
    category?: IssueCategory;
    status?: IssueStatus;
  }): Promise<Issue[]> => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    let issues = generateMockIssues();

    if (query) {
      issues = issues.filter(
        (issue) =>
          issue.title.toLowerCase().includes(query.toLowerCase()) ||
          issue.description.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (filters?.category) {
      issues = issues.filter((issue) => issue.category === filters.category);
    }

    if (filters?.status) {
      issues = issues.filter((issue) => issue.status === filters.status);
    }

    return issues;
  },
};

// Smart category suggestion based on keywords
export const suggestCategory = (description: string): IssueCategory => {
  const lowerDesc = description.toLowerCase();
  const categories: IssueCategory[] = ["roads", "water", "electricity", "sanitation", "safety"];

  const keywords: Record<IssueCategory, string[]> = {
    roads: ["pothole", "road", "traffic", "street", "pavement", "crack", "sidewalk"],
    water: ["water", "leak", "drainage", "pipe", "supply", "flooding", "drain"],
    electricity: ["power", "electricity", "light", "streetlight", "outage", "wire", "pole"],
    sanitation: ["garbage", "waste", "trash", "sanitation", "cleaning", "dump", "litter"],
    safety: ["safety", "crime", "danger", "accident", "security", "vandalism", "hazard"],
    others: [],
  };

  let maxMatches = 0;
  let suggestedCategory: IssueCategory = "others";

  for (const category of categories) {
    const matches = keywords[category].filter((keyword) =>
      lowerDesc.includes(keyword)
    ).length;

    if (matches > maxMatches) {
      maxMatches = matches;
      suggestedCategory = category;
    }
  }

  return suggestedCategory;
};
