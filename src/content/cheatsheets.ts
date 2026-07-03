import type { CheatsheetSection } from "@/types/guide";

export const cheatsheets: CheatsheetSection[] = [
  {
    id: "s3-cli",
    title: "S3 CLI Commands",
    service: "S3",
    items: [
      { command: "aws s3 ls", description: "Liệt kê tất cả buckets", language: "bash" },
      { command: "aws s3 ls s3://BUCKET/", description: "Liệt kê objects trong bucket", language: "bash" },
      { command: "aws s3 cp ./file.txt s3://BUCKET/file.txt", description: "Upload file lên S3", language: "bash" },
      { command: "aws s3 cp s3://BUCKET/file.txt ./file.txt", description: "Download file từ S3", language: "bash" },
      { command: "aws s3 sync ./local/ s3://BUCKET/prefix/", description: "Sync thư mục local lên S3", language: "bash" },
      { command: "aws s3 rm s3://BUCKET/file.txt", description: "Xóa object", language: "bash" },
      { command: "aws s3 presign s3://BUCKET/file.txt --expires-in 300", description: "Tạo pre-signed URL (5 phút)", language: "bash" },
      { command: "aws s3api put-bucket-versioning --bucket BUCKET --versioning-configuration Status=Enabled", description: "Bật versioning", language: "bash" },
    ],
  },
  {
    id: "ec2-cli",
    title: "EC2 CLI Commands",
    service: "EC2",
    items: [
      { command: "aws ec2 describe-instances", description: "Liệt kê tất cả EC2 instances", language: "bash" },
      { command: "aws ec2 start-instances --instance-ids i-XXXX", description: "Start instance", language: "bash" },
      { command: "aws ec2 stop-instances --instance-ids i-XXXX", description: "Stop instance", language: "bash" },
      { command: "aws ec2 describe-security-groups", description: "Liệt kê security groups", language: "bash" },
      { command: "ssh -i key.pem ubuntu@IP_ADDRESS", description: "SSH vào EC2 Ubuntu instance", language: "bash" },
    ],
  },
  {
    id: "iam-cli",
    title: "IAM CLI Commands",
    service: "IAM",
    items: [
      { command: "aws iam list-users", description: "Liệt kê tất cả IAM users", language: "bash" },
      { command: "aws iam create-user --user-name developer", description: "Tạo IAM user", language: "bash" },
      { command: "aws iam attach-user-policy --user-name developer --policy-arn arn:aws:iam::aws:policy/ReadOnlyAccess", description: "Gắn policy vào user", language: "bash" },
      { command: "aws iam list-roles", description: "Liệt kê tất cả roles", language: "bash" },
      { command: "aws sts get-caller-identity", description: "Xem thông tin AWS identity hiện tại", language: "bash" },
    ],
  },
  {
    id: "lambda-cli",
    title: "Lambda CLI Commands",
    service: "Lambda",
    items: [
      { command: "aws lambda list-functions", description: "Liệt kê tất cả Lambda functions", language: "bash" },
      { command: "aws lambda invoke --function-name MY_FUNCTION output.json", description: "Invoke Lambda function", language: "bash" },
      { command: "aws lambda get-function --function-name MY_FUNCTION", description: "Xem thông tin function", language: "bash" },
      { command: "aws lambda update-function-code --function-name MY_FUNCTION --zip-file fileb://function.zip", description: "Update code", language: "bash" },
      { command: "aws logs tail /aws/lambda/MY_FUNCTION --follow", description: "Xem logs real-time", language: "bash" },
    ],
  },
  {
    id: "iam-policy-examples",
    title: "IAM Policy Examples",
    service: "IAM",
    items: [
      {
        command: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "ReadOnlyS3",
      "Effect": "Allow",
      "Action": [
        "s3:ListAllMyBuckets",
        "s3:ListBucket",
        "s3:GetObject"
      ],
      "Resource": "*"
    }
  ]
}`,
        description: "S3 Read-Only Policy",
        language: "json",
      },
      {
        command: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "secretsmanager:GetSecretValue"
      ],
      "Resource": "arn:aws:secretsmanager:ap-southeast-1:ACCOUNT_ID:secret:my-app/*"
    }
  ]
}`,
        description: "Secrets Manager Read Policy",
        language: "json",
      },
    ],
  },
  {
    id: "cloudwatch-cli",
    title: "CloudWatch CLI Commands",
    service: "CloudWatch",
    items: [
      { command: "aws logs describe-log-groups", description: "Liệt kê tất cả log groups", language: "bash" },
      { command: "aws logs tail /aws/lambda/MY_FUNCTION --follow", description: "Theo dõi logs real-time", language: "bash" },
      { command: "aws cloudwatch describe-alarms", description: "Liệt kê tất cả alarms", language: "bash" },
      { command: "aws cloudwatch get-metric-statistics --namespace AWS/EC2 --metric-name CPUUtilization --dimensions Name=InstanceId,Value=i-XXXX --start-time 2024-01-01T00:00:00Z --end-time 2024-01-02T00:00:00Z --period 3600 --statistics Average", description: "Xem CPU metrics của EC2", language: "bash" },
    ],
  },
  {
    id: "nginx-config",
    title: "Nginx Reverse Proxy Config",
    service: "EC2",
    items: [
      {
        command: `server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_cache_bypass $http_upgrade;
    }
}`,
        description: "Nginx config cho Node.js app trên port 3000",
        language: "bash",
      },
    ],
  },
  {
    id: "terraform-examples",
    title: "Terraform Examples",
    service: "Terraform",
    items: [
      {
        command: `resource "aws_s3_bucket" "app_bucket" {
  bucket = "my-app-bucket-\${var.env}"
  tags = {
    Environment = var.env
    Project     = "aws-starter"
  }
}

resource "aws_s3_bucket_public_access_block" "app_bucket" {
  bucket = aws_s3_bucket.app_bucket.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}`,
        description: "Tạo private S3 bucket với Terraform",
        language: "hcl",
      },
    ],
  },
];
