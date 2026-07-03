import type { Stage } from "@/types/guide";

export const stagesS6S7: Stage[] = [
  {
    id: 6,
    slug: "6-load-balancer-auto-scaling",
    title: "Load Balancer và Auto Scaling",
    subtitle: "Xây dựng hệ thống có khả năng mở rộng linh hoạt và chịu tải cao",
    difficulty: "intermediate",
    estimatedTime: "1 tuần",
    services: ["ALB", "Auto Scaling", "EC2"],
    objectives: [
      "Phân biệt Application Load Balancer (ALB) và Network Load Balancer (NLB) theo use case",
      "Cấu hình Target Groups, Listeners và routing rules cho ALB",
      "Thiết lập Health Checks để phát hiện và loại bỏ instance không khỏe",
      "Tạo Auto Scaling Group (ASG) với Launch Template",
      "Cấu hình Scaling Policies: Target Tracking, Step Scaling và Scheduled Scaling",
    ],
    concepts: [
      {
        title: "Application Load Balancer (ALB)",
        description:
          "ALB hoạt động ở tầng Layer 7 (HTTP/HTTPS), hỗ trợ routing dựa trên path, host header, query string. Phù hợp cho web apps, microservices và container-based apps. Tích hợp tốt với ECS, EKS và Lambda.",
      },
      {
        title: "Target Group",
        description:
          "Target Group là nhóm các backend targets (EC2 instances, IPs, Lambda functions) mà Load Balancer sẽ phân phối traffic tới. Mỗi Target Group có health check riêng và có thể được dùng trong nhiều rules.",
      },
      {
        title: "Listener và Rules",
        description:
          "Listener lắng nghe traffic trên một port/protocol cụ thể (ví dụ: port 443 HTTPS). Rules xác định cách route request tới Target Group dựa trên điều kiện như path pattern (/api/*) hoặc host header.",
      },
      {
        title: "Auto Scaling Group (ASG)",
        description:
          "ASG tự động duy trì số lượng EC2 instances theo min, max và desired capacity. Khi instance unhealthy, ASG tự động terminate và launch instance mới. Kết hợp với ALB, ASG đăng ký/hủy đăng ký instances tự động.",
      },
      {
        title: "Launch Template",
        description:
          "Launch Template định nghĩa cấu hình EC2 instance (AMI, instance type, security groups, user data...) được dùng bởi ASG khi launch instances mới. Hỗ trợ versioning và có thể được tái sử dụng.",
      },
      {
        title: "Scaling Policies",
        description:
          "Target Tracking Policy: duy trì metric ở giá trị mục tiêu (ví dụ: CPU = 50%). Step Scaling: tăng/giảm số lượng instances theo từng bước dựa trên mức độ alarm. Scheduled Scaling: scale theo lịch cố định, phù hợp cho traffic có pattern định kỳ.",
      },
      {
        title: "Health Checks",
        description:
          "ALB gửi request tới đường dẫn health check (ví dụ: /health) theo định kỳ. Instance trả về HTTP 200 được coi là healthy. Instance unhealthy sẽ bị loại khỏi rotation. ASG cũng có health check riêng để terminate và thay thế instances.",
      },
    ],
    consoleSteps: [
      {
        title: "Tạo Application Load Balancer",
        description:
          "Vào EC2 Console → Load Balancers → Create Load Balancer → chọn Application Load Balancer. Đặt tên, chọn Internet-facing scheme, chọn ít nhất 2 Availability Zones. Gán Security Group cho phép inbound HTTP/HTTPS. Chưa cần tạo listener chi tiết ở bước này.",
        imagePath: "/images/stage-6/step-1.png",
        alt: "Màn hình tạo Application Load Balancer trong EC2 Console",
      },
      {
        title: "Tạo Target Group",
        description:
          "Vào EC2 Console → Target Groups → Create Target Group. Chọn target type là Instances, protocol HTTP, port 80. Cấu hình Health Check với path /health, Healthy threshold 2, Unhealthy threshold 3, interval 30 giây. Đăng ký các EC2 instances vào target group.",
        imagePath: "/images/stage-6/step-2.png",
        alt: "Cấu hình Target Group và Health Check settings",
      },
      {
        title: "Tạo Launch Template",
        description:
          "Vào EC2 Console → Launch Templates → Create Launch Template. Chọn AMI (Amazon Linux 2023), instance type t3.micro, Key pair, Security Group. Thêm User Data script để cài đặt và start web server tự động khi instance khởi động.",
        imagePath: "/images/stage-6/step-3.png",
        alt: "Cấu hình Launch Template với AMI và User Data script",
      },
      {
        title: "Tạo Auto Scaling Group",
        description:
          "Vào EC2 Console → Auto Scaling Groups → Create ASG. Chọn Launch Template vừa tạo, chọn VPC và ít nhất 2 subnets ở các AZ khác nhau. Gắn vào ALB Target Group. Thiết lập Desired capacity: 2, Min: 1, Max: 4. Thêm Target Tracking Policy với CPU utilization 50%.",
        imagePath: "/images/stage-6/step-4.png",
        alt: "Thiết lập Auto Scaling Group với scaling policies",
      },
    ],
    labs: [
      {
        id: "lab-6-1",
        slug: "lab-6-load-balancer-auto-scaling-1",
        title: "Cấu hình Application Load Balancer",
        stageId: 6,
        stageSlug: "6-load-balancer-auto-scaling",
        objective: "Deploy ALB phân phối traffic tới nhiều EC2 instances",
        estimatedTime: "60 phút",
        steps: [
          "Launch 2 EC2 instances (t3.micro, Amazon Linux 2023) trong cùng VPC nhưng khác AZ. Cài đặt nginx qua User Data, trang index.html hiển thị hostname để phân biệt instances.",
          "Tạo Security Group cho ALB: cho phép inbound port 80 và 443 từ 0.0.0.0/0. Tạo Security Group cho EC2: chỉ cho phép inbound port 80 từ Security Group của ALB.",
          "Tạo Target Group với protocol HTTP port 80. Cấu hình health check path /health-check, trả về HTTP 200. Đăng ký cả 2 EC2 instances vào target group.",
          "Tạo ALB chọn Internet-facing, gán Security Group ALB, chọn 2 AZ. Tạo Listener port 80 forward tới Target Group vừa tạo.",
          "Chờ Target Group health check pass (trạng thái healthy). Lấy DNS name của ALB, truy cập từ browser nhiều lần để quan sát traffic được phân phối luân phiên giữa 2 instances.",
          "Thêm Listener Rule: nếu path bắt đầu /api/* thì forward tới một target group khác (API backend). Test routing rule bằng cách gọi /api/test.",
          "Terminate một EC2 instance, quan sát health check thay đổi trạng thái sang unhealthy. Xác nhận ALB chỉ route traffic tới instance còn healthy.",
        ],
        expectedResult:
          "ALB hoạt động ổn định, phân phối traffic đều giữa các instances healthy. Khi một instance down, toàn bộ traffic tự động chuyển sang instance còn lại mà không có downtime từ phía user.",
        troubleshooting: [
          "Health check liên tục fail: kiểm tra Security Group của EC2 có cho phép traffic từ Security Group của ALB không, và endpoint /health trả về HTTP 200.",
          "Không kết nối được tới ALB: kiểm tra Security Group của ALB cho phép inbound port 80 từ 0.0.0.0/0.",
          "Traffic không được load balance đều: với số request nhỏ, phân phối có thể không đều do thuật toán round-robin. Thử nhiều lần hoặc dùng curl loop.",
          "Connection timeout khi test: đảm bảo EC2 instances đang chạy và web server đã start thành công, kiểm tra system log của instance.",
        ],
      },
      {
        id: "lab-6-2",
        slug: "lab-6-load-balancer-auto-scaling-2",
        title: "Auto Scaling Group với Target Tracking",
        stageId: 6,
        stageSlug: "6-load-balancer-auto-scaling",
        objective: "Tạo ASG tự động scale dựa trên CPU utilization",
        estimatedTime: "60 phút",
        steps: [
          "Tạo Launch Template: AMI Amazon Linux 2023, instance type t3.micro, Security Group cho phép HTTP từ ALB. User Data cài đặt nginx và stress tool (để test sau).",
          "Tạo Auto Scaling Group từ Launch Template, attach vào ALB Target Group đã tạo ở Lab 1. Cấu hình Desired: 2, Min: 1, Max: 5. Chọn 2 subnets ở 2 AZ khác nhau.",
          "Thêm Target Tracking Scaling Policy: metric CPU Utilization, target value 40%. Đặt warmup period 300 giây. Quan sát ASG tạo 2 instances ban đầu.",
          "Simulate high CPU load: SSH vào một instance, chạy lệnh stress để tăng CPU lên 80%+. Theo dõi CloudWatch metrics và ASG activity.",
          "Quan sát ASG scale-out: sau khoảng 2-3 phút CPU cao liên tục, ASG sẽ launch thêm instances. Kiểm tra Target Group có đăng ký instances mới vào rotation.",
          "Dừng stress tool, chờ CPU giảm. Quan sát ASG scale-in sau cooldown period (mặc định 300 giây), số instances giảm về mức Desired hoặc Min.",
        ],
        expectedResult:
          "ASG tự động scale-out khi CPU vượt 40% và scale-in khi CPU giảm. Instances mới được tự động đăng ký vào ALB Target Group và sẵn sàng nhận traffic sau khi health check pass.",
        troubleshooting: [
          "ASG không scale-out dù CPU cao: kiểm tra CloudWatch alarm trạng thái, đảm bảo scaling policy đã được tạo đúng và không có cooldown đang active.",
          "Instance mới không join Target Group: kiểm tra Launch Template có đúng Security Group không, và health check endpoint hoạt động trên instance mới.",
          "Scale-in xảy ra quá nhanh: tăng scale-in cooldown period hoặc điều chỉnh threshold để tránh flapping.",
          "Stress command không tìm thấy: cài đặt stress bằng lệnh sudo yum install -y stress hoặc sudo amazon-linux-extras install epel && sudo yum install -y stress.",
        ],
      },
    ],
    codeSnippets: [
      {
        title: "Tạo ALB và Target Group bằng AWS CLI",
        language: "bash",
        code: `# Tạo Target Group
aws elbv2 create-target-group \\
  --name my-target-group \\
  --protocol HTTP \\
  --port 80 \\
  --vpc-id vpc-xxxxxxxxxxxxxxxxx \\
  --health-check-path /health \\
  --health-check-interval-seconds 30 \\
  --healthy-threshold-count 2 \\
  --unhealthy-threshold-count 3

# Tạo Application Load Balancer
aws elbv2 create-load-balancer \\
  --name my-alb \\
  --subnets subnet-xxxxxxxx subnet-yyyyyyyy \\
  --security-groups sg-xxxxxxxxxxxxxxxxx \\
  --scheme internet-facing \\
  --type application

# Tạo Listener port 80 → Target Group
aws elbv2 create-listener \\
  --load-balancer-arn arn:aws:elasticloadbalancing:... \\
  --protocol HTTP \\
  --port 80 \\
  --default-actions Type=forward,TargetGroupArn=arn:aws:elasticloadbalancing:...

# Đăng ký EC2 instances vào Target Group
aws elbv2 register-targets \\
  --target-group-arn arn:aws:elasticloadbalancing:... \\
  --targets Id=i-xxxxxxxxxxxxxxxxx Id=i-yyyyyyyyyyyyyyyyy`,
      },
      {
        title: "Tạo Launch Template và Auto Scaling Group",
        language: "bash",
        code: `# Tạo Launch Template
aws ec2 create-launch-template \\
  --launch-template-name my-launch-template \\
  --version-description "v1" \\
  --launch-template-data '{
    "ImageId": "ami-xxxxxxxxxxxxxxxxx",
    "InstanceType": "t3.micro",
    "SecurityGroupIds": ["sg-xxxxxxxxxxxxxxxxx"],
    "UserData": "'"$(base64 -w0 << 'EOF'
#!/bin/bash
yum update -y
yum install -y nginx
systemctl start nginx
systemctl enable nginx
echo "<h1>Hello from $(hostname)</h1>" > /usr/share/nginx/html/index.html
mkdir -p /usr/share/nginx/html
echo "OK" > /usr/share/nginx/html/health
EOF
)"'"
  }'

# Tạo Auto Scaling Group
aws autoscaling create-auto-scaling-group \\
  --auto-scaling-group-name my-asg \\
  --launch-template LaunchTemplateName=my-launch-template,Version='$Latest' \\
  --min-size 1 \\
  --max-size 5 \\
  --desired-capacity 2 \\
  --vpc-zone-identifier "subnet-xxxxxxxx,subnet-yyyyyyyy" \\
  --target-group-arns arn:aws:elasticloadbalancing:... \\
  --health-check-type ELB \\
  --health-check-grace-period 300`,
      },
      {
        title: "Target Tracking Scaling Policy JSON",
        language: "json",
        code: `{
  "AutoScalingGroupName": "my-asg",
  "PolicyName": "cpu-target-tracking",
  "PolicyType": "TargetTrackingScaling",
  "TargetTrackingConfiguration": {
    "PredefinedMetricSpecification": {
      "PredefinedMetricType": "ASGAverageCPUUtilization"
    },
    "TargetValue": 50.0,
    "ScaleInCooldown": 300,
    "ScaleOutCooldown": 60,
    "DisableScaleIn": false
  }
}`,
      },
    ],
    bestPractices: [
      "Luôn deploy ALB trên ít nhất 2 Availability Zones để đảm bảo high availability",
      "Đặt Health Check path là một endpoint nhẹ, chỉ kiểm tra app status mà không gọi database",
      "Cấu hình Security Group của EC2 chỉ cho phép traffic từ Security Group của ALB, không mở trực tiếp từ internet",
      "Không đặt Min capacity = 0 trong production vì sẽ có downtime khi ASG scale-in về 0",
      "Sử dụng Launch Template thay vì Launch Configuration (Launch Configuration đã deprecated)",
      "Đặt warmup period đủ dài để instance mới hoàn tất khởi động trước khi nhận traffic",
      "Đừng set desired capacity quá cao khi không cần thiết — chi phí tăng tuyến tính với số instances",
    ],
    commonMistakes: [
      {
        mistake: "Health check path trả về lỗi 404 hoặc 500",
        fix: "Đảm bảo endpoint health check tồn tại và trả về HTTP 200. Thêm route /health vào ứng dụng hoặc tạo file tĩnh.",
      },
      {
        mistake: "Security Group EC2 mở port 80 từ 0.0.0.0/0 thay vì từ ALB SG",
        fix: "Trong inbound rule của EC2 Security Group, chọn source là Security Group ID của ALB thay vì CIDR 0.0.0.0/0.",
      },
      {
        mistake: "ASG không scale vì cooldown period chưa hết",
        fix: "Chờ hết cooldown period (mặc định 300 giây sau scale event). Trong môi trường test, có thể giảm cooldown xuống 60 giây.",
      },
      {
        mistake: "Launch Template thiếu IAM Instance Profile khiến app không gọi được AWS API",
        fix: "Gán IAM Instance Profile có đủ quyền vào Launch Template. Instance Profile chứa IAM Role cho EC2.",
      },
    ],
    checklist: [
      {
        id: "alb-1",
        label: "Tạo ALB Internet-facing với 2+ AZ",
        description: "Đảm bảo ALB spanning ít nhất 2 Availability Zones",
      },
      {
        id: "alb-2",
        label: "Cấu hình Target Group với Health Check",
        description: "Health check path trả về 200, threshold và interval hợp lý",
      },
      {
        id: "alb-3",
        label: "Security Group đúng cách (ALB → EC2)",
        description: "EC2 chỉ nhận traffic từ Security Group của ALB",
      },
      {
        id: "alb-4",
        label: "Tạo Launch Template với User Data",
        description: "User Data tự động cài đặt và khởi động ứng dụng",
      },
      {
        id: "alb-5",
        label: "Tạo ASG với Min/Max/Desired hợp lý",
        description: "Min ≥ 1 để tránh downtime, Max đủ để xử lý peak traffic",
      },
      {
        id: "alb-6",
        label: "Gắn ASG vào ALB Target Group",
        description: "ASG tự động đăng ký/hủy đăng ký instances vào Target Group",
      },
      {
        id: "alb-7",
        label: "Cấu hình Target Tracking Scaling Policy",
        description: "CPU utilization target 40-60% tùy workload",
      },
      {
        id: "alb-8",
        label: "Verify scale-out và scale-in hoạt động",
        description: "Test bằng cách tạo tải giả và quan sát ASG activity log",
      },
    ],
    quiz: [
      {
        id: "q6-1",
        question: "Application Load Balancer hoạt động ở tầng nào của mô hình OSI?",
        options: [
          { id: "a", text: "Layer 4 (Transport)", isCorrect: false },
          { id: "b", text: "Layer 7 (Application)", isCorrect: true },
          { id: "c", text: "Layer 3 (Network)", isCorrect: false },
          { id: "d", text: "Layer 2 (Data Link)", isCorrect: false },
        ],
        explanation:
          "ALB hoạt động ở Layer 7 (Application layer), cho phép routing dựa trên HTTP headers, path, query string. Network Load Balancer (NLB) mới hoạt động ở Layer 4.",
      },
      {
        id: "q6-2",
        question: "Khi một EC2 instance trong Target Group bị unhealthy, điều gì xảy ra?",
        options: [
          { id: "a", text: "ALB terminate instance đó ngay lập tức", isCorrect: false },
          { id: "b", text: "ALB ngừng gửi traffic mới tới instance đó", isCorrect: true },
          { id: "c", text: "ALB vẫn gửi traffic bình thường", isCorrect: false },
          { id: "d", text: "Toàn bộ ALB ngừng hoạt động", isCorrect: false },
        ],
        explanation:
          "Khi instance unhealthy, ALB ngừng route traffic mới tới instance đó. Instance vẫn chạy nhưng không nhận request. Nếu có ASG, ASG sẽ terminate và thay thế instance unhealthy.",
      },
      {
        id: "q6-3",
        question: "Target Tracking Scaling Policy với CPU target 50% có nghĩa là gì?",
        options: [
          { id: "a", text: "Scale-out khi bất kỳ instance nào vượt 50% CPU", isCorrect: false },
          { id: "b", text: "Duy trì CPU trung bình của toàn bộ ASG ở mức 50%", isCorrect: true },
          { id: "c", text: "Terminate instance khi CPU dưới 50%", isCorrect: false },
          { id: "d", text: "Giới hạn CPU tối đa của mỗi instance ở 50%", isCorrect: false },
        ],
        explanation:
          "Target Tracking theo dõi CPU utilization trung bình của toàn bộ ASG. ASG sẽ tự động tăng/giảm số instances để giữ CPU trung bình gần mức 50% đã cấu hình.",
      },
      {
        id: "q6-4",
        question: "Launch Template khác Launch Configuration ở điểm nào quan trọng nhất?",
        options: [
          { id: "a", text: "Launch Template không hỗ trợ User Data", isCorrect: false },
          { id: "b", text: "Launch Template hỗ trợ versioning và immutable updates", isCorrect: true },
          { id: "c", text: "Launch Configuration miễn phí còn Launch Template tính phí", isCorrect: false },
          { id: "d", text: "Chỉ Launch Configuration mới dùng được với ASG", isCorrect: false },
        ],
        explanation:
          "Launch Template hỗ trợ versioning (có thể cập nhật và rollback), kế thừa cấu hình giữa các version, và là tính năng được AWS khuyến nghị. Launch Configuration đã deprecated và không thể chỉnh sửa sau khi tạo.",
      },
      {
        id: "q6-5",
        question: "Nên đặt Security Group của EC2 instances trong ASG như thế nào khi dùng với ALB?",
        options: [
          { id: "a", text: "Mở port 80 và 443 từ 0.0.0.0/0 để ALB có thể kết nối", isCorrect: false },
          { id: "b", text: "Chỉ mở port ứng dụng từ Security Group của ALB", isCorrect: true },
          { id: "c", text: "Không cần Security Group vì ALB đã bảo vệ", isCorrect: false },
          { id: "d", text: "Mở toàn bộ traffic inbound từ VPC CIDR", isCorrect: false },
        ],
        explanation:
          "Best practice là EC2 Security Group chỉ cho phép inbound từ Security Group của ALB. Điều này đảm bảo instances chỉ nhận traffic qua ALB, không bị truy cập trực tiếp từ internet.",
      },
      {
        id: "q6-6",
        question: "Cooldown period trong ASG có tác dụng gì?",
        options: [
          { id: "a", text: "Thời gian instance cần để khởi động và pass health check", isCorrect: false },
          { id: "b", text: "Khoảng thời gian ASG không thực hiện thêm scaling action sau một action vừa xong", isCorrect: true },
          { id: "c", text: "Thời gian ALB chờ trước khi gửi traffic tới instance mới", isCorrect: false },
          { id: "d", text: "Thời gian tối thiểu giữa hai lần health check", isCorrect: false },
        ],
        explanation:
          "Cooldown period ngăn ASG thực hiện scaling liên tục (flapping) bằng cách đợi một khoảng thời gian sau mỗi scaling action để metrics ổn định trước khi quyết định scale tiếp.",
      },
    ],
    architecture: {
      title: "Load Balancer và Auto Scaling Architecture",
      description:
        "Traffic từ internet đi qua ALB, được phân phối tới các EC2 instances trong ASG đặt ở Private Subnets thuộc nhiều AZ khác nhau",
      nodes: [
        { id: "internet", label: "Internet", type: "internet" },
        { id: "alb", label: "Application Load Balancer", sublabel: "Internet-facing", type: "service" },
        { id: "tg", label: "Target Group", sublabel: "Health Check: /health", type: "service" },
        { id: "asg", label: "Auto Scaling Group", sublabel: "Min:1 / Max:5 / Desired:2", type: "group" },
        { id: "ec2-1", label: "EC2 Instance 1", sublabel: "AZ: us-east-1a", type: "service" },
        { id: "ec2-2", label: "EC2 Instance 2", sublabel: "AZ: us-east-1b", type: "service" },
        { id: "cw", label: "CloudWatch", sublabel: "CPU Metrics", type: "service" },
      ],
      connections: [
        { from: "internet", to: "alb", label: "HTTPS :443" },
        { from: "alb", to: "tg", label: "forward" },
        { from: "tg", to: "ec2-1", label: "HTTP :80" },
        { from: "tg", to: "ec2-2", label: "HTTP :80" },
        { from: "ec2-1", to: "asg" },
        { from: "ec2-2", to: "asg" },
        { from: "asg", to: "cw", label: "metrics" },
        { from: "cw", to: "asg", label: "scaling trigger" },
      ],
    },
  },
  {
    id: 7,
    slug: "7-route53-acm",
    title: "Route 53 và SSL/TLS",
    subtitle: "Quản lý DNS toàn cầu và bảo mật kết nối với SSL/TLS certificates",
    difficulty: "intermediate",
    estimatedTime: "1 tuần",
    services: ["Route 53", "ACM", "CloudFront"],
    objectives: [
      "Tạo và quản lý Hosted Zones trong Route 53 cho domain tùy chỉnh",
      "Cấu hình các loại DNS records: A, CNAME, ALIAS và hiểu sự khác biệt",
      "Áp dụng các Routing Policies: Simple, Weighted, Latency-based và Failover",
      "Request và validate SSL/TLS certificate từ AWS Certificate Manager (ACM)",
      "Cấu hình HTTPS Listener trên ALB sử dụng ACM certificate",
    ],
    concepts: [
      {
        title: "Route 53 Hosted Zone",
        description:
          "Hosted Zone là container chứa DNS records cho một domain. Public Hosted Zone phục vụ queries từ internet. Private Hosted Zone phục vụ DNS resolution trong VPC nội bộ. Mỗi Hosted Zone được cấp 4 name servers tự động bởi AWS.",
      },
      {
        title: "DNS Record Types",
        description:
          "A record: ánh xạ domain tới IPv4 address. AAAA record: ánh xạ domain tới IPv6 address. CNAME record: ánh xạ domain tới domain khác (không dùng được cho root domain). ALIAS record (đặc trưng AWS): ánh xạ root domain tới AWS resource như ALB, CloudFront, S3 website — miễn phí và hỗ trợ health check.",
      },
      {
        title: "Routing Policies",
        description:
          "Simple: route tới một resource duy nhất. Weighted: phân bổ traffic theo tỷ lệ phần trăm giữa nhiều resources (A/B testing, blue-green deploy). Latency-based: route user tới region có latency thấp nhất. Failover: route tới primary resource, tự động chuyển sang secondary khi primary unhealthy.",
      },
      {
        title: "ACM Certificate",
        description:
          "AWS Certificate Manager cấp và tự động gia hạn SSL/TLS certificates miễn phí. Certificate dùng cho HTTPS, gắn vào ALB, CloudFront, API Gateway. ACM quản lý toàn bộ vòng đời certificate (tạo, gia hạn, thu hồi). Certificate được lưu trữ và không thể export private key.",
      },
      {
        title: "Domain Validation",
        description:
          "DNS Validation (khuyến nghị): tạo CNAME record đặc biệt vào DNS của domain để chứng minh quyền sở hữu. Tự động gia hạn khi record còn tồn tại. Email Validation: ACM gửi email xác nhận tới địa chỉ liên kết với domain (admin@, webmaster@...). DNS validation nhanh hơn và tự động hơn.",
      },
      {
        title: "HTTPS với ALB",
        description:
          "Gắn ACM certificate vào ALB Listener port 443. Cấu hình HTTP → HTTPS redirect bằng Listener Rule trên port 80. ALB xử lý SSL termination, decrypt traffic và forward HTTP nội bộ tới EC2 instances. End-to-end encryption yêu cầu cấu hình HTTPS từ ALB tới EC2 (SSL passthrough hoặc re-encryption).",
      },
    ],
    consoleSteps: [
      {
        title: "Tạo Hosted Zone trong Route 53",
        description:
          "Vào Route 53 Console → Hosted Zones → Create Hosted Zone. Nhập tên domain (ví dụ: myapp.example.com), chọn Public Hosted Zone. Sau khi tạo, Route 53 cung cấp 4 Name Server records. Cập nhật NS records tại nhà đăng ký domain để trỏ về Name Servers của AWS.",
        imagePath: "/images/stage-7/step-1.png",
        alt: "Tạo Hosted Zone và xem Name Server records trong Route 53 Console",
      },
      {
        title: "Tạo A Record (ALIAS) trỏ về ALB",
        description:
          "Trong Hosted Zone → Create Record. Để trống Record Name (root domain) hoặc nhập subdomain (www). Chọn Record type A. Bật Alias. Chọn Route traffic to: Alias to Application and Classic Load Balancer. Chọn Region và ALB từ dropdown. Chọn Routing Policy: Simple. Lưu record.",
        imagePath: "/images/stage-7/step-2.png",
        alt: "Tạo ALIAS A record trỏ domain về Application Load Balancer",
      },
      {
        title: "Request ACM Certificate",
        description:
          "Vào ACM Console (chọn region us-east-1 nếu dùng CloudFront) → Request Certificate → Request a public certificate. Nhập domain names: example.com và *.example.com (wildcard). Chọn DNS Validation. Click Request. ACM hiển thị CNAME records cần tạo trong Route 53.",
        imagePath: "/images/stage-7/step-3.png",
        alt: "Request ACM Certificate và xem CNAME records cần tạo cho DNS validation",
      },
      {
        title: "Cấu hình HTTPS Listener trên ALB",
        description:
          "Vào EC2 Console → Load Balancers → chọn ALB → Listeners → Add Listener. Protocol HTTPS, port 443. Default action: Forward to Target Group. SSL/TLS Certificate: chọn certificate từ ACM. Security Policy: ELBSecurityPolicy-TLS13-1-2-2021-06. Thêm rule redirect HTTP → HTTPS trên Listener port 80.",
        imagePath: "/images/stage-7/step-4.png",
        alt: "Thêm HTTPS Listener với ACM certificate và cấu hình HTTP redirect",
      },
    ],
    labs: [
      {
        id: "lab-7-1",
        slug: "lab-7-route53-acm-1",
        title: "Cấu hình Route 53 Hosted Zone",
        stageId: 7,
        stageSlug: "7-route53-acm",
        objective: "Tạo hosted zone và cấu hình DNS records cho domain",
        estimatedTime: "45 phút",
        steps: [
          "Đăng ký domain mới hoặc sử dụng domain có sẵn. Nếu dùng Route 53 Domains, mua domain trực tiếp trong console. Nếu dùng domain từ nhà đăng ký khác (GoDaddy, Namecheap...), lưu ý cần cập nhật NS records sau.",
          "Tạo Public Hosted Zone cho domain. Ghi lại 4 Name Server (NS) records được cấp. Nếu domain đăng ký ngoài AWS, cập nhật NS records tại nhà đăng ký để trỏ về NS của Route 53.",
          "Tạo A record ALIAS cho root domain (@ hoặc để trống) trỏ về ALB đã tạo ở Stage 6. Tạo thêm CNAME record www trỏ về root domain.",
          "Tạo TXT record với nội dung tùy chỉnh để verify DNS hoạt động. Kiểm tra record bằng lệnh: dig TXT yourdomain.com hoặc nslookup -type=TXT yourdomain.com.",
          "Test Weighted Routing Policy: tạo 2 A records cùng tên nhưng trỏ về 2 IP khác nhau, đặt weight 70/30. Dùng dig hoặc curl nhiều lần để quan sát phân phối traffic.",
          "Xóa Weighted records sau khi test. Kiểm tra lại record ALIAS về ALB hoạt động bình thường bằng cách truy cập domain từ browser.",
        ],
        expectedResult:
          "Domain trỏ về ALB qua Route 53 Hosted Zone. Truy cập http://yourdomain.com hiển thị ứng dụng. DNS propagation hoàn tất trong vòng vài phút với Route 53.",
        troubleshooting: [
          "Domain không resolve: kiểm tra NS records tại nhà đăng ký đã được cập nhật đúng 4 Name Servers của Route 53 chưa. DNS propagation có thể mất 24-48 giờ.",
          "ALIAS record không tìm thấy ALB trong dropdown: đảm bảo đang tạo record trong cùng AWS Region với ALB, và ALB đang ở trạng thái active.",
          "dig trả về NXDOMAIN: domain chưa được delegate về Route 53 NS, hoặc record chưa được tạo đúng trong Hosted Zone.",
          "CNAME không hoạt động cho root domain: không thể dùng CNAME cho apex domain, phải dùng ALIAS record thay thế.",
        ],
      },
      {
        id: "lab-7-2",
        slug: "lab-7-route53-acm-2",
        title: "HTTPS với ACM Certificate",
        stageId: 7,
        stageSlug: "7-route53-acm",
        objective: "Cấu hình SSL/TLS certificate và HTTPS cho ALB",
        estimatedTime: "60 phút",
        steps: [
          "Vào ACM Console (region phải trùng với ALB). Request public certificate cho domain và wildcard *.yourdomain.com. Chọn DNS Validation method.",
          "ACM cung cấp CNAME records cần tạo để validate domain. Click 'Create records in Route 53' nếu Hosted Zone trong cùng account — ACM tự động tạo records. Hoặc tạo thủ công trong Hosted Zone.",
          "Chờ Certificate status chuyển từ 'Pending validation' sang 'Issued' (thường 5-30 phút sau khi CNAME records được tạo). Refresh trang để kiểm tra trạng thái.",
          "Vào ALB → Listeners → Add Listener → HTTPS port 443. Chọn ACM certificate vừa issue. Forward traffic tới Target Group. Đảm bảo Security Group ALB cho phép inbound port 443.",
          "Sửa Listener HTTP port 80: thay default action từ Forward thành Redirect → HTTPS (301 Permanent). Điều này đảm bảo mọi HTTP request được chuyển hướng sang HTTPS.",
          "Test: truy cập http://yourdomain.com — phải redirect tự động sang https://yourdomain.com. Kiểm tra certificate trong browser (click icon lock). Verify certificate được cấp bởi Amazon và đúng domain.",
        ],
        expectedResult:
          "Domain phục vụ HTTPS với certificate hợp lệ từ ACM. HTTP tự động redirect sang HTTPS. Browser hiển thị connection secure và certificate đúng domain.",
        troubleshooting: [
          "Certificate mãi ở trạng thái Pending validation: kiểm tra CNAME record đã được tạo đúng trong DNS, chờ DNS propagate. Dùng dig CNAME _xxxxxx.yourdomain.com để verify.",
          "502 Bad Gateway sau khi thêm HTTPS Listener: kiểm tra Target Group health check, Security Group EC2 cho phép traffic từ ALB SG.",
          "Certificate không xuất hiện trong dropdown khi tạo Listener: certificate phải ở cùng region với ALB (trừ CloudFront cần us-east-1).",
          "Browser hiển thị 'Not Secure' dù đã có certificate: kiểm tra mixed content (trang load HTTP resources), hoặc certificate chưa khớp domain name.",
        ],
      },
    ],
    codeSnippets: [
      {
        title: "Quản lý Route 53 và ACM bằng AWS CLI",
        language: "bash",
        code: `# Tạo Hosted Zone
aws route53 create-hosted-zone \\
  --name yourdomain.com \\
  --caller-reference "$(date +%s)" \\
  --hosted-zone-config Comment="Production hosted zone"

# Liệt kê Hosted Zones
aws route53 list-hosted-zones

# Request ACM Certificate
aws acm request-certificate \\
  --domain-name yourdomain.com \\
  --subject-alternative-names "*.yourdomain.com" \\
  --validation-method DNS \\
  --region us-east-1

# Kiểm tra trạng thái certificate
aws acm describe-certificate \\
  --certificate-arn arn:aws:acm:us-east-1:123456789012:certificate/xxxxxxxx \\
  --query 'Certificate.Status'

# Thêm HTTPS Listener vào ALB
aws elbv2 create-listener \\
  --load-balancer-arn arn:aws:elasticloadbalancing:... \\
  --protocol HTTPS \\
  --port 443 \\
  --certificates CertificateArn=arn:aws:acm:us-east-1:... \\
  --ssl-policy ELBSecurityPolicy-TLS13-1-2-2021-06 \\
  --default-actions Type=forward,TargetGroupArn=arn:aws:elasticloadbalancing:...`,
      },
      {
        title: "Tạo DNS Records bằng change-resource-record-sets",
        language: "json",
        code: `{
  "Comment": "Tạo ALIAS A record và CNAME cho ALB",
  "Changes": [
    {
      "Action": "CREATE",
      "ResourceRecordSet": {
        "Name": "yourdomain.com",
        "Type": "A",
        "AliasTarget": {
          "HostedZoneId": "Z35SXDOTRQ7X7K",
          "DNSName": "my-alb-1234567890.us-east-1.elb.amazonaws.com",
          "EvaluateTargetHealth": true
        }
      }
    },
    {
      "Action": "CREATE",
      "ResourceRecordSet": {
        "Name": "www.yourdomain.com",
        "Type": "CNAME",
        "TTL": 300,
        "ResourceRecords": [
          { "Value": "yourdomain.com" }
        ]
      }
    }
  ]
}`,
      },
      {
        title: "Kiểm tra DNS và Certificate validation",
        language: "bash",
        code: `# Kiểm tra A record
dig A yourdomain.com +short

# Kiểm tra CNAME record
dig CNAME www.yourdomain.com +short

# Kiểm tra NS records (để verify delegation)
dig NS yourdomain.com +short

# Kiểm tra CNAME validation record của ACM
dig CNAME _xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.yourdomain.com

# Kiểm tra certificate từ command line
openssl s_client -connect yourdomain.com:443 -servername yourdomain.com </dev/null 2>/dev/null \\
  | openssl x509 -noout -subject -issuer -dates

# Test HTTP → HTTPS redirect
curl -I http://yourdomain.com
# Kết quả mong đợi: HTTP/1.1 301 Moved Permanently
# Location: https://yourdomain.com/

# Test HTTPS hoạt động
curl -I https://yourdomain.com
# Kết quả mong đợi: HTTP/1.1 200 OK`,
      },
    ],
    bestPractices: [
      "Dùng DNS Validation thay vì Email Validation cho ACM — tự động gia hạn certificate khi CNAME record còn tồn tại",
      "Luôn request wildcard certificate (*.yourdomain.com) cùng với root domain để cover tất cả subdomains",
      "Không xóa CNAME validation record sau khi certificate đã issued — ACM cần record này để tự động gia hạn",
      "Dùng ALIAS record thay vì CNAME cho root domain (apex) vì CNAME không hợp lệ cho apex domain theo DNS standard",
      "Bật EvaluateTargetHealth trên ALIAS record để Route 53 tự động failover khi target unhealthy",
      "Đừng quên cập nhật Security Group ALB cho phép inbound port 443 khi thêm HTTPS Listener",
    ],
    commonMistakes: [
      {
        mistake: "Xóa CNAME validation record sau khi certificate issued",
        fix: "Giữ lại CNAME record vĩnh viễn. ACM cần record này cho auto-renewal. Nếu xóa, certificate sẽ không được gia hạn và expire sau 13 tháng.",
      },
      {
        mistake: "Request ACM certificate ở sai region cho CloudFront",
        fix: "CloudFront chỉ chấp nhận certificate từ us-east-1 (N. Virginia). ALB dùng certificate cùng region với ALB. Luôn kiểm tra region khi request certificate.",
      },
      {
        mistake: "Dùng CNAME record cho root domain (apex domain)",
        fix: "Root domain (yourdomain.com không có subdomain) không thể dùng CNAME theo DNS RFC. Dùng ALIAS record trong Route 53 thay thế.",
      },
      {
        mistake: "Quên thêm Security Group rule cho port 443 trên ALB",
        fix: "Sau khi thêm HTTPS Listener, cập nhật Security Group của ALB cho phép inbound TCP port 443 từ 0.0.0.0/0 và ::/0.",
      },
    ],
    checklist: [
      {
        id: "dns-1",
        label: "Tạo Public Hosted Zone cho domain",
        description: "Hosted Zone được tạo và có 4 NS records",
      },
      {
        id: "dns-2",
        label: "Cập nhật NS records tại nhà đăng ký domain",
        description: "Domain được delegate về Name Servers của Route 53",
      },
      {
        id: "dns-3",
        label: "Tạo ALIAS A record trỏ về ALB",
        description: "Root domain và/hoặc www subdomain trỏ đúng về ALB",
      },
      {
        id: "dns-4",
        label: "Request ACM Certificate với DNS Validation",
        description: "Certificate bao gồm root domain và wildcard *.yourdomain.com",
      },
      {
        id: "dns-5",
        label: "Tạo CNAME validation records trong Route 53",
        description: "CNAME records cho ACM validation được tạo và giữ lại vĩnh viễn",
      },
      {
        id: "dns-6",
        label: "Certificate trạng thái Issued",
        description: "ACM Certificate chuyển sang trạng thái Issued sau validation",
      },
      {
        id: "dns-7",
        label: "Thêm HTTPS Listener port 443 vào ALB",
        description: "Listener sử dụng ACM certificate, Security Group mở port 443",
      },
      {
        id: "dns-8",
        label: "Cấu hình HTTP → HTTPS redirect",
        description: "Listener port 80 redirect 301 sang HTTPS, truy cập browser verify",
      },
    ],
    quiz: [
      {
        id: "q7-1",
        question: "Tại sao không thể dùng CNAME record cho apex domain (root domain)?",
        options: [
          { id: "a", text: "AWS Route 53 không hỗ trợ CNAME", isCorrect: false },
          {
            id: "b",
            text: "DNS RFC không cho phép CNAME tồn tại cùng với SOA và NS records tại apex",
            isCorrect: true,
          },
          { id: "c", text: "CNAME chỉ hoạt động với IP address", isCorrect: false },
          { id: "d", text: "CNAME chỉ dùng được trong Private Hosted Zone", isCorrect: false },
        ],
        explanation:
          "Theo DNS standard (RFC 1034), apex domain phải có SOA và NS records. CNAME không thể coexist với bất kỳ record type nào khác tại cùng node. AWS Route 53 giải quyết vấn đề này bằng ALIAS record — một extension của AWS.",
      },
      {
        id: "q7-2",
        question: "ACM certificate cần được tạo ở region nào khi sử dụng với CloudFront?",
        options: [
          { id: "a", text: "Cùng region với CloudFront distribution", isCorrect: false },
          { id: "b", text: "us-east-1 (N. Virginia) bất kể distribution ở đâu", isCorrect: true },
          { id: "c", text: "Bất kỳ region nào cũng được", isCorrect: false },
          { id: "d", text: "eu-west-1 (Ireland) vì CloudFront đặt tại đó", isCorrect: false },
        ],
        explanation:
          "CloudFront là global service và chỉ tích hợp với ACM certificates từ us-east-1. Đây là yêu cầu cứng của AWS. ALB thì dùng certificate cùng region với ALB.",
      },
      {
        id: "q7-3",
        question: "DNS Validation có ưu điểm gì so với Email Validation khi request ACM certificate?",
        options: [
          { id: "a", text: "DNS Validation nhanh hơn Email Validation", isCorrect: false },
          {
            id: "b",
            text: "DNS Validation cho phép ACM tự động gia hạn certificate mà không cần can thiệp thủ công",
            isCorrect: true,
          },
          { id: "c", text: "DNS Validation miễn phí còn Email Validation tính phí", isCorrect: false },
          { id: "d", text: "DNS Validation không cần quyền sở hữu domain", isCorrect: false },
        ],
        explanation:
          "Với DNS Validation, ACM tự động kiểm tra CNAME record định kỳ để gia hạn certificate trước khi hết hạn. Email Validation yêu cầu click link xác nhận thủ công mỗi lần gia hạn.",
      },
      {
        id: "q7-4",
        question: "Routing Policy nào phù hợp nhất cho A/B testing giữa phiên bản cũ và mới của ứng dụng?",
        options: [
          { id: "a", text: "Simple Routing", isCorrect: false },
          { id: "b", text: "Weighted Routing", isCorrect: true },
          { id: "c", text: "Latency-based Routing", isCorrect: false },
          { id: "d", text: "Failover Routing", isCorrect: false },
        ],
        explanation:
          "Weighted Routing cho phép phân bổ traffic theo tỷ lệ tùy chỉnh (ví dụ 90/10 hoặc 70/30) giữa các resources. Rất phù hợp cho canary deploy, blue/green deployment và A/B testing.",
      },
      {
        id: "q7-5",
        question: "Điều gì xảy ra nếu xóa CNAME validation record sau khi ACM certificate đã issued?",
        options: [
          { id: "a", text: "Không có gì thay đổi, certificate vẫn hoạt động bình thường", isCorrect: false },
          {
            id: "b",
            text: "Certificate sẽ không được tự động gia hạn và sẽ expire",
            isCorrect: true,
          },
          { id: "c", text: "Certificate bị thu hồi ngay lập tức", isCorrect: false },
          { id: "d", text: "Certificate chuyển sang Email Validation tự động", isCorrect: false },
        ],
        explanation:
          "ACM cần CNAME record để xác minh domain ownership khi gia hạn tự động. Nếu record bị xóa, ACM không thể gia hạn và certificate sẽ expire sau kỳ hạn hiện tại (thường 13 tháng).",
      },
      {
        id: "q7-6",
        question: "ALIAS record trong Route 53 khác CNAME ở điểm nào quan trọng nhất từ góc độ chi phí?",
        options: [
          { id: "a", text: "ALIAS record tính phí theo số lần query, CNAME miễn phí", isCorrect: false },
          {
            id: "b",
            text: "ALIAS record queries tới AWS resources (ALB, CloudFront) không tính phí, CNAME tính phí bình thường",
            isCorrect: true,
          },
          { id: "c", text: "ALIAS và CNAME có giá như nhau", isCorrect: false },
          { id: "d", text: "CNAME miễn phí còn ALIAS tính phí cao hơn", isCorrect: false },
        ],
        explanation:
          "Route 53 không tính phí cho DNS queries tới ALIAS records trỏ về AWS resources như ALB, CloudFront, Elastic Beanstalk endpoints. CNAME queries tính phí bình thường. Đây là thêm một lý do để dùng ALIAS thay vì CNAME khi có thể.",
      },
    ],
    architecture: {
      title: "Route 53 và SSL/TLS Architecture",
      description:
        "User gửi request tới domain, Route 53 phân giải DNS về ALB, ACM cấp certificate cho HTTPS, traffic được mã hóa end-to-end",
      nodes: [
        { id: "user", label: "User", sublabel: "Browser", type: "user" },
        { id: "route53", label: "Route 53", sublabel: "DNS Resolution", type: "service" },
        { id: "acm", label: "ACM", sublabel: "SSL/TLS Certificate", type: "service" },
        { id: "alb", label: "ALB", sublabel: "HTTPS :443 / HTTP Redirect", type: "service" },
        { id: "cf", label: "CloudFront", sublabel: "CDN (optional)", type: "service" },
        { id: "ec2", label: "EC2 Instances", sublabel: "HTTP :80 (private)", type: "service" },
      ],
      connections: [
        { from: "user", to: "route53", label: "DNS query" },
        { from: "route53", to: "alb", label: "ALIAS → ALB DNS" },
        { from: "acm", to: "alb", label: "certificate" },
        { from: "user", to: "alb", label: "HTTPS :443" },
        { from: "alb", to: "ec2", label: "HTTP :80" },
        { from: "route53", to: "cf", label: "ALIAS (optional)" },
        { from: "acm", to: "cf", label: "certificate (us-east-1)" },
      ],
    },
  },
];
