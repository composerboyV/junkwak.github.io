// Public portfolio card index. Edit full project stories in projects/<id>/index.html.
// Do not add credentials, internal endpoints or company source code.
const projects = [
  {
    "id": "stoolcare",
    "category": "work",
    "icon": "📱",
    "title": "스툴케어",
    "status": "배포 후 개선 중",
    "subtitle": "앱 개발 · 미국 배포",
    "period": "2025.10 — 현재",
    "description": "Apple 심사 피드백과 변경된 기획을 앱·API에 반영해 미국에 배포했습니다. 배포 이후에도 기능 개발과 개선을 이어가고 있습니다.",
    "tags": [
      "Flutter",
      "Dart",
      "NestJS",
      "PostgreSQL"
    ],
    "role": "앱·백엔드 개발 / 운영",
    "url": "./projects/stoolcare/"
  },
  {
    "id": "fecal-qa",
    "category": "work",
    "icon": "🏥",
    "title": "피칼스캐너",
    "subtitle": "배포 앱 유지보수 · 병원 QA",
    "period": "2025.10 — 현재",
    "description": "배포 중인 피칼스캐너의 병원 QA를 재현하고 수정합니다. 별도 의료용 앱에서는 로그인·기록·분석 흐름을 개발·검증했습니다.",
    "tags": [
      "Flutter",
      "Dart",
      "Go",
      "Firebase"
    ],
    "role": "유지보수 / QA / 의료용 앱 개발",
    "url": "./projects/fecal-qa/"
  },
  {
    "id": "hackathon",
    "category": "personal",
    "icon": "🤖",
    "title": "42 Global 해커톤",
    "status": "MVP 개발·검증 중",
    "subtitle": "문서 RAG · 휴가자 업무 대체 에이전트 MVP",
    "period": "2026.09 — 현재",
    "description": "담당자 부재 시 문서에서 근거를 찾고, 확인 절차를 거쳐 위임된 업무를 처리하는 에이전트 MVP를 개발·검증하고 있습니다.",
    "tags": [
      "Python",
      "RAG",
      "Ollama",
      "MCP"
    ],
    "role": "검색·에이전트 MVP 개발",
    "url": "./projects/hackathon/"
  },
  {
    "id": "lemon",
    "category": "work",
    "icon": "🍋",
    "logo": "./assets/brands/lemon-healthcare.png",
    "logoAlt": "레몬헬스케어",
    "logoSource": "https://www.lemonhealthcare.com/img/logo.png",
    "title": "레몬헬스케어 협업",
    "subtitle": "프로젝트 PM · 분석 API 연동",
    "period": "2026.09 — 현재",
    "description": "외부 파트너와의 요구사항, 일정, 개발·검증 과정을 조율하며 분석 API 연동을 진행했습니다.",
    "tags": [
      "Python",
      "FastAPI",
      "API",
      "PM"
    ],
    "role": "PM / API 개발",
    "url": "./projects/lemon/"
  },
  {
    "id": "admin",
    "category": "work",
    "icon": "🖥️",
    "title": "한국·미국 통합 관리자 웹",
    "subtitle": "다국가 서비스 운영 도구",
    "period": "2026.10",
    "description": "국가별 사용자와 기록, 구독·쿠폰·문의 업무를 한곳에서 관리할 수 있는 운영용 웹을 개발했습니다.",
    "tags": [
      "React",
      "TypeScript",
      "Vite",
      "MUI"
    ],
    "role": "관리자 웹 개발 / 배포",
    "url": "./projects/admin/"
  },
  {
    "id": "band",
    "category": "personal",
    "icon": "🎸",
    "title": "42 BAND · Deviation",
    "status": "개발 중",
    "subtitle": "밴드 운영 웹",
    "period": "2026.07 — 현재",
    "description": "직접 참여하는 두 밴드의 일정, 곡 선정과 콘텐츠 관리를 위해 개발 중인 웹 프로젝트입니다. 실제 활동에 활용할 수 있도록 기능을 다듬고 있습니다.",
    "tags": [
      "Next.js",
      "React",
      "TypeScript",
      "Supabase"
    ],
    "role": "웹 서비스 개발",
    "url": "./projects/band/"
  },
  {
    "id": "coupang",
    "category": "personal",
    "icon": "🚚",
    "title": "Coupang Order Viewer",
    "subtitle": "주문 메일 기반 데스크톱 도구",
    "period": "2026.05 — 2026.06",
    "description": "개인 구매자의 주문 메일을 읽어 주문·배송지 정보를 정리하고 파일로 내보내는 Windows 도구입니다.",
    "tags": [
      "C#",
      ".NET 8",
      "WPF",
      "MVVM"
    ],
    "role": "데스크톱 앱 개발",
    "url": "./projects/coupang/"
  },
  {
    "id": "webserver",
    "category": "study",
    "icon": "🌐",
    "title": "C++ HTTP/1.1 서버",
    "subtitle": "네트워크 · CGI · 협업",
    "period": "2025.05 — 2025.09",
    "description": "소켓과 비동기 I/O부터 CGI까지, 웹 요청을 처리하는 서버의 내부 흐름을 직접 구현했습니다.",
    "tags": [
      "C++98",
      "Linux",
      "epoll",
      "CGI"
    ],
    "role": "부팀장 / 구조 설계·CGI 개발",
    "url": "./projects/webserver/"
  },
  {
    "id": "raycasting",
    "category": "study",
    "icon": "🧊",
    "title": "C 기반 3D 그래픽",
    "subtitle": "2D → 3D 레이캐스팅",
    "period": "2025.03 — 2025.04",
    "description": "2차원 맵을 3차원 시점으로 렌더링하며 좌표, 충돌, 텍스처와 화면 투영을 다룬 프로젝트입니다.",
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
    "description": "명령어 실행, 파이프와 리다이렉션을 구현하며 Unix의 프로세스와 파일 입출력을 익혔습니다.",
    "tags": [
      "C",
      "Unix",
      "readline",
      "Process"
    ],
    "role": "셸 개발",
    "url": "./projects/minishell/"
  },
  {
    "id": "gamejam",
    "category": "study",
    "icon": "🕹️",
    "title": "42 Gyeongsan Game Jam",
    "subtitle": "Spring is come to 42",
    "period": "2024.05",
    "description": "비주얼 노벨의 이야기와 게임 흐름, 음악·효과음을 함께 다루며 협업한 게임잼 프로젝트입니다.",
    "tags": [
      "Python",
      "Ren’Py",
      "Story",
      "Sound"
    ],
    "role": "개발 / 기획 / 사운드",
    "url": "./projects/gamejam/"
  }
];
