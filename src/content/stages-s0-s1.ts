import type { Stage } from "@/types/guide";

export const stagesS0S1: Stage[] = [
  {
    id: 0,
    slug: "0-foundation",
    title: "Nền Tảng AWS",
    subtitle: "Khám phá AWS Console, CLI, và kiến trúc đám mây cơ bản",
    difficulty: "beginner",
    estimatedTime: "1 tuần",
    services: ["EC2", "S3", "IAM"],
    objectives: [
      "Hiểu được kiến trúc tổng thể của AWS và các khái niệm nền tảng",
      "Biết cách điều hướng AWS Management Console và thiết lập tài khoản",
      "Cài đặt và cấu hình AWS CLI để quản lý tài nguyên từ terminal",
      "Hiểu được mô hình tính phí và cách kiểm soát chi phí AWS",
    ],
    concepts: [
      {
        title: "AWS là gì?",
        description:
          "Amazon Web Services (AWS) là nền tảng điện toán đám mây lớn nhất thế giới, cung cấp hơn 200 dịch vụ từ hạ tầng máy chủ, lưu trữ, cơ sở dữ liệu đến trí tuệ nhân tạo. AWS cho phép doanh nghiệp xây dựng ứng dụng mà không cần đầu tư phần cứng vật lý.",
      },
      {
        title: "Region & Availability Zone",
        description:
          "Region là khu vực địa lý riêng biệt (ví dụ: ap-southeast-1 tại Singapore). Mỗi Region gồm nhiều Availability Zone (AZ) — các trung tâm dữ liệu độc lập được kết nối tốc độ cao. Triển khai trên nhiều AZ giúp ứng dụng chịu lỗi và có độ sẵn sàng cao.",
      },
      {
        title: "IAM cơ bản",
        description:
          "Identity and Access Management (IAM) kiểm soát ai được làm gì trên tài khoản AWS. IAM bao gồm Users (người dùng), Groups (nhóm), Roles (vai trò) và Policies (chính sách quyền). Đây là lớp bảo mật đầu tiên và quan trọng nhất cần nắm vững.",
      },
      {
        title: "AWS Console Navigation",
        description:
          "AWS Management Console là giao diện web để quản lý tài nguyên. Bạn có thể tìm kiếm dịch vụ qua thanh tìm kiếm, ghim dịch vụ thường dùng, xem trạng thái tài nguyên theo Region và theo dõi chi phí thông qua Billing Dashboard.",
      },
      {
        title: "AWS CLI & SDK",
        description:
          "AWS CLI (Command Line Interface) cho phép quản lý tài nguyên từ terminal bằng lệnh aws <service> <command>. SDK hỗ trợ nhiều ngôn ngữ (Python boto3, Node.js, Java,...) để tích hợp AWS vào ứng dụng. Cả hai đều dùng credentials từ IAM để xác thực.",
      },
    ],
    consoleSteps: [
      {
        title: "Tạo tài khoản AWS và kích hoạt MFA",
        description:
          "Truy cập aws.amazon.com và tạo tài khoản mới với email và thẻ tín dụng. Sau khi đăng nhập với tài khoản root, ngay lập tức vào IAM → Security recommendations → kích hoạt MFA (Multi-Factor Authentication) cho root account. Sử dụng app như Google Authenticator hoặc Authy. Đây là bước bảo mật tối quan trọng — tài khoản root có toàn quyền và không thể bị giới hạn bởi IAM policy.",
        imagePath: "/images/stage-0/step-1.png",
        alt: "Màn hình kích hoạt MFA cho tài khoản AWS root",
      },
      {
        title: "Khám phá AWS Console và các dịch vụ chính",
        description:
          "Từ AWS Console Home, sử dụng thanh tìm kiếm phía trên để tìm dịch vụ. Ghim EC2, S3, IAM, và Billing vào thanh điều hướng để truy cập nhanh. Chú ý selector Region ở góc trên phải — mỗi Region là môi trường độc lập. Khám phá trang Services để hiểu phân loại: Compute, Storage, Database, Networking, Security.",
        imagePath: "/images/stage-0/step-2.png",
        alt: "Tổng quan AWS Management Console với các dịch vụ được ghim",
      },
      {
        title: "Thiết lập Billing Alerts",
        description:
          "Vào Billing & Cost Management → Budgets → Create budget. Chọn 'Zero spend budget' để nhận cảnh báo ngay khi có chi phí phát sinh ngoài Free Tier, hoặc đặt ngưỡng theo tháng (ví dụ $5). Thêm email nhận thông báo. Cũng bật Cost Explorer để theo dõi chi phí theo dịch vụ và theo thời gian.",
        imagePath: "/images/stage-0/step-3.png",
        alt: "Thiết lập AWS Budget alert với ngưỡng chi phí",
      },
    ],
    labs: [
      {
        id: "lab-0-1",
        slug: "lab-0-foundation-1",
        title: "Thiết lập môi trường AWS",
        stageId: 0,
        stageSlug: "0-foundation",
        objective: "Cấu hình AWS CLI và tạo IAM user đầu tiên",
        estimatedTime: "45 phút",
        steps: [
          "Cài đặt AWS CLI v2: tải installer từ docs.aws.amazon.com/cli hoặc dùng brew install awscli (macOS) / winget install Amazon.AWSCLI (Windows)",
          "Tạo IAM user mới trong Console: IAM → Users → Create user, đặt tên 'admin-cli', tick 'Provide user access to the AWS Management Console'",
          "Gán quyền cho user: chọn 'Attach policies directly' → tìm và chọn AdministratorAccess (chỉ dùng cho môi trường học, production cần least privilege)",
          "Tạo Access Key: vào user vừa tạo → Security credentials → Create access key → chọn 'Command Line Interface (CLI)' → lưu Access Key ID và Secret Access Key",
          "Chạy aws configure trong terminal, nhập Access Key ID, Secret Access Key, Region mặc định (ap-southeast-1), output format (json)",
          "Xác nhận cấu hình thành công: chạy aws sts get-caller-identity — kết quả trả về UserId, Account, Arn của IAM user vừa tạo",
        ],
        expectedResult:
          "Lệnh aws sts get-caller-identity trả về JSON với thông tin tài khoản và IAM user. Lệnh aws s3 ls chạy không lỗi (danh sách trống nếu chưa có bucket).",
        troubleshooting: [
          "Lỗi 'Unable to locate credentials': chạy lại aws configure, đảm bảo nhập đúng Access Key ID và Secret Access Key không có khoảng trắng thừa",
          "Lỗi 'InvalidClientTokenId': Access Key có thể đã bị xóa hoặc deactivate — vào IAM Console kiểm tra trạng thái key, tạo key mới nếu cần",
          "Lỗi 'An error occurred (AccessDenied)': kiểm tra IAM user đã được gán policy AdministratorAccess chưa, hoặc Region trong lệnh có khớp với Region đã cấu hình không",
        ],
      },
      {
        id: "lab-0-2",
        slug: "lab-0-foundation-2",
        title: "Khám phá AWS Free Tier",
        stageId: 0,
        stageSlug: "0-foundation",
        objective:
          "Hiểu Free Tier và tạo billing alarm tránh phát sinh chi phí",
        estimatedTime: "30 phút",
        steps: [
          "Truy cập aws.amazon.com/free để xem danh sách dịch vụ Free Tier — phân biệt 3 loại: Always Free (miễn phí vĩnh viễn), 12 Months Free (miễn phí 12 tháng đầu), Trials (dùng thử có hạn)",
          "Vào Billing Console → Cost Explorer → Enable (lần đầu cần kích hoạt, mất vài giờ để có dữ liệu)",
          "Tạo Budget: Billing → Budgets → Create budget → Zero spend budget, nhập email nhận alert",
          "Bật Free Tier usage alerts: Billing → Billing preferences → tick 'Receive Free Tier Usage Alerts', nhập email",
          "Tạo CloudWatch billing alarm: CloudWatch → Alarms → Create alarm → chọn metric Billing → EstimatedCharges → threshold $1 → notify qua SNS email",
        ],
        expectedResult:
          "Nhận được email xác nhận subscription từ SNS. Budget hiển thị trong Billing Console. Free Tier alerts được bật trong Billing Preferences.",
        troubleshooting: [
          "Không thấy Billing metrics trong CloudWatch: phải bật từ tài khoản root — Billing → Billing preferences → tick 'Receive Billing Alerts'",
          "Budget không hiển thị: đợi 24 giờ sau khi tạo để dữ liệu được sync, refresh lại trang",
          "Không nhận được email SNS: kiểm tra hộp thư spam, xác nhận đã click link 'Confirm subscription' trong email từ AWS SNS",
        ],
      },
    ],
    codeSnippets: [
      {
        title: "Thiết lập và kiểm tra AWS CLI",
        language: "bash",
        code: `# Cài đặt AWS CLI v2 trên macOS
brew install awscli

# Cấu hình credentials
aws configure
# AWS Access Key ID [None]: AKIAIOSFODNN7EXAMPLE
# AWS Secret Access Key [None]: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
# Default region name [None]: ap-southeast-1
# Default output format [None]: json

# Xác nhận identity
aws sts get-caller-identity

# Liệt kê S3 buckets
aws s3 ls

# Kiểm tra version CLI
aws --version`,
      },
      {
        title: "IAM Policy cho Billing Read-Only",
        language: "json",
        code: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "aws-portal:ViewBilling",
        "aws-portal:ViewUsage",
        "budgets:ViewBudget",
        "ce:GetCostAndUsage",
        "ce:GetCostForecast"
      ],
      "Resource": "*"
    }
  ]
}`,
      },
    ],
    bestPractices: [
      "Không bao giờ sử dụng root account cho công việc hàng ngày — tạo IAM user riêng và dùng user đó",
      "Bật MFA cho tất cả IAM users, đặc biệt là root account và các user có quyền cao",
      "Luôn thiết lập billing alerts ngay khi tạo tài khoản mới để tránh bị tính phí bất ngờ",
      "Đặt default Region gần với vị trí người dùng thực tế để giảm độ trễ (ap-southeast-1 cho Việt Nam)",
      "Không commit AWS credentials vào Git — dùng aws configure hoặc environment variables, thêm .aws/ vào .gitignore",
      "Xóa access keys không còn dùng để giảm bề mặt tấn công bảo mật",
    ],
    commonMistakes: [
      {
        mistake:
          "Dùng root account để tạo access key và dùng cho CLI hàng ngày",
        fix: "Tạo IAM user với quyền phù hợp, tạo access key cho user đó. Root access key chỉ dùng trong trường hợp khẩn cấp và nên bị xóa sau khi dùng.",
      },
      {
        mistake: "Bỏ qua việc thiết lập billing alerts và bị sốc với hóa đơn",
        fix: "Thiết lập AWS Budget với zero spend alert và CloudWatch billing alarm ngay trong ngày đầu tiên tạo tài khoản.",
      },
      {
        mistake:
          "Không chú ý đến Region đang chọn, tạo tài nguyên ở Region sai và không tìm thấy",
        fix: "Luôn kiểm tra Region selector ở góc trên phải Console trước khi tạo tài nguyên. Đặt default region trong aws configure.",
      },
    ],
    checklist: [
      {
        id: "foundation-1",
        label: "Tạo tài khoản AWS thành công",
        description: "Đã verify email và cung cấp thông tin thanh toán",
      },
      {
        id: "foundation-2",
        label: "Kích hoạt MFA cho root account",
        description:
          "Dùng authenticator app, đã test đăng nhập với MFA thành công",
      },
      {
        id: "foundation-3",
        label: "Tạo IAM user cho công việc hàng ngày",
        description: "User có quyền phù hợp, KHÔNG dùng root account nữa",
      },
      {
        id: "foundation-4",
        label: "Cài đặt và cấu hình AWS CLI",
        description:
          "aws sts get-caller-identity trả về kết quả đúng với IAM user",
      },
      {
        id: "foundation-5",
        label: "Thiết lập Billing Alert",
        description:
          "Đã tạo Budget hoặc CloudWatch alarm, nhận được email xác nhận",
      },
      {
        id: "foundation-6",
        label: "Hiểu khái niệm Region và AZ",
        description:
          "Có thể giải thích sự khác biệt và lý do dùng nhiều AZ",
      },
      {
        id: "foundation-7",
        label: "Khám phá AWS Free Tier",
        description:
          "Biết dịch vụ nào miễn phí và giới hạn Free Tier của EC2, S3",
      },
    ],
    quiz: [
      {
        id: "q0-1",
        question: "AWS Region và Availability Zone (AZ) khác nhau như thế nào?",
        options: [
          {
            id: "q0-1-a",
            text: "Region là một trung tâm dữ liệu, AZ là tập hợp nhiều Region",
            isCorrect: false,
          },
          {
            id: "q0-1-b",
            text: "Region là khu vực địa lý gồm nhiều AZ; mỗi AZ là một hoặc nhiều trung tâm dữ liệu độc lập",
            isCorrect: true,
          },
          {
            id: "q0-1-c",
            text: "Region và AZ là hai tên gọi khác nhau cho cùng một khái niệm",
            isCorrect: false,
          },
          {
            id: "q0-1-d",
            text: "AZ là tên gọi của Region dành cho châu Á",
            isCorrect: false,
          },
        ],
        explanation:
          "Region (ví dụ ap-southeast-1) là khu vực địa lý độc lập. Bên trong mỗi Region có nhiều Availability Zone (ví dụ ap-southeast-1a, ap-southeast-1b) là các trung tâm dữ liệu riêng biệt, cách nhau vài km, được kết nối bằng đường truyền tốc độ cao. Triển khai ứng dụng trên nhiều AZ giúp chịu lỗi nếu một AZ gặp sự cố.",
      },
      {
        id: "q0-2",
        question:
          "Đâu là cách an toàn nhất để cấu hình AWS CLI trên máy tính cá nhân?",
        options: [
          {
            id: "q0-2-a",
            text: "Hardcode Access Key ID và Secret Key trực tiếp vào file code",
            isCorrect: false,
          },
          {
            id: "q0-2-b",
            text: "Dùng root account credentials vì có toàn quyền",
            isCorrect: false,
          },
          {
            id: "q0-2-c",
            text: "Tạo IAM user với quyền tối thiểu cần thiết, chạy aws configure để lưu credentials vào ~/.aws/credentials",
            isCorrect: true,
          },
          {
            id: "q0-2-d",
            text: "Chia sẻ credentials với đồng nghiệp qua email để tiện sử dụng chung",
            isCorrect: false,
          },
        ],
        explanation:
          "Credentials nên được lưu trong ~/.aws/credentials thông qua aws configure, không bao giờ hardcode vào code hay commit lên Git. Tạo IAM user riêng với quyền tối thiểu cần thiết (principle of least privilege), không dùng root account. Mỗi người/ứng dụng nên có credentials riêng.",
      },
      {
        id: "q0-3",
        question:
          "Lệnh nào dùng để xác nhận AWS CLI đã được cấu hình đúng và đang dùng identity nào?",
        options: [
          { id: "q0-3-a", text: "aws iam list-users", isCorrect: false },
          {
            id: "q0-3-b",
            text: "aws sts get-caller-identity",
            isCorrect: true,
          },
          { id: "q0-3-c", text: "aws configure list", isCorrect: false },
          { id: "q0-3-d", text: "aws whoami", isCorrect: false },
        ],
        explanation:
          "aws sts get-caller-identity trả về Account ID, UserId và ARN của identity đang được dùng (IAM user hoặc role). Đây là lệnh nhanh nhất để xác nhận CLI đã kết nối đúng và đang dùng đúng identity. aws configure list chỉ hiển thị cấu hình profile, không xác thực với AWS.",
      },
      {
        id: "q0-4",
        question:
          "AWS Free Tier bao gồm những loại ưu đãi nào? Chọn mô tả ĐÚNG nhất.",
        options: [
          {
            id: "q0-4-a",
            text: "Chỉ miễn phí trong 1 tháng đầu tiên đăng ký",
            isCorrect: false,
          },
          {
            id: "q0-4-b",
            text: "Miễn phí vĩnh viễn cho tất cả dịch vụ với giới hạn nhất định",
            isCorrect: false,
          },
          {
            id: "q0-4-c",
            text: "Gồm 3 loại: Always Free (vĩnh viễn), 12 Months Free (12 tháng đầu), và Trials (dùng thử ngắn hạn)",
            isCorrect: true,
          },
          {
            id: "q0-4-d",
            text: "Miễn phí hoàn toàn cho sinh viên và không áp dụng cho doanh nghiệp",
            isCorrect: false,
          },
        ],
        explanation:
          "AWS Free Tier có 3 loại: (1) Always Free — luôn miễn phí với giới hạn nhất định (ví dụ Lambda 1 triệu request/tháng); (2) 12 Months Free — miễn phí 12 tháng kể từ ngày đăng ký (ví dụ EC2 t2.micro 750 giờ/tháng, S3 5GB); (3) Trials — dùng thử ngắn hạn cho dịch vụ cụ thể. Mọi tài khoản đều được hưởng Free Tier.",
      },
      {
        id: "q0-5",
        question:
          "Tại sao KHÔNG nên dùng root account cho các hoạt động AWS hàng ngày?",
        options: [
          {
            id: "q0-5-a",
            text: "Root account chậm hơn IAM user khi thực hiện các thao tác",
            isCorrect: false,
          },
          {
            id: "q0-5-b",
            text: "Root account có toàn quyền và không thể bị giới hạn bởi IAM policy, mọi hành động nhầm lẫn đều gây hậu quả nghiêm trọng",
            isCorrect: true,
          },
          {
            id: "q0-5-c",
            text: "Root account không thể tạo access key nên không dùng được CLI",
            isCorrect: false,
          },
          {
            id: "q0-5-d",
            text: "Root account bị giới hạn chỉ dùng được 5 dịch vụ AWS",
            isCorrect: false,
          },
        ],
        explanation:
          "Root account có quyền tuyệt đối trên toàn bộ tài khoản AWS, không thể bị giới hạn bởi bất kỳ IAM policy nào. Nếu credentials bị lộ hoặc thao tác nhầm, hậu quả là toàn bộ tài khoản bị xâm phạm. Thực hành tốt nhất là chỉ dùng root account cho một số tác vụ đặc biệt (ví dụ thay đổi email, hủy tài khoản) và khóa credentials lại.",
      },
      {
        id: "q0-6",
        question: "AWS CLI được cài đặt, bạn muốn dùng nhiều AWS account khác nhau. Cách tốt nhất là gì?",
        options: [
          {
            id: "q0-6-a",
            text: "Chạy aws configure mỗi lần muốn đổi account",
            isCorrect: false,
          },
          {
            id: "q0-6-b",
            text: "Tạo nhiều named profiles với aws configure --profile <tên>, dùng --profile flag hoặc AWS_PROFILE env var khi chạy lệnh",
            isCorrect: true,
          },
          {
            id: "q0-6-c",
            text: "Mỗi account cần cài một bản AWS CLI riêng biệt",
            isCorrect: false,
          },
          {
            id: "q0-6-d",
            text: "Không thể dùng nhiều account trên cùng một máy tính",
            isCorrect: false,
          },
        ],
        explanation:
          "AWS CLI hỗ trợ named profiles trong ~/.aws/credentials và ~/.aws/config. Dùng aws configure --profile dev để tạo profile 'dev', sau đó aws s3 ls --profile dev hoặc export AWS_PROFILE=dev để dùng. Đây là cách quản lý nhiều tài khoản/environment (dev, staging, prod) hiệu quả và an toàn trên cùng một máy.",
      },
    ],
    architecture: {
      title: "AWS Foundation Architecture",
      description:
        "Kiến trúc nền tảng: người dùng tương tác với AWS thông qua Console hoặc CLI, xác thực qua IAM trước khi truy cập các dịch vụ cốt lõi.",
      nodes: [
        { id: "user", label: "Developer", sublabel: "Bạn", type: "user" },
        {
          id: "console",
          label: "AWS Console",
          sublabel: "Web Browser",
          type: "service",
        },
        {
          id: "cli",
          label: "AWS CLI",
          sublabel: "Terminal",
          type: "service",
        },
        {
          id: "iam",
          label: "IAM",
          sublabel: "Auth & Access",
          type: "service",
        },
        {
          id: "ec2",
          label: "EC2",
          sublabel: "Compute",
          type: "service",
        },
        {
          id: "s3",
          label: "S3",
          sublabel: "Storage",
          type: "service",
        },
        {
          id: "billing",
          label: "Billing",
          sublabel: "Cost Control",
          type: "service",
        },
      ],
      connections: [
        { from: "user", to: "console", label: "HTTPS" },
        { from: "user", to: "cli", label: "Terminal" },
        { from: "console", to: "iam", label: "Authenticate" },
        { from: "cli", to: "iam", label: "Credentials" },
        { from: "iam", to: "ec2", label: "Authorized" },
        { from: "iam", to: "s3", label: "Authorized" },
        { from: "iam", to: "billing", label: "Authorized" },
      ],
    },
  },
  {
    id: 1,
    slug: "1-iam",
    title: "IAM - Quản Lý Danh Tính và Quyền Truy Cập",
    subtitle:
      "Bảo vệ tài khoản AWS với Users, Groups, Roles và Policies",
    difficulty: "beginner",
    estimatedTime: "1 tuần",
    services: ["IAM"],
    objectives: [
      "Hiểu sự khác biệt giữa IAM Users, Groups, Roles và Policies, biết khi nào dùng loại nào",
      "Áp dụng Principle of Least Privilege khi thiết kế quyền truy cập cho người dùng và ứng dụng",
      "Thiết lập MFA cho toàn bộ IAM users nhằm tăng cường bảo mật tài khoản",
      "Cấu hình cross-account access an toàn sử dụng IAM Roles và trust policies",
      "Tạo service roles cho EC2, Lambda và các AWS service để truy cập tài nguyên không cần access key",
    ],
    concepts: [
      {
        title: "IAM User",
        description:
          "IAM User đại diện cho một người hoặc ứng dụng cụ thể cần truy cập AWS. Mỗi user có credentials riêng (password cho Console, access key cho CLI/API). User nên được tổ chức trong Groups thay vì gán policy trực tiếp. Một user có thể thuộc nhiều group và đảm nhận (assume) nhiều role.",
      },
      {
        title: "IAM Group",
        description:
          "Group là tập hợp IAM Users để quản lý quyền theo nhóm chức năng (ví dụ: Developers, Admins, ReadOnly). Policy gán cho Group sẽ áp dụng cho tất cả members. Đây là cách tổ chức quyền hiệu quả — thêm/bớt user vào group thay vì chỉnh sửa từng user. Group không thể chứa group khác.",
      },
      {
        title: "IAM Role",
        description:
          "Role là danh tính tạm thời có thể được đảm nhận (assume) bởi users, applications, hoặc AWS services. Không có credentials cố định — khi assume role, AWS cấp temporary credentials có thời hạn. Dùng Role khi: EC2 cần truy cập S3, Lambda cần gọi DynamoDB, cross-account access, hoặc federation với IdP ngoài.",
      },
      {
        title: "IAM Policy (JSON)",
        description:
          "Policy là tài liệu JSON định nghĩa quyền: Effect (Allow/Deny), Action (dịch vụ:hành động), Resource (ARN của tài nguyên), Condition (điều kiện tùy chọn). Có 2 loại: AWS Managed Policy (do AWS tạo sẵn) và Customer Managed Policy (bạn tự tạo). Inline Policy gắn trực tiếp vào user/group/role nhưng khó tái sử dụng.",
      },
      {
        title: "Principle of Least Privilege",
        description:
          "Nguyên tắc tối thiểu đặc quyền: chỉ cấp đúng và đủ quyền cần thiết để thực hiện công việc, không hơn. Bắt đầu với quyền tối thiểu rồi mở rộng khi cần, thay vì bắt đầu với quyền rộng rồi thu hẹp. Định kỳ review và revoke quyền không còn cần thiết. Đây là nguyên tắc nền tảng của AWS security.",
      },
      {
        title: "Multi-Factor Authentication (MFA)",
        description:
          "MFA thêm lớp xác thực thứ hai sau mật khẩu: một mã OTP 6 chữ số từ authenticator app, hardware token, hoặc SMS. Bắt buộc cho root account và nên áp dụng cho tất cả IAM users có quyền quan trọng. Có thể enforce MFA bằng IAM policy với condition aws:MultiFactorAuthPresent: true.",
      },
    ],
    consoleSteps: [
      {
        title: "Tạo IAM Groups và gán Managed Policies",
        description:
          "Vào IAM → User groups → Create group. Tạo 3 groups: 'Admins' (gán AdministratorAccess), 'Developers' (gán PowerUserAccess), 'ReadOnly' (gán ReadOnlyAccess). Đặt tên group rõ ràng theo chức năng. Tránh gán AdministratorAccess cho group thông thường trong môi trường production.",
        imagePath: "/images/stage-1/step-1.png",
        alt: "Tạo IAM Group với Managed Policy trong AWS Console",
      },
      {
        title: "Tạo IAM Users và thêm vào Groups",
        description:
          "IAM → Users → Create user. Nhập username, chọn loại access (Console access và/hoặc Programmatic access). Trong bước permissions, chọn 'Add user to group' và chọn group phù hợp. Tạo custom password hoặc để AWS tự sinh. Tải về CSV chứa credentials — đây là lần duy nhất xem được Secret Access Key.",
        imagePath: "/images/stage-1/step-2.png",
        alt: "Tạo IAM User và thêm vào Group trong AWS Console",
      },
      {
        title: "Kích hoạt MFA cho IAM User",
        description:
          "Vào IAM → Users → chọn user → Security credentials → Assign MFA device. Chọn 'Authenticator app', click Next. Mở Google Authenticator hoặc Authy trên điện thoại, scan QR code. Nhập 2 mã OTP liên tiếp để xác nhận. Sau khi bật MFA, user sẽ phải nhập mã OTP mỗi lần đăng nhập Console.",
        imagePath: "/images/stage-1/step-3.png",
        alt: "Kích hoạt MFA cho IAM User với Authenticator App",
      },
      {
        title: "Tạo IAM Role cho EC2 Instance Profile",
        description:
          "IAM → Roles → Create role → chọn trusted entity 'AWS service' → chọn EC2. Trong bước permissions, tìm và gán AmazonS3ReadOnlyAccess (hoặc custom policy theo nhu cầu). Đặt tên role ví dụ 'ec2-s3-readonly-role'. Role này sẽ được attach vào EC2 instance, cho phép code chạy trên EC2 truy cập S3 mà không cần hardcode credentials.",
        imagePath: "/images/stage-1/step-4.png",
        alt: "Tạo IAM Role với trusted entity EC2 và S3 permissions",
      },
    ],
    labs: [
      {
        id: "lab-1-1",
        slug: "lab-1-iam-1",
        title: "Tạo IAM Users và Groups",
        stageId: 1,
        stageSlug: "1-iam",
        objective:
          "Thiết lập IAM users với đúng permissions theo nhóm",
        estimatedTime: "45 phút",
        steps: [
          "Tạo 3 IAM Groups: 'dev-team' (gán PowerUserAccess), 'ops-team' (gán AdministratorAccess), 'readonly-team' (gán ReadOnlyAccess)",
          "Tạo IAM user 'dev-user-01': IAM → Users → Create user → enable Console access → thêm vào group 'dev-team' → lưu credentials",
          "Tạo IAM user 'ops-user-01' tương tự, thêm vào group 'ops-team'",
          "Tạo custom IAM Policy cho phép chỉ xem EC2 instances: vào IAM → Policies → Create policy → JSON editor → nhập policy document với Action: ec2:Describe*",
          "Tạo group 'ec2-readonly' với custom policy vừa tạo, thêm 'dev-user-01' vào cả 2 groups (dev-team và ec2-readonly) để xem merged permissions",
          "Đăng nhập Console bằng dev-user-01, thử tạo S3 bucket (sẽ được phép do PowerUserAccess) và thử xóa IAM user (sẽ bị từ chối)",
        ],
        expectedResult:
          "dev-user-01 có thể tạo S3 bucket nhưng không thể quản lý IAM users. ops-user-01 có đầy đủ quyền. Permissions Boundary hoạt động đúng theo group membership.",
        troubleshooting: [
          "User bị từ chối action đáng lẽ được phép: kiểm tra user đã được thêm vào đúng group chưa (IAM → Users → user → Groups tab), đợi vài giây để permission propagate",
          "Không tìm thấy user trong group: IAM console có thể bị cache — refresh trang hoặc kiểm tra lại bằng CLI: aws iam get-group --group-name <tên-group>",
          "Lỗi 'An error occurred (EntityAlreadyExists)' khi tạo group: tên group đã tồn tại trong tài khoản — chọn tên khác hoặc dùng group sẵn có",
        ],
      },
      {
        id: "lab-1-2",
        slug: "lab-1-iam-2",
        title: "Tạo IAM Role cho EC2",
        stageId: 1,
        stageSlug: "1-iam",
        objective:
          "Cấu hình EC2 instance profile để truy cập S3 không cần access key",
        estimatedTime: "30 phút",
        steps: [
          "Tạo IAM Role: IAM → Roles → Create role → AWS service → EC2 → Next → tìm và chọn AmazonS3ReadOnlyAccess → đặt tên 'lab-ec2-s3-role'",
          "Launch EC2 instance t2.micro (Amazon Linux 2023, Free Tier): EC2 → Launch instance → trong phần 'IAM instance profile' chọn 'lab-ec2-s3-role'",
          "Connect vào EC2 qua EC2 Instance Connect (không cần SSH key): chọn instance → Connect → EC2 Instance Connect → Connect",
          "Trên EC2, chạy aws sts get-caller-identity — kết quả sẽ hiện Role ARN thay vì IAM user",
          "Chạy aws s3 ls để liệt kê buckets (thành công), sau đó thử aws s3 mb s3://test-bucket-xxx (sẽ bị từ chối vì chỉ có ReadOnly)",
        ],
        expectedResult:
          "aws sts get-caller-identity trên EC2 trả về assumed-role ARN. aws s3 ls hoạt động. aws s3 mb bị từ chối với AccessDenied. Không có access key nào được lưu trên EC2.",
        troubleshooting: [
          "aws commands trên EC2 bị lỗi 'Unable to locate credentials': instance profile chưa được attach — Stop instance → Actions → Security → Modify IAM role → chọn role → Update",
          "EC2 Instance Connect không kết nối được: kiểm tra Security Group của instance có cho phép inbound port 22 từ IP của EC2 Instance Connect service không (prefix list com.amazonaws.region.ec2-instance-connect)",
          "Role không xuất hiện trong dropdown khi launch EC2: role cần có trust policy cho ec2.amazonaws.com — kiểm tra trong IAM → Roles → role → Trust relationships",
        ],
      },
    ],
    codeSnippets: [
      {
        title: "Quản lý IAM Users và Groups qua CLI",
        language: "bash",
        code: `# Tạo IAM group
