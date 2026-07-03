import type { Stage } from "@/types/guide";

export const stagesS4S5: Stage[] = [
  {
    id: 4,
    slug: "4-vpc",
    title: "VPC - Mạng Riêng Ảo",
    subtitle:
      "Xây dựng kiến trúc mạng an toàn với subnets, routing, và NAT Gateway",
    difficulty: "intermediate",
    estimatedTime: "1.5 tuần",
    services: ["VPC", "EC2"],
    objectives: [
      "Tạo VPC với CIDR block phù hợp cho môi trường production",
      "Thiết lập Public Subnet và Private Subnet trong nhiều Availability Zones",
      "Cấu hình Route Tables và Internet Gateway cho public traffic",
      "Triển khai NAT Gateway để private subnet có thể kết nối ra internet",
      "Cài đặt Network ACLs để kiểm soát traffic ở cấp độ subnet và bật VPC Flow Logs để giám sát",
    ],
    concepts: [
      {
        title: "VPC & CIDR",
        description:
          "Virtual Private Cloud (VPC) là mạng ảo riêng biệt trong AWS, hoàn toàn tách biệt với các khách hàng khác. CIDR (Classless Inter-Domain Routing) xác định dải địa chỉ IP cho VPC, ví dụ 10.0.0.0/16 cho phép 65.536 địa chỉ IP. Việc lập kế hoạch CIDR ngay từ đầu rất quan trọng vì không thể thay đổi sau khi tạo VPC.",
      },
      {
        title: "Public vs Private Subnet",
        description:
          "Public Subnet là subnet có route đến Internet Gateway, phù hợp cho load balancer, bastion host. Private Subnet không có route trực tiếp ra internet, dùng cho database, application server. Mỗi subnet nằm trong một Availability Zone cụ thể, việc phân chia đa AZ giúp tăng khả năng chịu lỗi.",
      },
      {
        title: "Internet Gateway (IGW)",
        description:
          "Internet Gateway là thành phần cho phép giao tiếp giữa VPC và internet. IGW là highly available và horizontal scalable, không cần quản lý bandwidth. Để subnet trở thành public subnet, cần gắn IGW vào VPC và thêm route 0.0.0.0/0 → IGW vào route table của subnet đó.",
      },
      {
        title: "NAT Gateway",
        description:
          "NAT Gateway cho phép các instance trong private subnet kết nối ra internet để download packages, update software, nhưng ngăn kết nối từ internet vào. NAT Gateway được đặt trong public subnet và cần Elastic IP. Chi phí tính theo giờ + data transfer, nên cần cân nhắc khi thiết kế.",
      },
      {
        title: "Route Table",
        description:
          "Route Table chứa các quy tắc (routes) xác định traffic sẽ đi đến đâu. Mỗi subnet phải được liên kết với một route table. Route table cho public subnet có route 0.0.0.0/0 → IGW; route table cho private subnet có route 0.0.0.0/0 → NAT Gateway. Local route (10.0.0.0/16 → local) luôn tồn tại và không thể xóa.",
      },
      {
        title: "NACL vs Security Group",
        description:
          "Network ACL (NACL) hoạt động ở cấp độ subnet, là stateless (phải khai báo cả inbound và outbound), xử lý rules theo thứ tự số. Security Group hoạt động ở cấp độ instance, là stateful (chỉ cần khai báo inbound, outbound tự động cho phép). NACL là lớp bảo vệ thứ hai ngoài Security Group.",
      },
      {
        title: "VPC Flow Logs",
        description:
          "VPC Flow Logs ghi lại thông tin về IP traffic vào/ra các network interfaces trong VPC. Dữ liệu có thể gửi đến CloudWatch Logs hoặc S3. Hữu ích để debug connectivity issues, giám sát security, và phân tích traffic patterns. Flow Logs không capture DNS query traffic và không ảnh hưởng đến network throughput.",
      },
    ],
    consoleSteps: [
      {
        title: "Tạo VPC bằng VPC Wizard",
        description:
          "Vào AWS Console → VPC → Your VPCs → Create VPC. Chọn 'VPC and more' để dùng wizard. Đặt tên, nhập CIDR block (ví dụ 10.0.0.0/16), chọn số AZ (khuyến nghị 2), số public subnets và private subnets. Wizard sẽ tự động tạo subnets, route tables, và IGW. Bật NAT Gateway nếu cần (lưu ý phát sinh chi phí).",
        imagePath: "/images/stage-4/step-1.png",
        alt: "Giao diện VPC Wizard trên AWS Console với các tùy chọn cấu hình",
      },
      {
        title: "Tạo Subnets thủ công",
        description:
          "Vào VPC → Subnets → Create subnet. Chọn VPC vừa tạo, đặt tên theo convention (ví dụ: public-subnet-1a, private-subnet-1a), chọn Availability Zone, nhập CIDR block cho subnet (ví dụ 10.0.1.0/24 cho public, 10.0.10.0/24 cho private). Lặp lại cho các AZ khác. Bật 'Auto-assign public IPv4 address' cho public subnets.",
        imagePath: "/images/stage-4/step-2.png",
        alt: "Form tạo subnet với các trường VPC, AZ, và CIDR block",
      },
      {
        title: "Cấu hình Route Tables",
        description:
          "Vào VPC → Route Tables. Tạo route table riêng cho public subnets (public-rt) và private subnets (private-rt). Với public-rt: thêm route 0.0.0.0/0 → Internet Gateway. Với private-rt: thêm route 0.0.0.0/0 → NAT Gateway. Sau đó vào tab Subnet associations để liên kết từng route table với các subnets tương ứng.",
        imagePath: "/images/stage-4/step-3.png",
        alt: "Cấu hình routes trong Route Table với destination và target",
      },
      {
        title: "Tạo NAT Gateway",
        description:
          "Vào VPC → NAT Gateways → Create NAT Gateway. Chọn public subnet để đặt NAT Gateway. Allocate Elastic IP (hoặc chọn EIP có sẵn). Đặt tên mô tả. Sau khi tạo, cập nhật route table của private subnet để route 0.0.0.0/0 trỏ đến NAT Gateway này. Nếu dùng nhiều AZ, nên tạo NAT Gateway riêng cho mỗi AZ.",
        imagePath: "/images/stage-4/step-4.png",
        alt: "Form tạo NAT Gateway chọn subnet và Elastic IP",
      },
      {
        title: "Kiểm tra Network Connectivity",
        description:
          "Launch một EC2 instance trong public subnet và một instance trong private subnet. Từ máy local, SSH vào public instance. Từ public instance (dùng làm bastion), SSH vào private instance. Từ private instance, thử ping 8.8.8.8 hoặc curl https://example.com để xác nhận NAT Gateway hoạt động. Kiểm tra VPC Flow Logs trong CloudWatch để thấy traffic.",
        imagePath: "/images/stage-4/step-5.png",
        alt: "Terminal SSH vào bastion host và từ đó kết nối vào private instance",
      },
    ],
    labs: [
      {
        id: "lab-4-1",
        slug: "lab-4-vpc-1",
        title: "Tạo VPC với Public và Private Subnets",
        stageId: 4,
        stageSlug: "4-vpc",
        objective:
          "Xây dựng VPC architecture chuẩn với đủ subnets và gateways",
        estimatedTime: "75 phút",
        steps: [
          "Tạo VPC với CIDR 10.0.0.0/16 tại region ap-southeast-1 (Singapore)",
          "Tạo 2 public subnets: 10.0.1.0/24 (AZ-1a) và 10.0.2.0/24 (AZ-1b), bật auto-assign public IP",
          "Tạo 2 private subnets: 10.0.10.0/24 (AZ-1a) và 10.0.11.0/24 (AZ-1b)",
          "Tạo Internet Gateway và attach vào VPC",
          "Tạo public Route Table, thêm route 0.0.0.0/0 → IGW, liên kết với 2 public subnets",
          "Tạo Elastic IP, sau đó tạo NAT Gateway trong public-subnet-1a",
          "Tạo private Route Table, thêm route 0.0.0.0/0 → NAT Gateway, liên kết với 2 private subnets",
          "Bật VPC Flow Logs gửi đến CloudWatch Logs group /vpc/flow-logs",
        ],
        expectedResult:
          "VPC với đầy đủ 4 subnets (2 public, 2 private), IGW, NAT Gateway, và 2 route tables riêng biệt. Flow Logs xuất hiện trong CloudWatch sau vài phút.",
        troubleshooting: [
          "Nếu không thể attach IGW: kiểm tra xem VPC đã có IGW khác chưa (mỗi VPC chỉ được 1 IGW)",
          "Nếu NAT Gateway stuck ở trạng thái 'pending': đảm bảo đã allocate Elastic IP trước",
          "Nếu route table không hiển thị: refresh trang, đôi khi console cần vài giây để update",
          "Nếu Flow Logs không xuất hiện: kiểm tra IAM role có permission cloudwatch:PutLogEvents",
        ],
      },
      {
        id: "lab-4-2",
        slug: "lab-4-vpc-2",
        title: "Kiểm tra Network Connectivity",
        stageId: 4,
        stageSlug: "4-vpc",
        objective:
          "Verify traffic flow qua NAT Gateway từ private subnet",
        estimatedTime: "45 phút",
        steps: [
          "Launch EC2 t3.micro trong public subnet (bastion host), dùng Amazon Linux 2023, tạo key pair mới",
          "Launch EC2 t3.micro trong private subnet (app server), dùng cùng key pair",
          "Cấu hình Security Group cho bastion: inbound SSH (22) từ IP của bạn",
          "Cấu hình Security Group cho app server: inbound SSH (22) chỉ từ Security Group của bastion",
          "SSH vào bastion host từ máy local: ssh -i keypair.pem ec2-user@<bastion-public-ip>",
          "Từ bastion, SSH agent forwarding vào private instance: ssh -A ec2-user@<private-ip>, sau đó chạy curl -I https://aws.amazon.com để test outbound qua NAT",
        ],
        expectedResult:
          "Kết nối SSH hai tầng thành công. Lệnh curl từ private instance trả về HTTP 200, xác nhận NAT Gateway đang route traffic ra internet đúng cách.",
        troubleshooting: [
          "Nếu SSH timeout vào bastion: kiểm tra Security Group inbound rule và đảm bảo subnet có public IP",
          "Nếu không SSH được vào private instance từ bastion: kiểm tra Security Group của private instance cho phép SSH từ Security Group của bastion",
          "Nếu curl thất bại từ private instance: kiểm tra route table của private subnet có route 0.0.0.0/0 → NAT Gateway",
          "Nếu NAT Gateway không reachable: đảm bảo NAT Gateway nằm trong public subnet và public subnet có route đến IGW",
        ],
      },
    ],
    codeSnippets: [
      {
        title: "Tạo VPC và Subnets bằng AWS CLI",
        language: "bash",
        code: `# Tạo VPC
VPC_ID=$(aws ec2 create-vpc \\
  --cidr-block 10.0.0.0/16 \\
  --tag-specifications 'ResourceType=vpc,Tags=[{Key=Name,Value=my-vpc}]' \\
  --query 'Vpc.VpcId' --output text)
echo "VPC ID: $VPC_ID"

# Tạo public subnet
PUBLIC_SUBNET_ID=$(aws ec2 create-subnet \\
  --vpc-id $VPC_ID \\
  --cidr-block 10.0.1.0/24 \\
  --availability-zone ap-southeast-1a \\
  --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=public-subnet-1a}]' \\
  --query 'Subnet.SubnetId' --output text)

# Bật auto-assign public IP cho public subnet
aws ec2 modify-subnet-attribute \\
  --subnet-id $PUBLIC_SUBNET_ID \\
  --map-public-ip-on-launch

# Tạo private subnet
PRIVATE_SUBNET_ID=$(aws ec2 create-subnet \\
  --vpc-id $VPC_ID \\
  --cidr-block 10.0.10.0/24 \\
  --availability-zone ap-southeast-1a \\
  --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=private-subnet-1a}]' \\
  --query 'Subnet.SubnetId' --output text)

# Tạo và attach Internet Gateway
IGW_ID=$(aws ec2 create-internet-gateway \\
  --tag-specifications 'ResourceType=internet-gateway,Tags=[{Key=Name,Value=my-igw}]' \\
  --query 'InternetGateway.InternetGatewayId' --output text)
aws ec2 attach-internet-gateway --vpc-id $VPC_ID --internet-gateway-id $IGW_ID

# Tạo public route table
PUBLIC_RT_ID=$(aws ec2 create-route-table \\
  --vpc-id $VPC_ID \\
  --tag-specifications 'ResourceType=route-table,Tags=[{Key=Name,Value=public-rt}]' \\
  --query 'RouteTable.RouteTableId' --output text)
aws ec2 create-route --route-table-id $PUBLIC_RT_ID \\
  --destination-cidr-block 0.0.0.0/0 --gateway-id $IGW_ID
aws ec2 associate-route-table --route-table-id $PUBLIC_RT_ID --subnet-id $PUBLIC_SUBNET_ID

# Tạo Elastic IP và NAT Gateway
EIP_ALLOC=$(aws ec2 allocate-address --domain vpc --query 'AllocationId' --output text)
NAT_GW_ID=$(aws ec2 create-nat-gateway \\
  --subnet-id $PUBLIC_SUBNET_ID \\
  --allocation-id $EIP_ALLOC \\
  --tag-specifications 'ResourceType=natgateway,Tags=[{Key=Name,Value=my-nat-gw}]' \\
  --query 'NatGateway.NatGatewayId' --output text)

# Chờ NAT Gateway available
aws ec2 wait nat-gateway-available --nat-gateway-ids $NAT_GW_ID
echo "NAT Gateway sẵn sàng: $NAT_GW_ID"

# Tạo private route table
PRIVATE_RT_ID=$(aws ec2 create-route-table \\
  --vpc-id $VPC_ID \\
  --tag-specifications 'ResourceType=route-table,Tags=[{Key=Name,Value=private-rt}]' \\
  --query 'RouteTable.RouteTableId' --output text)
aws ec2 create-route --route-table-id $PRIVATE_RT_ID \\
  --destination-cidr-block 0.0.0.0/0 --nat-gateway-id $NAT_GW_ID
aws ec2 associate-route-table --route-table-id $PRIVATE_RT_ID --subnet-id $PRIVATE_SUBNET_ID`,
      },
      {
        title: "Cấu hình VPC Flow Logs (JSON Policy)",
        language: "json",
        code: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "vpc-flow-logs.amazonaws.com"
      },
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents",
        "logs:DescribeLogGroups",
        "logs:DescribeLogStreams"
      ],
      "Resource": "*"
    }
  ]
}`,
      },
      {
        title: "Kiểm tra Connectivity từ Private Subnet",
        language: "bash",
        code: `# Chạy trên private EC2 instance để kiểm tra NAT Gateway
