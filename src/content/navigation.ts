import type { NavItem } from "@/types/guide";

export const sidebarNav: NavItem[] = [
  {
    title: "Tổng quan",
    href: "/",
    icon: "Home",
  },
  {
    title: "Lộ trình",
    href: "/roadmap",
    icon: "Map",
  },
  {
    title: "Giai đoạn học",
    href: "/stages",
    icon: "BookOpen",
    children: [
      { title: "0. Tài khoản & Nền tảng", href: "/stages/0-foundation" },
      { title: "1. IAM", href: "/stages/1-iam" },
      { title: "2. S3", href: "/stages/2-s3" },
      { title: "3. EC2", href: "/stages/3-ec2" },
      { title: "4. VPC", href: "/stages/4-vpc" },
      { title: "5. Database", href: "/stages/5-database" },
      { title: "6. Load Balancer & ASG", href: "/stages/6-load-balancer-auto-scaling" },
      { title: "7. Route 53 & ACM", href: "/stages/7-route53-acm" },
      { title: "8. Lambda & API GW", href: "/stages/8-lambda-api-gateway" },
      { title: "9. Messaging", href: "/stages/9-messaging-event-driven" },
      { title: "10. Containers", href: "/stages/10-ecs-fargate" },
      { title: "11. Monitoring", href: "/stages/11-monitoring-logging" },
      { title: "12. Security", href: "/stages/12-security" },
      { title: "13. CloudFront", href: "/stages/13-cloudfront" },
      { title: "14. IaC", href: "/stages/14-iac" },
      { title: "15. Final Project", href: "/stages/15-final-project" },
    ],
  },
  {
    title: "Hands-on Labs",
    href: "/labs",
    icon: "FlaskConical",
  },
  {
    title: "Quiz",
    href: "/quiz",
    icon: "HelpCircle",
  },
  {
    title: "Từ điển AWS",
    href: "/glossary",
    icon: "BookMarked",
  },
  {
    title: "Cheat Sheets",
    href: "/cheatsheets",
    icon: "FileCode",
  },
  {
    title: "Kiến trúc",
    href: "/architecture",
    icon: "Network",
  },
  {
    title: "Tài nguyên",
    href: "/resources",
    icon: "Library",
  },
  {
    title: "Tiến độ",
    href: "/progress",
    icon: "BarChart3",
  },
  {
    title: "Cài đặt",
    href: "/settings",
    icon: "Settings",
  },
];
