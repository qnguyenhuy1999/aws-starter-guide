import type { Stage } from "@/types/guide";

export const stagesPart2: Stage[] = [
  {
    id: 8,
    slug: "8-lambda-api-gateway",
    title: "Lambda và API Gateway",
    subtitle: "Xây dựng serverless backend không cần quản lý server",
    difficulty: "intermediate",
    estimatedTime: "1.5 tuần",
    services: ["Lambda", "API Gateway"],
    objectives: [
      "Hiểu mô hình serverless và khi nào nên dùng Lambda thay vì EC2",
      "Tạo và cấu hình Lambda functions với nhiều loại triggers khác nhau",
      "Xây dựng REST API và HTTP API với API Gateway",
      "Cấu hình authorizers, CORS và deployment stages",
      "Quản lý versions, aliases và Lambda Layers",
    ],
    concepts: [
      {
        title: "AWS Lambda",
        description: "Lambda là dịch vụ compute serverless cho phép chạy code mà không cần quản lý server. Bạn chỉ trả tiền cho thời gian thực thi thực tế (tính theo millisecond). Lambda tự động scale từ 0 đến hàng nghìn concurrent executions.",
      },
      {
        title: "Event Sources và Triggers",
        description: "Lambda có thể được kích hoạt bởi hơn 200 dịch vụ AWS như API Gateway, S3, DynamoDB Streams, SQS, SNS, EventBridge. Mỗi invocation nhận một event object chứa thông tin từ nguồn trigger. Lambda xử lý event rồi trả về response.",
      },
      {
        title: "Lambda Execution Context",
        description: "Mỗi Lambda function chạy trong một execution environment riêng biệt với RAM từ 128MB đến 10GB và CPU tỉ lệ thuận. Timeout tối đa là 15 phút. Cold start xảy ra khi môi trường mới được khởi tạo; warm start tái sử dụng môi trường cũ để giảm latency.",
      },
      {
        title: "Lambda Layers",
        description: "Layers cho phép chia sẻ code, thư viện và dependencies giữa nhiều Lambda functions. Mỗi function có thể dùng tối đa 5 layers. Layers giúp giảm kích thước deployment package và tách biệt business logic khỏi dependencies.",
      },
      {
        title: "Versions và Aliases",
        description: "Lambda Versions là snapshot bất biến của function code và configuration. Aliases là con trỏ có tên trỏ đến một version cụ thể. Bạn có thể dùng alias để implement blue/green deployment bằng cách phân chia traffic giữa hai versions.",
      },
      {
        title: "API Gateway REST API vs HTTP API",
        description: "REST API là tùy chọn đầy đủ tính năng hỗ trợ usage plans, API keys, request validation và caching. HTTP API là tùy chọn nhẹ hơn, nhanh hơn và rẻ hơn 70%, phù hợp cho các use case đơn giản. WebSocket API hỗ trợ kết nối hai chiều realtime.",
      },
      {
        title: "API Gateway Authorizers",
        description: "Lambda Authorizer cho phép bạn viết custom logic xác thực bằng JWT, OAuth hoặc bất kỳ cơ chế nào. Cognito User Pools Authorizer tích hợp trực tiếp với AWS Cognito. IAM Authorization dùng AWS Signature Version 4 để xác thực request.",
      },
    ],
    consoleSteps: [
      {
        title: "Tạo Lambda Function đầu tiên",
        description: "Vào Lambda Console, chọn Create function, chọn Author from scratch, đặt tên function, chọn runtime Node.js 20.x, cấu hình execution role với AWSLambdaBasicExecutionRole. Sau khi tạo, viết code trong inline editor và nhấn Deploy.",
        imagePath: "/images/stage-8/step-1.png",
        alt: "Màn hình tạo Lambda function mới trong AWS Console",
      },
      {
        title: "Cấu hình Environment Variables và Memory",
        description: "Trong tab Configuration, vào Environment variables để thêm các biến môi trường như DATABASE_URL, API_KEY. Vào General configuration để điều chỉnh Memory (128MB-10GB) và Timeout (tối đa 15 phút). Tăng memory cũng tăng CPU tỉ lệ thuận.",
        imagePath: "/images/stage-8/step-2.png",
        alt: "Cấu hình environment variables và memory cho Lambda function",
      },
      {
        title: "Tạo API Gateway HTTP API",
        description: "Vào API Gateway Console, chọn Create API, chọn HTTP API, đặt tên API. Thêm integration với Lambda function vừa tạo. Cấu hình routes (GET /items, POST /items), deployment stage (dev/prod) và CORS settings.",
        imagePath: "/images/stage-8/step-3.png",
        alt: "Tạo HTTP API trong API Gateway với Lambda integration",
      },
      {
        title: "Kiểm tra với Test Event",
        description: "Trong Lambda Console, dùng tab Test để tạo test event. Chọn template phù hợp (API Gateway HTTP API, S3 Put, SQS). Nhấn Test để invoke function và xem kết quả trong Execution results panel bao gồm response, duration và logs.",
        imagePath: "/images/stage-8/step-4.png",
        alt: "Chạy test event cho Lambda function và xem kết quả",
      },
      {
        title: "Xem CloudWatch Logs",
        description: "Trong Lambda Console, vào tab Monitor, nhấn View CloudWatch logs. Mỗi Lambda invocation tạo log stream riêng. Xem START, END, REPORT lines để biết duration, billed duration và memory used. Dùng Log Insights để query logs hiệu quả.",
        imagePath: "/images/stage-8/step-5.png",
        alt: "CloudWatch Logs cho Lambda function với execution details",
      },
    ],
    labs: [
      {
        id: "lab-8-lambda-api-gateway-1",
        slug: "lab-8-lambda-api-gateway-1",
        title: "Xây dựng CRUD API Serverless với Lambda và API Gateway",
        stageId: 8,
        stageSlug: "8-lambda-api-gateway",
        objective: "Tạo một REST API hoàn chỉnh để quản lý danh sách tasks sử dụng Lambda functions và API Gateway HTTP API, lưu dữ liệu vào DynamoDB",
        estimatedTime: "90 phút",
        steps: [
          "Tạo DynamoDB table 'tasks' với partition key 'id' (String)",
          "Tạo IAM role 'lambda-tasks-role' với policies: AWSLambdaBasicExecutionRole và AmazonDynamoDBFullAccess",
          "Tạo Lambda function 'tasks-handler' với runtime Node.js 20.x, gán role vừa tạo, thêm env var TABLE_NAME=tasks",
          "Viết handler code xử lý các method GET/POST/PUT/DELETE dựa trên event.requestContext.http.method và event.pathParameters",
          "Tạo HTTP API trong API Gateway, thêm Lambda integration, tạo routes: GET /tasks, POST /tasks, GET /tasks/{id}, PUT /tasks/{id}, DELETE /tasks/{id}",
          "Deploy API lên stage dev và lấy invoke URL",
          "Test API bằng curl hoặc Postman: tạo task, lấy danh sách, cập nhật và xóa task",
        ],
        expectedResult: "API hoạt động đúng với tất cả 5 endpoints CRUD. Response trả về JSON với status codes 200/201/404 phù hợp. Lambda logs hiển thị trong CloudWatch với thông tin execution time dưới 100ms cho warm starts.",
        troubleshooting: [
          "Lỗi AccessDeniedException khi Lambda gọi DynamoDB: Kiểm tra IAM role đã được gán đúng và có AmazonDynamoDBFullAccess policy",
          "Lỗi 500 Internal Server Error: Xem CloudWatch logs của Lambda function để tìm stack trace, thường do code syntax error hoặc thiếu import",
          "CORS error khi gọi từ browser: Vào API Gateway, cấu hình CORS cho phép origin, methods và headers phù hợp trong phần CORS settings của HTTP API",
        ],
      },
      {
        id: "lab-8-lambda-api-gateway-2",
        slug: "lab-8-lambda-api-gateway-2",
        title: "Lambda Layers, Versions và Blue/Green Deployment",
        stageId: 8,
        stageSlug: "8-lambda-api-gateway",
        objective: "Tạo Lambda Layer chứa shared utilities, publish versions và cấu hình alias để thực hiện blue/green deployment với traffic shifting",
        estimatedTime: "60 phút",
        steps: [
          "Tạo thư mục nodejs/node_modules/utils, viết file index.js chứa shared helper functions (formatResponse, validateInput, logger)",
          "Zip thư mục nodejs/ thành layer.zip và upload lên Lambda Layers với tên shared-utils, runtime Node.js 20.x",
          "Cập nhật Lambda function để import từ layer: require('/opt/nodejs/utils')",
          "Publish Version 1 của function từ Actions > Publish new version với description v1.0 - initial release",
          "Tạo alias prod trỏ đến Version 1, tạo alias dev trỏ đến $LATEST",
          "Sửa code function, deploy và publish Version 2",
          "Cập nhật alias prod để phân chia traffic: 90% Version 1, 10% Version 2 (canary deployment), sau đó chuyển 100% sang Version 2",
        ],
        expectedResult: "Layer được dùng thành công bởi Lambda function. Hai versions hoạt động độc lập. Alias prod phân chia traffic đúng tỉ lệ. CloudWatch metrics hiển thị invocations cho từng version riêng biệt.",
        troubleshooting: [
          "Layer không tìm thấy module: Đảm bảo cấu trúc thư mục đúng là nodejs/node_modules/ cho Node.js runtime",
          "Không thể publish version khi function đang có unsaved changes: Nhấn Deploy trước để lưu code changes, sau đó mới publish version",
          "Traffic shifting không hoạt động với $LATEST: Chỉ có thể phân chia traffic giữa hai published versions cụ thể, không dùng được $LATEST",
        ],
      },
    ],
    codeSnippets: [
      {
        title: "Lambda Handler với CRUD DynamoDB",
        language: "js",
        code: `const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, GetCommand, PutCommand, DeleteCommand, ScanCommand } = require('@aws-sdk/lib-dynamodb');
const { randomUUID } = require('crypto');

const client = new DynamoDBClient({});
const ddb = DynamoDBDocumentClient.from(client);
const TABLE = process.env.TABLE_NAME;

exports.handler = async (event) => {
  const method = event.requestContext.http.method;
  const id = event.pathParameters?.id;
  try {
    if (method === 'GET' && !id) {
      const { Items } = await ddb.send(new ScanCommand({ TableName: TABLE }));
      return respond(200, Items);
    }
    if (method === 'GET' && id) {
      const { Item } = await ddb.send(new GetCommand({ TableName: TABLE, Key: { id } }));
      return Item ? respond(200, Item) : respond(404, { message: 'Not found' });
    }
    if (method === 'POST') {
      const body = JSON.parse(event.body);
      const item = { id: randomUUID(), ...body, createdAt: new Date().toISOString() };
      await ddb.send(new PutCommand({ TableName: TABLE, Item: item }));
      return respond(201, item);
    }
    if (method === 'DELETE' && id) {
      await ddb.send(new DeleteCommand({ TableName: TABLE, Key: { id } }));
      return respond(200, { message: 'Deleted' });
    }
    return respond(405, { message: 'Method not allowed' });
  } catch (err) {
    console.error(err);
    return respond(500, { message: 'Internal server error' });
  }
};

const respond = (statusCode, body) => ({
  statusCode,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});`,
      },
      {
        title: "Tạo Lambda Function và HTTP API bằng AWS CLI",
        language: "bash",
        code: `# Tạo IAM role cho Lambda
aws iam create-role \\
  --role-name lambda-api-role \\
  --assume-role-policy-document '{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Principal":{"Service":"lambda.amazonaws.com"},"Action":"sts:AssumeRole"}]}'

aws iam attach-role-policy \\
  --role-name lambda-api-role \\
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole

# Đóng gói và tạo Lambda function
zip function.zip index.js
ACCOUNT=$(aws sts get-caller-identity --query Account --output text)

aws lambda create-function \\
  --function-name tasks-handler \\
  --runtime nodejs20.x \\
  --role arn:aws:iam::$ACCOUNT:role/lambda-api-role \\
  --handler index.handler \\
  --zip-file fileb://function.zip \\
  --environment Variables="{TABLE_NAME=tasks}"

# Tạo HTTP API
API_ID=$(aws apigatewayv2 create-api \\
  --name tasks-api \\
  --protocol-type HTTP \\
  --cors-configuration AllowOrigins='["*"]',AllowMethods='["GET","POST","PUT","DELETE"]',AllowHeaders='["Content-Type"]' \\
  --query ApiId --output text)

echo "API URL: https://$API_ID.execute-api.ap-southeast-1.amazonaws.com/dev"`,
      },
      {
        title: "Lambda Layer cấu trúc thư mục và upload",
        language: "bash",
        code: `# Tạo cấu trúc thư mục cho Lambda Layer
mkdir -p my-layer/nodejs
cd my-layer/nodejs
cat > package.json << 'EOF'
{
  "name": "lambda-shared-utils",
  "version": "1.0.0",
  "dependencies": {
    "axios": "^1.6.0",
    "dayjs": "^1.11.0"
  }
}
EOF
npm install
cd ..
zip -r layer.zip nodejs/

# Upload lên AWS Lambda Layers
aws lambda publish-layer-version \\
  --layer-name shared-utils \\
  --description "Shared utilities: axios, dayjs" \\
  --zip-file fileb://layer.zip \\
  --compatible-runtimes nodejs18.x nodejs20.x`,
      },
    ],
    bestPractices: [
      "Giữ Lambda function nhỏ và tập trung vào một nhiệm vụ; tránh viết monolithic handler xử lý quá nhiều logic",
      "Dùng environment variables cho tất cả configuration, không hardcode ARNs, URLs hay credentials trong code",
      "Đặt timeout hợp lý: không quá ngắn (gây timeout sớm) và không quá dài (tốn tiền cho hung functions)",
      "Tận dụng Provisioned Concurrency cho các endpoints cần latency thấp và nhất quán để tránh cold starts",
      "Không lưu state trong Lambda execution context giữa các invocations; dùng DynamoDB hoặc ElastiCache cho shared state",
      "Dùng Lambda Power Tuning để tìm điểm cân bằng tối ưu giữa memory, performance và chi phí",
      "Implement idempotency cho Lambda functions xử lý SQS/SNS để tránh tác dụng phụ khi retry",
      "Dùng HTTP API thay REST API khi không cần tính năng nâng cao để tiết kiệm chi phí 70%",
    ],
    commonMistakes: [
      {
        mistake: "Tạo database connection mới trong mỗi Lambda invocation",
        fix: "Khai báo DB connection ngoài handler function để tái sử dụng qua warm invocations, giảm latency đáng kể",
      },
      {
        mistake: "Cấp quyền quá rộng cho Lambda execution role (AdministratorAccess)",
        fix: "Tuân theo nguyên tắc least privilege, chỉ cấp đúng permissions cần thiết cho các resources cụ thể",
      },
      {
        mistake: "Không xử lý lỗi và để Lambda crash silently",
        fix: "Wrap handler trong try-catch, log error details và trả về response có ý nghĩa với status code phù hợp",
      },
      {
        mistake: "Deploy toàn bộ node_modules vào function package thay vì dùng Layers",
        fix: "Tách dependencies thành Lambda Layers để giảm deployment package size, tăng tốc độ deploy và tái sử dụng giữa functions",
      },
      {
        mistake: "Không enable CORS đúng cách dẫn đến browser block requests",
        fix: "Cấu hình CORS trong API Gateway settings và đảm bảo Lambda response bao gồm đúng Access-Control headers",
      },
    ],
    checklist: [
      { id: "s8-c1", label: "Tạo Lambda function với runtime và execution role phù hợp", description: "Function đã có IAM role với least-privilege permissions" },
      { id: "s8-c2", label: "Cấu hình environment variables và không hardcode secrets" },
      { id: "s8-c3", label: "Thiết lập timeout và memory phù hợp với workload" },
      { id: "s8-c4", label: "Tạo API Gateway (HTTP API hoặc REST API) với Lambda integration" },
      { id: "s8-c5", label: "Cấu hình CORS cho API Gateway nếu gọi từ browser" },
      { id: "s8-c6", label: "Kiểm tra CloudWatch Logs có ghi lại invocations và errors" },
      { id: "s8-c7", label: "Tạo Lambda Layer cho shared dependencies" },
      { id: "s8-c8", label: "Publish version và tạo alias cho production deployment" },
    ],
    quiz: [
      {
        id: "s8-q1",
        question: "Lambda cold start xảy ra trong trường hợp nào?",
        options: [
          { id: "s8-q1-a", text: "Khi function được invoke lần đầu hoặc sau thời gian không hoạt động, cần khởi tạo execution environment mới", isCorrect: true },
          { id: "s8-q1-b", text: "Khi function bị lỗi và cần restart", isCorrect: false },
          { id: "s8-q1-c", text: "Khi memory của function không đủ", isCorrect: false },
          { id: "s8-q1-d", text: "Khi concurrency limit bị vượt quá", isCorrect: false },
        ],
        explanation: "Cold start xảy ra khi AWS cần khởi tạo một execution environment mới: lần invoke đầu tiên, sau khi function không được gọi trong một thời gian, hoặc khi cần scale out. Provisioned Concurrency giúp giảm cold start bằng cách giữ environments luôn warm.",
      },
      {
        id: "s8-q2",
        question: "Sự khác biệt chính giữa HTTP API và REST API trong API Gateway là gì?",
        options: [
          { id: "s8-q2-a", text: "HTTP API chỉ hỗ trợ GET và POST methods", isCorrect: false },
          { id: "s8-q2-b", text: "HTTP API rẻ hơn ~70% và nhanh hơn nhưng thiếu một số tính năng nâng cao như usage plans và request caching", isCorrect: true },
          { id: "s8-q2-c", text: "REST API không hỗ trợ Lambda integration", isCorrect: false },
          { id: "s8-q2-d", text: "HTTP API không hỗ trợ CORS", isCorrect: false },
        ],
        explanation: "HTTP API được tối ưu cho hiệu suất và chi phí thấp hơn REST API khoảng 70%. Tuy nhiên REST API có nhiều tính năng hơn như usage plans, API keys, request/response transformation, caching và WAF integration trực tiếp.",
      },
      {
        id: "s8-q3",
        question: "Lambda Alias được dùng để làm gì?",
        options: [
          { id: "s8-q3-a", text: "Đổi tên Lambda function", isCorrect: false },
          { id: "s8-q3-b", text: "Tạo backup cho function code", isCorrect: false },
          { id: "s8-q3-c", text: "Trỏ đến một version cụ thể và hỗ trợ traffic shifting giữa hai versions để blue/green deployment", isCorrect: true },
          { id: "s8-q3-d", text: "Chia sẻ function giữa nhiều AWS accounts", isCorrect: false },
        ],
        explanation: "Lambda Alias là con trỏ có tên (như prod, staging) trỏ đến một version cụ thể. Alias hỗ trợ traffic shifting, cho phép gửi ví dụ 90% traffic đến version 1 và 10% đến version 2 để canary deployment an toàn.",
      },
      {
        id: "s8-q4",
        question: "Mục đích của Lambda Layers là gì?",
        options: [
          { id: "s8-q4-a", text: "Tăng bộ nhớ cho Lambda function", isCorrect: false },
          { id: "s8-q4-b", text: "Chia sẻ code, thư viện và dependencies giữa nhiều Lambda functions để tái sử dụng và giảm deployment package size", isCorrect: true },
          { id: "s8-q4-c", text: "Chạy Lambda function trong VPC", isCorrect: false },
          { id: "s8-q4-d", text: "Mã hóa environment variables", isCorrect: false },
        ],
        explanation: "Lambda Layers cho phép đóng gói và chia sẻ libraries, custom runtimes, và configuration files. Mỗi function có thể dùng tối đa 5 layers. Điều này giúp giảm kích thước deployment package, tái sử dụng code và cập nhật dependencies độc lập với function code.",
      },
      {
        id: "s8-q5",
        question: "Giới hạn timeout tối đa của một Lambda function là bao nhiêu?",
        options: [
          { id: "s8-q5-a", text: "5 phút", isCorrect: false },
          { id: "s8-q5-b", text: "15 phút", isCorrect: true },
          { id: "s8-q5-c", text: "30 phút", isCorrect: false },
          { id: "s8-q5-d", text: "1 giờ", isCorrect: false },
        ],
        explanation: "Lambda có timeout tối đa là 15 phút (900 giây). Nếu cần xử lý lâu hơn, hãy dùng Step Functions để orchestrate nhiều Lambda functions, hoặc chuyển sang ECS/EC2 cho long-running workloads.",
      },
      {
        id: "s8-q6",
        question: "Lambda Authorizer trong API Gateway hoạt động như thế nào?",
        options: [
          { id: "s8-q6-a", text: "Tự động block tất cả requests không có API key", isCorrect: false },
          { id: "s8-q6-b", text: "Gọi một Lambda function để validate token/credentials và trả về IAM policy quyết định allow/deny request", isCorrect: true },
          { id: "s8-q6-c", text: "Mã hóa request payload trước khi gửi đến Lambda backend", isCorrect: false },
          { id: "s8-q6-d", text: "Chỉ cho phép requests từ các IP đã whitelist", isCorrect: false },
        ],
        explanation: "Lambda Authorizer nhận request header/query string, gọi một Lambda function để validate (JWT, OAuth, custom logic). Function trả về IAM policy (Allow/Deny) và context data. API Gateway cache kết quả để tối ưu performance.",
      },
    ],
    architecture: {
      title: "Serverless API Architecture với Lambda và API Gateway",
      description: "Client gửi HTTP request đến API Gateway, sau đó trigger Lambda function để xử lý business logic và tương tác với DynamoDB",
      nodes: [
        { id: "client", label: "Client", sublabel: "Browser / Mobile App", type: "user" },
        { id: "apigw", label: "API Gateway", sublabel: "HTTP API", type: "service" },
        { id: "authorizer", label: "Lambda Authorizer", sublabel: "JWT Validation", type: "service" },
        { id: "lambda", label: "Lambda Function", sublabel: "Business Logic", type: "service" },
        { id: "dynamodb", label: "DynamoDB", sublabel: "Data Store", type: "service" },
        { id: "cloudwatch", label: "CloudWatch", sublabel: "Logs & Metrics", type: "service" },
      ],
      connections: [
        { from: "client", to: "apigw", label: "HTTPS Request" },
        { from: "apigw", to: "authorizer", label: "Authorize" },
        { from: "apigw", to: "lambda", label: "Invoke" },
        { from: "lambda", to: "dynamodb", label: "Read/Write" },
        { from: "lambda", to: "cloudwatch", label: "Logs" },
      ],
    },
  },

  {
    id: 9,
    slug: "9-messaging-event-driven",
    title: "Messaging và Event-Driven Architecture",
    subtitle: "Xây dựng hệ thống async, loosely-coupled với SQS, SNS và EventBridge",
    difficulty: "intermediate",
    estimatedTime: "1 tuần",
    services: ["SQS", "SNS", "EventBridge"],
    objectives: [
      "Hiểu sự khác biệt giữa message queue (SQS) và pub/sub (SNS)",
      "Cấu hình SQS Standard và FIFO queues với Dead Letter Queue",
      "Xây dựng fan-out pattern với SNS và nhiều SQS subscribers",
      "Sử dụng EventBridge để tạo event-driven workflows với custom rules",
      "Thiết kế hệ thống loosely-coupled sử dụng async messaging",
    ],
    concepts: [
      {
        title: "Amazon SQS (Simple Queue Service)",
        description: "SQS là dịch vụ message queue được quản lý hoàn toàn, cho phép decoupling các component trong hệ thống. Producer gửi message vào queue, consumer poll và xử lý message. Message được lưu trữ cho đến khi được xử lý thành công hoặc hết retention period (tối đa 14 ngày).",
      },
      {
        title: "SQS Standard vs FIFO Queue",
        description: "Standard Queue cung cấp throughput không giới hạn, at-least-once delivery và best-effort ordering. FIFO Queue đảm bảo exactly-once processing và first-in-first-out ordering, giới hạn 300 TPS (hoặc 3000 TPS với batching). FIFO dùng cho các use case cần thứ tự chính xác như financial transactions.",
      },
      {
        title: "Visibility Timeout và Dead Letter Queue",
        description: "Khi consumer nhận message, message bị ẩn (invisible) trong thời gian Visibility Timeout (default 30s). Nếu consumer không xóa message trong thời gian này, message sẽ hiện lại để consumer khác xử lý. Dead Letter Queue (DLQ) nhận các message thất bại sau maxReceiveCount lần để debug và tránh message độc gây vòng lặp vô tận.",
      },
      {
        title: "Amazon SNS (Simple Notification Service)",
        description: "SNS là dịch vụ pub/sub messaging cho phép publish message đến nhiều subscribers cùng lúc (fan-out). Một topic có thể có nhiều subscriptions gồm SQS, Lambda, HTTP endpoints, email, SMS. SNS push messages đến subscribers ngay lập tức, khác với SQS nơi consumer phải chủ động poll.",
      },
      {
        title: "SNS Fan-out Pattern",
        description: "Fan-out pattern kết hợp SNS với nhiều SQS queues để xử lý song song. Ví dụ: khi đơn hàng được tạo, SNS topic nhận event và fan-out đến SQS queues cho payment service, inventory service và notification service. Mỗi service xử lý độc lập mà không ảnh hưởng nhau.",
      },
      {
        title: "Amazon EventBridge",
        description: "EventBridge là serverless event bus cho phép kết nối applications với events từ AWS services, SaaS apps và custom sources. Rules định nghĩa event patterns để filter và route events đến targets. EventBridge hỗ trợ 90+ AWS service sources và có thể transform events trước khi gửi đến targets.",
      },
      {
        title: "Event-Driven Architecture Patterns",
        description: "Event-driven architecture decouples producers và consumers thông qua events. Các pattern chính gồm: Event Notification (thông báo về state change), Event-Carried State Transfer (event chứa đủ data), Event Sourcing (lưu trạng thái dưới dạng sequence of events). Loose coupling giúp hệ thống dễ scale và maintain.",
      },
    ],
    consoleSteps: [
      {
        title: "Tạo SQS Queue với Dead Letter Queue",
        description: "Vào SQS Console, chọn Create queue. Đặt tên queue, chọn type Standard hoặc FIFO. Cấu hình Visibility timeout (30-300s), Message retention (1-14 ngày). Tạo DLQ trước, sau đó gán DLQ vào queue chính với maxReceiveCount = 3-5.",
        imagePath: "/images/stage-9/step-1.png",
        alt: "Tạo SQS queue với Dead Letter Queue configuration",
      },
      {
        title: "Tạo SNS Topic và Subscriptions",
        description: "Vào SNS Console, tạo Standard topic với tên mô tả. Trong Subscriptions, tạo subscription với protocol SQS, HTTP, Lambda hoặc Email. Với SQS subscription, nhớ cập nhật SQS queue policy để cho phép SNS gửi messages.",
        imagePath: "/images/stage-9/step-2.png",
        alt: "Tạo SNS topic và thêm SQS subscriptions",
      },
      {
        title: "Publish và Nhận Messages",
        description: "Publish test message từ SNS Console hoặc dùng AWS CLI. Vào SQS Console, chọn queue và dùng Poll for messages để xem messages. Inspect message body, attributes và metadata. Xóa message sau khi xử lý thành công.",
        imagePath: "/images/stage-9/step-3.png",
        alt: "Poll và inspect messages trong SQS Console",
      },
      {
        title: "Tạo EventBridge Rule",
        description: "Vào EventBridge Console, chọn Rules rồi Create rule. Chọn event source (AWS services hoặc custom). Định nghĩa event pattern bằng JSON để filter events. Thêm targets (Lambda, SQS, SNS, Step Functions). Bật rule để bắt đầu routing events.",
        imagePath: "/images/stage-9/step-4.png",
        alt: "Tạo EventBridge rule với event pattern và target",
      },
    ],
    labs: [
      {
        id: "lab-9-messaging-event-driven-1",
        slug: "lab-9-messaging-event-driven-1",
        title: "Xây dựng Order Processing System với SNS Fan-out và SQS",
        stageId: 9,
        stageSlug: "9-messaging-event-driven",
        objective: "Tạo hệ thống xử lý đơn hàng sử dụng SNS để fan-out events và SQS queues cho payment, inventory và notification services với Dead Letter Queue",
        estimatedTime: "75 phút",
        steps: [
          "Tạo 3 SQS Standard queues: payment-queue, inventory-queue, notification-queue",
          "Tạo DLQ cho mỗi queue: payment-dlq, inventory-dlq, notification-dlq với retention 14 ngày",
          "Cấu hình mỗi queue chính với DLQ tương ứng, maxReceiveCount = 3",
          "Tạo SNS topic order-events và subscribe 3 SQS queues vào topic",
          "Cập nhật SQS queue policies để cho phép SNS principal (sns.amazonaws.com) gửi messages",
          "Publish test message đến SNS topic với orderId, amount và items",
          "Verify message xuất hiện trong tất cả 3 SQS queues, poll messages và confirm fan-out hoạt động",
        ],
        expectedResult: "Message publish lên SNS topic được fan-out thành công đến cả 3 SQS queues. Mỗi queue nhận đúng 1 message với cùng nội dung. DLQs trống. Approximate number of messages visible = 1 cho mỗi queue.",
        troubleshooting: [
          "Message không đến SQS queue: Kiểm tra SQS queue policy có cho phép aws:SourceArn của SNS topic; thiếu permission là nguyên nhân phổ biến nhất",
          "Lỗi InvalidParameterException khi subscribe SQS vào SNS: Đảm bảo SQS và SNS ở cùng region và cùng AWS account",
          "Messages vào DLQ ngay lập tức: Kiểm tra Visibility Timeout không bị set quá ngắn và maxReceiveCount không bị set là 1",
        ],
      },
      {
        id: "lab-9-messaging-event-driven-2",
        slug: "lab-9-messaging-event-driven-2",
        title: "EventBridge Rules để Automate EC2 Instance Management",
        stageId: 9,
        stageSlug: "9-messaging-event-driven",
        objective: "Tạo EventBridge rules để tự động gửi notification khi EC2 instance state thay đổi và schedule tự động stop instances ngoài giờ làm việc",
        estimatedTime: "60 phút",
        steps: [
          "Tạo SNS topic infrastructure-alerts và subscribe email của bạn",
          "Tạo EventBridge rule ec2-state-change-alert với event pattern lọc EC2 Instance State-change Notification",
          "Thêm SNS topic làm target, cấu hình input transformer để format message thân thiện",
          "Tạo Lambda function stop-dev-instances để dừng các EC2 instances có tag Environment=dev",
          "Tạo EventBridge scheduled rule chạy lúc 19:00 UTC+7 mỗi ngày để trigger Lambda",
          "Test rule bằng cách start/stop một EC2 instance và verify email notification",
          "Kiểm tra EventBridge Monitoring tab để xem invocation count và failed invocations",
        ],
        expectedResult: "Email notification được gửi trong vài giây sau khi EC2 instance state thay đổi. Lambda function được invoke theo schedule. EventBridge metrics hiển thị successful invocations. CloudWatch logs của Lambda ghi lại instances đã được stopped.",
        troubleshooting: [
          "Không nhận được email notification: Kiểm tra SNS subscription đã được Confirm qua email chưa; subscription ở trạng thái PendingConfirmation sẽ không nhận messages",
          "Lambda không được trigger theo schedule: Kiểm tra EventBridge rule đang ở trạng thái ENABLED và cron expression đúng format",
          "Lambda không có quyền stop EC2: Thêm ec2:StopInstances và ec2:DescribeInstances vào IAM role của Lambda function",
        ],
      },
    ],
    codeSnippets: [
      {
        title: "Publish message đến SNS và gửi message vào SQS bằng CLI",
        language: "bash",
        code: `# Tạo SNS topic và SQS queue
TOPIC_ARN=$(aws sns create-topic --name order-events --query TopicArn --output text)
QUEUE_URL=$(aws sqs create-queue --queue-name payment-queue --query QueueUrl --output text)
QUEUE_ARN=$(aws sqs get-queue-attributes \\
  --queue-url $QUEUE_URL \\
  --attribute-names QueueArn \\
  --query 'Attributes.QueueArn' --output text)

# Subscribe SQS vào SNS
aws sns subscribe \\
  --topic-arn $TOPIC_ARN \\
  --protocol sqs \\
  --notification-endpoint $QUEUE_ARN

# Cập nhật SQS policy để cho phép SNS gửi messages
aws sqs set-queue-attributes \\
  --queue-url $QUEUE_URL \\
  --attributes '{
    "Policy": "{\\"Version\\":\\"2012-10-17\\",\\"Statement\\":[{\\"Effect\\":\\"Allow\\",\\"Principal\\":{\\"Service\\":\\"sns.amazonaws.com\\"},\\"Action\\":\\"sqs:SendMessage\\",\\"Resource\\":\\"'$QUEUE_ARN'\\"}]}"
  }'

# Publish message đến SNS (fan-out đến tất cả subscribers)
aws sns publish \\
  --topic-arn $TOPIC_ARN \\
  --message '{"orderId":"ORD-001","amount":150000,"status":"created"}'

# Poll messages từ SQS
aws sqs receive-message \\
  --queue-url $QUEUE_URL \\
  --max-number-of-messages 10 \\
  --wait-time-seconds 20`,
      },
      {
        title: "EventBridge Rule pattern JSON",
        language: "json",
        code: `{
  "source": ["aws.ec2"],
  "detail-type": ["EC2 Instance State-change Notification"],
  "detail": {
    "state": ["running", "stopped", "terminated"]
  }
}`,
      },
      {
        title: "Lambda Consumer xử lý SQS messages với partial batch failure",
        language: "js",
        code: `exports.handler = async (event) => {
  const results = { batchItemFailures: [] };

  for (const record of event.Records) {
    try {
      const message = JSON.parse(record.body);
      const payload = message.Message ? JSON.parse(message.Message) : message;
      console.log('Processing order:', payload.orderId);
      await processOrder(payload);
    } catch (error) {
      console.error('Failed to process message:', record.messageId, error);
      results.batchItemFailures.push({ itemIdentifier: record.messageId });
    }
  }

  return results;
};

async function processOrder(order) {
  if (!order.orderId || !order.amount) {
    throw new Error('Invalid order data: ' + JSON.stringify(order));
  }
  console.log('Processed order', order.orderId, 'amount', order.amount);
}`,
      },
    ],
    bestPractices: [
      "Luôn cấu hình Dead Letter Queue cho SQS để tránh mất messages và dễ debug các messages thất bại",
      "Dùng FIFO Queue chỉ khi thực sự cần đảm bảo thứ tự và exactly-once; FIFO có giới hạn throughput và đắt hơn Standard",
      "Implement idempotency trong consumer logic vì SQS Standard có thể deliver message nhiều hơn một lần",
      "Không set Visibility Timeout quá ngắn; phải đủ dài để consumer xử lý xong message trước khi timeout",
      "Dùng Long Polling (WaitTimeSeconds=20) thay Short Polling để giảm số lượng API calls và chi phí",
      "EventBridge có thể archive và replay events: cấu hình event archive để có thể tái xử lý events lịch sử khi cần",
      "Đừng publish sensitive data (PII, credentials) trực tiếp vào messages; publish reference/ID và consumer tự fetch data",
    ],
    commonMistakes: [
      {
        mistake: "Không cập nhật SQS queue policy khi subscribe vào SNS",
        fix: "Thêm policy statement cho phép sns.amazonaws.com gửi messages đến SQS queue với điều kiện SourceArn là SNS topic",
      },
      {
        mistake: "Dùng SQS FIFO cho high-throughput workloads",
        fix: "FIFO Queue giới hạn 300 TPS. Với high throughput, dùng Standard Queue và implement ordering logic ở application layer",
      },
      {
        mistake: "Không handle partial batch failures trong Lambda SQS consumer",
        fix: "Return batchItemFailures array chứa messageId của các messages thất bại để SQS chỉ retry những messages đó",
      },
      {
        mistake: "Đặt maxReceiveCount quá thấp (1-2) dẫn đến messages vào DLQ quá nhanh",
        fix: "Set maxReceiveCount ít nhất 3-5 để cho consumer có đủ lần retry trước khi message bị đưa vào DLQ",
      },
    ],
    checklist: [
      { id: "s9-c1", label: "Tạo SQS queue (Standard hoặc FIFO) phù hợp với use case" },
      { id: "s9-c2", label: "Cấu hình Dead Letter Queue và maxReceiveCount", description: "DLQ giúp tránh message loop và dễ debug" },
      { id: "s9-c3", label: "Tạo SNS topic và subscribe các endpoints cần thiết" },
      { id: "s9-c4", label: "Cập nhật SQS queue policy để cho phép SNS gửi messages" },
      { id: "s9-c5", label: "Test fan-out pattern: publish 1 message đến nhiều queues" },
      { id: "s9-c6", label: "Tạo EventBridge rule với event pattern và target" },
      { id: "s9-c7", label: "Verify messages được route đúng và DLQ hoạt động" },
      { id: "s9-c8", label: "Cấu hình CloudWatch alarms cho DLQ message count" },
    ],
    quiz: [
      {
        id: "s9-q1",
        question: "Sự khác biệt chính giữa SQS và SNS là gì?",
        options: [
          { id: "s9-q1-a", text: "SQS là pull-based message queue để decoupling, SNS là push-based pub/sub để fan-out messages đến nhiều subscribers", isCorrect: true },
          { id: "s9-q1-b", text: "SQS nhanh hơn SNS", isCorrect: false },
          { id: "s9-q1-c", text: "SNS chỉ hỗ trợ email notifications", isCorrect: false },
          { id: "s9-q1-d", text: "SQS hỗ trợ nhiều subscribers hơn SNS", isCorrect: false },
        ],
        explanation: "SQS là queue service nơi consumer phải chủ động poll để lấy messages, phù hợp để decoupling và buffer giữa producer/consumer. SNS là pub/sub service đẩy messages đến tất cả subscribers đồng thời (fan-out), phù hợp cho notification và event broadcasting.",
      },
      {
        id: "s9-q2",
        question: "Dead Letter Queue (DLQ) trong SQS được dùng để làm gì?",
        options: [
          { id: "s9-q2-a", text: "Lưu messages đã được xử lý thành công", isCorrect: false },
          { id: "s9-q2-b", text: "Nhận messages thất bại sau maxReceiveCount lần xử lý để debug và tránh message gây vòng lặp vô tận", isCorrect: true },
          { id: "s9-q2-c", text: "Tăng throughput của queue chính", isCorrect: false },
          { id: "s9-q2-d", text: "Backup messages trước khi xóa", isCorrect: false },
        ],
        explanation: "DLQ nhận các messages không thể xử lý thành công sau maxReceiveCount lần. Điều này ngăn một message poison pill gây ra retry vô tận. Team có thể inspect DLQ để debug nguyên nhân thất bại.",
      },
      {
        id: "s9-q3",
        question: "Visibility Timeout trong SQS có tác dụng gì?",
        options: [
          { id: "s9-q3-a", text: "Thời gian message tồn tại trong queue trước khi bị xóa", isCorrect: false },
          { id: "s9-q3-b", text: "Thời gian message bị ẩn sau khi được consumer nhận để tránh consumer khác xử lý trùng", isCorrect: true },
          { id: "s9-q3-c", text: "Thời gian consumer có thể poll queue", isCorrect: false },
          { id: "s9-q3-d", text: "Thời gian delay trước khi message có thể được nhận", isCorrect: false },
        ],
        explanation: "Visibility Timeout ẩn message sau khi consumer nhận, cho consumer đủ thời gian xử lý và xóa message. Nếu consumer không xóa trong timeout, message hiện lại để consumer khác xử lý. Timeout phải đủ dài hơn thời gian xử lý thực tế.",
      },
      {
        id: "s9-q4",
        question: "EventBridge khác với SNS như thế nào?",
        options: [
          { id: "s9-q4-a", text: "EventBridge chỉ hỗ trợ AWS services, SNS hỗ trợ cả external systems", isCorrect: false },
          { id: "s9-q4-b", text: "EventBridge hỗ trợ event filtering phức tạp, scheduling, 90+ AWS service sources, SaaS integrations và event replay; SNS đơn giản hơn cho fan-out", isCorrect: true },
          { id: "s9-q4-c", text: "EventBridge đắt hơn SNS 10 lần", isCorrect: false },
          { id: "s9-q4-d", text: "SNS không hỗ trợ Lambda subscribers", isCorrect: false },
        ],
        explanation: "EventBridge là event bus mạnh mẽ hơn với khả năng filter events phức tạp bằng patterns JSON, schedule events theo cron, archive và replay events, nhận events từ 90+ AWS services và SaaS apps. SNS phù hợp hơn cho fan-out notification đơn giản.",
      },
      {
        id: "s9-q5",
        question: "Khi nào nên dùng SQS FIFO Queue thay Standard Queue?",
        options: [
          { id: "s9-q5-a", text: "Khi cần throughput cao nhất có thể", isCorrect: false },
          { id: "s9-q5-b", text: "Khi thứ tự xử lý messages và exactly-once delivery là yêu cầu bắt buộc như financial transactions", isCorrect: true },
          { id: "s9-q5-c", text: "Khi muốn giảm chi phí", isCorrect: false },
          { id: "s9-q5-d", text: "Khi cần fan-out đến nhiều consumers", isCorrect: false },
        ],
        explanation: "FIFO Queue đảm bảo messages được xử lý đúng thứ tự và exactly-once. Thích hợp cho financial transactions, order processing hay bất kỳ use case nào mà duplicate hoặc out-of-order processing gây ra vấn đề. Giới hạn 300 TPS là tradeoff so với Standard Queue.",
      },
    ],
    architecture: {
      title: "Event-Driven Order Processing với SNS Fan-out và SQS",
      description: "Order service publish event đến SNS topic, fan-out đến nhiều SQS queues cho các downstream services xử lý độc lập",
      nodes: [
        { id: "order-service", label: "Order Service", sublabel: "Lambda / EC2", type: "service" },
        { id: "sns", label: "SNS Topic", sublabel: "order-events", type: "service" },
        { id: "payment-sqs", label: "SQS Queue", sublabel: "payment-queue", type: "service" },
        { id: "inventory-sqs", label: "SQS Queue", sublabel: "inventory-queue", type: "service" },
        { id: "notification-sqs", label: "SQS Queue", sublabel: "notification-queue", type: "service" },
        { id: "dlq", label: "Dead Letter Queue", sublabel: "dlq", type: "service" },
      ],
      connections: [
        { from: "order-service", to: "sns", label: "Publish Event" },
        { from: "sns", to: "payment-sqs", label: "Fan-out" },
        { from: "sns", to: "inventory-sqs", label: "Fan-out" },
        { from: "sns", to: "notification-sqs", label: "Fan-out" },
        { from: "payment-sqs", to: "dlq", label: "On failure" },
      ],
    },
  },

  {
    id: 10,
    slug: "10-ecs-fargate",
    title: "ECS và Fargate - Containerization",
    subtitle: "Deploy và quản lý container applications với ECS Fargate không cần quản lý server",
    difficulty: "intermediate",
    estimatedTime: "1.5 tuần",
    services: ["ECS", "Fargate", "ECR"],
    objectives: [
      "Build và push Docker images lên Amazon ECR",
      "Tạo ECS Task Definitions với cấu hình container phù hợp",
      "Deploy ECS Services trên Fargate với Auto Scaling",
      "Tích hợp ECS với Application Load Balancer cho high availability",
      "Cấu hình CloudWatch Logs và IAM roles cho ECS tasks",
    ],
    concepts: [
      {
        title: "Amazon ECR (Elastic Container Registry)",
        description: "ECR là container image registry được quản lý hoàn toàn, tích hợp chặt chẽ với ECS và EKS. Hỗ trợ OCI-compliant images, image scanning để phát hiện vulnerabilities, lifecycle policies để tự động xóa images cũ và cross-region replication.",
      },
      {
        title: "ECS Task Definition",
        description: "Task Definition là blueprint mô tả cách chạy container: image URI, CPU/memory, port mappings, environment variables, secrets, log configuration và IAM roles. Có thể định nghĩa nhiều containers trong một task (sidecar pattern). Mỗi revision là immutable.",
      },
      {
        title: "ECS Cluster, Services và Tasks",
        description: "Cluster là logical grouping của tasks và services. Task là một running instance của task definition. Service duy trì số lượng tasks mong muốn, tự động restart tasks bị crash và tích hợp với load balancer. Fargate launch type loại bỏ nhu cầu quản lý EC2 instances.",
      },
      {
        title: "AWS Fargate",
        description: "Fargate là serverless compute engine cho containers: AWS quản lý infrastructure, bạn chỉ cần định nghĩa CPU và memory cho task. Không cần provision, scale hay patch EC2 instances. Bạn chỉ trả tiền cho resources được dùng trong lúc task chạy.",
      },
      {
        title: "Task Role vs Execution Role",
        description: "Execution Role được ECS agent dùng để pull ECR images và gửi logs đến CloudWatch. Task Role là IAM role mà container code dùng để gọi AWS services (S3, DynamoDB,...). Hai role này phải tách biệt theo nguyên tắc least privilege.",
      },
      {
        title: "ECS Service Auto Scaling",
        description: "ECS Service Auto Scaling điều chỉnh số lượng tasks dựa trên CloudWatch metrics. Target Tracking policy tự động scale để duy trì metric ở mức target (ví dụ CPU 70%). Step Scaling cho phép kiểm soát chi tiết hơn. Scale in cool-down ngăn scale down quá nhanh.",
      },
      {
        title: "Blue/Green Deployment với ECS",
        description: "CodeDeploy tích hợp với ECS cho blue/green deployments: deploy phiên bản mới (green) song song với phiên bản cũ (blue), shift traffic dần dần, tự động rollback nếu health checks thất bại. Giảm downtime và rủi ro khi deploy production.",
      },
    ],
    consoleSteps: [
      {
        title: "Tạo ECR Repository và Push Image",
        description: "Vào ECR Console, tạo private repository. Nhấn View push commands để lấy các lệnh cụ thể: authenticate Docker với ECR, build image với tag, tag và push lên repository. Bật image scanning để tự động scan vulnerabilities khi push.",
        imagePath: "/images/stage-10/step-1.png",
        alt: "Tạo ECR repository và push Docker image",
      },
      {
        title: "Tạo Task Definition",
        description: "Vào ECS Console, chọn Task Definitions, Create new. Chọn Fargate launch type, định nghĩa task CPU và memory. Thêm container với image URI từ ECR, port mappings, environment variables và log configuration với CloudWatch Logs.",
        imagePath: "/images/stage-10/step-2.png",
        alt: "Tạo ECS Task Definition với Fargate launch type",
      },
      {
        title: "Tạo ECS Cluster và Service",
        description: "Tạo ECS Cluster, chọn AWS Fargate infrastructure provider. Trong cluster, tạo Service: chọn task definition và revision, số lượng desired tasks, VPC/subnets (private subnets cho production), security groups và load balancer integration.",
        imagePath: "/images/stage-10/step-3.png",
        alt: "Tạo ECS Cluster và deploy Service với Fargate",
      },
      {
        title: "Cấu hình Auto Scaling cho ECS Service",
        description: "Trong ECS Service, chọn Update service, cấu hình Service Auto Scaling. Đặt minimum (1), desired (2) và maximum (10) task count. Thêm Target Tracking scaling policy dựa trên ECSServiceAverageCPUUtilization với target 70%. Đặt scale-in cooldown 300 giây.",
        imagePath: "/images/stage-10/step-4.png",
        alt: "Cấu hình ECS Service Auto Scaling với Target Tracking",
      },
    ],
    labs: [
      {
        id: "lab-10-ecs-fargate-1",
        slug: "lab-10-ecs-fargate-1",
        title: "Deploy Web Application lên ECS Fargate với ALB",
        stageId: 10,
        stageSlug: "10-ecs-fargate",
        objective: "Containerize một Node.js web application, push lên ECR, tạo ECS Task Definition và deploy Service trên Fargate sau ALB",
        estimatedTime: "90 phút",
        steps: [
          "Viết Dockerfile cho Node.js app: FROM node:20-alpine, COPY package*.json, RUN npm ci, COPY ., EXPOSE 3000, CMD node app.js",
          "Tạo ECR repository my-webapp, authenticate và push Docker image",
          "Tạo IAM roles: ecsTaskExecutionRole (AmazonECSTaskExecutionRolePolicy) và ecsTaskRole (custom policy cho app permissions)",
          "Tạo Task Definition với Fargate: 0.5 vCPU, 1GB memory, container từ ECR image, port 3000, log driver awslogs",
          "Tạo Application Load Balancer trong public subnets, target group loại IP với health check path /health",
          "Tạo ECS Cluster và Service: 2 desired tasks trong private subnets, gán ALB target group, security group cho phép traffic từ ALB",
          "Verify deployment: kiểm tra tasks đang RUNNING, ALB health checks passing, access app qua ALB DNS name",
        ],
        expectedResult: "Web application chạy trong 2 Fargate tasks. ALB health checks trả về 200 OK. App accessible qua ALB DNS name với load balancing giữa 2 tasks. CloudWatch Logs hiển thị application logs.",
        troubleshooting: [
          "Task stuck ở PROVISIONING: Kiểm tra subnets có NAT Gateway không (Fargate cần pull image từ ECR), hoặc cấu hình VPC Endpoint cho ECR",
          "Health check failed: Đảm bảo security group của task cho phép inbound traffic từ security group của ALB trên container port (3000)",
          "Task liên tục restart: Xem stopped reason trong ECS Console hoặc CloudWatch Logs để tìm application error gây container crash",
        ],
      },
      {
        id: "lab-10-ecs-fargate-2",
        slug: "lab-10-ecs-fargate-2",
        title: "ECS Service Auto Scaling và Rolling Deployment",
        stageId: 10,
        stageSlug: "10-ecs-fargate",
        objective: "Cấu hình Auto Scaling cho ECS Service dựa trên CPU utilization và thực hiện rolling deployment khi update container image",
        estimatedTime: "60 phút",
        steps: [
          "Cấu hình Service Auto Scaling: min=1, desired=2, max=5 tasks",
          "Thêm Target Tracking policy: ECSServiceAverageCPUUtilization target 60%, scale-in cooldown 300s",
          "Simulate load bằng Apache Bench: ab -n 10000 -c 100 http://ALB-DNS/ để trigger scale-out",
          "Quan sát ECS Service metrics trong CloudWatch: CPUUtilization, MemoryUtilization, RunningTaskCount",
          "Cập nhật Dockerfile để thêm version header, rebuild và push image mới lên ECR với tag v2",
          "Tạo Task Definition revision mới với image tag v2",
          "Cập nhật ECS Service để dùng revision mới, quan sát rolling deployment không có downtime",
        ],
        expectedResult: "Auto Scaling tự động tăng task count khi CPU > 60%. Sau khi load giảm, scale in về 2 tasks sau cooldown period. Rolling deployment hoàn thành không có downtime.",
        troubleshooting: [
          "Scale out không xảy ra dù CPU cao: Kiểm tra Auto Scaling policy đã được enabled; đôi khi cần đợi 2-3 phút để metrics aggregate",
          "Rolling deployment stuck: Kiểm tra nếu new task health check failing khiến ECS không thể shift traffic; xem task logs",
          "Sau scale-in, task count về 0: Kiểm tra minimum task count được set đúng; không set minimum = 0 cho production services",
        ],
      },
    ],
    codeSnippets: [
      {
        title: "Dockerfile và ECR push commands",
        language: "bash",
        code: `# Dockerfile cho Node.js application
cat > Dockerfile << 'EOF'
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
USER node
CMD ["node", "app.js"]
EOF

AWS_ACCOUNT=$(aws sts get-caller-identity --query Account --output text)
REGION=ap-southeast-1
ECR_REGISTRY="$AWS_ACCOUNT.dkr.ecr.$REGION.amazonaws.com"

aws ecr get-login-password --region $REGION | \\
  docker login --username AWS --password-stdin $ECR_REGISTRY

aws ecr create-repository --repository-name my-webapp --region $REGION

docker build -t my-webapp .
docker tag my-webapp:latest $ECR_REGISTRY/my-webapp:latest
docker push $ECR_REGISTRY/my-webapp:latest`,
      },
      {
        title: "ECS Task Definition JSON",
        language: "json",
        code: `{
  "family": "my-webapp",
  "requiresCompatibilities": ["FARGATE"],
  "networkMode": "awsvpc",
  "cpu": "512",
  "memory": "1024",
  "executionRoleArn": "arn:aws:iam::123456789:role/ecsTaskExecutionRole",
  "taskRoleArn": "arn:aws:iam::123456789:role/ecsTaskRole",
  "containerDefinitions": [
    {
      "name": "webapp",
      "image": "123456789.dkr.ecr.ap-southeast-1.amazonaws.com/my-webapp:latest",
      "portMappings": [{ "containerPort": 3000, "protocol": "tcp" }],
      "environment": [
        { "name": "NODE_ENV", "value": "production" },
        { "name": "PORT", "value": "3000" }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/my-webapp",
          "awslogs-region": "ap-southeast-1",
          "awslogs-stream-prefix": "ecs"
        }
      },
      "healthCheck": {
        "command": ["CMD-SHELL", "wget -qO- http://localhost:3000/health || exit 1"],
        "interval": 30,
        "timeout": 5,
        "retries": 3
      },
      "essential": true
    }
  ]
}`,
      },
      {
        title: "Tạo ECS Service với CLI",
        language: "bash",
        code: `aws ecs create-cluster --cluster-name production

aws ecs register-task-definition --cli-input-json file://task-definition.json

aws ecs create-service \\
  --cluster production \\
  --service-name my-webapp \\
  --task-definition my-webapp:1 \\
  --desired-count 2 \\
  --launch-type FARGATE \\
  --network-configuration '{
    "awsvpcConfiguration": {
      "subnets": ["subnet-private-1a", "subnet-private-1b"],
      "securityGroups": ["sg-ecs-tasks"],
      "assignPublicIp": "DISABLED"
    }
  }' \\
  --load-balancers '[{
    "targetGroupArn": "arn:aws:elasticloadbalancing:...:targetgroup/my-webapp/xxx",
    "containerName": "webapp",
    "containerPort": 3000
  }]' \\
  --deployment-configuration '{
    "deploymentCircuitBreaker": {"enable": true, "rollback": true},
    "maximumPercent": 200,
    "minimumHealthyPercent": 100
  }'`,
      },
    ],
    bestPractices: [
      "Dùng private ECR repositories và bật image scanning để phát hiện vulnerabilities trong container images",
      "Tách Task Execution Role (cho ECS agent) và Task Role (cho application code) theo nguyên tắc least privilege",
      "Deploy ECS tasks vào private subnets; chỉ ALB nằm trong public subnets để tăng security",
      "Bật deployment circuit breaker để tự động rollback khi deployment mới bị lỗi",
      "Không dùng latest tag trong production; dùng image digest hoặc semantic versioning để đảm bảo reproducibility",
      "Cấu hình resource reservations (CPU/memory) sát với actual usage để tối ưu bin packing và chi phí",
      "Dùng FARGATE_SPOT cho non-critical workloads để giảm chi phí lên đến 70%",
    ],
    commonMistakes: [
      {
        mistake: "Task không start được do thiếu internet access để pull ECR image",
        fix: "Fargate tasks trong private subnets cần NAT Gateway hoặc VPC Endpoints (ecr.api, ecr.dkr, s3) để pull images từ ECR",
      },
      {
        mistake: "Dùng chung một IAM role cho cả execution và task",
        fix: "Tạo hai role riêng biệt: ecsTaskExecutionRole (pull ECR, write CloudWatch Logs) và ecsTaskRole (permissions cho application)",
      },
      {
        mistake: "Security group của task không cho phép traffic từ ALB",
        fix: "Security group của ECS task phải allow inbound từ security group của ALB trên container port, không phải port 80/443",
      },
      {
        mistake: "Không cấu hình health check cho container và task definition",
        fix: "Thêm HEALTHCHECK trong Dockerfile và healthCheck trong task definition để ECS và ALB biết container đã sẵn sàng nhận traffic",
      },
      {
        mistake: "Set CPU/memory quá thấp dẫn đến OOM kills hoặc throttling",
        fix: "Monitor actual usage trong CloudWatch và set reservations ít nhất 1.5x peak usage để có buffer cho spike traffic",
      },
    ],
    checklist: [
      { id: "s10-c1", label: "Tạo ECR repository và push Docker image thành công" },
      { id: "s10-c2", label: "Tạo Task Definition với Fargate launch type và cấu hình đúng", description: "CPU, memory, port mappings, log configuration" },
      { id: "s10-c3", label: "Tạo IAM Execution Role và Task Role riêng biệt" },
      { id: "s10-c4", label: "Deploy ECS Service trong private subnets với desired count >= 2" },
      { id: "s10-c5", label: "Tích hợp với ALB và health checks passing" },
      { id: "s10-c6", label: "CloudWatch Logs nhận logs từ containers" },
      { id: "s10-c7", label: "Cấu hình Auto Scaling cho ECS Service" },
      { id: "s10-c8", label: "Test rolling deployment với image mới thành công" },
    ],
    quiz: [
      {
        id: "s10-q1",
        question: "Sự khác biệt giữa ECS Task Execution Role và Task Role là gì?",
        options: [
          { id: "s10-q1-a", text: "Execution Role cho ECS agent dùng để pull images và ghi logs; Task Role cho application code trong container dùng để gọi AWS services", isCorrect: true },
          { id: "s10-q1-b", text: "Chúng giống nhau, chỉ có tên khác nhau", isCorrect: false },
          { id: "s10-q1-c", text: "Task Role chỉ dùng cho EC2 launch type", isCorrect: false },
          { id: "s10-q1-d", text: "Execution Role chỉ cần cho Fargate, không cần cho EC2", isCorrect: false },
        ],
        explanation: "Task Execution Role được ECS container agent dùng để pull Docker images từ ECR, lấy secrets và gửi logs đến CloudWatch. Task Role là IAM role mà code trong container assume để gọi AWS APIs như S3, DynamoDB. Hai role phải tách biệt.",
      },
      {
        id: "s10-q2",
        question: "Lợi ích chính của Fargate so với EC2 launch type là gì?",
        options: [
          { id: "s10-q2-a", text: "Fargate luôn rẻ hơn EC2", isCorrect: false },
          { id: "s10-q2-b", text: "Fargate nhanh hơn EC2 gấp 10 lần", isCorrect: false },
          { id: "s10-q2-c", text: "Fargate loại bỏ nhu cầu provision và quản lý EC2 instances; AWS quản lý infrastructure hoàn toàn", isCorrect: true },
          { id: "s10-q2-d", text: "Fargate hỗ trợ nhiều container runtimes hơn EC2", isCorrect: false },
        ],
        explanation: "Với Fargate, bạn không cần chọn instance type, patch OS, quản lý cluster capacity hay handle cluster scaling. Bạn chỉ cần định nghĩa CPU và memory cần thiết cho task. Tradeoff: convenience vs cost control.",
      },
      {
        id: "s10-q3",
        question: "Tại sao ECS tasks trong private subnets không pull được image từ ECR?",
        options: [
          { id: "s10-q3-a", text: "ECR không hỗ trợ private subnets", isCorrect: false },
          { id: "s10-q3-b", text: "Tasks trong private subnets không có internet access, cần NAT Gateway hoặc VPC Endpoints cho ECR", isCorrect: true },
          { id: "s10-q3-c", text: "Cần gán Elastic IP cho mỗi task", isCorrect: false },
          { id: "s10-q3-d", text: "Private subnets không hỗ trợ Fargate launch type", isCorrect: false },
        ],
        explanation: "ECR là service công khai trên internet. Tasks trong private subnets không có direct internet access nên không thể pull images. Giải pháp: (1) NAT Gateway, (2) VPC Endpoints cho ECR (ecr.api, ecr.dkr) và S3.",
      },
      {
        id: "s10-q4",
        question: "Deployment Circuit Breaker trong ECS Service làm gì?",
        options: [
          { id: "s10-q4-a", text: "Ngăn deploy khi có quá nhiều tasks đang chạy", isCorrect: false },
          { id: "s10-q4-b", text: "Tự động dừng và rollback deployment khi tasks mới liên tục thất bại health checks", isCorrect: true },
          { id: "s10-q4-c", text: "Giới hạn số lần deploy mỗi ngày", isCorrect: false },
          { id: "s10-q4-d", text: "Chặn traffic đến tasks mới cho đến khi warm up xong", isCorrect: false },
        ],
        explanation: "Deployment Circuit Breaker theo dõi trạng thái của deployment. Nếu tỉ lệ task startup failures vượt ngưỡng, circuit breaker kích hoạt và tự động rollback về task definition version trước đó. Điều này ngăn bad deployment làm giảm capacity của production service.",
      },
      {
        id: "s10-q5",
        question: "ECR Image Scanning có tác dụng gì?",
        options: [
          { id: "s10-q5-a", text: "Kiểm tra kích thước image để tối ưu storage", isCorrect: false },
          { id: "s10-q5-b", text: "Scan Docker image để phát hiện known security vulnerabilities trong OS packages và libraries", isCorrect: true },
          { id: "s10-q5-c", text: "Mã hóa container images khi lưu trữ", isCorrect: false },
          { id: "s10-q5-d", text: "Phân tích performance của container", isCorrect: false },
        ],
        explanation: "ECR Image Scanning dùng Clair hoặc Amazon Inspector để phân tích image và báo cáo CVEs trong OS packages và programming language libraries. ScanOnPush tự động scan mỗi khi image được push lên.",
      },
    ],
    architecture: {
      title: "ECS Fargate Application với ALB và Auto Scaling",
      description: "User requests đến ALB, được distribute đến ECS Fargate tasks trong private subnets, tasks pull images từ ECR và gửi logs đến CloudWatch",
      nodes: [
        { id: "user", label: "User", type: "user" },
        { id: "alb", label: "Application Load Balancer", sublabel: "Public Subnets", type: "service" },
        { id: "ecs-task-1", label: "ECS Task 1", sublabel: "Fargate - Private", type: "service" },
        { id: "ecs-task-2", label: "ECS Task 2", sublabel: "Fargate - Private", type: "service" },
        { id: "ecr", label: "ECR", sublabel: "Container Registry", type: "service" },
        { id: "cloudwatch", label: "CloudWatch Logs", sublabel: "Application Logs", type: "service" },
      ],
      connections: [
        { from: "user", to: "alb", label: "HTTPS" },
        { from: "alb", to: "ecs-task-1", label: "Route traffic" },
        { from: "alb", to: "ecs-task-2", label: "Route traffic" },
        { from: "ecs-task-1", to: "ecr", label: "Pull image" },
        { from: "ecs-task-1", to: "cloudwatch", label: "Send logs" },
        { from: "ecs-task-2", to: "cloudwatch", label: "Send logs" },
      ],
    },
  },

  {
    id: 11,
    slug: "11-monitoring-logging",
    title: "Monitoring và Logging",
    subtitle: "Giám sát, quan sát và troubleshoot hệ thống AWS với CloudWatch và X-Ray",
    difficulty: "intermediate",
    estimatedTime: "1 tuần",
    services: ["CloudWatch", "CloudTrail", "X-Ray"],
    objectives: [
      "Tạo CloudWatch Dashboards để visualize metrics của hệ thống",
      "Cấu hình CloudWatch Alarms để cảnh báo khi metrics vượt ngưỡng",
      "Thu thập và phân tích logs với CloudWatch Log Groups và Insights",
      "Sử dụng CloudTrail để audit API calls và phát hiện bất thường",
      "Trace distributed requests qua nhiều services với AWS X-Ray",
    ],
    concepts: [
      {
        title: "CloudWatch Metrics",
        description: "CloudWatch Metrics là các data points được collect từ AWS services theo thời gian. Mỗi metric có namespace, name và dimensions để phân biệt. Standard metrics miễn phí; custom metrics (từ application code) có phí. Metrics được lưu 15 tháng với độ phân giải từ 1 giây đến 1 ngày.",
      },
      {
        title: "CloudWatch Alarms",
        description: "Alarms theo dõi metric và thực hiện action khi metric vi phạm ngưỡng trong một khoảng thời gian. Actions có thể là gửi SNS notification, trigger Auto Scaling, stop/reboot EC2 instance. Alarm có 3 states: OK, ALARM và INSUFFICIENT_DATA.",
      },
      {
        title: "CloudWatch Logs",
        description: "CloudWatch Logs thu thập, lưu trữ và cho phép truy vấn logs từ AWS services và applications. Log Groups chứa nhiều Log Streams (mỗi instance/container). Retention policy xác định thời gian giữ logs (1 ngày đến 10 năm). Metric Filters có thể trích xuất metrics từ log patterns.",
      },
      {
        title: "CloudWatch Logs Insights",
        description: "Logs Insights là query engine cho CloudWatch Logs với ngôn ngữ query riêng. Hỗ trợ filtering, aggregation, sorting và visualization. Có thể query nhiều Log Groups cùng lúc. Sample queries có sẵn cho Lambda, API Gateway, VPC Flow Logs giúp bắt đầu nhanh.",
      },
      {
        title: "AWS CloudTrail",
        description: "CloudTrail ghi lại mọi API call đến AWS resources: ai gọi, khi nào, từ IP nào và với parameters gì. Management events (create/modify/delete resources) được bật mặc định. Data events (S3 object operations, Lambda invocations) phải bật thêm. Logs lưu vào S3 và có thể gửi đến CloudWatch Logs.",
      },
      {
        title: "AWS X-Ray",
        description: "X-Ray là distributed tracing service giúp phân tích và debug microservices. X-Ray SDK instrument code để gửi trace data. Traces hiển thị toàn bộ request path qua nhiều services với timing, errors và annotations. Service Map visualize kiến trúc và phát hiện bottlenecks.",
      },
      {
        title: "CloudWatch Dashboards",
        description: "Dashboards là customizable pages trong CloudWatch Console để hiển thị metrics, alarms và logs từ nhiều services. Có thể dùng cross-account và cross-region để có view tổng quan. Automatic dashboards được tạo tự động cho các dịch vụ như Lambda, EC2, RDS.",
      },
    ],
    consoleSteps: [
      {
        title: "Tạo CloudWatch Dashboard",
        description: "Vào CloudWatch Console, chọn Dashboards, Create dashboard. Thêm widgets: Line chart cho CPU/Memory metrics, Number widget cho current values, Alarm status widget. Kéo thả để sắp xếp layout. Thêm metrics từ nhiều services và regions vào cùng dashboard.",
        imagePath: "/images/stage-11/step-1.png",
        alt: "Tạo CloudWatch Dashboard với nhiều metric widgets",
      },
      {
        title: "Tạo CloudWatch Alarm",
        description: "Vào Alarms, Create alarm. Chọn metric (EC2 CPUUtilization), chọn statistics (Average) và period (5 phút). Đặt threshold: Greater than 80% trong 2 consecutive periods. Cấu hình action: gửi notification đến SNS topic. Đặt tên và mô tả rõ ràng cho alarm.",
        imagePath: "/images/stage-11/step-2.png",
        alt: "Cấu hình CloudWatch Alarm cho EC2 CPU với SNS notification",
      },
      {
        title: "Truy vấn CloudWatch Logs Insights",
        description: "Vào Logs Insights, chọn Log Group cần query. Viết query để phân tích logs: filter errors, đếm occurrences, tính latency. Chọn time range và chạy query. Xem kết quả dạng table hoặc bar chart. Lưu query để dùng lại.",
        imagePath: "/images/stage-11/step-3.png",
        alt: "CloudWatch Logs Insights query và kết quả visualization",
      },
      {
        title: "Xem X-Ray Service Map và Traces",
        description: "Vào X-Ray Console, chọn Service map để thấy toàn bộ kiến trúc với latency và error rate. Chọn Traces để xem individual requests. Click vào trace để xem timeline của từng segment. Phân tích annotations và metadata để debug vấn đề.",
        imagePath: "/images/stage-11/step-4.png",
        alt: "X-Ray Service Map hiển thị microservices và latency",
      },
    ],
    labs: [
      {
        id: "lab-11-monitoring-logging-1",
        slug: "lab-11-monitoring-logging-1",
        title: "Xây dựng Monitoring Dashboard với Alarms và Notifications",
        stageId: 11,
        stageSlug: "11-monitoring-logging",
        objective: "Tạo CloudWatch Dashboard toàn diện cho Lambda và API Gateway, cấu hình alarms cho các ngưỡng quan trọng và thiết lập SNS notification",
        estimatedTime: "60 phút",
        steps: [
          "Tạo SNS topic ops-alerts và subscribe email để nhận notifications",
          "Tạo CloudWatch Dashboard production-overview với widgets cho Lambda Errors, Duration, Throttles và API Gateway 4xx/5xx",
          "Tạo Alarm lambda-errors-high: Lambda Errors > 5 trong 5 phút liên tiếp, action gửi SNS notification",
          "Tạo Alarm api-5xx-rate: API Gateway 5XXError > 1% trong 3 phút, gửi SNS notification",
          "Tạo Composite Alarm kết hợp lambda-errors-high VÀ api-5xx-rate",
          "Trigger test alarm bằng cách dùng AWS CLI: aws cloudwatch set-alarm-state",
          "Verify email notification được gửi và dashboard hiển thị alarm state đúng",
        ],
        expectedResult: "Dashboard hiển thị real-time metrics với màu sắc phân biệt trạng thái. Alarms chuyển sang ALARM state khi test. Email notification được gửi trong vòng 1 phút. Composite alarm chỉ ALARM khi cả hai component alarms vi phạm đồng thời.",
        troubleshooting: [
          "Alarm ở trạng thái INSUFFICIENT_DATA: Đảm bảo metric đang có data points; Lambda Errors metric chỉ xuất hiện khi có invocations",
          "Không nhận được email: Kiểm tra SNS subscription đã Confirmed chưa và email không bị vào spam folder",
          "Composite Alarm không hoạt động đúng: Kiểm tra alarm rule expression dùng đúng ARN của component alarms và toán tử logic AND/OR",
        ],
      },
      {
        id: "lab-11-monitoring-logging-2",
        slug: "lab-11-monitoring-logging-2",
        title: "Phân Tích Logs với CloudWatch Logs Insights và X-Ray Tracing",
        stageId: 11,
        stageSlug: "11-monitoring-logging",
        objective: "Dùng CloudWatch Logs Insights để phân tích Lambda logs tìm errors và slow requests, sau đó enable X-Ray tracing để trace requests qua Lambda và DynamoDB",
        estimatedTime: "60 phút",
        steps: [
          "Tạo Metric Filter trên Lambda Log Group để đếm số lần xuất hiện ERROR và tạo custom metric LambdaErrors",
          "Chạy Logs Insights query để tìm slow Lambda invocations: filter @type = REPORT | stats max(@duration) as maxDuration by bin(5m)",
          "Chạy query tìm top errors: filter @message like /ERROR/ | stats count(*) as errorCount by @message | sort errorCount desc | limit 20",
          "Enable X-Ray Active Tracing cho Lambda function trong Configuration > Monitoring",
          "Thêm X-Ray SDK vào Lambda code và instrument DynamoDB calls bằng AWSXRaySDK.captureAWSv3Client",
          "Invoke Lambda vài lần rồi vào X-Ray Console xem Service Map và Traces",
          "Tìm trace có latency cao nhất, phân tích từng segment để xác định bottleneck",
        ],
        expectedResult: "Metric Filter tạo thành công custom metric LambdaErrors. Logs Insights queries trả về kết quả trong vài giây. X-Ray Service Map hiển thị Lambda và DynamoDB nodes với latency. Traces hiển thị breakdown chi tiết thời gian xử lý từng service.",
        troubleshooting: [
          "Logs Insights không tìm thấy kết quả: Kiểm tra time range đã chọn đúng và Log Group có chứa logs trong khoảng thời gian đó",
          "X-Ray traces không xuất hiện: Đảm bảo Lambda execution role có permission xray:PutTraceSegments và xray:PutTelemetryRecords",
          "Custom metric không hiển thị: Metric Filter chỉ xử lý logs mới; invoke Lambda thêm lần nữa để tạo logs mới",
        ],
      },
    ],
    codeSnippets: [
      {
        title: "CloudWatch Logs Insights Queries hữu ích",
        language: "bash",
        code: `# Query 1: Tìm Lambda invocations chậm nhất
# fields @timestamp, @duration, @requestId
# | filter @type = "REPORT"
# | sort @duration desc
# | limit 20

# Query 2: Đếm errors theo giờ
# fields @timestamp, @message
# | filter @message like /ERROR/
# | stats count(*) as errorCount by bin(1h)

# Query 3: Lambda cold starts
# filter @type = "REPORT"
# | stats count() as invocations,
#         sum(@initDuration > 0) as coldStarts,
#         avg(@initDuration) as avgInitDuration
# by bin(30m)

# Chạy query bằng CLI
aws logs start-query \\
  --log-group-name /aws/lambda/my-function \\
  --start-time $(date -v-1H +%s) \\
  --end-time $(date +%s) \\
  --query-string 'fields @timestamp, @message | filter @message like /ERROR/ | limit 50'`,
      },
      {
        title: "Tạo CloudWatch Alarm bằng CLI",
        language: "bash",
        code: `TOPIC_ARN=$(aws sns create-topic --name ops-alerts --query TopicArn --output text)
aws sns subscribe --topic-arn $TOPIC_ARN --protocol email --notification-endpoint ops@company.com

aws cloudwatch put-metric-alarm \\
  --alarm-name lambda-errors-high \\
  --alarm-description "Lambda function có quá nhiều errors" \\
  --metric-name Errors \\
  --namespace AWS/Lambda \\
  --dimensions Name=FunctionName,Value=my-function \\
  --statistic Sum \\
  --period 300 \\
  --evaluation-periods 2 \\
  --threshold 5 \\
  --comparison-operator GreaterThanThreshold \\
  --treat-missing-data notBreaching \\
  --alarm-actions $TOPIC_ARN`,
      },
      {
        title: "Enable X-Ray trong Lambda với AWS SDK instrumentation",
        language: "js",
        code: `const AWSXRay = require('aws-xray-sdk-core');
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, GetCommand } = require('@aws-sdk/lib-dynamodb');

// Wrap AWS SDK client với X-Ray để tự động trace tất cả calls
const client = AWSXRay.captureAWSv3Client(new DynamoDBClient({}));
const ddb = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
  const segment = AWSXRay.getSegment();
  const subsegment = segment.addNewSubsegment('validateInput');
  try {
    const userId = event.pathParameters?.userId;
    if (!userId) throw new Error('Missing userId');
    subsegment.addAnnotation('userId', userId);
    subsegment.close();

    const { Item } = await ddb.send(new GetCommand({
      TableName: process.env.TABLE_NAME,
      Key: { id: userId },
    }));

    segment.addMetadata('user', Item);
    return { statusCode: 200, body: JSON.stringify(Item) };
  } catch (err) {
    subsegment.addError(err);
    subsegment.close();
    throw err;
  }
};`,
      },
    ],
    bestPractices: [
      "Đặt log retention policy cho tất cả Log Groups; mặc định là Never expire sẽ tốn chi phí không cần thiết",
      "Dùng structured logging (JSON format) trong application để dễ query với Logs Insights",
      "Tạo CloudWatch Dashboard riêng cho mỗi service/team để dễ theo dõi và không bị nhiễu",
      "Cấu hình Alarm cho cả high error rate VÀ high latency, không chỉ availability",
      "Dùng CloudTrail để audit tất cả API calls; bật S3 data events cho buckets chứa sensitive data",
      "Enable X-Ray sampling rules để kiểm soát chi phí; không cần trace 100% requests trong production",
      "Không log sensitive data (PII, tokens, passwords) vào CloudWatch Logs; mask hoặc hash trước khi log",
      "Tạo Metric Filters từ application logs để tạo custom metrics và alarms không cần thêm instrumentation",
    ],
    commonMistakes: [
      {
        mistake: "Để Log Group retention ở Never expire, tốn chi phí tăng dần theo thời gian",
        fix: "Đặt retention period phù hợp (7-30 ngày cho debug logs, 90 ngày cho audit logs, 1 năm cho compliance logs)",
      },
      {
        mistake: "Alarm evaluation period quá ngắn dẫn đến false positives và alert fatigue",
        fix: "Dùng ít nhất 2-3 consecutive evaluation periods để alarm, giảm noise từ transient spikes",
      },
      {
        mistake: "Không bật CloudTrail hoặc chỉ bật ở một region",
        fix: "Tạo multi-region CloudTrail trail để capture tất cả API calls kể cả global services như IAM",
      },
      {
        mistake: "X-Ray chi phí tăng cao do trace 100% requests",
        fix: "Cấu hình sampling rules: trace 5% requests bình thường, 100% requests có errors để cân bằng visibility và chi phí",
      },
    ],
    checklist: [
      { id: "s11-c1", label: "Tạo CloudWatch Dashboard với metrics quan trọng của hệ thống" },
      { id: "s11-c2", label: "Cấu hình Alarms cho CPU, errors và latency với SNS notifications" },
      { id: "s11-c3", label: "Thiết lập retention policy cho tất cả CloudWatch Log Groups", description: "Tránh tốn chi phí lưu trữ logs không cần thiết" },
      { id: "s11-c4", label: "Chạy thành công Logs Insights query để tìm errors và slow requests" },
      { id: "s11-c5", label: "Bật CloudTrail multi-region trail và lưu logs vào S3" },
      { id: "s11-c6", label: "Enable X-Ray Active Tracing cho Lambda functions" },
      { id: "s11-c7", label: "Xem X-Ray Service Map và phân tích trace có latency cao" },
      { id: "s11-c8", label: "Tạo Metric Filter từ application logs để tạo custom metric" },
    ],
    quiz: [
      {
        id: "s11-q1",
        question: "CloudWatch Logs Insights khác gì với CloudWatch Logs thông thường?",
        options: [
          { id: "s11-q1-a", text: "Logs Insights là query engine cho phép filter, aggregate và visualize log data từ nhiều Log Groups bằng query language riêng", isCorrect: true },
          { id: "s11-q1-b", text: "Logs Insights lưu logs trong thời gian dài hơn", isCorrect: false },
          { id: "s11-q1-c", text: "Logs Insights chỉ dùng được cho Lambda functions", isCorrect: false },
          { id: "s11-q1-d", text: "Logs Insights thay thế hoàn toàn CloudWatch Logs", isCorrect: false },
        ],
        explanation: "CloudWatch Logs Insights là interactive query service cho phép bạn search và analyze log data. Với query language riêng, bạn có thể filter, parse fields từ JSON logs, tính toán statistics và visualize kết quả. Nó không thay thế CloudWatch Logs mà là công cụ phân tích trên dữ liệu đã lưu.",
      },
      {
        id: "s11-q2",
        question: "CloudTrail ghi lại những gì?",
        options: [
          { id: "s11-q2-a", text: "Chỉ ghi lại các lỗi xảy ra trong AWS resources", isCorrect: false },
          { id: "s11-q2-b", text: "Tất cả API calls đến AWS services: ai gọi, khi nào, từ đâu, với parameters gì", isCorrect: true },
          { id: "s11-q2-c", text: "Chỉ ghi lại các thay đổi cấu hình của EC2 instances", isCorrect: false },
          { id: "s11-q2-d", text: "Application logs từ EC2 và Lambda", isCorrect: false },
        ],
        explanation: "CloudTrail ghi lại mọi AWS API call bao gồm: user identity, timestamp, source IP, service called, action taken, request parameters và response. Điều này quan trọng cho security auditing, compliance và forensic investigation khi có incident.",
      },
      {
        id: "s11-q3",
        question: "Mục đích của X-Ray Sampling là gì?",
        options: [
          { id: "s11-q3-a", text: "Lọc bỏ các trace có lỗi", isCorrect: false },
          { id: "s11-q3-b", text: "Kiểm soát tỉ lệ phần trăm requests được trace để cân bằng giữa visibility và chi phí", isCorrect: true },
          { id: "s11-q3-c", text: "Chọn ngẫu nhiên Lambda functions để monitor", isCorrect: false },
          { id: "s11-q3-d", text: "Tự động scale số lượng X-Ray daemons", isCorrect: false },
        ],
        explanation: "X-Ray Sampling rules xác định tỉ lệ requests được trace. Mặc định trace 5% requests. Trong production bạn không cần trace 100% vì tốn chi phí. Bạn có thể tăng sampling cho specific paths hoặc khi debug vấn đề cụ thể.",
      },
      {
        id: "s11-q4",
        question: "CloudWatch Composite Alarm là gì?",
        options: [
          { id: "s11-q4-a", text: "Alarm theo dõi nhiều metrics cùng lúc từ một service", isCorrect: false },
          { id: "s11-q4-b", text: "Alarm kết hợp trạng thái của nhiều alarms khác bằng logic AND/OR để giảm false positives", isCorrect: true },
          { id: "s11-q4-c", text: "Alarm tự động tạo CloudWatch Dashboard", isCorrect: false },
          { id: "s11-q4-d", text: "Alarm chạy tự động không cần cấu hình threshold", isCorrect: false },
        ],
        explanation: "Composite Alarm đánh giá trạng thái của nhiều component alarms theo boolean expression (AND, OR, NOT). Ví dụ: chỉ alert khi cả API errors cao VÀ Lambda errors cao, tránh alert khi chỉ một trong hai vi phạm tạm thời. Giảm alert fatigue đáng kể trong production.",
      },
      {
        id: "s11-q5",
        question: "CloudWatch Metric Filter dùng để làm gì?",
        options: [
          { id: "s11-q5-a", text: "Lọc logs để chỉ hiển thị errors trong Console", isCorrect: false },
          { id: "s11-q5-b", text: "Trích xuất custom metrics từ log patterns để tạo alarms mà không cần thêm code instrumentation", isCorrect: true },
          { id: "s11-q5-c", text: "Chặn một số loại log không được ghi vào CloudWatch", isCorrect: false },
          { id: "s11-q5-d", text: "Nén log data để giảm chi phí lưu trữ", isCorrect: false },
        ],
        explanation: "Metric Filters scan log events tìm kiếm patterns (ví dụ [ERROR]) và tăng custom metric counter mỗi khi pattern match. Bạn có thể tạo CloudWatch Alarm từ custom metric này. Rất hữu ích để monitor application errors mà không cần thêm CloudWatch SDK vào code.",
      },
    ],
    architecture: {
      title: "Observability Stack với CloudWatch, CloudTrail và X-Ray",
      description: "Application gửi metrics, logs và traces đến CloudWatch và X-Ray; CloudTrail audit API calls; Alarms gửi notifications qua SNS",
      nodes: [
        { id: "app", label: "Application", sublabel: "Lambda / ECS", type: "service" },
        { id: "cloudwatch-logs", label: "CloudWatch Logs", sublabel: "Log Groups", type: "service" },
        { id: "cloudwatch-metrics", label: "CloudWatch Metrics", sublabel: "Alarms & Dashboards", type: "service" },
        { id: "xray", label: "AWS X-Ray", sublabel: "Distributed Tracing", type: "service" },
        { id: "cloudtrail", label: "CloudTrail", sublabel: "API Audit", type: "service" },
        { id: "sns", label: "SNS", sublabel: "Alert Notifications", type: "service" },
      ],
      connections: [
        { from: "app", to: "cloudwatch-logs", label: "Send logs" },
        { from: "app", to: "cloudwatch-metrics", label: "Custom metrics" },
        { from: "app", to: "xray", label: "Traces" },
        { from: "cloudwatch-metrics", to: "sns", label: "Alarm actions" },
        { from: "cloudtrail", to: "cloudwatch-logs", label: "API events" },
      ],
    },
  },

  {
    id: 12,
    slug: "12-security",
    title: "Bảo Mật Nâng Cao trên AWS",
    subtitle: "Tăng cường bảo mật với WAF, GuardDuty, KMS và quản lý secrets",
    difficulty: "advanced",
    estimatedTime: "1.5 tuần",
    services: ["WAF", "GuardDuty", "Secrets Manager", "KMS", "Parameter Store"],
    objectives: [
      "Triển khai WAF Web ACLs để bảo vệ ứng dụng khỏi các tấn công phổ biến",
      "Bật và cấu hình GuardDuty để phát hiện threats tự động",
      "Quản lý và rotate secrets an toàn với AWS Secrets Manager",
      "Mã hóa dữ liệu với AWS KMS và hiểu envelope encryption",
      "Phân biệt use cases của Secrets Manager và Parameter Store SSM",
    ],
    concepts: [
      {
        title: "AWS WAF (Web Application Firewall)",
        description: "WAF bảo vệ ứng dụng web khỏi các tấn công phổ biến như SQL injection, XSS, và DDoS ở tầng HTTP. Web ACL chứa các rules để inspect và filter traffic. Managed Rule Groups từ AWS và marketplace giúp bắt đầu nhanh. WAF tích hợp với CloudFront, ALB, API Gateway và AppSync.",
      },
      {
        title: "WAF Rules và Rule Groups",
        description: "Rules là các điều kiện để match request dựa trên IP, geographic origin, headers, query strings, body. Rule Groups là tập hợp rules có thể dùng lại. AWS Managed Rules cung cấp protection cho OWASP Top 10, known malicious IPs và bot management. Custom rules cho phép logic phức tạp hơn.",
      },
      {
        title: "Amazon GuardDuty",
        description: "GuardDuty là threat detection service sử dụng machine learning để phân tích VPC Flow Logs, CloudTrail events và DNS logs. Tự động phát hiện các mối đe dọa như compromised instances, unauthorized access, cryptocurrency mining và data exfiltration. Findings được phân loại theo severity (Low/Medium/High).",
      },
      {
        title: "AWS KMS (Key Management Service)",
        description: "KMS quản lý cryptographic keys cho encryption/decryption. Customer Managed Keys (CMK) cho phép kiểm soát hoàn toàn: rotation, access policies, audit via CloudTrail. AWS Managed Keys được quản lý tự động. KMS tích hợp với hầu hết AWS services để encrypt data at rest.",
      },
      {
        title: "Envelope Encryption",
        description: "Envelope encryption là pattern trong đó data được mã hóa bằng Data Encryption Key (DEK), sau đó DEK được mã hóa bằng KMS Key (key encryption key). KMS không bao giờ export KMS Key; thay vào đó trả về encrypted DEK. Khi decrypt, gửi encrypted DEK đến KMS để lấy plaintext DEK, rồi dùng DEK để decrypt data.",
      },
      {
        title: "AWS Secrets Manager",
        description: "Secrets Manager lưu trữ, rotate và quản lý secrets như database credentials, API keys và certificates. Automatic rotation dùng Lambda function để tự động đổi password và cập nhật secret value. Tích hợp với RDS, Redshift, DocumentDB để rotate database credentials tự động. Chi phí $0.40/secret/tháng.",
      },
      {
        title: "AWS Systems Manager Parameter Store",
        description: "Parameter Store lưu configuration data và secrets dưới dạng key-value pairs. Standard tier miễn phí cho parameters không vượt 4KB. Advanced tier hỗ trợ policies, expiration và notifications. SecureString parameters được mã hóa bằng KMS. Phù hợp cho non-secret configuration và khi cần tiết kiệm chi phí.",
      },
    ],
    consoleSteps: [
      {
        title: "Bật GuardDuty và Review Findings",
        description: "Vào GuardDuty Console, nhấn Get Started và Enable GuardDuty (chỉ một click). Sau vài phút, GuardDuty bắt đầu analyze logs. Vào Findings để xem threats được phát hiện. Nhấn vào finding để xem chi tiết, resource bị affect và remediation recommendations. Dùng Generate sample findings để test.",
        imagePath: "/images/stage-12/step-1.png",
        alt: "GuardDuty Findings dashboard với threat details",
      },
      {
        title: "Tạo Web ACL trong WAF",
        description: "Vào WAF Console, tạo Web ACL cho region phù hợp. Thêm AWS Managed Rules: AWSManagedRulesCommonRuleSet, AWSManagedRulesKnownBadInputsRuleSet. Thêm IP Set rule để block known bad IPs. Associate Web ACL với ALB. Bật Logging để gửi WAF logs đến CloudWatch hoặc S3.",
        imagePath: "/images/stage-12/step-2.png",
        alt: "Tạo WAF Web ACL với managed rules và associate với ALB",
      },
      {
        title: "Tạo và Dùng AWS Secrets Manager",
        description: "Vào Secrets Manager, Store new secret. Chọn loại secret (database credentials, API key, other). Nhập key-value pairs. Đặt tên theo convention /app/env/service. Cấu hình automatic rotation nếu hỗ trợ. Lấy secret trong code dùng AWS SDK với GetSecretValue API.",
        imagePath: "/images/stage-12/step-3.png",
        alt: "Tạo secret trong Secrets Manager với automatic rotation",
      },
      {
        title: "Tạo KMS Customer Managed Key",
        description: "Vào KMS Console, Create key. Chọn Symmetric key (ENCRYPT_DECRYPT). Đặt alias và description. Cấu hình key administrators (có thể manage key) và key users (có thể encrypt/decrypt). Enable automatic rotation (every year). Associate key với S3 bucket hoặc RDS cluster để encrypt data at rest.",
        imagePath: "/images/stage-12/step-4.png",
        alt: "Tạo KMS Customer Managed Key với rotation policy",
      },
    ],
    labs: [
      {
        id: "lab-12-security-1",
        slug: "lab-12-security-1",
        title: "Triển Khai WAF để Bảo Vệ API Gateway",
        stageId: 12,
        stageSlug: "12-security",
        objective: "Tạo WAF Web ACL với managed rules và custom rate limiting, associate với API Gateway và test protection chống SQL injection và XSS",
        estimatedTime: "75 phút",
        steps: [
          "Tạo WAF Web ACL api-protection cho region ap-southeast-1",
          "Thêm AWS Managed Rule Groups: AWSManagedRulesCommonRuleSet (priority 1) và AWSManagedRulesSQLiRuleSet (priority 2)",
          "Tạo custom Rate-based rule: block IP gửi quá 100 requests trong 5 phút",
          "Associate Web ACL với API Gateway stage",
          "Enable WAF logging đến CloudWatch Log Group /aws/waf/api-protection",
          "Test SQL injection: curl POST với body chứa payload injection -> expect 403",
          "Test XSS: curl với query string chứa script tag -> expect 403",
        ],
        expectedResult: "SQL injection và XSS requests bị block với HTTP 403. Normal requests vượt qua. Rate limiting block IP sau 100+ requests/5 phút. WAF logs trong CloudWatch ghi lại blocked requests với matched rule name.",
        troubleshooting: [
          "WAF không block SQL injection test: Đảm bảo Web ACL đã được associated với đúng API Gateway stage và region của Web ACL phải match region của API Gateway",
          "Tất cả requests đều bị block: Managed Rules ở Count mode thay vì Block mode; kiểm tra rule action trong Web ACL configuration",
          "WAF Logging không hoạt động: Log group name phải bắt đầu với aws-waf-logs- hoặc cấu hình Kinesis Firehose",
        ],
      },
      {
        id: "lab-12-security-2",
        slug: "lab-12-security-2",
        title: "Secrets Manager với Automatic Rotation và KMS Encryption",
        stageId: 12,
        stageSlug: "12-security",
        objective: "Lưu database credentials vào Secrets Manager, cấu hình automatic rotation, sau đó tạo KMS CMK và mã hóa S3 bucket với CMK",
        estimatedTime: "60 phút",
        steps: [
          "Tạo RDS MySQL instance (hoặc dùng existing) với username/password cụ thể",
          "Lưu RDS credentials vào Secrets Manager: Store secret > Credentials for Amazon RDS, chọn RDS instance",
          "Cấu hình automatic rotation: Enable rotation, rotation interval 30 ngày, Lambda rotation function tự động tạo",
          "Test rotation thủ công: Rotate secret immediately, verify kết nối database vẫn hoạt động sau rotation",
          "Tạo KMS CMK app-data-key với alias và key policy cho phép application role dùng key",
          "Tạo S3 bucket mới, enable SSE-KMS với CMK vừa tạo",
          "Verify: upload file lên S3, check object properties thấy encryption = aws:kms, download và confirm readable",
        ],
        expectedResult: "Secret lưu thành công với RDS credentials. Rotation Lambda được tạo tự động. Sau rotation, password trong RDS và Secrets Manager đồng bộ. S3 bucket encrypt objects bằng CMK. CloudTrail ghi lại mọi KMS Decrypt calls.",
        troubleshooting: [
          "Rotation Lambda timeout: Lambda rotation function cần có network access đến RDS; đảm bảo Lambda và RDS cùng VPC",
          "AccessDeniedException khi Lambda truy cập secret: Rotation Lambda role cần secretsmanager:GetSecretValue và secretsmanager:PutSecretValue permissions",
          "S3 upload lỗi KMS permissions: IAM role của user cần kms:GenerateDataKey và kms:Decrypt trên CMK ARN",
        ],
      },
    ],
    codeSnippets: [
      {
        title: "Lấy secrets từ Secrets Manager trong Lambda",
        language: "js",
        code: `const { SecretsManagerClient, GetSecretValueCommand } = require('@aws-sdk/client-secrets-manager');

const client = new SecretsManagerClient({ region: 'ap-southeast-1' });

let cachedSecret = null;
let cacheExpiry = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 phút

async function getSecret(secretName) {
  const now = Date.now();
  if (cachedSecret && now < cacheExpiry) {
    return cachedSecret;
  }
  const response = await client.send(new GetSecretValueCommand({
    SecretId: secretName,
    VersionStage: 'AWSCURRENT',
  }));
  const secret = JSON.parse(response.SecretString);
  cachedSecret = secret;
  cacheExpiry = now + CACHE_TTL;
  return secret;
}

exports.handler = async (event) => {
  const { username, password, host, port, dbname } = await getSecret('/prod/myapp/db');
  const connectionString = 'mysql://' + username + ':' + password + '@' + host + ':' + port + '/' + dbname;
  // ... business logic
};`,
      },
      {
        title: "WAF Web ACL với Terraform",
        language: "hcl",
        code: `resource "aws_wafv2_web_acl" "api_protection" {
  name  = "api-protection"
  scope = "REGIONAL"

  default_action { allow {} }

  rule {
    name     = "AWS-AWSManagedRulesCommonRuleSet"
    priority = 1
    override_action { none {} }
    statement {
      managed_rule_group_statement {
        name        = "AWSManagedRulesCommonRuleSet"
        vendor_name = "AWS"
      }
    }
    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "CommonRuleSetMetric"
      sampled_requests_enabled   = true
    }
  }

  rule {
    name     = "RateLimitRule"
    priority = 2
    action { block {} }
    statement {
      rate_based_statement {
        limit              = 100
        aggregate_key_type = "IP"
      }
    }
    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "RateLimitMetric"
      sampled_requests_enabled   = true
    }
  }

  visibility_config {
    cloudwatch_metrics_enabled = true
    metric_name                = "ApiProtectionMetric"
    sampled_requests_enabled   = true
  }
}`,
      },
      {
        title: "KMS CMK tạo và sử dụng bằng CLI",
        language: "bash",
        code: `# Tạo KMS CMK
KEY_ID=$(aws kms create-key \\
  --description "App data encryption key" \\
  --key-usage ENCRYPT_DECRYPT \\
  --query KeyMetadata.KeyId --output text)

aws kms create-alias --alias-name alias/app-data-key --target-key-id $KEY_ID

# Enable automatic rotation
aws kms enable-key-rotation --key-id $KEY_ID

# Mã hóa data với envelope encryption: tạo Data Key
aws kms generate-data-key \\
  --key-id alias/app-data-key \\
  --key-spec AES_256
# Trả về: Plaintext (dùng để encrypt data), CiphertextBlob (lưu cùng data)
# Sau đó xóa Plaintext khỏi memory, chỉ lưu CiphertextBlob

# Gán CMK vào S3 bucket
aws s3api put-bucket-encryption \\
  --bucket my-secure-bucket \\
  --server-side-encryption-configuration '{
    "Rules": [{
      "ApplyServerSideEncryptionByDefault": {
        "SSEAlgorithm": "aws:kms",
        "KMSMasterKeyID": "alias/app-data-key"
      }
    }]
  }'`,
      },
    ],
    bestPractices: [
      "Bật GuardDuty ở tất cả regions và accounts ngay từ đầu; chi phí rất thấp so với giá trị bảo vệ",
      "Dùng Secrets Manager thay environment variables cho database passwords và API keys trong production",
      "Enable automatic rotation cho secrets; không để credentials tồn tại vĩnh viễn mà không được rotate",
      "Không lưu KMS key policies quá rộng; cụ thể hóa Principal bằng role ARN thay vì wildcard",
      "Dùng WAF managed rules làm baseline, sau đó thêm custom rules cho logic bảo mật cụ thể của ứng dụng",
      "Đừng cấp quyền kms:* cho bất kỳ role nào ngoài key administrators; user chỉ cần Encrypt và Decrypt",
      "Enable WAF logging để audit traffic; không thể investigate attacks nếu không có logs",
      "Dùng Parameter Store cho non-secret configuration; Secrets Manager cho credentials cần rotation",
    ],
    commonMistakes: [
      {
        mistake: "Lưu database passwords trong environment variables của Lambda/ECS",
        fix: "Lưu credentials trong Secrets Manager hoặc Parameter Store SecureString; fetch khi startup với caching để tránh API throttling",
      },
      {
        mistake: "WAF Web ACL scope sai: tạo REGIONAL cho CloudFront hoặc ngược lại",
        fix: "CloudFront cần Web ACL scope=CLOUDFRONT tạo ở us-east-1. ALB/API Gateway cần scope=REGIONAL tạo ở cùng region",
      },
      {
        mistake: "GuardDuty findings không được xử lý, chỉ enable rồi bỏ quên",
        fix: "Cấu hình EventBridge rule để route GuardDuty findings đến SNS/Lambda; tự động remediate hoặc alert on-call team",
      },
      {
        mistake: "Xóa KMS key đang được dùng để mã hóa data",
        fix: "KMS có waiting period 7-30 ngày trước khi xóa; dùng thời gian này để kiểm tra không còn data nào dùng key này. Không thể recover data sau khi key bị xóa",
      },
    ],
    checklist: [
      { id: "s12-c1", label: "Bật GuardDuty và cấu hình alert cho High severity findings" },
      { id: "s12-c2", label: "Tạo WAF Web ACL với AWS Managed Rules và associate với ALB/API Gateway" },
      { id: "s12-c3", label: "Lưu tất cả secrets vào Secrets Manager thay environment variables", description: "Database passwords, API keys, certificates" },
      { id: "s12-c4", label: "Cấu hình automatic rotation cho database credentials" },
      { id: "s12-c5", label: "Tạo KMS CMK và mã hóa sensitive data stores (S3, RDS)" },
      { id: "s12-c6", label: "Enable WAF logging và tạo CloudWatch alarms cho blocked requests" },
      { id: "s12-c7", label: "Review GuardDuty findings và remediate high severity threats" },
    ],
    quiz: [
      {
        id: "s12-q1",
        question: "Sự khác biệt chính giữa Secrets Manager và Parameter Store là gì?",
        options: [
          { id: "s12-q1-a", text: "Parameter Store miễn phí cho standard tier và phù hợp cho configuration; Secrets Manager ($0.40/secret) có automatic rotation và tích hợp RDS", isCorrect: true },
          { id: "s12-q1-b", text: "Secrets Manager mã hóa mạnh hơn Parameter Store", isCorrect: false },
          { id: "s12-q1-c", text: "Parameter Store không hỗ trợ encryption", isCorrect: false },
          { id: "s12-q1-d", text: "Secrets Manager chỉ dùng cho RDS credentials", isCorrect: false },
        ],
        explanation: "Cả hai đều mã hóa bằng KMS. Secrets Manager ($0.40/secret/tháng) có thêm: automatic rotation với Lambda, native RDS/Redshift/DocumentDB integration, cross-account access, và versioning. Parameter Store Standard tier miễn phí cho non-sensitive config.",
      },
      {
        id: "s12-q2",
        question: "Envelope Encryption hoạt động như thế nào?",
        options: [
          { id: "s12-q2-a", text: "Data được mã hóa trực tiếp bằng KMS Master Key", isCorrect: false },
          { id: "s12-q2-b", text: "Data được mã hóa bằng Data Key (DEK); DEK được mã hóa bằng KMS Key; cả hai được lưu cùng nhau", isCorrect: true },
          { id: "s12-q2-c", text: "KMS Key được export ra ngoài để mã hóa data", isCorrect: false },
          { id: "s12-q2-d", text: "Data được mã hóa hai lần bằng hai KMS Keys khác nhau", isCorrect: false },
        ],
        explanation: "Envelope encryption: (1) Generate DEK từ KMS, (2) Dùng plaintext DEK để mã hóa data, (3) Lưu encrypted DEK cùng encrypted data, (4) Xóa plaintext DEK khỏi memory. Để decrypt: gửi encrypted DEK đến KMS để decrypt, rồi dùng plaintext DEK để decrypt data. KMS Key không bao giờ rời khỏi KMS.",
      },
      {
        id: "s12-q3",
        question: "GuardDuty phân tích những nguồn dữ liệu nào để phát hiện threats?",
        options: [
          { id: "s12-q3-a", text: "Chỉ CloudTrail logs", isCorrect: false },
          { id: "s12-q3-b", text: "VPC Flow Logs, CloudTrail management và data events, DNS query logs và EKS audit logs", isCorrect: true },
          { id: "s12-q3-c", text: "Chỉ network traffic", isCorrect: false },
          { id: "s12-q3-d", text: "Application logs từ EC2", isCorrect: false },
        ],
        explanation: "GuardDuty tự động collect và phân tích: VPC Flow Logs (network traffic), CloudTrail Management Events (API calls), CloudTrail S3 Data Events, DNS Logs (EC2 DNS queries). GuardDuty dùng machine learning và threat intelligence feeds để phát hiện anomalies.",
      },
      {
        id: "s12-q4",
        question: "WAF Rate-based rule hoạt động như thế nào?",
        options: [
          { id: "s12-q4-a", text: "Block tất cả requests từ một IP sau khi IP đó gửi quá nhiều requests trong khoảng thời gian nhất định", isCorrect: true },
          { id: "s12-q4-b", text: "Giới hạn tổng số requests từ tất cả IPs mỗi giây", isCorrect: false },
          { id: "s12-q4-c", text: "Chỉ cho phép requests từ các IPs trong whitelist", isCorrect: false },
          { id: "s12-q4-d", text: "Theo dõi và block requests có payload lớn", isCorrect: false },
        ],
        explanation: "Rate-based rule track số requests từ mỗi IP trong 5 phút. Khi IP vượt limit (ví dụ 100 requests), WAF tự động block IP đó. Block được giữ cho đến khi request rate giảm xuống dưới limit. Bảo vệ hiệu quả chống brute force, credential stuffing và một số loại DDoS.",
      },
      {
        id: "s12-q5",
        question: "Tại sao không nên xóa KMS Key ngay lập tức?",
        options: [
          { id: "s12-q5-a", text: "Vì phải trả thêm phí để xóa key", isCorrect: false },
          { id: "s12-q5-b", text: "KMS yêu cầu waiting period 7-30 ngày; nếu còn data được mã hóa bằng key này, data sẽ không thể decrypt sau khi key bị xóa vĩnh viễn", isCorrect: true },
          { id: "s12-q5-c", text: "Key cần được backup trước khi xóa", isCorrect: false },
          { id: "s12-q5-d", text: "Chỉ AWS support mới có thể xóa key", isCorrect: false },
        ],
        explanation: "Xóa KMS Key là không thể phục hồi. Nếu còn data được mã hóa bằng key đó, data sẽ bị mất vĩnh viễn. Waiting period 7-30 ngày là cơ hội cuối cùng để cancel deletion.",
      },
    ],
    architecture: {
      title: "Security Architecture với WAF, GuardDuty, KMS và Secrets Manager",
      description: "WAF bảo vệ traffic đến ALB; GuardDuty monitor toàn bộ account; KMS mã hóa data at rest; Secrets Manager quản lý credentials",
      nodes: [
        { id: "internet", label: "Internet", type: "internet" },
        { id: "waf", label: "AWS WAF", sublabel: "Web ACL", type: "service" },
        { id: "alb", label: "ALB", sublabel: "Load Balancer", type: "service" },
        { id: "app", label: "Application", sublabel: "ECS / Lambda", type: "service" },
        { id: "secrets", label: "Secrets Manager", sublabel: "Credentials", type: "service" },
        { id: "kms", label: "KMS", sublabel: "Encryption Keys", type: "service" },
        { id: "guardduty", label: "GuardDuty", sublabel: "Threat Detection", type: "service" },
      ],
      connections: [
        { from: "internet", to: "waf", label: "HTTP/HTTPS" },
        { from: "waf", to: "alb", label: "Filtered traffic" },
        { from: "alb", to: "app", label: "Route request" },
        { from: "app", to: "secrets", label: "Fetch credentials" },
        { from: "secrets", to: "kms", label: "Decrypt secret" },
        { from: "guardduty", to: "alb", label: "Monitor" },
      ],
    },
  },

  {
    id: 13,
    slug: "13-cloudfront",
    title: "CloudFront - CDN và Edge Computing",
    subtitle: "Tăng tốc delivery content toàn cầu và giảm latency với CloudFront",
    difficulty: "intermediate",
    estimatedTime: "1 tuần",
    services: ["CloudFront", "S3", "ACM"],
    objectives: [
      "Tạo CloudFront distribution với S3 và ALB origins",
      "Cấu hình cache behaviors, TTL và cache invalidation",
      "Bảo mật S3 origin với Origin Access Control (OAC)",
      "Thiết lập custom domain và HTTPS certificate với ACM",
      "Hiểu Lambda@Edge và CloudFront Functions cho edge logic",
    ],
    concepts: [
      {
        title: "Amazon CloudFront",
        description: "CloudFront là Content Delivery Network (CDN) với hơn 450 Points of Presence (PoP) trên toàn cầu. Khi user request content, CloudFront phục vụ từ edge location gần nhất thay vì origin server, giảm latency đáng kể. Hỗ trợ static files, dynamic content, streaming video và API acceleration.",
      },
      {
        title: "Origins và Behaviors",
        description: "Origin là nguồn content gốc: S3 bucket, ALB, EC2, API Gateway hoặc custom HTTP server. Behaviors định nghĩa cách CloudFront xử lý requests cho từng path pattern (/* hoặc /api/*). Mỗi behavior có thể có origin, cache policy và viewer protocol policy khác nhau.",
      },
      {
        title: "Cache Policies và TTL",
        description: "Cache Policy xác định CloudFront cache content bao lâu (TTL), headers nào được forward đến origin và query strings nào ảnh hưởng cache key. Minimum TTL, Default TTL và Maximum TTL kiểm soát thời gian cache. Cache-Control và Expires headers từ origin override default TTL.",
      },
      {
        title: "Origin Access Control (OAC)",
        description: "OAC là cơ chế bảo mật ngăn user truy cập thẳng vào S3 bucket, chỉ cho phép CloudFront. Thay thế Origin Access Identity (OAI) cũ. OAC hỗ trợ tất cả S3 regions, SSE-KMS encryption và dynamic requests. S3 bucket policy chỉ cho phép CloudFront service principal.",
      },
      {
        title: "AWS Certificate Manager (ACM)",
        description: "ACM cung cấp SSL/TLS certificates miễn phí cho custom domains trên CloudFront, ALB, API Gateway. Certificate phải được tạo ở us-east-1 để dùng với CloudFront (global service). ACM tự động renew certificates trước khi hết hạn. Hỗ trợ wildcard certificates (*.example.com).",
      },
      {
        title: "Lambda@Edge và CloudFront Functions",
        description: "Lambda@Edge chạy Lambda code tại edge locations để xử lý viewer requests/responses và origin requests/responses. CloudFront Functions nhẹ hơn, nhanh hơn và rẻ hơn cho simple transformations như URL rewrites, header manipulation và A/B testing. Functions chạy ở tất cả 450+ PoPs.",
      },
      {
        title: "Cache Invalidation và Versioning",
        description: "Cache Invalidation xóa files khỏi CloudFront edge caches trước khi TTL hết hạn, có phí $0.005/path. Cách tốt hơn là file versioning: đặt version trong filename (app.v2.js) hoặc query string để CloudFront treat như URL mới, không cần invalidation.",
      },
    ],
    consoleSteps: [
      {
        title: "Tạo CloudFront Distribution cho S3 Static Website",
        description: "Vào CloudFront Console, Create distribution. Chọn S3 bucket làm origin. Bật Origin Access Control (OAC) và copy policy để update S3 bucket policy. Cấu hình Default Root Object là index.html. Chọn Price Class phù hợp.",
        imagePath: "/images/stage-13/step-1.png",
        alt: "Tạo CloudFront distribution với S3 origin và OAC",
      },
      {
        title: "Cấu hình Custom Domain với ACM Certificate",
        description: "Tạo ACM certificate ở us-east-1 cho domain của bạn. Validate bằng DNS CNAME record. Trong CloudFront distribution, thêm Alternate domain name và chọn ACM certificate. Tạo Route 53 A record với Alias trỏ đến CloudFront distribution domain.",
        imagePath: "/images/stage-13/step-2.png",
        alt: "Cấu hình custom domain và HTTPS với ACM certificate",
      },
      {
        title: "Tạo Cache Behaviors cho API và Static Assets",
        description: "Thêm behavior cho /api/* với TTL=0 (no cache), forward tất cả headers đến ALB origin. Default behavior cho /*, TTL=86400 (1 ngày) từ S3 origin. Cấu hình Compress objects automatically để enable Gzip/Brotli compression.",
        imagePath: "/images/stage-13/step-3.png",
        alt: "Cấu hình cache behaviors cho static và API paths",
      },
      {
        title: "Kiểm tra Cache và Tạo Invalidation",
        description: "Kiểm tra distribution đang Deployed. Test với curl -I để xem X-Cache header: Hit from cloudfront hoặc Miss from cloudfront. Khi cần clear cache, vào Invalidations tab, tạo invalidation với path /index.html hoặc /* để invalidate tất cả.",
        imagePath: "/images/stage-13/step-4.png",
        alt: "Kiểm tra CloudFront cache status và tạo invalidation",
      },
    ],
    labs: [
      {
        id: "lab-13-cloudfront-1",
        slug: "lab-13-cloudfront-1",
        title: "Deploy React SPA với CloudFront và S3 với OAC",
        stageId: 13,
        stageSlug: "13-cloudfront",
        objective: "Host React Single Page Application trên S3, phân phối qua CloudFront với OAC, custom error pages và HTTPS",
        estimatedTime: "75 phút",
        steps: [
          "Tạo S3 bucket với tên unique, bật versioning, KHÔNG bật static website hosting (dùng OAC thay thế)",
          "Upload React build files: aws s3 sync ./build s3://your-bucket --delete",
          "Tạo CloudFront distribution với S3 origin, bật OAC (Create new OAC), ghi lại policy statement",
          "Cập nhật S3 bucket policy với OAC policy statement để cho phép CloudFront truy cập",
          "Cấu hình Custom Error Pages: 403 và 404 redirect đến /index.html với response code 200 (cho React Router)",
          "Bật Compress objects và set Default Root Object = index.html",
          "Deploy và test: truy cập CloudFront domain, navigate đến các routes, verify HTTPS và OAC hoạt động (S3 URL trả về 403)",
        ],
        expectedResult: "React app load qua CloudFront HTTPS. Direct S3 URL trả về 403 Access Denied. React Router routes hoạt động khi refresh trang. X-Cache header cho thấy Hit from cloudfront sau lần thứ 2.",
        troubleshooting: [
          "403 Access Denied từ CloudFront: Kiểm tra S3 bucket policy đã được update với OAC policy; bucket phải block public access nhưng cho phép CloudFront OAC principal",
          "React Router routes trả về 403 khi refresh: Cấu hình Custom Error Response cho 403 và 404 trả về /index.html với HTTP 200",
          "CloudFront không hiển thị content mới sau deploy: Tạo cache invalidation cho /* hoặc dùng file versioning (React build tự động hash filenames)",
        ],
      },
      {
        id: "lab-13-cloudfront-2",
        slug: "lab-13-cloudfront-2",
        title: "CloudFront Functions cho Security Headers",
        stageId: 13,
        stageSlug: "13-cloudfront",
        objective: "Tạo CloudFront Function để tự động thêm security headers vào tất cả responses và test với security headers audit tool",
        estimatedTime: "45 phút",
        steps: [
          "Tạo CloudFront Function add-security-headers với trigger Viewer Response",
          "Viết function code thêm headers: Strict-Transport-Security, X-Content-Type-Options, X-Frame-Options, Referrer-Policy",
          "Test function trong CloudFront Console với sample viewer-response event trước khi publish",
          "Publish function và associate với CloudFront distribution default cache behavior",
          "Test bằng curl: curl -I https://your-distribution.cloudfront.net và verify headers có trong response",
          "Tạo cache invalidation /* để clear cached responses không có headers mới",
          "Kiểm tra CloudFront Functions metrics: invocations, compute utilization, validation errors",
        ],
        expectedResult: "Tất cả responses từ CloudFront đều chứa security headers. HSTS header có max-age >= 31536000. X-Frame-Options: DENY hiển thị. CloudFront Functions metrics ghi nhận invocations.",
        troubleshooting: [
          "Function không chạy sau associate: Đảm bảo đã Publish function (trạng thái LIVE), không phải chỉ Save; draft functions không chạy trên distribution",
          "Headers không xuất hiện dù function đã publish: Tạo cache invalidation /* vì CloudFront có thể đang serve cached responses từ trước khi function được gán",
          "Function runtime error: CloudFront Functions chỉ hỗ trợ một subset của JS ES5/ES6; không dùng được async/await, require() hay Node.js built-ins",
        ],
      },
    ],
    codeSnippets: [
      {
        title: "S3 Bucket Policy cho CloudFront OAC",
        language: "json",
        code: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowCloudFrontServicePrincipal",
      "Effect": "Allow",
      "Principal": { "Service": "cloudfront.amazonaws.com" },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*",
      "Condition": {
        "StringEquals": {
          "AWS:SourceArn": "arn:aws:cloudfront::ACCOUNT-ID:distribution/DISTRIBUTION-ID"
        }
      }
    }
  ]
}`,
      },
      {
        title: "CloudFront Function - Security Headers",
        language: "js",
        code: `// CloudFront Function — trigger: Viewer Response
function handler(event) {
  var response = event.response;
  var headers = response.headers;

  headers['strict-transport-security'] = { value: 'max-age=63072000; includeSubDomains; preload' };
  headers['x-content-type-options'] = { value: 'nosniff' };
  headers['x-frame-options'] = { value: 'DENY' };
  headers['referrer-policy'] = { value: 'strict-origin-when-cross-origin' };
  headers['permissions-policy'] = { value: 'camera=(), microphone=(), geolocation=()' };

  return response;
}`,
      },
      {
        title: "Upload và Invalidation bằng CLI",
        language: "bash",
        code: `# Upload với cache headers đúng
aws s3 sync ./build s3://my-spa-bucket --delete \\
  --cache-control "max-age=31536000,public,immutable" \\
  --exclude "index.html"

aws s3 cp ./build/index.html s3://my-spa-bucket/index.html \\
  --cache-control "no-cache,no-store,must-revalidate"

# Chỉ invalidate index.html sau deploy (không invalidate /*)
DIST_ID="E1234567890ABC"
aws cloudfront create-invalidation \\
  --distribution-id $DIST_ID \\
  --paths "/index.html"`,
      },
    ],
    bestPractices: [
      "Luôn dùng OAC (không phải OAI cũ) để bảo vệ S3 origin; block all public access trên S3 bucket",
      "Tạo ACM certificate ở us-east-1 cho CloudFront; certificates ở regions khác không dùng được với CloudFront",
      "Dùng file versioning (hash trong filename) thay cache invalidation để tránh phí và tăng cache hit rate",
      "Set Cache-Control: no-cache cho index.html nhưng max-age=31536000 cho hashed assets (JS/CSS/images)",
      "Không forward tất cả headers đến origin; chỉ forward headers cần thiết để tối đa cache hit rate",
      "Dùng CloudFront Functions thay Lambda@Edge khi logic đơn giản để tiết kiệm chi phí đáng kể",
      "Enable access logging để audit requests và phân tích traffic patterns tại edge",
    ],
    commonMistakes: [
      {
        mistake: "Tạo ACM certificate ở region ap-southeast-1 để dùng với CloudFront",
        fix: "CloudFront chỉ chấp nhận ACM certificates từ us-east-1 (N. Virginia). Tạo certificate ở đúng region này dù distribution có global scope",
      },
      {
        mistake: "Forward tất cả headers (All) đến origin dẫn đến cache hit rate = 0%",
        fix: "Chỉ forward headers thực sự cần thiết. Mỗi header khác nhau tạo cache key khác nhau làm miss liên tục",
      },
      {
        mistake: "Không cấu hình Custom Error Response cho React/Vue SPA",
        fix: "Thêm Custom Error Response cho 403 và 404 trả về /index.html với HTTP 200 để client-side routing hoạt động đúng",
      },
      {
        mistake: "Invalidate /* sau mỗi deploy, tốn chi phí và mất hết cache",
        fix: "Chỉ invalidate /index.html; tất cả assets khác nên có hash trong filename, CloudFront treat chúng như URLs mới tự động",
      },
    ],
    checklist: [
      { id: "s13-c1", label: "Tạo CloudFront distribution với S3 origin và OAC" },
      { id: "s13-c2", label: "S3 bucket block public access; chỉ CloudFront có thể đọc", description: "Verify S3 URL trả về 403 nhưng CloudFront URL hoạt động" },
      { id: "s13-c3", label: "Cấu hình Custom Error Response cho 403/404 trả về index.html" },
      { id: "s13-c4", label: "Tạo ACM certificate ở us-east-1 và gán vào distribution" },
      { id: "s13-c5", label: "Cache behaviors: no-cache cho API, long TTL cho static assets" },
      { id: "s13-c6", label: "Thêm security headers qua CloudFront Functions" },
      { id: "s13-c7", label: "Verify X-Cache: Hit from cloudfront sau lần request đầu" },
    ],
    quiz: [
      {
        id: "s13-q1",
        question: "Tại sao ACM certificate phải được tạo ở us-east-1 để dùng với CloudFront?",
        options: [
          { id: "s13-q1-a", text: "CloudFront là global service và chỉ đọc certificates từ us-east-1; certificates ở regions khác không được hỗ trợ", isCorrect: true },
          { id: "s13-q1-b", text: "us-east-1 có phí certificate rẻ hơn", isCorrect: false },
          { id: "s13-q1-c", text: "ACM chỉ hoạt động ở us-east-1", isCorrect: false },
          { id: "s13-q1-d", text: "CloudFront edge locations chỉ ở US East", isCorrect: false },
        ],
        explanation: "CloudFront là global service với control plane ở us-east-1. Để attach certificate vào CloudFront distribution, ACM certificate phải tồn tại trong us-east-1 region. Certificates ở các regions khác chỉ dùng được với ALB/API Gateway trong region đó.",
      },
      {
        id: "s13-q2",
        question: "Origin Access Control (OAC) giải quyết vấn đề gì?",
        options: [
          { id: "s13-q2-a", text: "Tăng tốc độ truyền tải từ S3 đến CloudFront", isCorrect: false },
          { id: "s13-q2-b", text: "Ngăn user truy cập thẳng vào S3 bucket, buộc mọi request phải đi qua CloudFront", isCorrect: true },
          { id: "s13-q2-c", text: "Mã hóa data khi truyền từ S3 đến CloudFront edge", isCorrect: false },
          { id: "s13-q2-d", text: "Cho phép CloudFront ghi dữ liệu vào S3", isCorrect: false },
        ],
        explanation: "OAC đảm bảo S3 bucket chỉ nhận requests có chữ ký từ CloudFront service principal. S3 bucket policy từ chối mọi request khác. Điều này buộc tất cả traffic phải qua CloudFront, đảm bảo WAF rules, geo-restrictions và caching policies được áp dụng.",
      },
      {
        id: "s13-q3",
        question: "Cách tốt nhất để deploy code mới lên CloudFront mà không cần invalidation tốn phí?",
        options: [
          { id: "s13-q3-a", text: "Đợi TTL hết hạn tự nhiên", isCorrect: false },
          { id: "s13-q3-b", text: "Dùng file versioning: đặt hash hoặc version trong filename để CloudFront treat như URL mới", isCorrect: true },
          { id: "s13-q3-c", text: "Xóa và tạo lại distribution mới", isCorrect: false },
          { id: "s13-q3-d", text: "Đổi S3 bucket name", isCorrect: false },
        ],
        explanation: "File versioning (app.abc123.js) tạo URL mới mỗi lần build, CloudFront fetch từ origin vì chưa có cache cho URL đó. Invalidation ($0.005/path) vừa tốn tiền vừa mất cache toàn bộ edge locations. Chỉ cần invalidate /index.html khi dùng file versioning.",
      },
      {
        id: "s13-q4",
        question: "CloudFront Functions khác Lambda@Edge như thế nào?",
        options: [
          { id: "s13-q4-a", text: "CloudFront Functions chạy ở tất cả 450+ edge PoPs, siêu nhanh và rẻ hơn; Lambda@Edge mạnh hơn nhưng chỉ chạy ở Regional Edge Caches", isCorrect: true },
          { id: "s13-q4-b", text: "Lambda@Edge miễn phí, CloudFront Functions có phí", isCorrect: false },
          { id: "s13-q4-c", text: "CloudFront Functions hỗ trợ Python, Lambda@Edge chỉ hỗ trợ Node.js", isCorrect: false },
          { id: "s13-q4-d", text: "Chúng giống nhau hoàn toàn", isCorrect: false },
        ],
        explanation: "CloudFront Functions: chạy ở 450+ PoPs, sub-millisecond execution, memory 2MB, chỉ JS, 1/6 giá Lambda@Edge. Lambda@Edge: chạy ở Regional Edge Caches, memory 128MB-10GB, Node.js/Python, hỗ trợ network calls và complex logic.",
      },
      {
        id: "s13-q5",
        question: "Điều gì xảy ra khi CloudFront nhận request cho file chưa có trong cache?",
        options: [
          { id: "s13-q5-a", text: "CloudFront trả về 404 cho user", isCorrect: false },
          { id: "s13-q5-b", text: "CloudFront forward request đến origin, nhận response, cache lại và trả về cho user (Cache Miss)", isCorrect: true },
          { id: "s13-q5-c", text: "CloudFront yêu cầu user thử lại sau", isCorrect: false },
          { id: "s13-q5-d", text: "Request bị drop và không được xử lý", isCorrect: false },
        ],
        explanation: "Cache Miss: CloudFront không tìm thấy file trong edge cache, forward request đến origin server. Origin trả về response, CloudFront cache lại theo TTL và trả về cho user. Lần sau, cùng URL sẽ được serve từ edge cache (Cache Hit) mà không cần đến origin.",
      },
    ],
    architecture: {
      title: "CloudFront CDN với S3 Static Assets và ALB Dynamic API",
      description: "User requests được serve từ CloudFront edge location gần nhất; static assets từ S3 (OAC), API calls forward đến ALB origin",
      nodes: [
        { id: "user", label: "User", sublabel: "Browser / Mobile", type: "user" },
        { id: "cf", label: "CloudFront", sublabel: "450+ Edge PoPs", type: "service" },
        { id: "s3", label: "S3 Bucket", sublabel: "Static Assets", type: "service" },
        { id: "alb", label: "ALB", sublabel: "API Origin", type: "service" },
        { id: "acm", label: "ACM Certificate", sublabel: "us-east-1", type: "service" },
      ],
      connections: [
        { from: "user", to: "cf", label: "HTTPS (custom domain)" },
        { from: "cf", to: "s3", label: "OAC (/*)" },
        { from: "cf", to: "alb", label: "Forward (/api/*)" },
        { from: "acm", to: "cf", label: "TLS Certificate" },
      ],
    },
  },

  {
    id: 14,
    slug: "14-iac",
    title: "Infrastructure as Code",
    subtitle: "Tự động hóa và version control hạ tầng với CloudFormation, CDK và Terraform",
    difficulty: "advanced",
    estimatedTime: "1.5 tuần",
    services: ["CloudFormation", "CDK", "Terraform"],
    objectives: [
      "Viết CloudFormation templates để định nghĩa AWS resources dưới dạng YAML/JSON",
      "Dùng AWS CDK để tạo infrastructure bằng TypeScript với higher-level constructs",
      "Viết Terraform HCL để quản lý AWS resources với state management",
      "Hiểu sự khác biệt và khi nào dùng CloudFormation, CDK hay Terraform",
      "Implement best practices: modular code, DRY, phân tách environments",
    ],
    concepts: [
      {
        title: "Infrastructure as Code (IaC)",
        description: "IaC là phương pháp quản lý và provision hạ tầng thông qua code thay vì manual console clicks. Lợi ích: version control, reproducibility, automation, documentation-as-code, peer review qua pull requests và disaster recovery nhanh chóng. IaC là nền tảng của DevOps và GitOps.",
      },
      {
        title: "AWS CloudFormation",
        description: "CloudFormation là native AWS IaC service sử dụng YAML hoặc JSON templates để mô tả resources. Stacks là unit deployment; ChangeSet cho phép preview thay đổi trước khi apply. Hỗ trợ Nested Stacks, Stack Sets (multi-account/region) và Drift Detection. Miễn phí, chỉ trả cho resources tạo ra.",
      },
      {
        title: "AWS CDK (Cloud Development Kit)",
        description: "CDK cho phép định nghĩa infrastructure bằng ngôn ngữ lập trình (TypeScript, Python, Java, Go). CDK Constructs là building blocks có thể tái sử dụng ở 3 cấp độ: L1 (CloudFormation resource), L2 (opinionated defaults), L3 (Patterns). CDK synthesize ra CloudFormation templates khi deploy.",
      },
      {
        title: "HashiCorp Terraform",
        description: "Terraform là open-source IaC tool dùng HCL (HashiCorp Configuration Language) để quản lý resources trên nhiều cloud providers. State file theo dõi resources đã tạo. Terraform Plan preview thay đổi; Apply thực thi. Provider ecosystem rộng lớn với 3000+ providers.",
      },
      {
        title: "Terraform State Management",
        description: "Terraform state (terraform.tfstate) lưu mapping giữa config và real resources. Local state không an toàn cho team; Remote state (S3 + DynamoDB locking) cho phép collaboration. State locking ngăn concurrent applies gây conflict. Sensitive values trong state file; dùng encryption.",
      },
      {
        title: "CloudFormation ChangeSets",
        description: "ChangeSets cho phép preview thay đổi sẽ xảy ra khi update stack trước khi execute. Hiển thị resources sẽ được Add, Modify hoặc Remove. Đặc biệt quan trọng để phát hiện replacement (resource bị xóa và tạo lại, gây downtime). Luôn review ChangeSet trước khi execute trong production.",
      },
    ],
    consoleSteps: [
      {
        title: "Deploy CloudFormation Stack từ Template",
        description: "Vào CloudFormation Console, Create stack. Upload template file hoặc paste YAML trực tiếp. Điền parameters (environment, instance type). Review resources sẽ được tạo. Create stack và theo dõi Events tab để xem tiến độ. Xem Outputs tab cho exported values.",
        imagePath: "/images/stage-14/step-1.png",
        alt: "Deploy CloudFormation stack và theo dõi events",
      },
      {
        title: "Tạo ChangeSet để Update Stack",
        description: "Chọn stack đang chạy, Create change set. Upload template mới hoặc thay đổi parameters. Xem danh sách thay đổi: Added (xanh), Modified (vàng), Removed (đỏ). Chú ý Replacement = True nghĩa là resource sẽ bị xóa và tạo lại. Execute ChangeSet sau khi review.",
        imagePath: "/images/stage-14/step-2.png",
        alt: "CloudFormation ChangeSet review trước khi apply changes",
      },
      {
        title: "CDK Bootstrap và Deploy",
        description: "Cài đặt AWS CDK CLI: npm install -g aws-cdk. Chạy cdk bootstrap để tạo CDKToolkit stack trong account/region. Viết CDK app trong TypeScript. Chạy cdk synth để xem CloudFormation template được generate. Chạy cdk deploy để deploy stack.",
        imagePath: "/images/stage-14/step-3.png",
        alt: "CDK synthesize và deploy stack qua terminal",
      },
      {
        title: "Terraform Init, Plan và Apply",
        description: "Viết main.tf với provider và resources. Chạy terraform init để download providers. Chạy terraform plan để preview thay đổi. Review plan cẩn thận. Chạy terraform apply và nhập yes để deploy. Kiểm tra terraform.tfstate sau khi xong.",
        imagePath: "/images/stage-14/step-4.png",
        alt: "Terraform plan output với resource changes",
      },
    ],
    labs: [
      {
        id: "lab-14-iac-1",
        slug: "lab-14-iac-1",
        title: "Xây dựng VPC Infrastructure với CloudFormation",
        stageId: 14,
        stageSlug: "14-iac",
        objective: "Viết CloudFormation template tạo VPC hoàn chỉnh với public/private subnets, Internet Gateway, NAT Gateway và routing tables",
        estimatedTime: "75 phút",
        steps: [
          "Tạo file vpc-stack.yaml với Parameters: Environment (dev/staging/prod) và VpcCidr",
          "Định nghĩa Resources: VPC, 2 public subnets (AZ a và b), 2 private subnets, Internet Gateway, IGW Attachment",
          "Thêm NAT Gateway (với Elastic IP) trong mỗi public subnet cho HA",
          "Tạo Route Tables: Public RT với route 0.0.0.0/0 đến IGW, Private RT với route đến NAT Gateway",
          "Associate subnets với route tables tương ứng",
          "Thêm Outputs: VpcId, PublicSubnetIds, PrivateSubnetIds với Export Names theo convention",
          "Deploy stack và verify trong VPC Console: subnets, route tables và internet connectivity đúng",
        ],
        expectedResult: "Stack deploy thành công với status CREATE_COMPLETE. VPC có đủ 4 subnets trong 2 AZs. EC2 trong public subnet có internet access qua IGW. EC2 trong private subnet có internet access qua NAT Gateway. Outputs export values đúng format.",
        troubleshooting: [
          "ROLLBACK_COMPLETE sau khi create: Xem Events tab, tìm dòng đỏ đầu tiên với lý do lỗi; thường là CIDR overlap hoặc limit exceeded",
          "Template syntax error: Chạy aws cloudformation validate-template --template-body file://vpc-stack.yaml trước khi deploy",
          "Lỗi Resource of type already exists: Đổi tên logical IDs hoặc xóa existing resources trước nếu tên Physical ID bị conflict",
        ],
      },
      {
        id: "lab-14-iac-2",
        slug: "lab-14-iac-2",
        title: "AWS CDK App: S3 Bucket với CloudFront Distribution",
        stageId: 14,
        stageSlug: "14-iac",
        objective: "Tạo CDK TypeScript app để provision S3 bucket và CloudFront distribution với OAC, demonstrating L2 constructs và best practices",
        estimatedTime: "60 phút",
        steps: [
          "Khởi tạo CDK project: mkdir cdk-app && cd cdk-app && cdk init app --language typescript",
          "Install dependencies: npm install aws-cdk-lib constructs",
          "Viết stack trong lib/cdk-app-stack.ts: tạo S3 Bucket với versioning và encryption enabled",
          "Thêm CloudFront Distribution với S3BucketOrigin.withOriginAccessControl(), viewerProtocol: HTTPS_ONLY",
          "Thêm CfnOutput để export CloudFront domain name và S3 bucket name",
          "Chạy cdk synth để xem CloudFormation template được generate và verify resources",
          "Chạy cdk deploy, confirm khi prompt và verify resources trong AWS Console",
        ],
        expectedResult: "CDK app synth thành công, generate CloudFormation template. Deploy tạo S3 bucket và CloudFront distribution. Outputs hiển thị CloudFront domain. S3 bucket policy tự động được cấu hình cho OAC bởi L2 construct.",
        troubleshooting: [
          "CDK bootstrap required: Chạy cdk bootstrap aws://ACCOUNT-ID/REGION một lần trước khi deploy lần đầu trong account/region",
          "TypeScript compile errors: Chạy npx tsc --noEmit để check type errors trước khi cdk synth",
          "Asset bucket error: CDK cần CDKToolkit stack (từ bootstrap); nếu đã xóa stack này phải bootstrap lại",
        ],
      },
    ],
    codeSnippets: [
      {
        title: "CloudFormation Template - VPC với Subnets",
        language: "yaml",
        code: `AWSTemplateFormatVersion: "2010-09-09"
Description: VPC with public and private subnets

Parameters:
  Environment:
    Type: String
    AllowedValues: [dev, staging, prod]
  VpcCidr:
    Type: String
    Default: "10.0.0.0/16"

Resources:
  VPC:
    Type: AWS::EC2::VPC
    Properties:
      CidrBlock: !Ref VpcCidr
      EnableDnsHostnames: true
      EnableDnsSupport: true
      Tags:
        - Key: Name
          Value: !Sub "\${Environment}-vpc"

  InternetGateway:
    Type: AWS::EC2::InternetGateway

  IGWAttachment:
    Type: AWS::EC2::VPCGatewayAttachment
    Properties:
      VpcId: !Ref VPC
      InternetGatewayId: !Ref InternetGateway

  PublicRouteTable:
    Type: AWS::EC2::RouteTable
    Properties:
      VpcId: !Ref VPC

  PublicRoute:
    Type: AWS::EC2::Route
    DependsOn: IGWAttachment
    Properties:
      RouteTableId: !Ref PublicRouteTable
      DestinationCidrBlock: "0.0.0.0/0"
      GatewayId: !Ref InternetGateway

Outputs:
  VpcId:
    Value: !Ref VPC
    Export:
      Name: !Sub "\${Environment}-VpcId"`,
      },
      {
        title: "AWS CDK TypeScript - S3 + CloudFront",
        language: "ts",
        code: `import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import { Construct } from 'constructs';

export class StaticSiteStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, 'SiteBucket', {
      versioned: true,
      encryption: s3.BucketEncryption.S3_MANAGED,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    });

    const distribution = new cloudfront.Distribution(this, 'Distribution', {
      defaultBehavior: {
        origin: origins.S3BucketOrigin.withOriginAccessControl(bucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
        compress: true,
      },
      defaultRootObject: 'index.html',
      errorResponses: [
        { httpStatus: 403, responseHttpStatus: 200, responsePagePath: '/index.html' },
        { httpStatus: 404, responseHttpStatus: 200, responsePagePath: '/index.html' },
      ],
    });

    new cdk.CfnOutput(this, 'DistributionDomain', { value: distribution.distributionDomainName });
    new cdk.CfnOutput(this, 'BucketName', { value: bucket.bucketName });
  }
}`,
      },
      {
        title: "Terraform HCL - Remote State Backend",
        language: "hcl",
        code: `terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = { source = "hashicorp/aws", version = "~> 5.0" }
  }
  backend "s3" {
    bucket         = "my-terraform-state-bucket"
    key            = "prod/vpc/terraform.tfstate"
    region         = "ap-southeast-1"
    encrypt        = true
    dynamodb_table = "terraform-state-lock"
  }
}

