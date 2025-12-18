export type Difficulty = "Easy" | "Medium" | "Hard";
export type Category = "Plugin" | "Hosting" | "Code" | "Configuration";

export interface OptimizationTask {
  title: string;
  difficulty: Difficulty;
  category: Category;
  impact: "High" | "Medium" | "Low";
  instructions: string;
  tools: string[];
}

export interface SpeedAuditPlan {
  siteUrl: string;
  estimatedCurrentScore: number;
  summary: string;
  tasks: OptimizationTask[];
}

export interface CoreWebVitals {
  fcp: string; // First Contentful Paint
  lcp: string; // Largest Contentful Paint
  tbt: string; // Total Blocking Time
  cls: string; // Cumulative Layout Shift
  si: string;  // Speed Index
}

export interface LighthouseResult {
  score: number; // 0-100
  metrics: CoreWebVitals;
  timestamp: string;
}
