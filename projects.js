// Public portfolio copy only. Do not add credentials, internal endpoints or company source code.
const projects = [
  {
    "id": "stoolcare",
    "gallery": {
      "title": "첫 사용을 안내하는 세 화면",
      "description": "스캔 안내, 식사 기록, 일상 패턴 확인을 순서대로 소개하는 온보딩 시안입니다. Figma 협업 파일에서 가져온 디자인 자료로, 현재 배포 화면과는 차이가 있을 수 있습니다.",
      "credit": "UX/UI 디자인: AICU 디자인 협업 결과물 · 본인 담당: 앱·백엔드 구현 및 요구사항 조율. 원본 파일은 열람 권한이 필요할 수 있습니다.",
      "source": "https://www.figma.com/design/PFltfLnQjkYWauJNIVxkGk/Fecal_UXUI?node-id=55795-2536",
      "images": [
        {"src": "./assets/stoolcare/onboarding-scan.png", "alt": "카메라를 이용한 스캔 기능을 소개하는 스툴케어 온보딩 디자인 시안", "caption": "01 · 스캔 안내"},
        {"src": "./assets/stoolcare/onboarding-meal.png", "alt": "식사 사진과 Meal Scan 기능을 소개하는 스툴케어 온보딩 디자인 시안", "caption": "02 · 식사 기록"},
        {"src": "./assets/stoolcare/onboarding-trends.png", "alt": "점수와 주간 그래프로 기록 변화를 소개하는 스툴케어 온보딩 디자인 시안", "caption": "03 · 기록 변화 확인"}
      ]
    },
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
    "note": "API 검증 · 2026.10.15 · 16개 스위트, 161개 테스트 통과. API 범위의 결과이며 앱 전체·결제 전 과정의 종합 검증 수치는 아닙니다.",
    "links": [
      {
        "label": "GitHub · Private",
        "url": "https://github.com/AICU-LIFE/fecalscanner_plus",
        "private": true
      },
      {
        "label": "Notion에서 더 보기",
        "url": "https://app.notion.com/p/3f17746fec70808f8bc9e31a7ad46660"
      }
    ],
    "sections": [
      {
        "title": "심사 피드백이 제품을 바꾸는 계기가 됐습니다",
        "body": "미국향 Fecal Scanner Plus를 배포하는 과정에서 심사가 반복해서 반려됐습니다. Apple 담당자와 직접 미팅하며 앱의 문제와 수정 방향을 정리했고, 제품을 다시 설계하는 과정을 거쳐 스툴케어의 미국 배포를 진행했습니다."
      },
      {
        "title": "바뀐 기획을 실제 사용 흐름으로 옮겼습니다",
        "body": "앱과 백엔드에서 촬영·기록·조회 흐름을 구현하고, 구독 결제·복원·환불·쿠폰 기능을 연결했습니다. 요구사항과 일정을 조율하면서 배포·심사 대응과 한국·미국 서비스 운영 점검을 병행했습니다. AI 알고리즘과 UX/UI 디자인은 협업 영역입니다."
      },
      {
        "title": "배포 이후의 수정도 이어갑니다",
        "body": "출시는 작업의 끝이 아니었습니다. 실제 사용 과정에서 들어오는 피드백을 확인하며 앱과 API를 수정하고, 변경한 기능을 테스트로 점검하고 있습니다."
      }
    ]
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
    "note": "Fecal Scanner-M 개발 검증 · 2026.10.18 · 모바일 자동화 테스트 54개, 인증 경계 테스트 10개 통과. 배포 앱의 병원 QA 건수와 구분하며 임상 배포·의료 인증 완료를 뜻하지 않습니다.",
    "links": [
      {
        "label": "피칼스캐너 GitHub · Private",
        "url": "https://github.com/AICU-LIFE/fecal_scanner_mobile",
        "private": true
      },
      {
        "label": "의료용 앱 GitHub · Private",
        "url": "https://github.com/AICU-LIFE/fecal_scanner_Medical",
        "private": true
      },
      {
        "label": "Notion에서 더 보기",
        "url": "https://app.notion.com/p/3f17746fec7080c0b428f55bc43e116d"
      }
    ],
    "sections": [
      {
        "title": "병원에서 들어온 문제를 앱에서 다시 확인합니다",
        "body": "현재 배포 중인 보라색 피칼스캐너 앱을 유지보수하며 경북대병원의 QA에 대응합니다. 분석 요청과 결과 표시 사이의 데이터 연결을 점검하고, 병원에서 전달한 피드백에 맞춰 해당 흐름을 수정했습니다."
      },
      {
        "title": "의료용 앱에서는 로그인부터 로그아웃까지 살폈습니다",
        "body": "별도로 개발한 Fecal Scanner-M에서는 로그인 후 기록 조회와 날짜 표시, 이미지 분석, 로그아웃 이후 화면 이동의 오류를 수정했습니다. 각 기능을 따로 보는 것과 함께 사용 순서에 따라 확인하고 회귀 검증했습니다."
      }
    ]
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
    "note": "로컬 MVP·모의 데이터 검증 · RAG 51개 테스트(2026.10.02), 에이전트 95개 테스트(10.13) 통과. 초기화 시간은 10.02 단일 측정이며 질의 임베딩 시간은 제외했습니다. 실제 조직 운영 실적과 구분합니다.",
    "links": [
      {
        "label": "Notion에서 더 보기",
        "url": "https://app.notion.com/p/3fd7746fec7080a7b251d248fe9d84b7"
      }
    ],
    "sections": [
      {
        "title": "담당자가 없어도 업무의 근거를 찾을 수 있도록",
        "body": "42 Global 해커톤 프로젝트로 문서 RAG와 휴가자 업무 대체 에이전트를 함께 개발하고 있습니다. 문서를 찾는 일부터 빠진 정보를 묻고 처리 내역을 남기는 일까지, 부재 중의 업무 흐름을 하나의 MVP로 구성하며 로컬 검증과 개선을 이어가고 있습니다."
      },
      {
        "title": "검색한 내용과 실행할 수 있는 일을 구분했습니다",
        "body": "문서 78개를 178개 청크로 나누고 OCR·키워드·벡터 검색을 조합했습니다. 업무 처리에는 위임 권한과 부재 기간을 반영하고, 누락 정보 확인과 사용자 확인 절차를 두었습니다. 처리 뒤에는 접수 번호와 인수인계 기록을 남기고 중복 처리를 방지하도록 구성했습니다."
      },
      {
        "title": "반복 실행에서 초기화 비용을 줄였습니다",
        "body": "검색기를 다시 준비할 때 같은 데이터를 반복 처리하는 비용을 줄이기 위해 캐시를 적용했습니다. 132개 청크를 사용한 로컬 초기화 측정에서 8.45초였던 시간이 0.31초로 줄었습니다."
      }
    ]
  },
  {
    "id": "lemon",
    "category": "work",
    "icon": "🍋",
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
    "note": "연동 검증 · 2026.10.07 · 동일 이미지 기반 요청 56건 중 56건 성공. 해당 테스트 조건의 결과이며 운영 성공률이나 SLA 수치가 아닙니다. 소스는 사내 저장소에서 관리합니다.",
    "links": [
      {
        "label": "Notion에서 더 보기",
        "url": "https://app.notion.com/p/3f17746fec7080638b2edc99ad69cb19"
      }
    ],
    "sections": [
      {
        "title": "파트너의 요청을 개발 항목으로 정리했습니다",
        "body": "레몬헬스케어 협업에서 AICU 측 PM과 API 개발을 담당합니다. 파트너와 요구사항·일정·문서를 조율하고, 기존 분석 기능을 서비스에 연결하기 위한 API와 검증 항목을 정리했습니다."
      },
      {
        "title": "연동이 되는지 확인하며 협업을 이어갑니다",
        "body": "FastAPI로 기존 모델을 연동하고 배포 후 요청 처리를 검증했습니다. 개발 결과를 파트너와 확인하며 후속 작업을 조율합니다. 이 프로젝트의 담당 범위는 모델 연구가 아닌 API 연동과 프로젝트 진행입니다."
      }
    ]
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
    "note": "배포 점검 · 2026.10.11 · 상태·접근 확인 17개 항목 통과. 전체 사용자 시나리오에 대한 종합 테스트 수는 아닙니다. 소스는 사내 저장소에서 관리합니다.",
    "links": [
      {
        "label": "Notion에서 더 보기",
        "url": "https://app.notion.com/p/3fd7746fec7080b5b3b4d55adc97ef03"
      }
    ],
    "sections": [
      {
        "title": "두 국가의 운영 업무를 한 화면에서",
        "body": "한국·미국 서비스의 사용자와 기록을 확인하고 구독·쿠폰·문의를 관리하는 웹을 개발했습니다. 국가별 데이터를 구분해 볼 수 있도록 구성하고, 데이터 내보내기와 다운로드 기능을 연결했습니다."
      },
      {
        "title": "운영용 웹으로 배포하고 접근을 점검했습니다",
        "body": "React와 TypeScript로 독립적인 관리자 웹을 구현해 배포했습니다. 배포 후에는 상태와 접근 확인 항목을 점검하며 운영에 필요한 화면을 확인했습니다."
      }
    ]
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
    "links": [
      {
        "label": "42 BAND GitHub · Private",
        "url": "https://github.com/composerboyV/fortytwo_band",
        "private": true
      },
      {
        "label": "Deviation GitHub · Private",
        "url": "https://github.com/composerboyV/Deviation_band",
        "private": true
      },
      {
        "label": "Notion에서 더 보기",
        "url": "https://app.notion.com/p/3fd7746fec7080279b1fddd67eb383d7"
      }
    ],
    "sections": [
      {
        "title": "밴드를 하며 필요한 것을 직접 만들고 있습니다",
        "body": "합주 일정과 곡 선정, 멤버 정보와 활동 콘텐츠를 함께 관리할 공간이 필요했습니다. 직접 참여하는 42 BAND와 Deviation의 운영 요구를 각각의 웹 프로젝트에 반영했습니다."
      },
      {
        "title": "음악 활동을 돕는 웹",
        "body": "Next.js·React·Supabase로 일정, 곡 선정 투표, 멤버·권한 관리와 게시물·사진·영상 기능을 구성했습니다. 현재는 실제 밴드 활동에 활용하기 위해 기능과 사용 흐름을 다듬는 개발 단계입니다."
      }
    ]
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
    "links": [
      {
        "label": "GitHub · Private",
        "url": "https://github.com/composerboyV/-Coupang_project",
        "private": true
      },
      {
        "label": "Notion에서 더 보기",
        "url": "https://app.notion.com/p/3887746fec7080f6a4bac51375695c77"
      }
    ],
    "sections": [
      {
        "title": "주문 메일을 다시 정리하는 일이 번거로웠습니다",
        "body": "개인 구매자의 주문 메일을 읽고 필요한 정보를 따로 정리하는 반복 작업을 줄이고자 Windows 데스크톱 도구를 만들었습니다. 메일 수집부터 주문·배송지 조회, 파일 내보내기까지 한 흐름으로 구성했습니다."
      },
      {
        "title": "메일 읽기부터 엑셀 내보내기까지",
        "body": "MailKit으로 메일을 읽어 주문 정보를 파싱하고 WPF·MVVM으로 조회 화면을 구현했습니다. ClosedXML로 내보내기를 지원하고, Windows DPAPI를 적용해 로컬에 저장하는 정보를 보호했습니다."
      }
    ]
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
    "links": [
      {
        "label": "GitHub",
        "url": "https://github.com/composerboyV/Web_Study"
      },
      {
        "label": "Notion에서 더 보기",
        "url": "https://app.notion.com/p/2f97746fec708169b6ffc98c0382cf6f"
      }
    ],
    "sections": [
      {
        "title": "HTTP 요청이 응답이 되기까지",
        "body": "C++98과 Linux 소켓으로 HTTP/1.1 서버를 구현한 팀 프로젝트입니다. 부팀장으로 서버 구조 설계와 CGI 개발을 맡고 코드 리뷰에 참여했습니다."
      },
      {
        "title": "서버와 외부 프로그램을 연결했습니다",
        "body": "non-blocking 소켓과 epoll 기반 I/O를 구성하고, fork·exec·pipe로 Python·PHP CGI 실행 결과를 서버 응답에 연결했습니다. 프레임워크 안에 감춰져 있던 네트워크 I/O와 프로세스 통신을 코드로 다뤘습니다."
      }
    ]
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
    "links": [
      {
        "label": "GitHub",
        "url": "https://github.com/composerboyV/2D_3D_raycasting"
      },
      {
        "label": "Notion에서 더 보기",
        "url": "https://app.notion.com/p/2f97746fec7081838be7ebbec226b64f"
      }
    ],
    "sections": [
      {
        "title": "2차원 맵에서 플레이어의 시점을 만들었습니다",
        "body": "C와 MiniLibX로 레이캐스팅을 구현했습니다. DDA로 벽과의 교차 지점을 찾고 거리에 따라 화면에 투영했으며, 어안 왜곡을 보정하고 벽의 텍스처를 표시했습니다. 이동·회전 입력에 충돌 검사를 연결해 플레이어의 위치와 시점에 따라 화면이 갱신되도록 구성했습니다."
      }
    ]
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
    "links": [
      {
        "label": "GitHub",
        "url": "https://github.com/composerboyV/Mini_Shell"
      },
      {
        "label": "Notion에서 더 보기",
        "url": "https://app.notion.com/p/2f97746fec7081db8a10dba331860325"
      }
    ],
    "sections": [
      {
        "title": "매일 쓰는 셸의 동작을 직접 구현했습니다",
        "body": "C와 Unix 환경에서 readline 입력, 내장 명령어와 외부 명령 실행, 파이프·리다이렉션을 구현했습니다. 입력한 명령이 프로세스가 되고 출력으로 돌아오는 과정을 다루며 프로세스와 파일 입출력의 관계를 익혔습니다."
      }
    ]
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
    "links": [
      {
        "label": "게임 보기 · itch.io",
        "url": "https://binz1215.itch.io/spring-is-come-to-42"
      },
      {
        "label": "Notion에서 더 보기",
        "url": "https://app.notion.com/p/2f97746fec7081cfbef4cfb77c6dc5a9"
      }
    ],
    "sections": [
      {
        "title": "이야기와 코드, 음악을 함께 만들었습니다",
        "body": "42 Gyeongsan Game Jam에서 Python·Ren’Py 기반 비주얼 노벨의 개발·기획·사운드 작업에 참여했습니다. 이야기와 게임 흐름에 맞춰 배경음악과 효과음을 연결했고, 팀의 결과물을 itch.io에 공개했습니다. 작곡 경험을 개발 프로젝트에 함께 쓸 수 있었던 작업입니다."
      }
    ]
  }
];