provider "aws" {
  region = var.aws_region
  default_tags {
    tags = {
      ManagedBy   = "Terraform"
      Environment = var.environment
    }
  }
}

resource "aws_vpc" "main" {
  cidr_block           = var.vpc_cidr
  enable_dns_hostnames = true
  enable_dns_support   = true
}

resource "aws_subnet" "public" {
  count             = length(var.public_subnet_cidrs)
  vpc_id            = aws_vpc.main.id
  cidr_block        = var.public_subnet_cidrs[count.index]
  availability_zone = data.aws_availability_zones.available.names[count.index]
  tags = { Name = "\${var.environment}-public-\${count.index + 1}" }
}

output "vpc_id" {
  value = aws_vpc.main.id
}`,
      },
    ],
    bestPractices: [
      "Luôn dùng remote state (S3 + DynamoDB) cho Terraform trong team, không commit terraform.tfstate vào git",
      "Dùng CloudFormation ChangeSets và terraform plan để review thay đổi trước khi apply vào production",
      "Phân tách infrastructure thành modules/stacks nhỏ theo domain (network, compute, database) thay vì một template khổng lồ",
      "Dùng Parameters/Variables cho values thay đổi giữa environments; không hardcode account IDs hay region names",
      "Không lưu sensitive values (passwords, keys) trong code IaC; dùng Secrets Manager và reference ARN",
      "Đừng xóa CloudFormation stack chứa production database; dùng DeletionPolicy: Retain cho stateful resources",
      "CDK L2 và L3 constructs giúp nhanh hơn nhưng hãy hiểu CloudFormation output để debug khi cần",
    ],
    commonMistakes: [
      {
        mistake: "Hardcode account ID và region trong CloudFormation/Terraform code",
        fix: "Dùng Pseudo Parameters như AWS::AccountId, AWS::Region trong CloudFormation; data sources như data.aws_caller_identity trong Terraform",
      },
      {
        mistake: "Commit terraform.tfstate vào git repository",
        fix: "Thêm *.tfstate vào .gitignore; dùng S3 backend với DynamoDB locking cho team collaboration và state security",
      },
      {
        mistake: "Update stack mà không review ChangeSet trước, gây outage do resource replacement",
        fix: "Luôn tạo ChangeSet và kiểm tra Replacement=True trước khi execute; resources có Replacement=True sẽ bị xóa và tạo lại",
      },
      {
        mistake: "Một CloudFormation stack quá lớn chứa tất cả resources, khó maintain và deploy chậm",
        fix: "Phân tách thành stacks nhỏ: network stack, security stack, app stack. Dùng Outputs/Imports để share values giữa stacks",
      },
    ],
    checklist: [
      { id: "s14-c1", label: "Viết và deploy CloudFormation template tạo VPC thành công" },
      { id: "s14-c2", label: "Tạo ChangeSet và review trước khi update stack", description: "Kiểm tra Replacement = True trước khi execute" },
      { id: "s14-c3", label: "Bootstrap CDK và deploy CDK stack thành công" },
      { id: "s14-c4", label: "Viết Terraform config với remote S3 backend và DynamoDB locking" },
      { id: "s14-c5", label: "Chạy terraform plan và review output trước khi apply" },
      { id: "s14-c6", label: "IaC code được version control trong git với commit messages rõ ràng" },
      { id: "s14-c7", label: "Không có hardcoded account IDs, regions hay secrets trong code" },
    ],
    quiz: [
      {
        id: "s14-q1",
        question: "Sự khác biệt chính giữa CloudFormation và Terraform là gì?",
        options: [
          { id: "s14-q1-a", text: "CloudFormation là native AWS service (miễn phí, chỉ AWS), Terraform là multi-cloud tool với state management rõ ràng và provider ecosystem rộng", isCorrect: true },
          { id: "s14-q1-b", text: "Terraform miễn phí còn CloudFormation tính phí", isCorrect: false },
          { id: "s14-q1-c", text: "CloudFormation hỗ trợ nhiều cloud providers hơn Terraform", isCorrect: false },
          { id: "s14-q1-d", text: "Terraform không hỗ trợ AWS resources", isCorrect: false },
        ],
        explanation: "CloudFormation là native AWS IaC tool: không cần install, tích hợp sâu với AWS, không cần quản lý state. Terraform là multi-cloud, hỗ trợ 3000+ providers, state file rõ ràng. Với team chỉ dùng AWS: cả hai đều tốt. Multi-cloud: Terraform.",
      },
      {
        id: "s14-q2",
        question: "CDK L2 Constructs khác gì với L1 Constructs?",
        options: [
          { id: "s14-q2-a", text: "L2 là higher-level abstractions với sensible defaults và helper methods; L1 là 1:1 mapping với CloudFormation resources, cần fill tất cả properties", isCorrect: true },
          { id: "s14-q2-b", text: "L1 là mới hơn L2", isCorrect: false },
          { id: "s14-q2-c", text: "L2 chỉ dùng được trong Python, L1 dùng được tất cả ngôn ngữ", isCorrect: false },
          { id: "s14-q2-d", text: "L1 và L2 generate ra code giống nhau", isCorrect: false },
        ],
        explanation: "L1 (Cfn prefix) là thin wrapper 1:1 với CloudFormation. L2 là curated constructs với defaults tốt, type safety, helper methods và security best practices built-in. L3 là Patterns kết hợp nhiều L2 resources cho một use case hoàn chỉnh.",
      },
      {
        id: "s14-q3",
        question: "Tại sao cần DynamoDB table khi dùng S3 làm Terraform remote backend?",
        options: [
          { id: "s14-q3-a", text: "Để lưu backup của state file", isCorrect: false },
          { id: "s14-q3-b", text: "Để implement state locking, ngăn nhiều người chạy terraform apply cùng lúc gây conflict", isCorrect: true },
          { id: "s14-q3-c", text: "DynamoDB nhanh hơn S3 để đọc state", isCorrect: false },
          { id: "s14-q3-d", text: "Để lưu Terraform variables", isCorrect: false },
        ],
        explanation: "S3 lưu state file, DynamoDB cung cấp distributed locking. Khi một người chạy terraform apply, Terraform tạo lock record trong DynamoDB. Người khác cố chạy apply cùng lúc sẽ bị block cho đến khi lock được release. Ngăn race conditions và state corruption trong team.",
      },
      {
        id: "s14-q4",
        question: "CloudFormation ChangeSet cho biết gì về resource có Replacement = True?",
        options: [
          { id: "s14-q4-a", text: "Resource sẽ được update in-place mà không có downtime", isCorrect: false },
          { id: "s14-q4-b", text: "Resource cũ sẽ bị xóa và resource mới sẽ được tạo để thay thế, có thể gây downtime và mất data", isCorrect: true },
          { id: "s14-q4-c", text: "Resource sẽ được backup trước khi thay đổi", isCorrect: false },
          { id: "s14-q4-d", text: "Resource không thay đổi", isCorrect: false },
        ],
        explanation: "Replacement = True nghĩa là CloudFormation phải xóa resource cũ và tạo resource mới. Điều này xảy ra khi thay đổi immutable properties (ví dụ RDS engine, VPC CIDR). Với RDS, replacement có thể mất data nếu không có snapshot.",
      },
      {
        id: "s14-q5",
        question: "Lợi ích của việc phân tách infrastructure thành nhiều CloudFormation stacks nhỏ là gì?",
        options: [
          { id: "s14-q5-a", text: "Giảm phí CloudFormation", isCorrect: false },
          { id: "s14-q5-b", text: "Deploy nhanh hơn vì mỗi stack nhỏ hơn và độc lập, giảm blast radius khi có lỗi, dễ tái sử dụng và team ownership rõ ràng hơn", isCorrect: true },
          { id: "s14-q5-c", text: "CloudFormation không hỗ trợ stack lớn hơn 100 resources", isCorrect: false },
          { id: "s14-q5-d", text: "Nhiều stacks nhỏ tự động có HA tốt hơn", isCorrect: false },
        ],
        explanation: "Stack lớn = blast radius lớn, deploy chậm (CloudFormation limit 500 resources/stack), khó maintain và test. Stack nhỏ: độc lập, team riêng owns, deploy nhanh hơn, dễ review ChangeSet. Ví dụ: network-stack, iam-stack, app-stack, database-stack.",
      },
    ],
    architecture: {
      title: "IaC Pipeline: CDK/Terraform tạo AWS Infrastructure",
      description: "Developer viết code IaC, push lên git, CI/CD pipeline chạy plan/synth rồi deploy resources vào AWS account",
      nodes: [
        { id: "dev", label: "Developer", sublabel: "IaC Code (CDK/TF/CF)", type: "user" },
        { id: "git", label: "Git Repository", sublabel: "Version Control", type: "service" },
        { id: "cicd", label: "CI/CD Pipeline", sublabel: "Plan & Deploy", type: "service" },
        { id: "cfn", label: "CloudFormation", sublabel: "Stack Management", type: "service" },
        { id: "resources", label: "AWS Resources", sublabel: "VPC, EC2, RDS...", type: "service" },
        { id: "state", label: "S3 + DynamoDB", sublabel: "Terraform State", type: "service" },
      ],
      connections: [
        { from: "dev", to: "git", label: "git push" },
        { from: "git", to: "cicd", label: "Trigger pipeline" },
        { from: "cicd", to: "cfn", label: "cdk deploy / cfn deploy" },
        { from: "cfn", to: "resources", label: "Create/Update" },
        { from: "cicd", to: "state", label: "tf state read/write" },
      ],
    },
  },

  {
    id: 15,
    slug: "15-final-project",
    title: "Final Project - Full Stack AWS App",
    subtitle: "Xây dựng và deploy ứng dụng full-stack hoàn chỉnh kết hợp tất cả kiến thức đã học",
    difficulty: "advanced",
    estimatedTime: "2 tuần",
    services: ["EC2", "S3", "RDS", "ALB", "CloudFront", "Lambda", "ECS", "Route 53", "CloudWatch", "IAM"],
    objectives: [
      "Thiết kế kiến trúc AWS hoàn chỉnh cho ứng dụng production-ready",
      "Deploy frontend SPA với CloudFront và S3, backend API với ECS Fargate",
      "Cấu hình RDS với Multi-AZ, Auto Scaling và security best practices",
      "Thiết lập monitoring toàn diện với CloudWatch, X-Ray và alerting",
      "Tự động hóa toàn bộ infrastructure bằng CDK hoặc Terraform",
    ],
    concepts: [
      {
        title: "Well-Architected Framework",
        description: "AWS Well-Architected Framework có 6 pillars: Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization và Sustainability. Mỗi quyết định kiến trúc nên được đánh giá qua lens của 6 pillars này. AWS Well-Architected Tool giúp review và improve architecture.",
      },
      {
        title: "Multi-Tier Architecture",
        description: "Kiến trúc 3-tier phổ biến: Presentation tier (CloudFront + S3 cho SPA), Application tier (ECS Fargate sau ALB trong private subnets), Data tier (RDS Multi-AZ trong isolated subnets). Mỗi tier chỉ communicate với tier liền kề, giảm attack surface và tăng security.",
      },
      {
        title: "High Availability Design",
        description: "HA đạt được bằng: Multi-AZ deployments (RDS Multi-AZ, ECS tasks trải đều 2+ AZs), ALB với health checks để route traffic khỏi unhealthy instances, Auto Scaling để maintain desired capacity, Route 53 health checks với failover routing. Target: 99.9% uptime.",
      },
      {
        title: "Security Layers",
        description: "Defense in depth: Network layer (VPC, security groups, NACLs), Application layer (WAF, authentication/authorization), Data layer (encryption at rest với KMS, in transit với TLS), Identity layer (IAM least privilege, Cognito). GuardDuty monitoring tất cả layers. Secrets Manager cho credentials.",
      },
      {
        title: "Cost Optimization Strategy",
        description: "Chiến lược tiết kiệm chi phí: Right-sizing (chọn instance type phù hợp), Reserved Instances/Savings Plans cho predictable workloads, Spot Instances cho batch jobs, S3 lifecycle policies, CloudFront giảm data transfer costs, tắt non-production resources ngoài giờ làm việc.",
      },
      {
        title: "CI/CD Pipeline Integration",
        description: "Pipeline tự động: Developer push code -> GitHub trigger -> CI build và test -> Docker build và push ECR -> CDK/Terraform plan -> Manual approval cho production -> Deploy ECS service với rolling update -> CloudWatch alarms verify -> Rollback tự động nếu errors tăng cao.",
      },
    ],
    consoleSteps: [
      {
        title: "Thiết Kế và Vẽ Architecture Diagram",
        description: "Vẽ architecture diagram trước khi build: xác định các services cần dùng, cách chúng kết nối, security groups, subnets và data flow. Dùng AWS Architecture Diagrams hoặc draw.io với AWS icon pack. Diagram là tài liệu sống, cập nhật khi architecture thay đổi.",
        imagePath: "/images/stage-15/step-1.png",
        alt: "Architecture diagram của full-stack AWS application",
      },
      {
        title: "Deploy Infrastructure với IaC",
        description: "Dùng CDK hoặc Terraform để tạo toàn bộ infrastructure: VPC, subnets, security groups, RDS, ECR, ECS cluster. Deploy theo thứ tự: network stack, security stack, database stack, application stack. Verify từng stack trước khi tiếp tục stack tiếp theo.",
        imagePath: "/images/stage-15/step-2.png",
        alt: "Deploy infrastructure stacks theo thứ tự với CDK",
      },
      {
        title: "Configure Monitoring và Alerting",
        description: "Tạo CloudWatch Dashboard tổng quan: ALB request count, ECS CPU/memory, RDS connections và latency, Lambda errors. Tạo alarms cho các SLI quan trọng. Cấu hình X-Ray tracing cho end-to-end visibility. Thiết lập email on-call rotation.",
        imagePath: "/images/stage-15/step-3.png",
        alt: "CloudWatch Dashboard tổng quan production metrics",
      },
      {
        title: "Load Test và Verify Auto Scaling",
        description: "Dùng k6 hoặc Apache Bench để load test application: tăng dần concurrent users từ 10 đến 500. Quan sát Auto Scaling triggers, ECS task count tăng, ALB distributes load. Verify response time dưới 500ms ở p99 dưới load. Kiểm tra CloudWatch metrics và X-Ray traces.",
        imagePath: "/images/stage-15/step-4.png",
        alt: "Load testing kết quả với Auto Scaling verification",
      },
      {
        title: "Security Review",
        description: "Review IAM policies với Access Analyzer để tìm over-permissive policies. Chạy AWS Trusted Advisor để get recommendations. Test WAF bằng cách gửi SQL injection và XSS requests. Verify GuardDuty đang active. Scan ECR images tìm vulnerabilities. Review Security Hub findings.",
        imagePath: "/images/stage-15/step-5.png",
        alt: "Security review với IAM Access Analyzer và Trusted Advisor",
      },
    ],
    labs: [
      {
        id: "lab-15-final-project-1",
        slug: "lab-15-final-project-1",
        title: "Deploy Full-Stack App: React Frontend + Node.js API + RDS",
        stageId: 15,
        stageSlug: "15-final-project",
        objective: "Deploy ứng dụng Todo App hoàn chỉnh: React SPA trên CloudFront/S3, Node.js REST API trên ECS Fargate sau ALB, PostgreSQL trên RDS với Multi-AZ",
        estimatedTime: "3 giờ",
        steps: [
          "Tạo VPC với 3 tầng subnet: public (ALB), private (ECS), isolated (RDS) trong 2 AZs",
          "Deploy RDS PostgreSQL Multi-AZ trong isolated subnets với Secrets Manager cho credentials",
          "Build Node.js API Docker image, push lên ECR, deploy ECS Fargate service (2 tasks) sau ALB trong private subnets",
          "Build React app với API URL từ ALB DNS, upload lên S3, tạo CloudFront distribution với OAC",
          "Cấu hình CloudFront behaviors: /api/* forward đến ALB origin (no cache), /* serve từ S3 (cached)",
          "Thiết lập CloudWatch Dashboard: ALB 5xx rate, ECS CPU, RDS connections",
          "Load test với ab -n 1000 -c 50, verify Auto Scaling trigger và không có errors trong CloudWatch",
        ],
        expectedResult: "React app accessible qua CloudFront HTTPS. API calls đến /api/* reach ECS backend. Database CRUD operations hoạt động. RDS Multi-AZ failover test thành công trong < 60 giây. Auto Scaling tăng ECS tasks khi load tăng.",
        troubleshooting: [
          "API calls từ React bị CORS error: Cấu hình CloudFront behavior /api/* để forward Origin header; và ECS backend trả về đúng CORS headers cho CloudFront domain",
          "ECS không kết nối được RDS: Kiểm tra security group của ECS tasks có outbound rule đến RDS security group trên port 5432",
          "CloudFront trả về 504 Gateway Timeout cho API calls: ALB health check path /health phải trả về 200; kiểm tra ECS task logs",
        ],
      },
      {
        id: "lab-15-final-project-2",
        slug: "lab-15-final-project-2",
        title: "Infrastructure as Code: Toàn Bộ Stack bằng CDK",
        stageId: 15,
        stageSlug: "15-final-project",
        objective: "Viết CDK TypeScript app để provision toàn bộ infrastructure của Final Project: VPC, RDS, ECS, ALB, CloudFront theo từng construct có thể tái sử dụng",
        estimatedTime: "2 giờ",
        steps: [
          "Tạo CDK app với 3 stacks: NetworkStack (VPC, subnets, SGs), DatabaseStack (RDS, Secrets Manager), AppStack (ECR, ECS, ALB, CloudFront)",
          "NetworkStack: tạo VPC với 3 subnet tiers, cấu hình NAT Gateway, export VPC và subnet IDs",
          "DatabaseStack: import VPC từ NetworkStack, tạo RDS Multi-AZ PostgreSQL, lưu credentials vào Secrets Manager, export endpoint",
          "AppStack: tạo ECR repository, ECS Cluster và Fargate Service sau ALB, tạo CloudFront distribution với dual origins (S3 và ALB)",
          "Thêm CDK Aspects để enforce tags trên tất cả resources",
          "Chạy cdk diff để so sánh trước khi deploy lần đầu",
          "Deploy theo thứ tự: cdk deploy NetworkStack, DatabaseStack, AppStack",
        ],
        expectedResult: "Ba stacks deploy thành công. Tất cả resources được tạo tự động không cần manual console clicks. CDK Outputs hiển thị CloudFront URL, ALB DNS, RDS endpoint. Resources có tags đúng theo convention.",
        troubleshooting: [
          "Cross-stack reference error: Đảm bảo export từ stack A trước khi import ở stack B; deploy NetworkStack xong mới deploy DatabaseStack",
          "CDK synth lỗi type: Chạy npx tsc --noEmit để check TypeScript errors; import đúng modules từ aws-cdk-lib",
          "cdk destroy không xóa được RDS: Nếu RDS có DeletionPolicy.RETAIN, phải xóa manual snapshot hoặc override deletion protection trước",
        ],
      },
    ],
    codeSnippets: [
      {
        title: "CDK NetworkStack với 3-tier VPC",
        language: "ts",
        code: `import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