aws iam create-group --group-name dev-team

# Gán managed policy cho group
aws iam attach-group-policy \\
  --group-name dev-team \\
  --policy-arn arn:aws:iam::aws:policy/PowerUserAccess

# Tạo IAM user
aws iam create-user --user-name dev-user-01

# Thêm user vào group
aws iam add-user-to-group \\
  --user-name dev-user-01 \\
  --group-name dev-team

# Tạo access key cho user
aws iam create-access-key --user-name dev-user-01

# Liệt kê policies của group
aws iam list-attached-group-policies --group-name dev-team

# Kiểm tra permissions hiệu lực của user
aws iam simulate-principal-policy \\
  --policy-source-arn arn:aws:iam::123456789012:user/dev-user-01 \\
  --action-names s3:PutObject`,
      },
      {
        title: "IAM Policy - Least Privilege cho S3",
        language: "json",
        code: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "ListSpecificBucket",
      "Effect": "Allow",
      "Action": "s3:ListBucket",
      "Resource": "arn:aws:s3:::my-app-bucket",
      "Condition": {
        "StringLike": {
          "s3:prefix": ["uploads/*"]
        }
      }
    },
    {
      "Sid": "ReadWriteInUploadsFolder",
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject"
      ],
      "Resource": "arn:aws:s3:::my-app-bucket/uploads/*"
    },
    {
      "Sid": "DenyDeleteBucket",
      "Effect": "Deny",
      "Action": "s3:DeleteBucket",
      "Resource": "*"
    }
  ]
}`,
      },
      {
        title: "Assume Role và sử dụng Temporary Credentials",
        language: "bash",
        code: `# Assume role trong tài khoản khác (cross-account)
aws sts assume-role \\
  --role-arn arn:aws:iam::TARGET_ACCOUNT_ID:role/CrossAccountRole \\
  --role-session-name "my-session"

# Lưu credentials vào biến môi trường
export AWS_ACCESS_KEY_ID="<AccessKeyId từ output>"
export AWS_SECRET_ACCESS_KEY="<SecretAccessKey từ output>"
export AWS_SESSION_TOKEN="<SessionToken từ output>"

# Xác nhận đang dùng role
aws sts get-caller-identity

# Sau khi xong, unset để về credentials gốc
unset AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY AWS_SESSION_TOKEN

# Kiểm tra EC2 instance đang dùng role nào
# (chạy lệnh này từ bên trong EC2)
curl -s http://169.254.169.254/latest/meta-data/iam/security-credentials/`,
      },
    ],
    bestPractices: [
      "Luôn gán permissions cho Groups, không gán trực tiếp cho individual Users — dễ quản lý và audit hơn",
      "Dùng IAM Roles thay vì access keys cho ứng dụng chạy trên EC2, Lambda, ECS — credentials được rotate tự động",
      "Bật MFA cho tất cả IAM users có quyền truy cập Console, đặc biệt users có quyền cao",
      "Tạo Customer Managed Policy thay vì dùng Inline Policy — tái sử dụng được và dễ version control",
      "Không bao giờ hardcode access key trong source code hoặc commit lên Git — dùng Secrets Manager hoặc environment variables",
      "Định kỳ chạy IAM Access Analyzer và dùng IAM credential report để phát hiện quyền thừa và credentials cũ",
      "Áp dụng Permission Boundaries cho delegated admin để giới hạn quyền tối đa có thể cấp",
    ],
    commonMistakes: [
      {
        mistake:
          "Gán AdministratorAccess cho tất cả developers vì 'tiện'",
        fix: "Phân tích công việc thực tế của từng team, tạo custom policies với quyền tối thiểu cần thiết. Dùng PowerUserAccess cho developers nếu không cần quản lý IAM.",
      },
      {
        mistake:
          "Tạo access key cho EC2 instances và lưu trong ~/.aws/credentials trên máy chủ",
        fix: "Dùng IAM Role với EC2 Instance Profile — credentials được AWS cấp tự động và rotate định kỳ, không có key cố định nào có thể bị lộ.",
      },
      {
        mistake:
          "Dùng một IAM user/key chung cho toàn team hoặc nhiều ứng dụng",
        fix: "Mỗi người và mỗi ứng dụng cần IAM identity riêng. Điều này đảm bảo audit trail rõ ràng và có thể revoke quyền từng cá nhân/service độc lập.",
      },
      {
        mistake:
          "Không xóa access keys cũ sau khi rotate hoặc khi nhân viên nghỉ việc",
        fix: "Thiết lập quy trình offboarding: vô hiệu hóa và xóa access keys, remove user khỏi groups ngay lập tức. Dùng IAM credential report để phát hiện keys không được dùng >90 ngày.",
      },
    ],
    checklist: [
      {
        id: "iam-1",
        label: "Hiểu sự khác biệt giữa User, Group, Role, Policy",
        description:
          "Có thể giải thích khi nào dùng Role thay vì User, khi nào dùng Group",
      },
      {
        id: "iam-2",
        label: "Tạo IAM Groups với Managed Policies phù hợp",
        description:
          "Ít nhất 2 groups với policies khác nhau đã được tạo và test",
      },
      {
        id: "iam-3",
        label: "Tạo IAM Users và quản lý qua Groups",
        description:
          "Users được gán vào groups, không có policy nào gán trực tiếp vào user",
      },
      {
        id: "iam-4",
        label: "Kích hoạt MFA cho IAM users quan trọng",
        description:
          "Ít nhất admin user đã được bật MFA, test đăng nhập với MFA thành công",
      },
      {
        id: "iam-5",
        label: "Tạo và hiểu IAM Policy dạng JSON",
        description:
          "Đọc và viết được policy với Effect, Action, Resource, Condition",
      },
      {
        id: "iam-6",
        label: "Tạo IAM Role cho EC2 Instance Profile",
        description:
          "EC2 instance truy cập được S3 qua role, không cần hardcode credentials",
      },
      {
        id: "iam-7",
        label: "Hiểu và áp dụng Principle of Least Privilege",
        description:
          "Policy được viết với quyền tối thiểu, có Resource ARN cụ thể thay vì dùng *",
      },
      {
        id: "iam-8",
        label: "Sử dụng IAM Policy Simulator để test permissions",
        description:
          "Đã chạy simulate-principal-policy hoặc dùng Policy Simulator trên Console",
      },
    ],
    quiz: [
      {
        id: "q1-1",
        question:
          "Sự khác biệt cơ bản giữa IAM User và IAM Role là gì?",
        options: [
          {
            id: "q1-1-a",
            text: "User dành cho người dùng thông thường, Role chỉ dành cho AWS administrators",
            isCorrect: false,
          },
          {
            id: "q1-1-b",
            text: "User có credentials dài hạn (password, access key), Role cấp temporary credentials được assume bởi users, services hoặc applications",
            isCorrect: true,
          },
          {
            id: "q1-1-c",
            text: "Role mạnh hơn User vì có nhiều quyền hơn",
            isCorrect: false,
          },
          {
            id: "q1-1-d",
            text: "User và Role hoàn toàn giống nhau, chỉ khác tên gọi",
            isCorrect: false,
          },
        ],
        explanation:
          "IAM User có long-term credentials (password cho Console, access key ID + secret cho API). IAM Role không có credentials cố định — khi được assume, AWS STS cấp temporary credentials (có expiry). Role phù hợp cho EC2/Lambda (không muốn lưu key trên máy chủ), cross-account access, và federated users.",
      },
      {
        id: "q1-2",
        question:
          "Trong IAM Policy JSON, 'Effect: Deny' và 'Effect: Allow' tương tác với nhau như thế nào?",
        options: [
          {
            id: "q1-2-a",
            text: "Allow luôn thắng Deny vì được đặt sau",
            isCorrect: false,
          },
          {
            id: "q1-2-b",
            text: "Deny luôn thắng Allow — nếu có bất kỳ Deny nào áp dụng cho action, action đó bị từ chối dù có Allow",
            isCorrect: true,
          },
          {
            id: "q1-2-c",
            text: "Deny và Allow triệt tiêu nhau nếu cùng áp dụng cho một action",
            isCorrect: false,
          },
          {
            id: "q1-2-d",
            text: "Thứ tự xử lý phụ thuộc vào thứ tự Statement trong JSON",
            isCorrect: false,
          },
        ],
        explanation:
          "AWS IAM đánh giá theo thứ tự: mặc định Deny tất cả → kiểm tra Allow → kiểm tra Deny tường minh. Explicit Deny luôn override Allow, bất kể policy nào cấp Allow. Điều này quan trọng khi dùng Service Control Policies (SCP) trong Organizations hoặc muốn hard-block một action nhất định.",
      },
      {
        id: "q1-3",
        question:
          "Tại sao nên dùng IAM Role thay vì access keys cho EC2 instances?",
        options: [
          {
            id: "q1-3-a",
            text: "Role cho phép EC2 chạy nhanh hơn khi gọi AWS APIs",
            isCorrect: false,
          },
          {
            id: "q1-3-b",
            text: "Role miễn phí còn access key phải trả phí",
            isCorrect: false,
          },
          {
            id: "q1-3-c",
            text: "Temporary credentials từ Role được AWS rotate tự động, không có static key nào có thể bị lộ qua code hay logs",
            isCorrect: true,
          },
          {
            id: "q1-3-d",
            text: "Access key không hoạt động được trên EC2",
            isCorrect: false,
          },
        ],
        explanation:
          "Instance Profile gắn Role vào EC2 — credentials được cung cấp qua Instance Metadata Service (IMDS) và tự động rotate trước khi hết hạn. Không có static access key nào tồn tại trên disk, không thể bị lộ qua git commit, logs, hay memory dump. Đây là cách AWS khuyến nghị cho tất cả ứng dụng chạy trên EC2.",
      },
      {
        id: "q1-4",
        question:
          "Một developer cần upload files lên S3 bucket 'my-uploads' từ CLI. Policy nào tuân thủ Principle of Least Privilege?",
        options: [
          {
            id: "q1-4-a",
            text: '{ "Effect": "Allow", "Action": "*", "Resource": "*" }',
            isCorrect: false,
          },
          {
            id: "q1-4-b",
            text: '{ "Effect": "Allow", "Action": "s3:*", "Resource": "arn:aws:s3:::my-uploads/*" }',
            isCorrect: false,
          },
          {
            id: "q1-4-c",
            text: '{ "Effect": "Allow", "Action": ["s3:PutObject","s3:GetObject"], "Resource": "arn:aws:s3:::my-uploads/*" }',
            isCorrect: true,
          },
          {
            id: "q1-4-d",
            text: "Gán AmazonS3FullAccess managed policy",
            isCorrect: false,
          },
        ],
        explanation:
          "Principle of Least Privilege đòi hỏi chỉ cấp đúng actions cần thiết (PutObject để upload, GetObject để verify) trên đúng resource (chỉ bucket my-uploads). Dùng wildcard * cho Action hoặc Resource vi phạm nguyên tắc này. AmazonS3FullAccess cấp quyền trên tất cả S3 buckets và bao gồm cả DeleteBucket — quá rộng.",
      },
      {
        id: "q1-5",
        question:
          "IAM Group có thể chứa IAM Group khác không?",
        options: [
          {
            id: "q1-5-a",
            text: "Có, Group có thể lồng nhau tối đa 3 cấp",
            isCorrect: false,
          },
          {
            id: "q1-5-b",
            text: "Có, nhưng chỉ với AWS Organizations",
            isCorrect: false,
          },
          {
            id: "q1-5-c",
            text: "Không, IAM Group không hỗ trợ nesting — Group chỉ có thể chứa IAM Users",
            isCorrect: true,
          },
          {
            id: "q1-5-d",
            text: "Có, bằng cách dùng IAM Role trong Group",
            isCorrect: false,
          },
        ],
        explanation:
          "IAM Groups không hỗ trợ nested groups — một Group chỉ có thể chứa IAM Users, không thể chứa Group khác. Đây là giới hạn thiết kế của IAM. Để mô phỏng hierarchy, hãy dùng kết hợp nhiều groups và gán user vào nhiều groups, hoặc dùng AWS Organizations với SCPs cho quản lý phức tạp hơn.",
      },
      {
        id: "q1-6",
        question:
          "Làm thế nào để enforce MFA cho IAM users khi gọi API (không chỉ Console)?",
        options: [
          {
            id: "q1-6-a",
            text: "MFA tự động được enforce cho tất cả API calls khi bật trong IAM settings",
            isCorrect: false,
          },
          {
            id: "q1-6-b",
            text: "Thêm Condition 'aws:MultiFactorAuthPresent: true' vào IAM Policy — nếu không có MFA session, action bị Deny",
            isCorrect: true,
          },
          {
            id: "q1-6-c",
            text: "Dùng IAM password policy để enforce MFA",
            isCorrect: false,
          },
          {
            id: "q1-6-d",
            text: "Không thể enforce MFA cho programmatic API calls",
            isCorrect: false,
          },
        ],
        explanation:
          "Để require MFA cho sensitive API calls, thêm Condition vào policy: {\"Condition\": {\"BoolIfExists\": {\"aws:MultiFactorAuthPresent\": \"true\"}}}. User cần dùng aws sts get-session-token --serial-number <mfa-arn> --token-code <otp> để lấy temporary credentials với MFA token, sau đó dùng credentials đó cho các API calls được bảo vệ.",
      },
      {
        id: "q1-7",
        question:
          "IAM Policy Simulator dùng để làm gì và khi nào nên dùng?",
        options: [
          {
            id: "q1-7-a",
            text: "Simulate traffic load để test hiệu năng IAM service",
            isCorrect: false,
          },
          {
            id: "q1-7-b",
            text: "Tự động tạo policies dựa trên CloudTrail logs",
            isCorrect: false,
          },
          {
            id: "q1-7-c",
            text: "Kiểm tra xem một identity có được phép thực hiện action cụ thể không, trước khi deploy thực tế",
            isCorrect: true,
          },
          {
            id: "q1-7-d",
            text: "Đo thời gian phản hồi của IAM API calls",
            isCorrect: false,
          },
        ],
        explanation:
          "IAM Policy Simulator (Console: iam.amazonaws.com/policysim hoặc CLI: aws iam simulate-principal-policy) cho phép test 'user X có được làm action Y trên resource Z không?' mà không cần thực sự thực hiện action đó. Dùng khi viết policy mới, debug 'AccessDenied' errors, hoặc verify trước khi thay đổi quyền của user trong production.",
      },
    ],
    architecture: {
      title: "IAM Architecture",
      description:
        "Kiến trúc IAM: Users và Groups dùng long-term credentials, Roles cung cấp temporary access cho AWS services và cross-account scenarios.",
      nodes: [
        { id: "human", label: "Developer", sublabel: "Con người", type: "user" },
        {
          id: "iam-user",
          label: "IAM User",
          sublabel: "Long-term identity",
          type: "service",
        },
        {
          id: "iam-group",
          label: "IAM Group",
          sublabel: "Nhóm Users",
          type: "group",
        },
        {
          id: "iam-policy",
          label: "IAM Policy",
          sublabel: "JSON Permissions",
          type: "service",
        },
        {
          id: "iam-role",
          label: "IAM Role",
          sublabel: "Temporary identity",
          type: "service",
        },
        {
          id: "ec2",
          label: "EC2",
          sublabel: "Assume Role",
          type: "service",
        },
        {
          id: "s3",
          label: "S3",
          sublabel: "Resource",
          type: "service",
        },
        {
          id: "lambda",
          label: "Lambda",
          sublabel: "Assume Role",
          type: "service",
        },
      ],
      connections: [
        { from: "human", to: "iam-user", label: "belongs to" },
        { from: "iam-user", to: "iam-group", label: "member of" },
        { from: "iam-group", to: "iam-policy", label: "attached" },
        { from: "iam-user", to: "iam-policy", label: "direct attach" },
        { from: "iam-role", to: "iam-policy", label: "attached" },
        { from: "ec2", to: "iam-role", label: "assumes" },
        { from: "lambda", to: "iam-role", label: "assumes" },
        { from: "iam-role", to: "s3", label: "authorized access" },
        { from: "iam-policy", to: "s3", label: "controls access" },
      ],
    },
  },
];
