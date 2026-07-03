export type Difficulty = "beginner" | "intermediate" | "advanced";

export type AwsService =
  | "IAM" | "S3" | "EC2" | "VPC" | "RDS" | "DynamoDB" | "ElastiCache"
  | "ALB" | "Auto Scaling" | "Route 53" | "ACM" | "Lambda" | "API Gateway"
  | "SQS" | "SNS" | "EventBridge" | "Step Functions" | "ECR" | "ECS" | "Fargate"
  | "CloudWatch" | "CloudTrail" | "X-Ray" | "Secrets Manager" | "Parameter Store"
  | "KMS" | "WAF" | "GuardDuty" | "CloudFront" | "CloudFormation" | "CDK" | "Terraform";

export interface ScreenshotGuide {
  title: string;
  description: string;
  imagePath: string;
  alt: string;
}

export interface ChecklistItem {
  id: string;
  label: string;
  description?: string;
}

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  explanation: string;
}

export interface CodeSnippet {
  title: string;
  language: "bash" | "json" | "ts" | "tsx" | "js" | "nginx" | "yaml" | "hcl" | "env";
  code: string;
}

export interface Lab {
  id: string;
  slug: string;
  title: string;
  stageId: number;
  stageSlug: string;
  objective: string;
  estimatedTime: string;
  steps: string[];
  expectedResult: string;
  troubleshooting: string[];
}

export interface ArchitectureNode {
  id: string;
  label: string;
  sublabel?: string;
  type: "service" | "user" | "internet" | "group";
}

export interface ArchitectureConnection {
  from: string;
  to: string;
  label?: string;
}

export interface Stage {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  difficulty: Difficulty;
  estimatedTime: string;
  services: AwsService[];
  objectives: string[];
  concepts: {
    title: string;
    description: string;
  }[];
  consoleSteps: ScreenshotGuide[];
  labs: Lab[];
  codeSnippets: CodeSnippet[];
  bestPractices: string[];
  commonMistakes: {
    mistake: string;
    fix: string;
  }[];
  checklist: ChecklistItem[];
  quiz: QuizQuestion[];
  architecture: {
    title: string;
    description: string;
    nodes: ArchitectureNode[];
    connections: ArchitectureConnection[];
  };
}

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  category: string;
  relatedTerms?: string[];
}

export interface CheatsheetSection {
  id: string;
  title: string;
  service: string;
  items: {
    command: string;
    description: string;
    language: "bash" | "json" | "yaml" | "hcl";
  }[];
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  type: "official" | "video" | "course" | "book" | "tool";
  tags: string[];
  isFree: boolean;
}

export interface NavItem {
  title: string;
  href: string;
  icon?: string;
  children?: NavItem[];
}

export interface ProgressState {
  completedStages: number[];
  checklists: Record<string, boolean>;
  quizResults: Record<string, { score: number; total: number; answers: Record<string, string> }>;
  lastVisitedStage: string | null;
}
