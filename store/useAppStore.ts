import { create } from "zustand";
import { Issue, User, DashboardStats, InsightData } from "@/types";

interface AppState {
  // User
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;

  // Issues
  issues: Issue[];
  setIssues: (issues: Issue[]) => void;
  addIssue: (issue: Issue) => void;
  updateIssue: (id: string, updates: Partial<Issue>) => void;

  // Stats
  stats: DashboardStats | null;
  setStats: (stats: DashboardStats) => void;

  // Insights
  insights: InsightData[];
  setInsights: (insights: InsightData[]) => void;

  // Theme
  theme: "light" | "dark";
  toggleTheme: () => void;

  // Loading states
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // User
  currentUser: {
    id: "current-user",
    name: "Demo User",
    email: "demo@civic.com",
    issuesReported: 0,
    badges: [],
    joinedAt: new Date(),
  },
  setCurrentUser: (user) => set({ currentUser: user }),

  // Issues
  issues: [],
  setIssues: (issues) => set({ issues }),
  addIssue: (issue) => set((state) => ({ issues: [issue, ...state.issues] })),
  updateIssue: (id, updates) =>
    set((state) => ({
      issues: state.issues.map((issue) =>
        issue.id === id ? { ...issue, ...updates } : issue
      ),
    })),

  // Stats
  stats: null,
  setStats: (stats) => set({ stats }),

  // Insights
  insights: [],
  setInsights: (insights) => set({ insights }),

  // Theme
  theme: "dark",
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),

  // Loading
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
}));