export class NetworkStack extends cdk.Stack {
  public readonly vpc: ec2.Vpc;
  public readonly albSg: ec2.SecurityGroup;
  public readonly ecsSg: ec2.SecurityGroup;
  public readonly rdsSg: ec2.SecurityGroup;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.vpc = new ec2.Vpc(this, 'AppVpc', {
      maxAzs: 2,
      natGateways: 1,
      subnetConfiguration: [
        { name: 'Public', subnetType: ec2.SubnetType.PUBLIC, cidrMask: 24 },
        { name: 'Private', subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS, cidrMask: 24 },
        { name: 'Isolated', subnetType: ec2.SubnetType.PRIVATE_ISOLATED, cidrMask: 28 },
      ],
    });

    this.albSg = new ec2.SecurityGroup(this, 'AlbSg', { vpc: this.vpc, description: 'ALB security group' });
    this.albSg.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(443));
    this.albSg.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(80));

    this.ecsSg = new ec2.SecurityGroup(this, 'EcsSg', { vpc: this.vpc, description: 'ECS tasks security group' });
    this.ecsSg.addIngressRule(this.albSg, ec2.Port.tcp(3000));

    this.rdsSg = new ec2.SecurityGroup(this, 'RdsSg', { vpc: this.vpc, description: 'RDS security group' });
    this.rdsSg.addIngressRule(this.ecsSg, ec2.Port.tcp(5432));
  }
}`,
      },
      {
        title: "CDK AppStack: ECS Fargate Service sau ALB",
        language: "ts",
        code: `import * as cdk from 'aws-cdk-lib';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecsPatterns from 'aws-cdk-lib/aws-ecs-patterns';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import { Construct } from 'constructs';
