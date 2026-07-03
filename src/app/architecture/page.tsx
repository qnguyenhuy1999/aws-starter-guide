import { ArchitectureDiagram } from "@/components/guide/architecture-diagram";
import type { ArchitectureNode, ArchitectureConnection } from "@/types/guide";

// --- Full Stack App ---
const fullStackNodes: ArchitectureNode[] = [
  { id: "user", label: "User", sublabel: "Browser / Mobile", type: "user" },
  { id: "cloudfront", label: "CloudFront", sublabel: "CDN", type: "service" },
  { id: "alb", label: "ALB", sublabel: "Load Balancer", type: "service" },
  { id: "ecs", label: "ECS", sublabel: "Containers", type: "service" },
  { id: "rds", label: "RDS", sublabel: "Relational DB", type: "service" },
  { id: "dynamodb", label: "DynamoDB", sublabel: "NoSQL DB", type: "service" },
];

const fullStackConnections: ArchitectureConnection[] = [
  { from: "user", to: "cloudfront", label: "HTTPS" },
  { from: "cloudfront", to: "alb", label: "origin" },
  { from: "alb", to: "ecs", label: "HTTP" },
  { from: "ecs", to: "rds", label: "SQL" },
  { from: "ecs", to: "dynamodb", label: "SDK" },
];

// --- Serverless API ---
const serverlessNodes: ArchitectureNode[] = [
  { id: "client", label: "Client", sublabel: "Web / App", type: "user" },
  { id: "apigateway", label: "API Gateway", sublabel: "REST / HTTP", type: "service" },
  { id: "lambda", label: "Lambda", sublabel: "Functions", type: "service" },
  { id: "dynamodb2", label: "DynamoDB", sublabel: "NoSQL DB", type: "service" },
];

const serverlessConnections: ArchitectureConnection[] = [
  { from: "client", to: "apigateway", label: "HTTPS" },
  { from: "apigateway", to: "lambda", label: "invoke" },
  { from: "lambda", to: "dynamodb2", label: "SDK" },
];

// --- Container Deployment ---
const containerNodes: ArchitectureNode[] = [
  { id: "ecr", label: "ECR", sublabel: "Container Registry", type: "service" },
  { id: "fargate", label: "ECS Fargate", sublabel: "Serverless Containers", type: "service" },
  { id: "alb2", label: "ALB", sublabel: "Load Balancer", type: "service" },
  { id: "vpc", label: "VPC", sublabel: "Private Network", type: "group" },
];

const containerConnections: ArchitectureConnection[] = [
  { from: "ecr", to: "fargate", label: "pull image" },
  { from: "fargate", to: "alb2", label: "register" },
  { from: "alb2", to: "vpc", label: "routes to" },
];

// --- Static Frontend ---
const staticNodes: ArchitectureNode[] = [
  { id: "s3", label: "S3", sublabel: "Static Files", type: "service" },
  { id: "cloudfront2", label: "CloudFront", sublabel: "CDN", type: "service" },
  { id: "route53", label: "Route 53", sublabel: "DNS", type: "service" },
];

const staticConnections: ArchitectureConnection[] = [
  { from: "s3", to: "cloudfront2", label: "origin" },
  { from: "cloudfront2", to: "route53", label: "CNAME" },
];

export default function ArchitecturePage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted-foreground))] mb-2">
          Tham khảo
        </p>
        <h1 className="text-3xl font-bold tracking-tight mb-3">
          Kiến trúc tham khảo
        </h1>
        <p className="text-[hsl(var(--muted-foreground))] max-w-2xl">
          Các mẫu kiến trúc phổ biến trên AWS. Mỗi sơ đồ mô tả luồng dữ liệu
          và các dịch vụ được kết nối trong một tình huống triển khai thực tế.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <ArchitectureDiagram
          title="Full Stack App"
          description="Ứng dụng web đầy đủ với CDN, load balancer, containers và cơ sở dữ liệu quan hệ lẫn NoSQL."
          nodes={fullStackNodes}
          connections={fullStackConnections}
        />

        <ArchitectureDiagram
          title="Serverless API"
          description="API không máy chủ sử dụng API Gateway và Lambda, kết nối với DynamoDB để lưu trữ dữ liệu."
          nodes={serverlessNodes}
          connections={serverlessConnections}
        />

        <ArchitectureDiagram
          title="Container Deployment"
          description="Triển khai container với ECR, ECS Fargate và ALB bên trong VPC riêng."
          nodes={containerNodes}
          connections={containerConnections}
        />

        <ArchitectureDiagram
          title="Static Frontend"
          description="Hosting frontend tĩnh với S3 làm origin, CloudFront phân phối toàn cầu và Route 53 quản lý DNS."
          nodes={staticNodes}
          connections={staticConnections}
        />
      </div>
    </main>
  );
}
