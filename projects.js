// Public portfolio card index. Edit full project stories in projects/<id>/index.html.
// Do not add credentials, internal endpoints or company source code.
const projects = [
  {
    "id": "stoolcare",
    "category": "work",
    "title": "스툴케어",
    "status": "배포 후 개선 중",
    "subtitle": "앱 개발 · 미국 배포",
    "period": "2025.10 — 현재",
    "description": "Apple 심사 피드백과 바뀐 기획을 앱·API에 반영해 미국에 올렸어요. 지금도 기능을 더하고 다듬고 있습니다.",
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
    "subtitle": "배포 앱 유지보수 · 병원 QA",
    "period": "2025.10 — 현재",
    "description": "병원에서 올라온 QA를 재현하고 고칩니다. 의료용 앱에서는 로그인·기록·분석 흐름을 직접 짰어요.",
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
    "id": "hackathon",
    "category": "personal",
    "badge": "42",
    "badgeAlt": "42 네트워크 로고",
    "title": "42 Global 해커톤",
    "status": "MVP 개발·검증 중",
    "subtitle": "문서 RAG · 담당자 부재 대응 에이전트",
    "period": "2026.09 — 현재",
    "description": "담당자가 자리를 비울 때, 문서에서 근거를 찾고 확인 절차를 거쳐 위임 업무를 처리하는 에이전트를 MVP로 돌려봤습니다.",
    "tags": [
      "Python",
      "RAG",
      "Ollama",
      "MCP"
    ],
    "role": "검색·에이전트 MVP",
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
    "subtitle": "PM · 분석 API 연동",
    "period": "2026.09 — 현재",
    "description": "외부 파트너와 요구사항·일정을 맞추면서 분석 API를 붙였어요. PM 역할로 중간 조율까지 같이 봤습니다.",
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
    "subtitle": "다국가 운영 도구",
    "period": "2026.10",
    "description": "한국·미국의 사용자, 기록, 구독, 쿠폰, 문의를 한 화면에서 다루는 운영용 웹을 만들었어요. 양쪽 API를 하나로 묶어서 봅니다.",
    "tags": [
      "React",
      "TypeScript",
      "Vite",
      "MUI"
    ],
    "role": "관리자 웹 / 배포",
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
    "description": "제가 참여 중인 두 밴드의 일정과 셋리스트를 관리하려고 만드는 웹입니다. 실제로 쓸 수 있게 다듬는 중입니다.",
    "tags": [
      "Next.js",
      "React",
      "TypeScript",
      "Supabase"
    ],
    "role": "웹 개발",
    "url": "./projects/band/"
  },
  {
    "id": "coupang",
    "category": "personal",
    "icon": "🚚",
    "title": "Coupang Order Viewer",
    "subtitle": "주문 메일 기반 데스크톱 도구",
    "period": "2026.05 — 2026.06",
    "description": "쿠팡 주문 메일에서 배송지·수량을 뽑아 CSV로 내보내는 Windows 도구예요. 공동구매 정리용으로 만들었습니다.",
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
    "subtitle": "네트워크 · CGI · 협업",
    "period": "2025.05 — 2025.09",
    "description": "소켓과 비동기 I/O부터 CGI까지, 웹 요청이 처리되는 안쪽을 직접 짜봤습니다.",
    "tags": [
      "C++98",
      "Linux",
      "epoll",
      "CGI"
    ],
    "role": "부팀장 / 구조·CGI",
    "url": "./projects/webserver/"
  },
  {
    "id": "raycasting",
    "category": "study",
    "icon": "🧊",
    "title": "C 기반 3D 그래픽",
    "subtitle": "2D → 3D 레이캐스팅",
    "period": "2025.03 — 2025.04",
    "description": "2D 맵을 3D 시점으로 렌더링했어요. 좌표, 충돌, 텍스처, 화면 투영을 손으로 하나하나 짜본 프로젝트입니다.",
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
    "description": "명령 실행, 파이프, 리다이렉션을 직접 짜면서 Unix 프로세스와 I/O가 어떻게 돌아가는지 체득했어요.",
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
    "description": "비주얼 노벨의 이야기와 흐름, 음악·효과음까지 같이 손봤던 게임잼입니다.",
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
