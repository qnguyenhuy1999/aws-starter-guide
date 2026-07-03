import type { Stage } from "@/types/guide";

export const stagesS2S3: Stage[] = [
  {
    id: 2,
    slug: "2-s3",
    title: "S3 - Lưu Trữ Đối Tượng",
    subtitle:
      "Lưu trữ vô hạn, bền vững với S3 buckets, versioning, và static hosting",
    difficulty: "beginner",
    estimatedTime: "1 tuần",
    services: ["S3", "CloudFront"],
    objectives: [
      "Tạo và cấu hình S3 bucket với các thiết lập bảo mật phù hợp",
      "Bật versioning để theo dõi lịch sử thay đổi của objects",
      "Cấu hình lifecycle policies để tự động chuyển đổi storage class và xóa objects cũ",
      "Triển khai static website hosting trực tiếp từ S3 bucket",
      "Viết và áp dụng bucket policy để kiểm soát quyền truy cập",
    ],
    concepts: [
      {
        title: "S3 Bucket",
        description:
          "Container lưu trữ objects trong S3. Mỗi bucket có tên duy nhất toàn cầu, thuộc về một region cụ thể. Bucket là đơn vị cấu hình chính: bạn đặt permissions, versioning, logging và lifecycle ở cấp bucket.",
      },
      {
        title: "Object & Key",
        description:
          "Object là đơn vị dữ liệu cơ bản trong S3, bao gồm data (tối đa 5TB) và metadata. Key là tên đường dẫn đầy đủ của object trong bucket, ví dụ: 'images/2024/photo.jpg'. S3 không có thư mục thật sự — dấu '/' trong key chỉ là quy ước hiển thị.",
      },
      {
        title: "Storage Classes",
        description:
          "S3 cung cấp nhiều tầng lưu trữ với chi phí và độ trễ khác nhau: Standard (truy cập thường xuyên), Standard-IA (truy cập không thường xuyên), One Zone-IA (một AZ, rẻ hơn), Glacier Instant Retrieval (lưu trữ lâu dài, truy xuất ngay), Glacier Flexible Retrieval (vài phút đến vài giờ), và Glacier Deep Archive (12–48 giờ, rẻ nhất).",
      },
      {
        title: "Versioning",
        description:
          "Khi bật versioning, S3 lưu mọi phiên bản của mỗi object thay vì ghi đè. Xóa object chỉ tạo delete marker — dữ liệu gốc vẫn còn. Tính năng này bảo vệ khỏi xóa nhầm và ghi đè không mong muốn, đồng thời là điều kiện tiên quyết để bật S3 Object Lock.",
      },
      {
        title: "Lifecycle Policies",
        description:
          "Quy tắc tự động chuyển objects giữa các storage class hoặc xóa chúng sau một số ngày nhất định. Ví dụ: chuyển sang Standard-IA sau 30 ngày, sang Glacier sau 90 ngày, xóa sau 365 ngày. Lifecycle áp dụng cho toàn bucket hoặc theo prefix/tag cụ thể.",
      },
      {
        title: "Bucket Policy & ACL",
        description:
          "Bucket Policy là tài liệu JSON gắn trực tiếp vào bucket, kiểm soát ai được làm gì với bucket và objects của nó — bao gồm cả cross-account access và public access. ACL (Access Control List) là cơ chế cũ hơn, hiện AWS khuyến nghị tắt ACL và dùng Bucket Policy + IAM thay thế.",
      },
    ],
    consoleSteps: [
      {
        title: "Tạo S3 Bucket mới",
        description:
          "Vào AWS Console → S3 → 'Create bucket'. Đặt tên bucket duy nhất toàn cầu (chữ thường, số, dấu gạch ngang). Chọn region gần nhất với người dùng. Giữ nguyên 'Block all public access' ở trạng thái bật nếu bucket dùng cho dữ liệu nội bộ. Nhấn 'Create bucket'.",
        imagePath: "/images/stage-2/step-1.png",
        alt: "Màn hình tạo S3 bucket với các trường tên và region",
      },
      {
        title: "Upload Object lên Bucket",
        description:
          "Vào bucket vừa tạo → tab 'Objects' → nhấn 'Upload'. Kéo thả file hoặc nhấn 'Add files'. Mở rộng phần 'Properties' để chọn storage class phù hợp. Mở rộng 'Metadata' nếu cần thêm custom metadata. Nhấn 'Upload' và chờ thanh tiến trình hoàn thành.",
        imagePath: "/images/stage-2/step-2.png",
        alt: "Giao diện upload file vào S3 bucket với tùy chọn storage class",
      },
      {
        title: "Cấu hình Static Website Hosting",
        description:
          "Vào bucket → tab 'Properties' → kéo xuống phần 'Static website hosting' → nhấn 'Edit'. Chọn 'Enable', nhập 'index.html' vào Index document và 'error.html' vào Error document. Lưu thay đổi. Sau đó vào tab 'Permissions' → tắt 'Block all public access' → thêm bucket policy cho phép s3:GetObject công khai.",
        imagePath: "/images/stage-2/step-3.png",
        alt: "Cài đặt static website hosting trong tab Properties của S3 bucket",
      },
      {
        title: "Cài đặt Lifecycle Rule",
        description:
          "Vào bucket → tab 'Management' → nhấn 'Create lifecycle rule'. Đặt tên rule, chọn phạm vi (toàn bucket hoặc theo prefix). Trong 'Lifecycle rule actions', chọn 'Transition current versions' và đặt ngày chuyển sang Standard-IA (30 ngày) và Glacier (90 ngày). Thêm 'Expire current versions' sau 365 ngày nếu muốn tự động xóa.",
        imagePath: "/images/stage-2/step-4.png",
        alt: "Giao diện tạo lifecycle rule với các tùy chọn transition và expiration",
      },
    ],
    labs: [
      {
        id: "lab-2-1",
        slug: "lab-2-s3-1",
        title: "Tạo S3 Bucket và Upload Files",
        stageId: 2,
        stageSlug: "2-s3",
        objective:
          "Tạo bucket với versioning và upload files qua Console và CLI",
        estimatedTime: "45 phút",
        steps: [
          "Tạo S3 bucket với tên duy nhất, chọn region ap-southeast-1 (Singapore)",
          "Bật versioning trên bucket vừa tạo trong tab Properties",
          "Upload một file bất kỳ (ví dụ: hello.txt) qua AWS Console",
          "Chỉnh sửa nội dung file và upload lại để tạo phiên bản mới",
          "Kiểm tra danh sách versions bằng cách bật 'Show versions' trong tab Objects",
          "Cài đặt AWS CLI và cấu hình credentials với `aws configure`",
          "Dùng lệnh `aws s3 sync` để đồng bộ thư mục local lên bucket và kiểm tra kết quả",
        ],
        expectedResult:
          "Bucket có versioning bật, ít nhất 2 phiên bản của cùng một file, và có thể thao tác với bucket qua CLI.",
        troubleshooting: [
          "Lỗi 'BucketAlreadyExists': tên bucket đã bị dùng toàn cầu, hãy thêm số ngẫu nhiên vào cuối tên",
          "Lỗi 'AccessDenied' khi dùng CLI: kiểm tra IAM user có policy AmazonS3FullAccess hoặc tương đương",
          "Versions không hiển thị: đảm bảo đã bật nút 'Show versions' trong giao diện Console",
          "Lệnh `aws configure` không nhận region: thêm `--region ap-southeast-1` trực tiếp vào lệnh aws s3",
        ],
      },
      {
        id: "lab-2-2",
        slug: "lab-2-s3-2",
        title: "S3 Static Website Hosting",
        stageId: 2,
        stageSlug: "2-s3",
        objective: "Deploy website tĩnh lên S3 với custom domain",
        estimatedTime: "60 phút",
        steps: [
          "Tạo bucket mới với tên trùng với domain bạn muốn dùng (hoặc dùng tên tùy ý để thực hành)",
          "Tắt 'Block all public access' và xác nhận thay đổi trong tab Permissions",
          "Bật Static website hosting trong tab Properties, đặt index document là index.html",
          "Tạo file index.html đơn giản và upload lên bucket",
          "Thêm bucket policy cho phép s3:GetObject với Principal: '*' cho toàn bucket",
          "Truy cập endpoint website S3 (dạng http://bucket-name.s3-website-region.amazonaws.com) và kiểm tra website hiển thị đúng",
        ],
        expectedResult:
          "Website tĩnh có thể truy cập công khai qua S3 website endpoint, hiển thị nội dung file index.html đã upload.",
        troubleshooting: [
          "Lỗi 403 Forbidden: kiểm tra bucket policy đã có s3:GetObject với Principal '*' và Block public access đã tắt",
          "Lỗi 404 Not Found: đảm bảo tên index document trong cài đặt khớp chính xác với tên file đã upload (phân biệt chữ hoa/thường)",
          "Website endpoint không hoạt động: dùng S3 website endpoint (có 's3-website') chứ không phải S3 REST endpoint",
          "CloudFront không cập nhật nội dung mới: tạo invalidation cho path '/*' trong CloudFront distribution",
        ],
      },
    ],
    codeSnippets: [
      {
        title: "AWS CLI - Các lệnh S3 cơ bản",
        language: "bash",
        code: `# Tạo bucket mới
aws s3 mb s3://my-bucket-name --region ap-southeast-1

# Upload một file
aws s3 cp local-file.txt s3://my-bucket-name/

# Upload thư mục (sync)
aws s3 sync ./dist s3://my-bucket-name/ --delete

# Liệt kê objects trong bucket
aws s3 ls s3://my-bucket-name/ --recursive --human-readable

# Download file từ bucket
aws s3 cp s3://my-bucket-name/file.txt ./downloaded-file.txt

# Xóa object
aws s3 rm s3://my-bucket-name/old-file.txt

# Xóa toàn bộ bucket (bao gồm objects)
aws s3 rb s3://my-bucket-name --force`,
      },
      {
        title: "Bucket Policy - Cho phép public read",
        language: "json",
        code: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::my-bucket-name/*"
    }
  ]
}`,
      },
      {
        title: "Tạo Presigned URL để chia sẻ file tạm thời",
        language: "bash",
        code: `# Tạo presigned URL có hiệu lực 1 giờ (3600 giây)
aws s3 presign s3://my-bucket-name/private-file.pdf \
  --expires-in 3600

# Tạo presigned URL bằng AWS SDK (Python boto3)
# python3 -c "
# import boto3
# s3 = boto3.client('s3', region_name='ap-southeast-1')
# url = s3.generate_presigned_url(
#     'get_object',
#     Params={'Bucket': 'my-bucket-name', 'Key': 'private-file.pdf'},
#     ExpiresIn=3600
# )
# print(url)
# "`,
      },
    ],
    bestPractices: [
      "Đặt tên bucket rõ ràng và nhất quán, ví dụ: {project}-{env}-{purpose} như myapp-prod-uploads",
      "Luôn bật versioning cho buckets chứa dữ liệu quan trọng để tránh mất mát do xóa nhầm",
      "Dùng lifecycle policies để tự động giảm chi phí — dữ liệu ít truy cập nên chuyển sang Glacier sau 90 ngày",
      "Không để bucket public nếu không thực sự cần thiết — dùng presigned URL để chia sẻ tạm thời",
      "Bật S3 Access Logging để theo dõi ai đang truy cập bucket, lưu log vào bucket riêng biệt",
      "Đừng lưu credentials AWS trong code — dùng IAM Role cho EC2/Lambda thay vì hardcode access key",
    ],
    commonMistakes: [
      {
        mistake: "Để Block Public Access tắt trên bucket chứa dữ liệu nhạy cảm",
        fix: "Chỉ tắt Block Public Access cho bucket static website. Tất cả bucket khác giữ nguyên mặc định Block All. Dùng presigned URL để chia sẻ file riêng tư.",
      },
      {
        mistake:
          "Không bật versioning trước khi thực hiện thao tác xóa hàng loạt",
        fix: "Bật versioning ngay khi tạo bucket, trước khi upload bất kỳ dữ liệu quan trọng nào. Không thể khôi phục objects đã xóa nếu versioning chưa bật.",
      },
      {
        mistake:
          "Dùng aws s3 sync --delete mà không kiểm tra kỹ — xóa nhầm files trên bucket",
        fix: "Chạy lệnh với flag --dryrun trước để xem danh sách files sẽ bị xóa, rồi mới bỏ flag đó để thực thi thật.",
      },
      {
        mistake:
          "Đặt tên bucket trùng với tên đã tồn tại — gây lỗi BucketAlreadyExists khó hiểu",
        fix: "Tên S3 bucket là duy nhất toàn cầu. Thêm hậu tố ngẫu nhiên hoặc Account ID vào tên để đảm bảo không trùng.",
      },
    ],
    checklist: [
      {
        id: "s3-1",
        label: "Tạo S3 bucket với tên hợp lệ và region phù hợp",
        description: "Tên bucket chữ thường, không chứa ký tự đặc biệt ngoài dấu gạch ngang",
      },
      {
        id: "s3-2",
        label: "Bật versioning trên bucket",
        description: "Xác nhận trạng thái Versioning hiển thị 'Enabled' trong tab Properties",
      },
      {
        id: "s3-3",
        label: "Upload file và kiểm tra có nhiều phiên bản",
        description: "Bật 'Show versions' để thấy Version ID của các lần upload",
      },
      {
        id: "s3-4",
        label: "Cấu hình lifecycle rule chuyển storage class",
        description: "Rule chuyển sang Standard-IA sau 30 ngày và Glacier sau 90 ngày",
      },
      {
        id: "s3-5",
        label: "Deploy static website và truy cập được qua endpoint",
        description: "URL dạng http://bucket.s3-website-region.amazonaws.com trả về nội dung đúng",
      },
      {
        id: "s3-6",
        label: "Viết và áp dụng bucket policy thành công",
        description: "Policy JSON hợp lệ, không có lỗi syntax, hiệu lực như mong muốn",
      },
      {
        id: "s3-7",
        label: "Thao tác với bucket qua AWS CLI (mb, cp, sync, ls)",
        description: "Tất cả lệnh chạy thành công, output hiển thị đúng",
      },
      {
        id: "s3-8",
        label: "Tạo presigned URL và kiểm tra quyền truy cập tạm thời",
        description: "URL hoạt động trong thời gian hiệu lực, hết hạn sau đó trả về 403",
      },
    ],
    quiz: [
      {
        id: "s3-q1",
        question: "Tên S3 bucket phải tuân theo quy tắc nào sau đây?",
        options: [
          { id: "s3-q1-a", text: "Có thể dùng chữ hoa và ký tự đặc biệt tùy ý", isCorrect: false },
          { id: "s3-q1-b", text: "Duy nhất trong cùng một AWS account", isCorrect: false },
          { id: "s3-q1-c", text: "Duy nhất toàn cầu trên toàn bộ AWS, chỉ dùng chữ thường và số", isCorrect: true },
          { id: "s3-q1-d", text: "Duy nhất trong cùng một region", isCorrect: false },
        ],
        explanation:
          "Tên S3 bucket phải duy nhất toàn cầu trên toàn bộ hạ tầng AWS (không chỉ trong account bạn), chỉ dùng chữ thường, số và dấu gạch ngang, độ dài 3–63 ký tự.",
      },
      {
        id: "s3-q2",
        question:
          "Khi versioning bật và bạn xóa một object, điều gì xảy ra với dữ liệu gốc?",
        options: [
          { id: "s3-q2-a", text: "Dữ liệu bị xóa vĩnh viễn ngay lập tức", isCorrect: false },
          { id: "s3-q2-b", text: "S3 tạo một delete marker, dữ liệu gốc vẫn tồn tại", isCorrect: true },
          { id: "s3-q2-c", text: "Dữ liệu chuyển sang Glacier tự động", isCorrect: false },
          { id: "s3-q2-d", text: "Object bị khóa, không thể truy cập nhưng vẫn tính phí", isCorrect: false },
        ],
        explanation:
          "Khi versioning bật, xóa object chỉ tạo một 'delete marker' — một object đặc biệt đánh dấu là đã xóa. Dữ liệu gốc các phiên bản cũ vẫn còn và có thể khôi phục bằng cách xóa delete marker đó.",
      },
      {
        id: "s3-q3",
        question:
          "Storage class nào phù hợp nhất cho dữ liệu backup ít truy cập, chấp nhận thời gian lấy lại 12–48 giờ?",
        options: [
          { id: "s3-q3-a", text: "S3 Standard", isCorrect: false },
          { id: "s3-q3-b", text: "S3 Standard-IA", isCorrect: false },
          { id: "s3-q3-c", text: "S3 Glacier Deep Archive", isCorrect: true },
          { id: "s3-q3-d", text: "S3 One Zone-IA", isCorrect: false },
        ],
        explanation:
          "S3 Glacier Deep Archive là storage class rẻ nhất của S3, phù hợp cho dữ liệu lưu trữ dài hạn hiếm khi cần truy cập. Thời gian truy xuất từ 12 đến 48 giờ, chi phí lưu trữ thấp hơn Standard khoảng 23 lần.",
      },
      {
        id: "s3-q4",
        question: "Presigned URL trong S3 dùng để làm gì?",
        options: [
          { id: "s3-q4-a", text: "Chia sẻ quyền truy cập tạm thời vào object private mà không cần cấp IAM permission", isCorrect: true },
          { id: "s3-q4-b", text: "Tăng tốc độ upload file lớn", isCorrect: false },
          { id: "s3-q4-c", text: "Mã hóa object khi lưu trữ", isCorrect: false },
          { id: "s3-q4-d", text: "Cho phép cross-region replication", isCorrect: false },
        ],
        explanation:
          "Presigned URL chứa thông tin xác thực được nhúng trong URL, cho phép bất kỳ ai có URL đó truy cập object private trong khoảng thời gian nhất định (do người tạo URL quy định), mà không cần có AWS account hay IAM permission.",
      },
      {
        id: "s3-q5",
        question: "Lifecycle policy trong S3 có thể thực hiện hành động nào?",
        options: [
          { id: "s3-q5-a", text: "Chỉ xóa objects sau một số ngày", isCorrect: false },
          { id: "s3-q5-b", text: "Chuyển objects giữa các storage class và/hoặc xóa objects sau thời gian định sẵn", isCorrect: true },
          { id: "s3-q5-c", text: "Sao chép objects sang region khác", isCorrect: false },
          { id: "s3-q5-d", text: "Mã hóa objects chưa được mã hóa", isCorrect: false },
        ],
        explanation:
          "Lifecycle policy có thể thực hiện hai loại hành động: Transition (chuyển sang storage class rẻ hơn sau N ngày) và Expiration (xóa object sau N ngày). Hai hành động này có thể kết hợp trong cùng một rule.",
      },
      {
        id: "s3-q6",
        question:
          "Điều nào sau đây ĐÚNG về S3 — S3 không phải là hệ thống file thông thường?",
        options: [
          { id: "s3-q6-a", text: "S3 có thư mục thật sự giống như hệ thống file Linux", isCorrect: false },
          { id: "s3-q6-b", text: "S3 là object storage — 'thư mục' chỉ là prefix trong key, không tồn tại vật lý", isCorrect: true },
          { id: "s3-q6-c", text: "S3 chỉ lưu được file nhỏ hơn 5GB", isCorrect: false },
          { id: "s3-q6-d", text: "S3 không hỗ trợ lưu trữ file nhị phân (binary)", isCorrect: false },
        ],
        explanation:
          "S3 là object storage, không phải file system. 'Thư mục' trong S3 Console chỉ là cách hiển thị objects có cùng prefix trong key (ví dụ 'images/'). Thực chất không có cấu trúc thư mục vật lý. S3 hỗ trợ objects tối đa 5TB.",
      },
    ],
    architecture: {
      title: "S3 Static Website với CloudFront",
      description:
        "CloudFront CDN phân phối nội dung từ S3 bucket đến người dùng toàn cầu với độ trễ thấp, đồng thời che giấu S3 endpoint gốc và thêm lớp bảo mật HTTPS.",
      nodes: [
        { id: "user", label: "Người dùng", sublabel: "Browser", type: "user" },
        { id: "cloudfront", label: "CloudFront", sublabel: "CDN Distribution", type: "service" },
        { id: "s3", label: "S3 Bucket", sublabel: "Origin", type: "service" },
        { id: "objects", label: "Objects", sublabel: "HTML, CSS, JS, Images", type: "service" },
        { id: "versioning", label: "Versioning", sublabel: "Version history", type: "service" },
      ],
      connections: [
        { from: "user", to: "cloudfront", label: "HTTPS request" },
        { from: "cloudfront", to: "s3", label: "Origin fetch" },
        { from: "s3", to: "objects", label: "Lưu trữ" },
        { from: "s3", to: "versioning", label: "Quản lý phiên bản" },
      ],
    },
  },
  {
    id: 3,
    slug: "3-ec2",
    title: "EC2 - Máy Chủ Ảo trên Cloud",
    subtitle:
      "Tạo và quản lý máy chủ ảo với EC2, AMIs, và Security Groups",
    difficulty: "beginner",
    estimatedTime: "1.5 tuần",
    services: ["EC2", "VPC"],
    objectives: [
      "Khởi chạy EC2 instance với đúng instance type và AMI phù hợp với workload",
      "Tạo và quản lý AMI (Amazon Machine Image) để tái sử dụng cấu hình",
      "Hiểu sự khác biệt giữa các instance types và chọn đúng loại cho từng mục đích",
      "Cấu hình Security Group để kiểm soát traffic vào/ra instance",
      "Kết nối vào instance qua SSH sử dụng key pair",
      "Gán Elastic IP để có địa chỉ IP tĩnh cho instance",
      "Viết User Data script để tự động cài đặt phần mềm khi instance khởi động",
    ],
    concepts: [
      {
        title: "EC2 Instance",
        description:
          "Máy chủ ảo chạy trên hạ tầng AWS. Mỗi instance là một máy tính với CPU, RAM, storage và network riêng biệt. Instance có trạng thái: pending, running, stopping, stopped, terminated. Chi phí tính theo giờ khi instance đang chạy (stopped instance vẫn tính phí EBS nhưng không tính phí compute).",
      },
      {
        title: "AMI - Amazon Machine Image",
        description:
          "Template chứa toàn bộ cấu hình để khởi chạy instance: hệ điều hành, ứng dụng đã cài đặt, cấu hình, và dữ liệu. AWS cung cấp AMI sẵn có (Amazon Linux, Ubuntu, Windows), bạn cũng có thể tạo AMI riêng từ instance đã cấu hình. AMI là snapshot của toàn bộ hệ thống tại một thời điểm.",
      },
      {
        title: "Instance Types",
        description:
          "EC2 có hàng trăm instance type, phân loại theo mục đích: General Purpose (t3, m6i) cân bằng CPU/RAM; Compute Optimized (c6i) nhiều CPU; Memory Optimized (r6i) nhiều RAM; Storage Optimized (i3) ổ đĩa nhanh; Accelerated Computing (p3, g4) có GPU. Số sau chữ cái là thế hệ — thế hệ mới hơn thường rẻ hơn và mạnh hơn.",
      },
      {
        title: "Security Group",
        description:
          "Firewall ảo gắn vào instance, kiểm soát traffic theo chiều vào (inbound) và chiều ra (outbound). Mỗi rule định nghĩa: protocol (TCP/UDP/ICMP), port range, và source/destination (IP, CIDR, hoặc Security Group khác). Mặc định: deny all inbound, allow all outbound. Security Group là stateful — traffic return của kết nối được phép tự động đi qua.",
      },
      {
        title: "Key Pair",
        description:
          "Cặp khóa mã hóa asymmetric dùng để xác thực SSH vào instance Linux. AWS giữ public key, bạn giữ private key (.pem file). Mất private key = mất khả năng SSH. Không thể lấy lại private key từ AWS — nếu mất, phải tạo AMI và launch instance mới với key pair mới.",
      },
      {
        title: "Elastic IP",
        description:
          "Địa chỉ IPv4 tĩnh do bạn sở hữu, không đổi khi stop/start instance. IP public thông thường của EC2 thay đổi mỗi lần restart. Elastic IP giải quyết vấn đề này. Lưu ý: Elastic IP MIỄN PHÍ khi đang gán cho instance đang chạy, nhưng bị tính phí khi không gán cho instance nào (để khuyến khích không giữ IP không dùng).",
      },
      {
        title: "User Data",
        description:
          "Script chạy một lần khi instance khởi động lần đầu tiên (first boot), với quyền root. Dùng để tự động hóa cài đặt: cập nhật OS, cài phần mềm, cấu hình service, pull code từ repository. Script bắt đầu bằng #!/bin/bash cho shell script, hoặc dùng cloud-init directives. Không chạy lại khi restart instance trừ khi cấu hình đặc biệt.",
      },
    ],
    consoleSteps: [
      {
        title: "Launch Instance Wizard - Cấu hình instance",
        description:
          "Vào EC2 Console → nhấn 'Launch instance'. Đặt tên instance. Chọn AMI (Amazon Linux 2023 cho người mới). Chọn instance type t3.micro (free tier eligible). Tạo hoặc chọn key pair hiện có và tải về file .pem. Trong Network settings, chọn VPC và subnet, bật 'Auto-assign public IP'. Cấu hình storage mặc định 8GB gp3 là đủ cho thực hành.",
        imagePath: "/images/stage-3/step-1.png",
        alt: "EC2 Launch Instance wizard hiển thị các tùy chọn AMI, instance type và key pair",
      },
      {
        title: "Cấu hình Security Group cho Web Server",
        description:
          "Trong phần 'Network settings' của Launch Instance wizard, nhấn 'Edit'. Tạo security group mới tên 'web-server-sg'. Thêm inbound rule: SSH (port 22) từ My IP. Thêm rule HTTP (port 80) từ Anywhere (0.0.0.0/0). Thêm rule HTTPS (port 443) từ Anywhere nếu cần. Outbound giữ mặc định Allow All. Nhấn 'Launch instance'.",
        imagePath: "/images/stage-3/step-2.png",
        alt: "Giao diện cấu hình Security Group với các inbound rules SSH và HTTP",
      },
      {
        title: "Kết nối SSH vào Instance",
        description:
          "Sau khi instance ở trạng thái 'Running', chọn instance → nhấn 'Connect'. Xem tab 'SSH client' để lấy lệnh SSH mẫu. Trên terminal local: `chmod 400 my-key.pem` rồi `ssh -i my-key.pem ec2-user@<public-ip>`. Với Ubuntu AMI dùng user 'ubuntu' thay vì 'ec2-user'. Khi thấy prompt bash trên server là đã kết nối thành công.",
        imagePath: "/images/stage-3/step-3.png",
        alt: "Màn hình Connect to Instance hiển thị lệnh SSH và thông tin kết nối",
      },
      {
        title: "Tạo AMI từ Instance đã cấu hình",
        description:
          "Sau khi cài đặt và cấu hình phần mềm trên instance, chọn instance trong danh sách → Actions → Image and templates → 'Create image'. Đặt tên và mô tả AMI. Cấu hình EBS volumes (giữ nguyên mặc định). Nhấn 'Create image'. AMI sẽ xuất hiện trong mục 'AMIs' sau vài phút ở trạng thái 'pending' rồi chuyển sang 'available'.",
        imagePath: "/images/stage-3/step-4.png",
        alt: "Dialog tạo AMI từ EC2 instance với tùy chọn tên và cấu hình EBS volumes",
      },
    ],
    labs: [
      {
        id: "lab-3-1",
        slug: "lab-3-ec2-1",
        title: "Launch EC2 Instance",
        stageId: 3,
        stageSlug: "3-ec2",
        objective:
          "Khởi chạy EC2 instance và SSH vào để cài web server",
        estimatedTime: "60 phút",
        steps: [
          "Launch EC2 instance t3.micro với Amazon Linux 2023, tạo key pair mới và tải về",
          "Tạo security group cho phép SSH từ IP của bạn và HTTP từ mọi nơi",
          "Chờ instance ở trạng thái Running, lấy Public IP từ Console",
          "Phân quyền file .pem bằng lệnh chmod 400, sau đó SSH vào instance",
          "Cập nhật OS và cài đặt Nginx: `sudo dnf update -y && sudo dnf install nginx -y`",
          "Khởi động Nginx: `sudo systemctl start nginx && sudo systemctl enable nginx`",
          "Mở trình duyệt, truy cập http://public-ip và xác nhận trang welcome của Nginx hiển thị",
        ],
        expectedResult:
          "Truy cập http://public-ip hiển thị trang welcome của Nginx. SSH vào instance hoạt động bình thường.",
        troubleshooting: [
          "SSH timeout: kiểm tra security group inbound rule SSH port 22 có đúng source IP không (IP có thể thay đổi nếu dùng IP động)",
          "Connection refused khi truy cập HTTP: kiểm tra security group có rule port 80, và Nginx đang chạy bằng `sudo systemctl status nginx`",
          "WARNING: UNPROTECTED PRIVATE KEY FILE: chạy `chmod 400 key.pem` để sửa quyền file",
          "Host key verification failed: xóa dòng cũ trong ~/.ssh/known_hosts hoặc dùng flag `-o StrictHostKeyChecking=no` (chỉ cho môi trường test)",
        ],
      },
      {
        id: "lab-3-2",
        slug: "lab-3-ec2-2",
        title: "Tạo Custom AMI",
        stageId: 3,
        stageSlug: "3-ec2",
        objective:
          "Tạo AMI từ instance đã cấu hình để tái sử dụng",
        estimatedTime: "45 phút",
        steps: [
          "Từ instance đang chạy Nginx ở lab trước, tạo AMI với tên 'nginx-base-ami'",
          "Chờ AMI ở trạng thái 'available' (3–5 phút)",
          "Launch instance mới từ AMI vừa tạo, không cần User Data vì Nginx đã có sẵn",
          "SSH vào instance mới và xác nhận Nginx đã được cài đặt sẵn",
          "So sánh thời gian setup: instance từ AMI tự tạo vs instance từ Amazon Linux gốc",
        ],
        expectedResult:
          "Instance mới launch từ AMI tùy chỉnh có Nginx đã cài đặt sẵn, không cần cài thêm.",
        troubleshooting: [
          "AMI stuck ở trạng thái pending: quá trình tạo AMI mất 3–10 phút, hãy kiên nhẫn chờ và refresh",
          "Instance từ AMI không có Nginx: kiểm tra AMI được tạo từ đúng instance có Nginx; xác nhận instance source đã cài và start Nginx trước khi tạo AMI",
          "Nginx không tự khởi động: dùng `sudo systemctl enable nginx` trước khi tạo AMI để đảm bảo service tự chạy khi boot",
        ],
      },
    ],
    codeSnippets: [
      {
        title: "SSH vào EC2 và các lệnh quản lý cơ bản",
        language: "bash",
        code: `# Phân quyền file key pair (bắt buộc trước khi SSH)
chmod 400 my-key-pair.pem

# SSH vào Amazon Linux / RHEL
ssh -i my-key-pair.pem ec2-user@<public-ip>

# SSH vào Ubuntu
ssh -i my-key-pair.pem ubuntu@<public-ip>

# Liệt kê instances đang chạy
aws ec2 describe-instances \
  --filters "Name=instance-state-name,Values=running" \
  --query "Reservations[*].Instances[*].[InstanceId,PublicIpAddress,InstanceType]" \
  --output table

# Dừng instance
aws ec2 stop-instances --instance-ids i-0123456789abcdef0

# Khởi động lại instance
aws ec2 start-instances --instance-ids i-0123456789abcdef0`,
      },
      {
        title: "User Data Script - Tự động cài Nginx khi boot",
        language: "bash",
        code: `#!/bin/bash
# Script này chạy tự động khi instance khởi động lần đầu

# Cập nhật hệ thống
dnf update -y

# Cài đặt Nginx
dnf install nginx -y

# Tạo trang welcome tùy chỉnh
cat > /usr/share/nginx/html/index.html <<EOF
<!DOCTYPE html>
<html>
<head><title>My AWS Server</title></head>
<body>
  <h1>Hello from EC2!</h1>
  <p>Instance ID: $(curl -s http://169.254.169.254/latest/meta-data/instance-id)</p>
  <p>Region: $(curl -s http://169.254.169.254/latest/meta-data/placement/region)</p>
</body>
</html>
EOF

# Khởi động và enable Nginx
systemctl start nginx
systemctl enable nginx

# Ghi log để debug
echo "User Data script completed at $(date)" >> /var/log/user-data.log`,
      },
      {
        title: "AWS CLI - Mô tả instances với filter nâng cao",
        language: "bash",
        code: `# Lấy thông tin chi tiết instance theo tag Name
aws ec2 describe-instances \
  --filters "Name=tag:Name,Values=my-web-server" \
  --query "Reservations[*].Instances[*].{ID:InstanceId,IP:PublicIpAddress,State:State.Name,Type:InstanceType}" \
  --output table

# Lấy instance metadata từ bên trong instance
# (chạy lệnh này khi đã SSH vào instance)
curl -s http://169.254.169.254/latest/meta-data/instance-id
curl -s http://169.254.169.254/latest/meta-data/instance-type
curl -s http://169.254.169.254/latest/meta-data/public-ipv4

# Tạo AMI từ instance đang chạy qua CLI
aws ec2 create-image \
  --instance-id i-0123456789abcdef0 \
  --name "nginx-base-$(date +%Y%m%d)" \
  --description "Nginx pre-installed AMI" \
  --no-reboot`,
      },
    ],
    bestPractices: [
      "Chọn instance type nhỏ nhất đáp ứng đủ yêu cầu, rồi scale up nếu cần — đừng over-provision từ đầu",
      "Luôn dùng IAM Role gắn vào instance thay vì lưu AWS credentials trong instance",
      "Tạo AMI định kỳ như một hình thức backup — trước mỗi thay đổi lớn hoặc theo lịch hàng tuần",
      "Không mở port SSH (22) từ 0.0.0.0/0 — chỉ allow từ IP cụ thể hoặc dùng AWS Systems Manager Session Manager thay SSH",
      "Dùng User Data để tự động hóa cài đặt — tránh cấu hình thủ công để đảm bảo reproducibility",
      "Đặt tag cho tất cả EC2 resources (Name, Environment, Project, Owner) để quản lý chi phí dễ hơn",
      "Đừng để instance chạy 24/7 khi không dùng trong môi trường dev/test — stop để tiết kiệm chi phí",
    ],
    commonMistakes: [
      {
        mistake: "Mất file .pem key pair và không còn cách SSH vào instance",
        fix: "Tạo AMI từ instance bị khóa, launch instance mới từ AMI đó với key pair mới. Hoặc dùng EC2 Instance Connect hoặc Systems Manager Session Manager (không cần key pair nếu đã cài SSM Agent).",
      },
      {
        mistake: "Mở port SSH từ 0.0.0.0/0 trong security group",
        fix: "Chỉ cho phép SSH từ IP cụ thể của bạn (chọn 'My IP' trong Console). Cân nhắc dùng AWS Systems Manager Session Manager để SSH mà không cần mở port 22 ra internet.",
      },
      {
        mistake: "Stop instance và ngạc nhiên vì Public IP thay đổi",
        fix: "IP public mặc định của EC2 thay đổi mỗi lần stop/start. Gán Elastic IP nếu cần IP tĩnh, hoặc dùng Elastic Load Balancer với DNS name cố định.",
      },
      {
        mistake: "Chạy tất cả ứng dụng trực tiếp trong instance mà không dùng container hay process manager",
        fix: "Dùng systemd để quản lý service, hoặc Docker/ECS cho containerized workload. Điều này đảm bảo ứng dụng tự khởi động sau reboot và dễ quản lý hơn.",
      },
    ],
    checklist: [
      {
        id: "ec2-1",
        label: "Launch EC2 instance t3.micro với Amazon Linux 2023",
        description: "Instance ở trạng thái Running, có Public IP",
      },
      {
        id: "ec2-2",
        label: "Tạo key pair và tải về file .pem thành công",
        description: "File .pem đã được lưu an toàn, không upload lên git",
      },
      {
        id: "ec2-3",
        label: "Cấu hình security group với rules SSH và HTTP phù hợp",
        description: "SSH chỉ từ IP của bạn, HTTP từ 0.0.0.0/0",
      },
      {
        id: "ec2-4",
        label: "SSH vào instance thành công",
        description: "Prompt bash của server hiển thị, không bị timeout hay permission error",
      },
      {
        id: "ec2-5",
        label: "Cài đặt Nginx và truy cập qua HTTP thành công",
        description: "http://public-ip hiển thị trang welcome của Nginx",
      },
      {
        id: "ec2-6",
        label: "Viết User Data script tự động cài Nginx khi boot",
        description: "Launch instance mới với User Data, Nginx tự động chạy mà không cần SSH",
      },
      {
        id: "ec2-7",
        label: "Tạo AMI từ instance đã cấu hình",
        description: "AMI ở trạng thái available trong mục AMIs",
      },
      {
        id: "ec2-8",
        label: "Launch instance mới từ AMI tùy chỉnh và xác nhận hoạt động",
        description: "Instance từ AMI có Nginx sẵn, không cần cài thêm",
      },
      {
        id: "ec2-9",
        label: "Gán Elastic IP và kiểm tra IP không đổi sau stop/start",
        description: "IP giữ nguyên sau khi stop và start lại instance",
      },
    ],
    quiz: [
      {
        id: "ec2-q1",
        question:
          "Điều gì xảy ra với Public IP của EC2 instance khi bạn stop rồi start lại?",
        options: [
          { id: "ec2-q1-a", text: "IP giữ nguyên không đổi", isCorrect: false },
          { id: "ec2-q1-b", text: "IP thay đổi thành một địa chỉ mới", isCorrect: true },
          { id: "ec2-q1-c", text: "Instance mất IP, không còn Public IP", isCorrect: false },
          { id: "ec2-q1-d", text: "IP thay đổi chỉ khi restart, không thay đổi khi stop/start", isCorrect: false },
        ],
        explanation:
          "Public IP mặc định của EC2 (không phải Elastic IP) được cấp từ pool động. Khi stop instance, IP được trả về pool và khi start lại sẽ nhận IP mới khác. Để có IP cố định, cần gán Elastic IP.",
      },
      {
        id: "ec2-q2",
        question: "Security Group trong EC2 hoạt động theo cơ chế nào?",
        options: [
          { id: "ec2-q2-a", text: "Stateless — mỗi packet được kiểm tra độc lập cả chiều vào và ra", isCorrect: false },
          { id: "ec2-q2-b", text: "Stateful — traffic return của kết nối được phép tự động, không cần rule riêng", isCorrect: true },
          { id: "ec2-q2-c", text: "Chỉ kiểm soát traffic vào, không kiểm soát traffic ra", isCorrect: false },
          { id: "ec2-q2-d", text: "Hoạt động ở tầng subnet, không phải instance", isCorrect: false },
        ],
        explanation:
          "Security Group là stateful: nếu bạn cho phép HTTP request vào port 80, response từ server tự động được phép đi ra mà không cần thêm outbound rule. Ngược lại, Network ACL (NACL) mới là stateless.",
      },
      {
        id: "ec2-q3",
        question: "Instance type nào phù hợp nhất cho ứng dụng cần nhiều RAM để xử lý in-memory database?",
        options: [
          { id: "ec2-q3-a", text: "c6i (Compute Optimized)", isCorrect: false },
          { id: "ec2-q3-b", text: "t3 (General Purpose, burstable)", isCorrect: false },
          { id: "ec2-q3-c", text: "r6i (Memory Optimized)", isCorrect: true },
          { id: "ec2-q3-d", text: "i3 (Storage Optimized)", isCorrect: false },
        ],
        explanation:
          "r6i thuộc dòng Memory Optimized, có tỷ lệ RAM/CPU cao, phù hợp cho in-memory databases (Redis, Memcached), real-time big data processing và các ứng dụng cần cache lớn trong RAM.",
      },
      {
        id: "ec2-q4",
        question: "User Data script trong EC2 chạy khi nào?",
        options: [
          { id: "ec2-q4-a", text: "Mỗi lần instance khởi động (boot)", isCorrect: false },
          { id: "ec2-q4-b", text: "Chỉ một lần duy nhất khi instance được tạo lần đầu (first boot)", isCorrect: true },
          { id: "ec2-q4-c", text: "Mỗi giờ một lần trong suốt thời gian instance chạy", isCorrect: false },
          { id: "ec2-q4-d", text: "Khi bạn thủ công trigger qua Console hoặc CLI", isCorrect: false },
        ],
        explanation:
          "Theo mặc định, User Data script chỉ chạy một lần khi instance khởi động lần đầu tiên (first boot). Nếu muốn chạy lại mỗi lần boot, cần thêm cấu hình cloud-init đặc biệt với persist directive.",
      },
      {
        id: "ec2-q5",
        question: "AMI (Amazon Machine Image) bao gồm những gì?",
        options: [
          { id: "ec2-q5-a", text: "Chỉ là hệ điều hành trống, không có ứng dụng", isCorrect: false },
          { id: "ec2-q5-b", text: "Hệ điều hành, ứng dụng đã cài, cấu hình và dữ liệu EBS snapshot", isCorrect: true },
          { id: "ec2-q5-c", text: "Chỉ là cấu hình network và security group", isCorrect: false },
          { id: "ec2-q5-d", text: "Instance type và vùng khả dụng được chọn sẵn", isCorrect: false },
        ],
        explanation:
          "AMI là template đầy đủ để tái tạo instance: bao gồm EBS snapshot của root volume (OS + ứng dụng + dữ liệu), thông tin launch permissions, và block device mapping. Launch instance từ AMI tái tạo chính xác trạng thái đã lưu.",
      },
      {
        id: "ec2-q6",
        question: "Elastic IP bị tính phí trong trường hợp nào?",
        options: [
          { id: "ec2-q6-a", text: "Khi gán cho instance đang chạy và được sử dụng tích cực", isCorrect: false },
          { id: "ec2-q6-b", text: "Khi không gán cho bất kỳ instance nào hoặc gán cho instance đang stopped", isCorrect: true },
          { id: "ec2-q6-c", text: "Elastic IP hoàn toàn miễn phí, không bao giờ bị tính phí", isCorrect: false },
          { id: "ec2-q6-d", text: "Chỉ tính phí khi Elastic IP được dùng để giao tiếp cross-region", isCorrect: false },
        ],
        explanation:
          "AWS miễn phí Elastic IP khi nó đang được gán cho instance đang chạy (running). Nhưng tính phí khi: EIP không gán cho instance nào, hoặc gán cho instance đang stopped, hoặc gán cho network interface không dùng. Đây là cách AWS khuyến khích không giữ IP không cần thiết.",
      },
      {
        id: "ec2-q7",
        question:
          "Cách an toàn nhất để EC2 instance truy cập các AWS service khác (S3, DynamoDB...) là?",
        options: [
          { id: "ec2-q7-a", text: "Tạo IAM user, lưu access key và secret key trong file cấu hình trên instance", isCorrect: false },
          { id: "ec2-q7-b", text: "Hardcode credentials vào source code của ứng dụng", isCorrect: false },
          { id: "ec2-q7-c", text: "Gán IAM Role vào instance — SDK tự động lấy credentials tạm thời", isCorrect: true },
          { id: "ec2-q7-d", text: "Dùng public endpoint và không cần xác thực", isCorrect: false },
        ],
        explanation:
          "IAM Role gắn vào EC2 instance là cách best practice. AWS SDK tự động lấy credentials tạm thời từ Instance Metadata Service (IMDS) và tự động rotate. Không bao giờ lưu AWS access key trực tiếp trong instance — nếu instance bị compromise, credentials cũng bị lộ.",
      },
    ],
    architecture: {
      title: "EC2 Instance trong VPC",
      description:
        "EC2 instance chạy trong Public Subnet, bảo vệ bởi Security Group. Internet Gateway cho phép traffic vào/ra. IAM Role gắn vào instance để truy cập S3 mà không cần credentials.",
      nodes: [
        { id: "internet", label: "Internet", type: "internet" },
        { id: "igw", label: "Internet Gateway", sublabel: "IGW", type: "service" },
        { id: "subnet", label: "Public Subnet", sublabel: "ap-southeast-1a", type: "group" },
        { id: "sg", label: "Security Group", sublabel: "Port 22, 80, 443", type: "service" },
        { id: "ec2", label: "EC2 Instance", sublabel: "t3.micro", type: "service" },
        { id: "s3", label: "S3 Bucket", sublabel: "via IAM Role", type: "service" },
      ],
      connections: [
        { from: "internet", to: "igw", label: "Public traffic" },
        { from: "igw", to: "subnet", label: "Route" },
        { from: "subnet", to: "sg", label: "Inbound filter" },
        { from: "sg", to: "ec2", label: "Allowed traffic" },
        { from: "ec2", to: "s3", label: "IAM Role" },
      ],
    },
  },
];
