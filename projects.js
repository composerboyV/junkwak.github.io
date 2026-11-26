// Public portfolio card index. Edit full project stories in projects/<id>/index.html.
// Do not add credentials, internal endpoints or company source code.
const projects = [
  {
    "id": "mirai",
    "category": "ai",
    "appIcon": "./assets/hackathon-tokyo/event-logo-icon.png",
    "appIconAlt": "42 Asia Hackathon 2026 in Tokyo 로고",
    "title": "42 Asia Hackathon 2026 in Tokyo",
    "award": "Tokyo · 3rd place",
    "subtitle": "팀 Mirai 未来 · AI-agent 4종류",
    "period": "2026.11.09 — 11.11 · 42시간",
    "description": "주일 프랑스상공회의소(CCIFJ)의 회원 상담, 행사 추천, 기업 연결, 회원 수요 분석 등으로 직원을 돕고, 가입 기관과 회원들의 활동을 돕는 AI 에이전트입니다.",
    "tags": [
      "AI Agent",
      "LLM",
      "Node.js",
      "Azure"
    ],
    "role": "플랫폼·인프라 / A3·A4 에이전트",
    "url": "./projects/mirai/"
  },
  {
    "id": "stoolcare",
    "category": "work",
    "title": "스툴케어",
    "subtitle": "대변·식단 기록 · 헬스케어",
    "period": "2025.10 — 현재",
    "description": "대변과 식단을 사진으로 기록하고, 분석 결과와 지난 기록을 확인할 수 있는 헬스케어 앱입니다.",
    "tags": [
      "Flutter",
      "Dart",
      "NestJS",
      "PostgreSQL"
    ],
    "role": "앱·백엔드 / 운영",
    "url": "./projects/stoolcare/",
    "appIcon": "./assets/app-icons/stoolcare.jpg",
    "appIconAlt": "스툴케어 앱 아이콘"
  },
  {
    "id": "fecal-qa",
    "category": "work",
    "title": "피칼스캐너",
    "subtitle": "대변 사진 분석 · 기록 조회",
    "period": "2025.10 — 현재",
    "description": "대변을 촬영해 AI 분석 결과를 확인하고, 이전 기록을 살펴볼 수 있는 앱입니다.",
    "tags": [
      "Flutter",
      "Dart",
      "Go",
      "Firebase"
    ],
    "role": "유지보수 / QA / 앱 개발",
    "url": "./projects/fecal-qa/",
    "appIcon": "./assets/app-icons/fecal-scanner.jpg",
    "appIconAlt": "피칼스캐너 앱 아이콘"
  },
  {
    "id": "fecal-m",
    "category": "work",
    "title": "피칼스캐너-M",
    "status": "임상시험계획 승인",
    "subtitle": "2등급 디지털의료기기 · 대변 사진 분석",
    "period": "2026.03 — 현재",
    "description": "궤양성 대장염 환자의 대변 사진을 분석해 질환 활성 여부를 보여주는 의료기기 소프트웨어입니다. 의료진은 웹에서 환자별 분석 결과와 검사 이력을 확인할 수 있습니다.",
    "tags": [
      "Flutter",
      "Go",
      "FastAPI",
      "GCP"
    ],
    "role": "개발 / 보안 검증",
    "url": "./projects/fecal-m/",
    "appIcon": "./assets/app-icons/fecal-scanner-m.png",
    "appIconAlt": "피칼스캐너-M 앱 아이콘"
  },
  {
    "id": "hackathon",
    "category": "ai",
    "icon": "📑",
    "title": "BidScope · 나라장터 입찰 검토 에이전트",
    "subtitle": "공공입찰 RFP 검토 · 분야별 AI 에이전트",
    "period": "2026.09 — 2026.10",
    "description": "담당자 대신 나라장터 입찰공고를 읽고, 입찰 조건이 우리 회사와 맞는지 매칭해 주는 AI 에이전트입니다. 조건마다 공고 원문과 회사 근거를 같이 보여 줍니다.",
    "tags": [
      "Python",
      "FastAPI",
      "React",
      "Mistral AI"
    ],
    "role": "심층 분석 에이전트 / 기획·개발",
    "url": "./projects/hackathon/"
  },
  {
    "id": "admin",
    "category": "work",
    "icon": "🖥️",
    "title": "서비스별 관리자 웹",
    "subtitle": "스툴케어 · 피칼스캐너 · 피칼스캐너-M",
    "period": "2026.03 — 2026.11",
    "description": "세 서비스의 운영자와 의료진이 사용자 기록과 검사 사진을 다루는 관리자 웹입니다. 관리자 확인과 조회 범위를 서버에서 통제하는 데 중점을 뒀습니다.",
    "tags": [
      "React",
      "Next.js",
      "NestJS",
      "Firebase"
    ],
    "role": "관리자 웹 / 접근 통제",
    "url": "./projects/admin/"
  },
  {
    "id": "band",
    "category": "personal",
    "icon": "🎸",
    "title": "WE ARE BAND · 42 BAND · 악사모",
    "subtitle": "밴드 악보·곡 선정·일정 공유",
    "period": "2026.07 — 2026.11",
    "description": "밴드 멤버들이 곡을 제안하고, 악보와 영상을 나누며, 합주 일정을 확인하는 웹사이트입니다.",
    "tags": [
      "Next.js",
      "Supabase",
      "PostgreSQL",
      "Vercel"
    ],
    "role": "웹 개발 · 배포",
    "url": "./projects/band/"
  },
  {
    "id": "coupang",
    "category": "personal",
    "icon": "🚚",
    "title": "Coupang Order Viewer",
    "subtitle": "주문 메일 기반 데스크톱 도구",
    "period": "2026.05 — 2026.06",
    "description": "쿠팡 주문 메일에서 주문·배송지 정보를 모아 확인하고, 엑셀로 저장할 수 있는 Windows 앱입니다.",
    "tags": [
      "C#",
      ".NET 8",
      "WPF",
      "MVVM"
    ],
    "role": "데스크톱 앱",
    "url": "./projects/coupang/"
  },
  {
    "id": "webserver",
    "category": "study",
    "icon": "🌐",
    "title": "C++ HTTP/1.1 서버",
    "subtitle": "HTTP 요청 처리 · CGI",
    "period": "2025.05 — 2025.09",
    "description": "HTTP 요청을 처리하고 Python·PHP 프로그램의 실행 결과를 응답으로 전달하는 C++ 웹 서버입니다.",
    "tags": [
      "C++98",
      "Linux",
      "epoll",
      "CGI"
    ],
    "role": "부팀장 / CGI 구현",
    "url": "./projects/webserver/"
  },
  {
    "id": "raycasting",
    "category": "study",
    "icon": "🧊",
    "title": "C 기반 3D 그래픽",
    "subtitle": "2D → 3D 레이캐스팅",
    "period": "2025.03 — 2025.04",
    "description": "2D 맵을 1인칭 3D 화면으로 보여주는 레이캐스팅 프로그램입니다. 맵 안에서 이동하고 시점을 회전할 수 있습니다.",
    "tags": [
      "C",
      "MiniLibX",
      "DDA",
      "Raycasting"
    ],
    "role": "그래픽 구현",
    "url": "./projects/raycasting/"
  },
  {
    "id": "minishell",
    "category": "study",
    "icon": "⌨️",
    "title": "Minishell",
    "subtitle": "Unix 셸 구현",
    "period": "2024.11 — 2024.12",
    "description": "명령어 실행과 파이프, 입출력 리다이렉션을 지원하는 Unix 셸입니다.",
    "tags": [
      "C",
      "Unix",
      "readline",
      "Process"
    ],
    "role": "셸 개발",
    "url": "./projects/minishell/"
  }
];