import { NetworkStack } from './network-stack';

export class AppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, network: NetworkStack, props?: cdk.StackProps) {
    super(scope, id, props);

    const repo = new ecr.Repository(this, 'ApiRepo', {
      repositoryName: 'todo-api',
      imageScanOnPush: true,
    });

    const cluster = new ecs.Cluster(this, 'Cluster', {
      vpc: network.vpc,
      containerInsights: true,
    });

    const service = new ecsPatterns.ApplicationLoadBalancedFargateService(this, 'ApiService', {
      cluster,
      cpu: 512,
      memoryLimitMiB: 1024,
      desiredCount: 2,
      taskImageOptions: {
        image: ecs.ContainerImage.fromEcrRepository(repo, 'latest'),
        containerPort: 3000,
        environment: { NODE_ENV: 'production' },
      },
      securityGroups: [network.ecsSg],
      taskSubnets: { subnetType: cdk.aws_ec2.SubnetType.PRIVATE_WITH_EGRESS },
      publicLoadBalancer: true,
    });

    service.scalableTaskCount.scaleOnCpuUtilization('CpuScaling', {
      targetUtilizationPercent: 70,
    });

    new cdk.CfnOutput(this, 'ApiUrl', { value: service.loadBalancer.loadBalancerDnsName });
  }
}`,
      },
      {
        title: "k6 Load Test Script",
        language: "js",
        code: `import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