# Test DNS resolution
nslookup aws.amazon.com

# Test outbound HTTPS
curl -I https://aws.amazon.com --connect-timeout 10

# Kiểm tra IP public được dùng (sẽ là Elastic IP của NAT Gateway)
curl https://checkip.amazonaws.com

# Test download package (xác nhận yum/dnf có thể update)
sudo dnf check-update --assumeno 2>&1 | head -20

# Từ máy local: query Flow Logs trong CloudWatch
aws logs filter-log-events \\
  --log-group-name /vpc/flow-logs \\
  --start-time $(date -d '5 minutes ago' +%s000) \\
  --filter-pattern "ACCEPT" \\
  --query 'events[*].message' \\
  --output text | head -20`,
      },
    ],
    bestPractices: [
      "Luôn thiết kế VPC với ít nhất 2 Availability Zones để đảm bảo high availability cho production workloads",
      "Đặt database và application servers trong private subnet, chỉ đặt load balancer và bastion host trong public subnet",
      "Không dùng /16 CIDR quá rộng nếu không cần thiết — /20 hoặc /21 thường đủ cho hầu hết ứng dụng vừa và nhỏ",
      "Đặt NAT Gateway trong từng AZ thay vì dùng chung một NAT Gateway để tránh single point of failure và giảm cross-AZ data transfer cost",
      "Đừng hardcode IP addresses — dùng Security Group references và DNS names thay vì IP tĩnh để dễ quản lý",
      "Bật VPC Flow Logs từ đầu và gửi về S3 (rẻ hơn CloudWatch) cho long-term retention, chỉ gửi về CloudWatch khi cần real-time analysis",
      "Không mở Security Group với 0.0.0.0/0 cho SSH/RDP — dùng AWS Systems Manager Session Manager thay thế để không cần mở port 22",
    ],
    commonMistakes: [
      {
        mistake: "Tạo tất cả resources vào default VPC và default subnet",
        fix: "Luôn tạo VPC riêng cho mỗi môi trường (dev/staging/prod). Default VPC chỉ dùng để test nhanh, không nên dùng cho production.",
      },
      {
        mistake: "Quên liên kết Route Table với Subnet sau khi tạo",
        fix: "Sau khi tạo route table và thêm routes, phải vào tab 'Subnet associations' để liên kết với các subnets phù hợp. Subnet chưa liên kết sẽ dùng main route table của VPC.",
      },
      {
        mistake: "Đặt NAT Gateway trong private subnet thay vì public subnet",
        fix: "NAT Gateway phải đặt trong public subnet (subnet có route đến IGW) để có thể kết nối ra internet. Private subnet thì NAT Gateway không hoạt động được.",
      },
      {
        mistake:
          "Không xóa NAT Gateway và Elastic IP khi không dùng nữa, dẫn đến chi phí phát sinh",
        fix: "NAT Gateway tính phí ~$32/tháng/gateway + data transfer. Sau khi lab xong, xóa NAT Gateway và release Elastic IP để tránh tốn phí không cần thiết.",
      },
      {
        mistake:
          "NACL rules stateless bị misconfigure — chỉ add inbound mà quên outbound",
        fix: "NACL là stateless, phải khai báo cả inbound và outbound rules. Thường add rule allow ephemeral ports (1024-65535) cho outbound response traffic.",
      },
    ],
    checklist: [
      {
        id: "vpc-1",
        label: "Tạo VPC với CIDR block phù hợp",
        description: "VPC có tên rõ ràng, CIDR không overlap với network khác",
      },
      {
        id: "vpc-2",
        label: "Tạo public subnets trong ít nhất 2 AZ",
        description: "Auto-assign public IPv4 đã được bật cho public subnets",
      },
      {
        id: "vpc-3",
        label: "Tạo private subnets trong ít nhất 2 AZ",
        description: "Private subnets không có auto-assign public IP",
      },
      {
        id: "vpc-4",
        label: "Internet Gateway đã được tạo và attach vào VPC",
        description: "IGW ở trạng thái 'attached'",
      },
      {
        id: "vpc-5",
        label: "Public Route Table có route 0.0.0.0/0 → IGW",
        description: "Route table đã được liên kết với tất cả public subnets",
      },
      {
        id: "vpc-6",
        label: "NAT Gateway đã được tạo trong public subnet với Elastic IP",
        description: "NAT Gateway ở trạng thái 'available'",
      },
      {
        id: "vpc-7",
        label: "Private Route Table có route 0.0.0.0/0 → NAT Gateway",
        description: "Route table đã được liên kết với tất cả private subnets",
      },
      {
        id: "vpc-8",
        label: "VPC Flow Logs đã được bật",
        description: "Flow Logs gửi đến CloudWatch hoặc S3 bucket",
      },
      {
        id: "vpc-9",
        label: "Kiểm tra connectivity thành công: private instance curl ra internet",
        description: "Confirm NAT Gateway đang hoạt động đúng",
      },
    ],
    quiz: [
      {
        id: "vpc-q1",
        question:
          "Điều kiện nào cần thỏa mãn để một subnet trở thành 'public subnet'?",
        options: [
          {
            id: "vpc-q1-a",
            text: "Subnet phải nằm trong AZ đầu tiên của region",
            isCorrect: false,
          },
          {
            id: "vpc-q1-b",
            text: "Route table của subnet có route 0.0.0.0/0 trỏ đến Internet Gateway",
            isCorrect: true,
          },
          {
            id: "vpc-q1-c",
            text: "Subnet phải có CIDR bắt đầu bằng 10.0.0.x",
            isCorrect: false,
          },
          {
            id: "vpc-q1-d",
            text: "Subnet phải bật IPv6",
            isCorrect: false,
          },
        ],
        explanation:
          "Một subnet được gọi là 'public' khi route table liên kết với nó có route đến Internet Gateway (0.0.0.0/0 → igw-xxx). Ngoài ra, instances trong subnet cần có public IP (manual assign hoặc auto-assign). Vị trí AZ hay CIDR range không quyết định subnet là public hay private.",
      },
      {
        id: "vpc-q2",
        question: "NAT Gateway phải được đặt ở đâu trong VPC?",
        options: [
          {
            id: "vpc-q2-a",
            text: "Trong private subnet để bảo mật hơn",
            isCorrect: false,
          },
          {
            id: "vpc-q2-b",
            text: "Trong public subnet vì cần kết nối được ra internet qua IGW",
            isCorrect: true,
          },
          {
            id: "vpc-q2-c",
            text: "NAT Gateway không thuộc subnet nào, nó là VPC-level resource",
            isCorrect: false,
          },
          {
            id: "vpc-q2-d",
            text: "Trong isolated subnet riêng biệt",
            isCorrect: false,
          },
        ],
        explanation:
          "NAT Gateway phải đặt trong public subnet vì nó cần route đến Internet Gateway để forward traffic từ private instances ra internet. Nếu đặt trong private subnet, NAT Gateway sẽ không có đường ra internet và không hoạt động được.",
      },
      {
        id: "vpc-q3",
        question: "Điểm khác biệt quan trọng nhất giữa Security Group và Network ACL là gì?",
        options: [
          {
            id: "vpc-q3-a",
            text: "Security Group hoạt động ở cấp subnet, NACL hoạt động ở cấp instance",
            isCorrect: false,
          },
          {
            id: "vpc-q3-b",
            text: "Security Group là stateful (chỉ cần define inbound), NACL là stateless (phải define cả inbound và outbound)",
            isCorrect: true,
          },
          {
            id: "vpc-q3-c",
            text: "NACL chỉ support IPv4, Security Group support cả IPv4 và IPv6",
            isCorrect: false,
          },
          {
            id: "vpc-q3-d",
            text: "Security Group chỉ có thể có tối đa 10 rules, NACL không giới hạn",
            isCorrect: false,
          },
        ],
        explanation:
          "Security Group là stateful: khi cho phép inbound traffic, response traffic tự động được allow outbound. NACL là stateless: phải tạo rule cho cả chiều vào và chiều ra. Security Group hoạt động ở cấp instance/ENI, NACL hoạt động ở cấp subnet.",
      },
      {
        id: "vpc-q4",
        question: "Bạn có thể attach bao nhiêu Internet Gateway vào một VPC?",
        options: [
          {
            id: "vpc-q4-a",
            text: "Không giới hạn, tùy số lượng AZ",
            isCorrect: false,
          },
          {
            id: "vpc-q4-b",
            text: "Tối đa 5 IGW per VPC",
            isCorrect: false,
          },
          {
            id: "vpc-q4-c",
            text: "Chỉ 1 Internet Gateway per VPC",
            isCorrect: true,
          },
          {
            id: "vpc-q4-d",
            text: "Tối đa 2 IGW: một cho IPv4 và một cho IPv6",
            isCorrect: false,
          },
        ],
        explanation:
          "Mỗi VPC chỉ được attach tối đa 1 Internet Gateway. IGW là highly available và scalable theo design, không cần nhiều IGW. Nếu cần nhiều internet connections, có thể dùng transit gateway hoặc các kiến trúc phức tạp hơn.",
      },
      {
        id: "vpc-q5",
        question: "VPC Flow Logs KHÔNG capture loại traffic nào?",
        options: [
          {
            id: "vpc-q5-a",
            text: "Traffic bị Security Group từ chối",
            isCorrect: false,
          },
          {
            id: "vpc-q5-b",
            text: "Traffic DNS queries đến Route 53 Resolver",
            isCorrect: true,
          },
          {
            id: "vpc-q5-c",
            text: "Traffic qua NAT Gateway",
            isCorrect: false,
          },
          {
            id: "vpc-q5-d",
            text: "Traffic ICMP (ping)",
            isCorrect: false,
          },
        ],
        explanation:
          "VPC Flow Logs không capture traffic DNS queries đến Route 53 Resolver (169.254.169.253), traffic đến instance metadata service (169.254.169.254), traffic DHCP, và traffic Windows license activation. Flow Logs capture tất cả các loại traffic IP khác bao gồm cả những traffic bị NACL/Security Group từ chối.",
      },
      {
        id: "vpc-q6",
        question:
          "Trong một VPC /16, bạn có thể tạo subnet với CIDR /16 không?",
        options: [
          {
            id: "vpc-q6-a",
            text: "Có, subnet có thể có cùng CIDR với VPC",
            isCorrect: false,
          },
          {
            id: "vpc-q6-b",
            text: "Không, subnet CIDR phải nhỏ hơn VPC CIDR (prefix lớn hơn)",
            isCorrect: true,
          },
          {
            id: "vpc-q6-c",
            text: "Có, nhưng chỉ khi VPC chỉ có 1 subnet duy nhất",
            isCorrect: false,
          },
          {
            id: "vpc-q6-d",
            text: "Không, subnet nhỏ nhất phải là /28 và lớn nhất là /20",
            isCorrect: false,
          },
        ],
        explanation:
          "Subnet CIDR phải là subset của VPC CIDR — prefix size của subnet phải lớn hơn VPC (tức là subnet nhỏ hơn VPC). Với VPC /16, subnet có thể từ /17 đến /28. AWS cũng reserve 5 IP đầu tiên trong mỗi subnet cho internal use.",
      },
      {
        id: "vpc-q7",
        question:
          "Tại sao nên tạo NAT Gateway riêng cho từng Availability Zone thay vì dùng chung một?",
        options: [
          {
            id: "vpc-q7-a",
            text: "AWS yêu cầu mỗi AZ phải có NAT Gateway riêng theo policy",
            isCorrect: false,
          },
          {
            id: "vpc-q7-b",
            text: "Tránh single point of failure và giảm chi phí cross-AZ data transfer",
            isCorrect: true,
          },
          {
            id: "vpc-q7-c",
            text: "NAT Gateway chỉ route traffic trong cùng AZ",
            isCorrect: false,
          },
          {
            id: "vpc-q7-d",
            text: "Một NAT Gateway không đủ bandwidth cho nhiều AZ",
            isCorrect: false,
          },
        ],
        explanation:
          "Nếu chỉ có 1 NAT Gateway trong AZ-1a và AZ-1a bị lỗi, các private instances ở AZ-1b cũng mất kết nối internet — đây là single point of failure. Ngoài ra, traffic từ AZ-1b qua NAT Gateway ở AZ-1a phát sinh cross-AZ data transfer cost ($0.01/GB). Tạo NAT Gateway riêng mỗi AZ giải quyết cả hai vấn đề.",
      },
    ],
    architecture: {
      title: "VPC Network Architecture",
      description:
        "Kiến trúc VPC chuẩn với public/private subnets phân tách qua 2 Availability Zones, Internet Gateway cho inbound traffic, và NAT Gateway cho outbound từ private subnet",
      nodes: [
        { id: "internet", label: "Internet", type: "internet" },
        { id: "igw", label: "Internet Gateway", sublabel: "IGW", type: "service" },
        { id: "nat-1a", label: "NAT Gateway", sublabel: "AZ-1a", type: "service" },
        { id: "nat-1b", label: "NAT Gateway", sublabel: "AZ-1b", type: "service" },
        { id: "pub-1a", label: "Public Subnet", sublabel: "10.0.1.0/24 · AZ-1a", type: "group" },
        { id: "pub-1b", label: "Public Subnet", sublabel: "10.0.2.0/24 · AZ-1b", type: "group" },
        { id: "priv-1a", label: "Private Subnet", sublabel: "10.0.10.0/24 · AZ-1a", type: "group" },
        { id: "priv-1b", label: "Private Subnet", sublabel: "10.0.11.0/24 · AZ-1b", type: "group" },
        { id: "ec2-bastion", label: "EC2", sublabel: "Bastion Host", type: "service" },
        { id: "ec2-app-1a", label: "EC2", sublabel: "App Server", type: "service" },
        { id: "ec2-app-1b", label: "EC2", sublabel: "App Server", type: "service" },
        { id: "public-rt", label: "Public Route Table", sublabel: "0.0.0.0/0 → IGW", type: "service" },
        { id: "private-rt", label: "Private Route Table", sublabel: "0.0.0.0/0 → NAT", type: "service" },
      ],
      connections: [
        { from: "internet", to: "igw" },
        { from: "igw", to: "pub-1a", label: "public traffic" },
        { from: "igw", to: "pub-1b" },
        { from: "pub-1a", to: "ec2-bastion" },
        { from: "pub-1a", to: "nat-1a" },
        { from: "pub-1b", to: "nat-1b" },
        { from: "priv-1a", to: "ec2-app-1a" },
        { from: "priv-1b", to: "ec2-app-1b" },
        { from: "ec2-app-1a", to: "nat-1a", label: "outbound" },
        { from: "ec2-app-1b", to: "nat-1b", label: "outbound" },
        { from: "public-rt", to: "pub-1a" },
        { from: "public-rt", to: "pub-1b" },
        { from: "private-rt", to: "priv-1a" },
        { from: "private-rt", to: "priv-1b" },
      ],
    },
  },
  {
    id: 5,
    slug: "5-database",
    title: "Database - RDS và DynamoDB",
    subtitle:
      "Quản lý cơ sở dữ liệu quan hệ và NoSQL được quản lý hoàn toàn trên AWS",
    difficulty: "intermediate",
    estimatedTime: "1.5 tuần",
    services: ["RDS", "DynamoDB", "ElastiCache"],
    objectives: [
      "Tạo RDS PostgreSQL instance trong private subnet với đầy đủ cấu hình bảo mật",
      "Cấu hình Multi-AZ deployment cho RDS để đảm bảo high availability",
      "Thiết lập Read Replica để scale read workloads",
      "Tạo DynamoDB table với partition key, sort key, và Global Secondary Index",
      "Hiểu cơ bản về ElastiCache Redis cho caching layer",
    ],
    concepts: [
      {
        title: "RDS & Managed Database",
        description:
          "Amazon RDS (Relational Database Service) là dịch vụ database được quản lý hoàn toàn — AWS xử lý việc provisioning hardware, cài đặt database software, patching, backup tự động, và monitoring. Hỗ trợ MySQL, PostgreSQL, MariaDB, Oracle, SQL Server, và Aurora. Bạn chỉ cần quản lý schema, queries, và performance tuning.",
      },
      {
        title: "Multi-AZ Deployment",
        description:
          "Multi-AZ tạo một standby replica đồng bộ trong AZ khác. Khi primary instance gặp sự cố (hardware failure, AZ outage), RDS tự động failover sang standby trong 1-2 phút — không cần thay đổi connection string. Standby replica không phục vụ read traffic trong trạng thái bình thường. Multi-AZ dành cho HA, không phải scaling.",
      },
      {
        title: "Read Replica",
        description:
          "Read Replica là bản sao asynchronous của primary database, được dùng để phân tải read queries. Có thể tạo tối đa 5 Read Replicas cho MySQL/PostgreSQL, có thể đặt trong region khác (cross-region replica). Ứng dụng phải kết nối đến endpoint riêng của replica cho read queries. Read Replica cũng có thể được promote thành standalone database.",
      },
      {
        title: "RDS Parameter Group",
        description:
          "Parameter Group là tập hợp các cấu hình engine-level cho database instance (tương tự my.cnf/postgresql.conf). Có thể điều chỉnh memory buffer sizes, connection limits, logging, timezone. Có hai loại: static parameters (cần reboot để apply) và dynamic parameters (apply ngay). Nên tạo custom parameter group thay vì dùng default để có thể tùy chỉnh.",
      },
      {
        title: "Amazon DynamoDB",
        description:
          "DynamoDB là fully managed NoSQL database với single-digit millisecond latency ở bất kỳ scale nào. Data được tổ chức thành tables, items (rows), và attributes (columns). Mỗi item được identify bằng primary key (partition key, hoặc partition key + sort key). DynamoDB auto-scaling capacity và tự replication qua 3 AZ. Phù hợp cho workloads cần scale cao và schema linh hoạt.",
      },
      {
        title: "DynamoDB Indexes (GSI/LSI)",
        description:
          "Global Secondary Index (GSI) cho phép query DynamoDB bằng attribute không phải primary key. GSI có partition key và sort key riêng, được replicated asynchronously và có read/write capacity riêng. Local Secondary Index (LSI) dùng cùng partition key nhưng sort key khác — phải tạo cùng lúc với table và không thể xóa sau. GSI linh hoạt hơn nhưng có thể lag so với primary table.",
      },
      {
        title: "ElastiCache",
        description:
          "Amazon ElastiCache là managed in-memory caching service, hỗ trợ Redis và Memcached. Được dùng để cache database query results, session data, và computed values — giảm latency từ milliseconds xuống microseconds cho hot data. ElastiCache Redis hỗ trợ persistence, replication, clustering, và data structures phong phú (lists, sets, sorted sets). Thường được đặt giữa application và database trong architecture.",
      },
    ],
    consoleSteps: [
      {
        title: "Tạo RDS PostgreSQL Instance",
        description:
          "Vào AWS Console → RDS → Create database. Chọn 'Standard create', engine PostgreSQL, version mới nhất. Chọn template 'Free tier' (cho lab) hoặc 'Production'. Đặt tên DB instance, master username và password. Chọn instance class (db.t3.micro cho dev). Trong Connectivity: chọn VPC, chọn DB Subnet Group (tạo trước nếu chưa có), không cấp public access, chọn Security Group. Bật automated backups.",
        imagePath: "/images/stage-5/step-1.png",
        alt: "Form tạo RDS với các lựa chọn engine, instance class, và connectivity settings",
      },
      {
        title: "Cấu hình Multi-AZ và Read Replica",
        description:
          "Trong quá trình tạo RDS, bật 'Multi-AZ DB instance' để có standby replica. Sau khi RDS đã chạy, tạo Read Replica: chọn RDS instance → Actions → Create read replica. Chọn instance class (có thể nhỏ hơn primary), AZ, và region. Read Replica endpoint sẽ khác với primary endpoint — ứng dụng cần cập nhật config để dùng đúng endpoint cho read queries.",
        imagePath: "/images/stage-5/step-2.png",
        alt: "Cấu hình Multi-AZ và form tạo Read Replica trong RDS console",
      },
      {
        title: "Tạo DynamoDB Table",
        description:
          "Vào DynamoDB → Create table. Nhập table name, partition key (ví dụ: userId, type String), và optional sort key (ví dụ: createdAt, type String). Chọn capacity mode: 'On-demand' (auto-scale, pay per request) hoặc 'Provisioned' (đặt trước RCU/WCU). Bật encryption at rest và Point-in-time Recovery. Tags và sau đó Create table.",
        imagePath: "/images/stage-5/step-3.png",
        alt: "Form tạo DynamoDB table với partition key, sort key, và capacity settings",
      },
      {
        title: "Tạo Global Secondary Index",
        description:
          "Sau khi table được tạo, vào tab Indexes → Create index. Nhập Index name, chọn Partition key từ attributes có trong table (ví dụ: email), chọn Sort key (optional), đặt Projected attributes (ALL, KEYS_ONLY, hoặc INCLUDE với list cụ thể). Với Provisioned mode, đặt RCU/WCU cho index. Sau khi tạo, có thể query trực tiếp trong tab Explore items.",
        imagePath: "/images/stage-5/step-4.png",
        alt: "Form tạo Global Secondary Index với partition key, projected attributes, và capacity",
      },
    ],
    labs: [
      {
        id: "lab-5-1",
        slug: "lab-5-database-1",
        title: "Triển khai RDS PostgreSQL",
        stageId: 5,
        stageSlug: "5-database",
        objective:
          "Tạo RDS instance Multi-AZ trong private subnet và kết nối từ EC2",
        estimatedTime: "75 phút",
        steps: [
          "Tạo DB Subnet Group: vào RDS → Subnet groups → Create, chọn VPC, thêm cả private subnets ở 2 AZ",
          "Tạo Security Group cho RDS: inbound PostgreSQL (5432) chỉ từ Security Group của EC2 app servers",
          "Tạo RDS PostgreSQL instance: engine PostgreSQL 15, instance db.t3.micro, storage 20GB gp3, trong private subnet group, Multi-AZ bật, không public access",
          "Chờ RDS instance Available (7-10 phút), ghi lại endpoint URL",
          "Launch EC2 instance trong private subnet, cài PostgreSQL client: sudo dnf install -y postgresql15",
          "SSH vào EC2 qua bastion host, kết nối đến RDS: psql -h <rds-endpoint> -U postgres -d postgres",
          "Tạo database và table test: CREATE DATABASE myapp; \\c myapp; CREATE TABLE users (id SERIAL PRIMARY KEY, name VARCHAR(100), email VARCHAR(100) UNIQUE);",
        ],
        expectedResult:
          "Kết nối psql thành công đến RDS endpoint, tạo được database và table. RDS console hiển thị instance ở trạng thái Available với Multi-AZ enabled.",
        troubleshooting: [
          "Nếu connection refused: kiểm tra Security Group của RDS có cho phép port 5432 từ Security Group của EC2",
          "Nếu connection timeout: đảm bảo EC2 và RDS trong cùng VPC và EC2 trong private subnet có route qua NAT",
          "Nếu authentication failed: kiểm tra lại username/password đã nhập khi tạo RDS",
          "Nếu DB Subnet Group creation failed: đảm bảo chọn ít nhất 2 subnets trong 2 AZ khác nhau",
        ],
      },
      {
        id: "lab-5-2",
        slug: "lab-5-database-2",
        title: "DynamoDB Tables và Queries",
        stageId: 5,
        stageSlug: "5-database",
        objective:
          "Tạo DynamoDB table với GSI và thực hiện queries",
        estimatedTime: "60 phút",
        steps: [
          "Tạo DynamoDB table 'Orders': partition key orderId (String), sort key createdAt (String), capacity mode On-demand",
          "Tạo Global Secondary Index 'customerId-index': partition key customerId (String), projected attributes ALL",
          "Từ EC2 hoặc CloudShell, insert 5 items test vào table bằng AWS CLI",
          "Query table bằng primary key: aws dynamodb get-item và aws dynamodb query với orderId",
          "Query bằng GSI: aws dynamodb query --index-name customerId-index --key-condition-expression 'customerId = :cid'",
          "Thử scan toàn bộ table và so sánh cost (consumed capacity) giữa scan và query",
        ],
        expectedResult:
          "Table tạo thành công với GSI. Get-item, query bằng primary key, và query bằng GSI đều trả về đúng dữ liệu. Quan sát thấy Scan tiêu tốn nhiều RCU hơn Query.",
        troubleshooting: [
          "Nếu GSI query trả về empty: kiểm tra attribute name trong --key-condition-expression khớp với GSI partition key",
          "Nếu permission denied: kiểm tra IAM role/user có policy dynamodb:PutItem, dynamodb:GetItem, dynamodb:Query",
          "Nếu item không có attribute dùng cho GSI: item đó sẽ không xuất hiện trong GSI results (GSI sparse index behavior)",
          "Nếu CLI query syntax error: chú ý --expression-attribute-values phải là JSON với kiểu dữ liệu DynamoDB (ví dụ: '{\":cid\": {\"S\": \"customer123\"}}')",
        ],
      },
    ],
    codeSnippets: [
      {
        title: "RDS và DynamoDB bằng AWS CLI",
        language: "bash",
        code: `# Tạo DB Subnet Group
