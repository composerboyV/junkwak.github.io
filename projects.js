// Public portfolio card index. Edit full project stories in projects/<id>/index.html.
// Do not add credentials, internal endpoints or company source code.
const projects = [
  {
    "id": "mirai",
    "category": "ai",
    "badge": "42",
    "badgeAlt": "42 네트워크 로고",
    "title": "42 Asia Hackathon 2026 in Tokyo",
    "award": "Tokyo · 3rd place",
    "subtitle": "팀 Mirai 未来 · AI 에이전트 4종",
    "period": "2026.11.09 — 11.11 · 42시간",
    "description": "주일 프랑스상공회의소를 위한 AI 에이전트 4종을 팀과 함께 만들었습니다. 웹 플랫폼과 Azure 인프라, 채널 연동, 인사이트 에이전트 첫 버전을 맡았습니다.",
    "tags": [
      "AI Agent",
      "LLM",
      "Node.js",
      "Azure"
    ],
    "role": "플랫폼 / 에이전트 연동",
    "url": "./projects/mirai/"
  },
  {
    "id": "stoolcare",
    "category": "work",
    "title": "스툴케어",
    "subtitle": "미국 출시 · 첫 인앱 결제",
    "period": "2025.10 — 현재",
    "description": "의료 앱으로 오해받아 Apple 심사에서 15번 반려된 앱을 웰니스 앱으로 다시 정의해 미국에 출시했습니다. 회사의 첫 인앱 결제를 구축하고 운영까지 맡고 있습니다.",
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
    "description": "경북대병원 QA와 운영 장애를 앱·서버 통신 흐름으로 추적해 고칩니다. 2025년 12월 결과 조회가 멈추던 장애도 원인 세 가지를 찾아 해결했습니다.",
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
    "status": "임상시험계획 승인 신청 중",
    "subtitle": "2등급 디지털의료기기 · 사이버보안 검증",
    "period": "2026.03 — 현재",
    "description": "중기부 TIPS 과제인 궤양성 대장염 환자용 의료기기 소프트웨어를 앱부터 API·AI 추론 서버까지 만들고, 식약처 사이버보안 요구사항을 직접 시험해 검증했습니다.",
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
    "description": "나라장터 공고의 제안요청서를 페이지 단위로 읽어 요구사항과 원문 위치를 뽑고, 에이전트 넷이 회사 증빙과 대조합니다. 근거가 없으면 확인 질문으로 남깁니다.",
    "tags": [
      "Python",
      "FastAPI",
      "React",
      "Mistral"
    ],
    "role": "기획·개발",
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
    "description": "협력사 인증·입력 검증·OpenAPI 문서화까지 포함한 분석 API 연동 프로젝트. AICU 쪽 전체 PM과 API 개발을 담당했습니다.",
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
    "description": "국가별로 분리된 기록을 통합 조회·세션 검증·엑셀/사진 ZIP 내보내기·문의 관리까지 묶은 운영 웹. 조회·내보내기 10,000건 상한, ZIP은 100장·100MB씩 분할합니다.",
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
    "title": "WE ARE BAND · 42 BAND · 악사모",
    "status": "2026.11 한 사이트로 통합",
    "subtitle": "카톡 대신 쓰는 밴드 웹, 두 밴드를 한 사이트로",
    "period": "2026.07 — 2026.11",
    "description": "카톡으로만 하던 악보 공유·곡 선정·일정을 밴드 전용 웹으로 옮겼습니다. 따로 운영하던 두 밴드 사이트를 WE ARE BAND 한 사이트로 합치고, 밴드별 권한을 Supabase RLS로 나눴습니다.",
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
    "description": "개인 구매자의 주문 메일을 파싱해 주문·배송지 정보를 조회·엑셀로 내보내는 Windows 도구입니다.",
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
