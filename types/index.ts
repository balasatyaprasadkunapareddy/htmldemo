export type IssueStatus = "pending" | "in_progress" | "resolved";

export type IssueCategory =
  | "roads"
  | "water"
  | "electricity"
  | "sanitation"
  | "safety"
  | "others";

export interface Location {
  lat: number;
  lng: number;
  address?: string;
}

export interface Comment {
  id: string;
  issueId: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: Date;
  replies?: Comment[];
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  category: IssueCategory;
  status: IssueStatus;
  location: Location;
  imageUrl?: string;
  upvotes: number;
  userId: string;
  userName: string;
  createdAt: Date;
  updatedAt: Date;
  comments: Comment[];
  upvotedBy: string[];
  statusHistory: {
    status: IssueStatus;
    timestamp: Date;
  }[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  issuesReported: number;
  badges: Badge[];
  joinedAt: Date;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: Date;
}

export interface DashboardStats {
  totalIssues: number;
  resolvedIssues: number;
  activeIssues: number;
  pendingIssues: number;
  resolutionRate: number;
  avgResolutionTime: number;
}

export interface InsightData {
  type: "frequency" | "trend" | "prediction";
  title: string;
  description: string;
  severity: "low" | "medium" | "high";
  location?: Location;
  relatedIssues?: string[];
}