aws rds create-db-subnet-group \\
  --db-subnet-group-name myapp-db-subnet-group \\
  --db-subnet-group-description "Subnet group cho RDS production" \\
  --subnet-ids subnet-xxxxxxxx subnet-yyyyyyyy

# Tạo RDS PostgreSQL Multi-AZ
aws rds create-db-instance \\
  --db-instance-identifier myapp-postgres \\
  --db-instance-class db.t3.micro \\
  --engine postgres \\
  --engine-version 15.4 \\
  --master-username postgres \\
  --master-user-password MySecurePass123! \\
  --allocated-storage 20 \\
  --storage-type gp3 \\
  --db-subnet-group-name myapp-db-subnet-group \\
  --vpc-security-group-ids sg-xxxxxxxxxxxxxxxxx \\
  --multi-az \\
  --no-publicly-accessible \\
  --backup-retention-period 7 \\
  --deletion-protection \\
  --tags Key=Environment,Value=production

# Chờ RDS available
aws rds wait db-instance-available --db-instance-identifier myapp-postgres

# Lấy endpoint
aws rds describe-db-instances \\
  --db-instance-identifier myapp-postgres \\
  --query 'DBInstances[0].Endpoint.Address' \\
  --output text

# Tạo DynamoDB table
aws dynamodb create-table \\
  --table-name Orders \\
  --attribute-definitions \\
    AttributeName=orderId,AttributeType=S \\
    AttributeName=createdAt,AttributeType=S \\
    AttributeName=customerId,AttributeType=S \\
  --key-schema \\
    AttributeName=orderId,KeyType=HASH \\
    AttributeName=createdAt,KeyType=RANGE \\
  --billing-mode PAY_PER_REQUEST \\
  --global-secondary-indexes '[
    {
      "IndexName": "customerId-index",
      "KeySchema": [
        {"AttributeName": "customerId", "KeyType": "HASH"}
      ],
      "Projection": {"ProjectionType": "ALL"}
    }
  ]'`,
      },
      {
        title: "DynamoDB Item Operations (JSON)",
        language: "json",
        code: `{
  "orderId": {"S": "ORD-2024-001"},
  "createdAt": {"S": "2024-01-15T10:30:00Z"},
  "customerId": {"S": "CUST-123"},
  "status": {"S": "PENDING"},
  "items": {
    "L": [
      {
        "M": {
          "productId": {"S": "PROD-001"},
          "name": {"S": "AWS Solutions Architect Book"},
          "quantity": {"N": "1"},
          "price": {"N": "49.99"}
        }
      }
    ]
  },
  "totalAmount": {"N": "49.99"},
  "shippingAddress": {
    "M": {
      "street": {"S": "123 Cloud Street"},
      "city": {"S": "Ho Chi Minh"},
      "country": {"S": "VN"}
    }
  }
}`,
      },
      {
        title: "Kiểm tra RDS Connection và DynamoDB Query",
        language: "bash",
        code: `# Kết nối RDS PostgreSQL từ EC2
RDS_ENDPOINT="myapp-postgres.xxxxxxxxxx.ap-southeast-1.rds.amazonaws.com"
PGPASSWORD='MySecurePass123!' psql \\
  -h $RDS_ENDPOINT \\
  -U postgres \\
  -d postgres \\
  -c "SELECT version();"

# Test latency kết nối RDS
time PGPASSWORD='MySecurePass123!' psql \\
  -h $RDS_ENDPOINT -U postgres -d postgres \\
  -c "SELECT 1" -t -A

# DynamoDB: thêm item
aws dynamodb put-item \\
  --table-name Orders \\
  --item file://order-item.json

# DynamoDB: query bằng primary key
aws dynamodb query \\
  --table-name Orders \\
  --key-condition-expression "orderId = :oid" \\
  --expression-attribute-values '{":oid": {"S": "ORD-2024-001"}}'

# DynamoDB: query bằng GSI (tìm tất cả orders của customer)
aws dynamodb query \\
  --table-name Orders \\
  --index-name customerId-index \\
  --key-condition-expression "customerId = :cid" \\
  --expression-attribute-values '{":cid": {"S": "CUST-123"}}' \\
  --query 'Items[*].[orderId.S, status.S, totalAmount.N]' \\
  --output table

# Xem consumed capacity
aws dynamodb query \\
  --table-name Orders \\
  --index-name customerId-index \\
  --key-condition-expression "customerId = :cid" \\
  --expression-attribute-values '{":cid": {"S": "CUST-123"}}' \\
  --return-consumed-capacity TOTAL`,
      },
    ],
    bestPractices: [
      "Luôn đặt RDS trong private subnet, không bao giờ bật public accessibility trừ khi có lý do đặc biệt với bảo mật bổ sung",
      "Bật Multi-AZ cho mọi RDS production instance — chi phí gấp đôi nhưng downtime khi failover chỉ 1-2 phút thay vì hàng giờ",
      "Dùng Parameter Store hoặc Secrets Manager để lưu database credentials, không hardcode trong application code hoặc environment files",
      "Không để RDS instance chạy hết storage — bật Storage Autoscaling với maximum threshold phù hợp để tránh bị locked out",
      "Chọn DynamoDB partition key có cardinality cao và phân bố đều để tránh hot partition — tránh dùng status hay boolean làm partition key",
      "Đừng dùng DynamoDB Scan trong production cho large tables — luôn dùng Query với index, Scan đọc toàn bộ table và tốn nhiều RCU",
      "Thiết lập CloudWatch alarms cho RDS metrics: CPUUtilization > 80%, FreeStorageSpace < 10GB, DatabaseConnections > 80% of max_connections",
    ],
    commonMistakes: [
      {
        mistake:
          "Dùng master username/password trực tiếp trong application để kết nối database",
        fix: "Tạo database user riêng với least-privilege permissions cho mỗi service. Master account chỉ dùng cho admin tasks. Lưu credentials trong AWS Secrets Manager và rotate định kỳ.",
      },
      {
        mistake:
          "Thiết kế DynamoDB table theo mô hình relational (nhiều table, JOIN tương đương)",
        fix: "DynamoDB không support JOINs. Thiết kế theo access patterns — dùng single table design với composite keys và GSIs để đáp ứng tất cả query patterns từ một table.",
      },
      {
        mistake:
          "Không tạo DB Subnet Group trước khi tạo RDS, dẫn đến RDS được đặt trong default VPC",
        fix: "Tạo DB Subnet Group với ít nhất 2 private subnets trong 2 AZ khác nhau trước khi tạo RDS instance. Điều này bắt buộc để Multi-AZ hoạt động.",
      },
      {
        mistake:
          "Quên xóa RDS instance sau lab, bị charge $30-50/tháng cho instance không dùng",
        fix: "Sau khi hoàn thành lab, tạo final snapshot nếu cần giữ data, sau đó xóa RDS instance (uncheck 'Create final snapshot' nếu không cần). Tắt deletion protection trước.",
      },
    ],
    checklist: [
      {
        id: "db-1",
        label: "Tạo DB Subnet Group với private subnets ở 2 AZ",
        description: "Subnet Group bao gồm ít nhất 2 subnets trong 2 AZ khác nhau",
      },
      {
        id: "db-2",
        label: "Tạo Security Group cho RDS chỉ cho phép traffic từ app servers",
        description: "Inbound rule cho phép port database chỉ từ Security Group của EC2",
      },
      {
        id: "db-3",
        label: "RDS instance được tạo trong private subnet, không có public access",
        description: "Publicly accessible = No, VPC và subnet group được cấu hình đúng",
      },
      {
        id: "db-4",
        label: "Multi-AZ deployment đã được bật cho RDS",
        description: "RDS console hiển thị Multi-AZ: Yes",
      },
      {
        id: "db-5",
        label: "Kết nối thành công từ EC2 đến RDS endpoint",
        description: "psql hoặc mysql client connect được và chạy được queries",
      },
      {
        id: "db-6",
        label: "DynamoDB table đã được tạo với partition key và sort key",
        description: "Table ở trạng thái Active",
      },
      {
        id: "db-7",
        label: "Global Secondary Index đã được tạo cho DynamoDB table",
        description: "GSI ở trạng thái Active và có thể query được",
      },
      {
        id: "db-8",
        label: "Thực hiện thành công DynamoDB query bằng GSI",
        description: "Query trả về đúng items theo customerId hoặc attribute đã chọn",
      },
      {
        id: "db-9",
        label: "Database credentials được lưu trong Secrets Manager (không hardcode)",
        description: "Application lấy credentials từ Secrets Manager lúc runtime",
      },
    ],
    quiz: [
      {
        id: "db-q1",
        question:
          "Sự khác biệt giữa RDS Multi-AZ và Read Replica là gì?",
        options: [
          {
            id: "db-q1-a",
            text: "Multi-AZ dùng cho HA (failover tự động), Read Replica dùng để scale read workloads",
            isCorrect: true,
          },
          {
            id: "db-q1-b",
            text: "Multi-AZ và Read Replica đều có thể phục vụ read traffic",
            isCorrect: false,
          },
          {
            id: "db-q1-c",
            text: "Read Replica là synchronous, Multi-AZ là asynchronous replication",
            isCorrect: false,
          },
          {
            id: "db-q1-d",
            text: "Multi-AZ chỉ có trên Aurora, Read Replica cho tất cả engines",
            isCorrect: false,
          },
        ],
        explanation:
          "Multi-AZ replication là synchronous — khi write vào primary, data được ghi đồng thời vào standby. Mục đích là HA: nếu primary fail, standby tự động promote. Standby không phục vụ read traffic. Read Replica là asynchronous và có endpoint riêng để ứng dụng connect để đọc, giúp scale read throughput.",
      },
      {
        id: "db-q2",
        question:
          "Trong DynamoDB, bạn có bao nhiêu LSI (Local Secondary Index) tối đa và khi nào phải tạo?",
        options: [
          {
            id: "db-q2-a",
            text: "Tối đa 20 LSI, có thể thêm bất cứ lúc nào",
            isCorrect: false,
          },
          {
            id: "db-q2-b",
            text: "Tối đa 5 LSI, phải tạo cùng lúc khi tạo table, không thể thêm sau",
            isCorrect: true,
          },
          {
            id: "db-q2-c",
            text: "Tối đa 5 LSI, có thể thêm sau nhưng cần rebuild table",
            isCorrect: false,
          },
          {
            id: "db-q2-d",
            text: "Không giới hạn LSI, có thể thêm bất cứ lúc nào",
            isCorrect: false,
          },
        ],
        explanation:
          "LSI (Local Secondary Index) có tối đa 5 per table và BẮT BUỘC phải tạo cùng lúc khi tạo table — không thể thêm LSI vào table đã tồn tại. LSI dùng cùng partition key với table nhưng sort key khác. Ngược lại, GSI có thể tạo sau và tối đa 20 GSI per table.",
      },
      {
        id: "db-q3",
        question: "Khi nào RDS Automated Backup bị xóa?",
        options: [
          {
            id: "db-q3-a",
            text: "Automated backups tồn tại vĩnh viễn dù xóa RDS instance",
            isCorrect: false,
          },
          {
            id: "db-q3-b",
            text: "Automated backups bị xóa ngay sau retention period (1-35 ngày)",
            isCorrect: false,
          },
          {
            id: "db-q3-c",
            text: "Automated backups bị xóa khi RDS instance bị xóa (trừ khi tạo final snapshot)",
            isCorrect: true,
          },
          {
            id: "db-q3-d",
            text: "Automated backups không bao giờ bị xóa tự động",
            isCorrect: false,
          },
        ],
        explanation:
          "Khi xóa RDS instance, automated backups sẽ bị xóa theo (trừ khi bạn chọn 'Create final snapshot' và retain backups). Automated backups tồn tại trong retention period (1-35 ngày) và bị xóa khi vượt quá retention. Manual snapshots thì không bị xóa tự động, phải xóa thủ công.",
      },
      {
        id: "db-q4",
        question:
          "DynamoDB tính phí theo mô hình nào khi dùng On-demand capacity?",
        options: [
          {
            id: "db-q4-a",
            text: "Theo giờ chạy của table, bất kể có traffic hay không",
            isCorrect: false,
          },
          {
            id: "db-q4-b",
            text: "Theo số lượng Read Request Units (RRU) và Write Request Units (WRU) thực tế",
            isCorrect: true,
          },
          {
            id: "db-q4-c",
            text: "Theo dung lượng storage và số lượng items",
            isCorrect: false,
          },
          {
            id: "db-q4-d",
            text: "Flat fee hàng tháng tùy theo region",
            isCorrect: false,
          },
        ],
        explanation:
          "On-demand mode tính phí theo số lượng Read Request Units và Write Request Units thực tế tiêu thụ (1 RRU = đọc 1 item ≤4KB; 1 WRU = ghi 1 item ≤1KB). Không cần đặt trước capacity. Phù hợp cho workload không đoán trước được hoặc sporadic traffic. Provisioned mode cho phép đặt trước RCU/WCU với chi phí thấp hơn khi traffic ổn định.",
      },
      {
        id: "db-q5",
        question: "Tại sao không nên dùng DynamoDB Scan trong production?",
        options: [
          {
            id: "db-q5-a",
            text: "Scan không được hỗ trợ trong production environment",
            isCorrect: false,
          },
          {
            id: "db-q5-b",
            text: "Scan đọc toàn bộ table, tiêu tốn nhiều RCU và latency tăng theo table size",
            isCorrect: true,
          },
          {
            id: "db-q5-c",
            text: "Scan chỉ trả về tối đa 100 items",
            isCorrect: false,
          },
          {
            id: "db-q5-d",
            text: "Scan bị giới hạn 1 request/giây trong production",
            isCorrect: false,
          },
        ],
        explanation:
          "DynamoDB Scan đọc qua mọi item trong table (hoặc secondary index), bất kể filter condition. Chi phí RCU tỷ lệ thuận với table size, không phải số items trả về. Với table 1TB, một Scan có thể tiêu tốn hàng triệu RCU. Luôn thiết kế access patterns để dùng Query với index thay vì Scan.",
      },
      {
        id: "db-q6",
        question: "ElastiCache Redis khác Memcached ở điểm quan trọng nào?",
        options: [
          {
            id: "db-q6-a",
            text: "Redis không hỗ trợ clustering, Memcached thì có",
            isCorrect: false,
          },
          {
            id: "db-q6-b",
            text: "Redis hỗ trợ persistence, replication, data structures phong phú; Memcached là pure cache không có persistence",
            isCorrect: true,
          },
          {
            id: "db-q6-c",
            text: "Memcached nhanh hơn Redis trong mọi use case",
            isCorrect: false,
          },
          {
            id: "db-q6-d",
            text: "Redis chỉ hỗ trợ String, Memcached hỗ trợ nhiều data types",
            isCorrect: false,
          },
        ],
        explanation:
          "Redis hỗ trợ persistence (RDB snapshots, AOF logging), Multi-AZ replication, clustering, và data structures phong phú (strings, hashes, lists, sets, sorted sets, streams). Memcached là pure in-memory cache, multi-threaded, không có persistence hay replication. Chọn Redis khi cần HA, persistence, hoặc data structures; chọn Memcached khi cần simple caching với multi-threading.",
      },
      {
        id: "db-q7",
        question:
          "Bạn cần lưu database password một cách an toàn và rotate tự động mỗi 30 ngày. Dịch vụ AWS nào phù hợp nhất?",
        options: [
          {
            id: "db-q7-a",
            text: "AWS Systems Manager Parameter Store (Standard tier)",
            isCorrect: false,
          },
          {
            id: "db-q7-b",
            text: "AWS Secrets Manager với automatic rotation enabled",
            isCorrect: true,
          },
          {
            id: "db-q7-c",
            text: "S3 bucket với server-side encryption",
            isCorrect: false,
          },
          {
            id: "db-q7-d",
            text: "AWS KMS với custom key policy",
            isCorrect: false,
          },
        ],
        explanation:
          "AWS Secrets Manager được thiết kế đặc biệt cho database credentials với tính năng automatic rotation tích hợp sẵn cho RDS (MySQL, PostgreSQL, Oracle). Rotation Lambda function được AWS quản lý, tự động cập nhật secret value và đồng bộ với database. Parameter Store không có built-in automatic rotation. KMS là service quản lý encryption keys, không phải secrets.",
      },
    ],
    architecture: {
      title: "Database Architecture",
      description:
        "Kiến trúc database layer với RDS Multi-AZ cho relational data, DynamoDB cho NoSQL, và ElastiCache Redis làm caching layer — tất cả trong private subnet",
      nodes: [
        { id: "app", label: "Application", sublabel: "EC2 / ECS", type: "service" },
        { id: "elasticache", label: "ElastiCache", sublabel: "Redis Cache", type: "service" },
        { id: "rds-primary", label: "RDS Primary", sublabel: "PostgreSQL · AZ-1a", type: "service" },
        { id: "rds-standby", label: "RDS Standby", sublabel: "Multi-AZ · AZ-1b", type: "service" },
        { id: "rds-replica", label: "Read Replica", sublabel: "PostgreSQL · AZ-1b", type: "service" },
        { id: "dynamodb", label: "DynamoDB", sublabel: "On-demand · 3 AZs", type: "service" },
        { id: "dynamodb-gsi", label: "GSI", sublabel: "customerId-index", type: "service" },
        { id: "private-subnet", label: "Private Subnet", sublabel: "No public access", type: "group" },
        { id: "secrets", label: "Secrets Manager", sublabel: "DB Credentials", type: "service" },
      ],
      connections: [
        { from: "app", to: "elasticache", label: "cache hit" },
        { from: "app", to: "rds-primary", label: "read/write" },
        { from: "app", to: "rds-replica", label: "read only" },
        { from: "rds-primary", to: "rds-standby", label: "sync replication" },
        { from: "rds-primary", to: "rds-replica", label: "async replication" },
        { from: "app", to: "dynamodb", label: "NoSQL queries" },
        { from: "dynamodb", to: "dynamodb-gsi", label: "index" },
        { from: "app", to: "secrets", label: "get credentials" },
        { from: "private-subnet", to: "rds-primary" },
        { from: "private-subnet", to: "elasticache" },
      ],
    },
  },
];