const errorRate = new Rate('errors');
const BASE_URL = __ENV.API_URL || 'https://your-cloudfront-domain.com';

export const options = {
  stages: [
    { duration: '1m', target: 20 },
    { duration: '3m', target: 100 },
    { duration: '1m', target: 200 },
    { duration: '2m', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<500', 'p(99)<1000'],
    errors: ['rate<0.01'],
  },
};

export default function () {
  const listRes = http.get(BASE_URL + '/api/todos');
  check(listRes, {
    'list status 200': (r) => r.status === 200,
    'list response time < 500ms': (r) => r.timings.duration < 500,
  });
  errorRate.add(listRes.status !== 200);

  const createRes = http.post(
    BASE_URL + '/api/todos',
    JSON.stringify({ title: 'Test todo', completed: false }),
    { headers: { 'Content-Type': 'application/json' } }
  );
  check(createRes, { 'create status 201': (r) => r.status === 201 });
  errorRate.add(createRes.status !== 201);

  sleep(1);
}`,
      },
    ],
    bestPractices: [
      "Thiết kế cho failure: giả định mọi component có thể fail và build cho HA ngay từ đầu",
      "Implement health checks ở tất cả tầng: ALB target health check, ECS container health check, RDS monitoring",
      "Dùng múi giờ UTC cho tất cả logs, metrics và scheduled tasks để tránh confusion với DST",
      "Mọi secret phải qua Secrets Manager, mọi configuration phải qua Parameter Store; không dùng environment variables hardcoded",
      "Tạo runbook cho mỗi alarm: khi alarm X fires, engineer cần làm gì? Document rõ ràng trước khi go live",
      "Không deploy trực tiếp lên production; luôn qua pipeline với automated tests và manual approval gate",
      "Cost tagging bắt buộc: gán tags Environment, Project, Owner cho tất cả resources để track chi phí",
      "Đừng bỏ qua disaster recovery testing: thực hành RDS failover, ECS task replacement định kỳ",
    ],
    commonMistakes: [
      {
        mistake: "Deploy tất cả ECS tasks vào một AZ duy nhất",
        fix: "Cấu hình ECS Service với subnets từ ít nhất 2 AZs và enable ECS Spread placement strategy để distribute tasks đều",
      },
      {
        mistake: "Không có health endpoint /health trong backend API",
        fix: "Thêm GET /health endpoint trả về 200 với thông tin cơ bản; ALB và ECS dùng endpoint này để health checks",
      },
      {
        mistake: "RDS trong public subnets để dễ connect trong development",
        fix: "RDS luôn phải trong private/isolated subnets; dùng AWS Systems Manager Session Manager hoặc bastion host để connect khi cần debug",
      },
      {
        mistake: "Không có runbook và documentation cho production incidents",
        fix: "Viết runbook cho mỗi alarm trước khi go live: triệu chứng, impact, investigation steps và remediation actions",
      },
      {
        mistake: "Không test disaster recovery scenarios trước khi production launch",
        fix: "Test RDS failover (< 60s), ECS task replacement, ALB health check với failing container ít nhất một lần trong staging trước go-live",
      },
    ],
    checklist: [
      { id: "s15-c1", label: "Architecture diagram hoàn chỉnh với tất cả services và connections" },
      { id: "s15-c2", label: "Frontend deploy trên CloudFront + S3 với HTTPS và OAC" },
      { id: "s15-c3", label: "Backend API deploy trên ECS Fargate Multi-AZ sau ALB", description: "Ít nhất 2 tasks trải đều 2 AZs" },
      { id: "s15-c4", label: "RDS Multi-AZ trong isolated subnets với Secrets Manager" },
      { id: "s15-c5", label: "CloudWatch Dashboard và Alarms với SNS notifications" },
      { id: "s15-c6", label: "WAF bảo vệ CloudFront và ALB" },
      { id: "s15-c7", label: "Infrastructure as Code với CDK hoặc Terraform" },
      { id: "s15-c8", label: "Load test vượt qua threshold: p99 < 1s, error rate < 1%" },
      { id: "s15-c9", label: "Security review: không có public RDS, không có hardcoded secrets" },
      { id: "s15-c10", label: "Runbook documentation cho các scenarios incident chính" },
    ],
    quiz: [
      {
        id: "s15-q1",
        question: "AWS Well-Architected Framework có bao nhiêu pillars?",
        options: [
          { id: "s15-q1-a", text: "4 pillars: Security, Reliability, Performance, Cost", isCorrect: false },
          { id: "s15-q1-b", text: "6 pillars: Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization, Sustainability", isCorrect: true },
          { id: "s15-q1-c", text: "5 pillars: Security, Reliability, Performance, Cost, Scalability", isCorrect: false },
          { id: "s15-q1-d", text: "3 pillars: Security, Availability, Cost", isCorrect: false },
        ],
        explanation: "AWS Well-Architected Framework gồm 6 pillars: (1) Operational Excellence, (2) Security, (3) Reliability, (4) Performance Efficiency, (5) Cost Optimization, (6) Sustainability. Mỗi pillar có design principles và best practices riêng.",
      },
      {
        id: "s15-q2",
        question: "Trong 3-tier architecture, lý do ECS tasks nên ở private subnets là gì?",
        options: [
          { id: "s15-q2-a", text: "Private subnets nhanh hơn public subnets", isCorrect: false },
          { id: "s15-q2-b", text: "Giảm attack surface: internet không thể direct access ECS containers; chỉ ALB (trong public subnet) có thể route traffic vào", isCorrect: true },
          { id: "s15-q2-c", text: "Private subnets rẻ hơn public subnets", isCorrect: false },
          { id: "s15-q2-d", text: "ECS Fargate chỉ chạy được trong private subnets", isCorrect: false },
        ],
        explanation: "Defense in depth: ALB ở public subnets nhận traffic từ internet, forward đến ECS tasks ở private subnets. Internet không thể reach ECS containers trực tiếp. Nguyên tắc: chỉ expose những gì cần thiết.",
      },
      {
        id: "s15-q3",
        question: "RDS Multi-AZ hoạt động như thế nào?",
        options: [
          { id: "s15-q3-a", text: "Tạo read replicas để scale đọc", isCorrect: false },
          { id: "s15-q3-b", text: "Duy trì synchronous standby replica ở AZ khác; tự động failover khi primary fail, thường hoàn thành trong 60-120 giây", isCorrect: true },
          { id: "s15-q3-c", text: "Backup database mỗi giờ vào S3", isCorrect: false },
          { id: "s15-q3-d", text: "Chạy hai database instances cùng lúc để tăng throughput gấp đôi", isCorrect: false },
        ],
        explanation: "RDS Multi-AZ duy trì synchronous standby instance ở AZ khác. Mọi write được replicated synchronously đến standby trước khi acknowledge. Khi primary fail, RDS tự động promote standby và update DNS endpoint. Failover thường 60-120 giây. Không tăng read performance.",
      },
      {
        id: "s15-q4",
        question: "Tại sao nên dùng CloudFront trước cả ALB, không phải expose ALB trực tiếp?",
        options: [
          { id: "s15-q4-a", text: "CloudFront bắt buộc khi dùng ALB", isCorrect: false },
          { id: "s15-q4-b", text: "CloudFront thêm lớp cache, WAF bảo vệ, DDoS protection, HTTPS termination tại edge và giảm latency toàn cầu cho API calls lặp lại", isCorrect: true },
          { id: "s15-q4-c", text: "ALB không hỗ trợ HTTPS", isCorrect: false },
          { id: "s15-q4-d", text: "CloudFront rẻ hơn ALB", isCorrect: false },
        ],
        explanation: "Đặt CloudFront trước ALB có nhiều lợi ích: (1) Edge caching giảm hits đến backend, (2) AWS Shield Standard bảo vệ DDoS miễn phí, (3) WAF attach vào CloudFront để filter traffic, (4) HTTPS termination tại edge gần user hơn, (5) Geo-restriction.",
      },
      {
        id: "s15-q5",
        question: "Chi phí AWS thường tăng đột biến nhất từ nguồn nào không được chú ý?",
        options: [
          { id: "s15-q5-a", text: "CloudWatch metrics", isCorrect: false },
          { id: "s15-q5-b", text: "Data transfer out (egress) từ AWS ra internet và NAT Gateway processing fees", isCorrect: true },
          { id: "s15-q5-c", text: "IAM API calls", isCorrect: false },
          { id: "s15-q5-d", text: "CloudFormation stack operations", isCorrect: false },
        ],
        explanation: "Data transfer out từ AWS ra internet ($0.08-0.09/GB) và NAT Gateway processing ($0.045/GB) cộng thêm giờ chạy thường là surprise cost. Dùng CloudFront để cache responses, VPC Endpoints để tránh NAT Gateway cho AWS services.",
      },
      {
        id: "s15-q6",
        question: "Auto Scaling Target Tracking policy với target CPU 70% nghĩa là gì?",
        options: [
          { id: "s15-q6-a", text: "Scale out khi CPU > 70%, scale in khi CPU < 70%", isCorrect: false },
          { id: "s15-q6-b", text: "Auto Scaling tự động điều chỉnh số instances/tasks để duy trì average CPU utilization ở khoảng 70% trên toàn bộ fleet", isCorrect: true },
          { id: "s15-q6-c", text: "Không bao giờ để CPU vượt 70%", isCorrect: false },
          { id: "s15-q6-d", text: "Tắt 30% instances khi không cần thiết", isCorrect: false },
        ],
        explanation: "Target Tracking liên tục tính toán và điều chỉnh capacity để giữ metric ở target value. Nếu average CPU = 85%, scale out thêm instances. Nếu average CPU = 40%, scale in bớt instances. AWS khuyến nghị target 60-70% để có buffer cho traffic spikes.",
      },
    ],
    architecture: {
      title: "Full-Stack AWS Application Architecture",
      description: "Production-ready 3-tier application: CloudFront phân phối frontend và API, ECS Fargate chạy backend, RDS lưu dữ liệu, CloudWatch giám sát toàn bộ",
      nodes: [
        { id: "user", label: "User", sublabel: "Browser / Mobile", type: "user" },
        { id: "cf", label: "CloudFront + WAF", sublabel: "CDN & Security", type: "service" },
        { id: "s3", label: "S3", sublabel: "React SPA", type: "service" },
        { id: "alb", label: "ALB", sublabel: "Public Subnets", type: "service" },
        { id: "ecs", label: "ECS Fargate", sublabel: "Private Subnets (x2 AZ)", type: "service" },
        { id: "rds", label: "RDS Multi-AZ", sublabel: "Isolated Subnets", type: "service" },
        { id: "cw", label: "CloudWatch", sublabel: "Metrics & Alarms", type: "service" },
      ],
      connections: [
        { from: "user", to: "cf", label: "HTTPS" },
        { from: "cf", to: "s3", label: "Static assets (OAC)" },
        { from: "cf", to: "alb", label: "/api/* forward" },
        { from: "alb", to: "ecs", label: "Route traffic" },
        { from: "ecs", to: "rds", label: "SQL queries" },
        { from: "ecs", to: "cw", label: "Metrics & Logs" },
      ],
    },
  },
];
