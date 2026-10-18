// Public portfolio copy only. Do not add credentials, internal endpoints or company source code.
const projects = [
  {
    id: 'stoolcare', category: 'work', icon: '📱', title: '스툴케어', subtitle: '앱 개발 · 미국 배포', period: '2025.10 — 현재',
    description: '기존 미국향 제품의 기획 전환을 앱과 백엔드에 반영하고, 구독과 배포 이후의 운영까지 연결했습니다.',
    tags: ['Flutter', 'Dart', 'NestJS', 'PostgreSQL'], role: '앱·백엔드 개발 / 운영',
    situation: 'Fecal Scanner Plus 미국향 제품의 기획이 스툴케어로 전환되며, 새로운 사용 흐름과 구독 기능을 제품에 반영해야 했습니다.',
    task: '앱·백엔드 개발과 미국 배포, 한국·미국 서비스 운영을 담당하고 요구사항·일정 조율을 병행했습니다.',
    action: '촬영·기록·조회 흐름을 구현하고 구독 결제, 복원, 환불, 쿠폰 기능을 연결했습니다. 미국 초기 버전부터 배포·심사 대응과 운영 점검을 진행했습니다.',
    result: '미국 배포와 서비스 운영을 수행하고, 2026.10.15 기준 API 테스트 16개 스위트·161개 테스트 통과를 확인했습니다.',
    note: '161개는 API 테스트 범위입니다. 앱 전체나 결제 전 과정의 품질 지표를 의미하지 않습니다. AI 알고리즘 개발과 UX/UI 디자인은 협업 영역입니다.',
    links: [{ label: 'GitHub · Private', url: 'https://github.com/AICU-LIFE/fecalscanner_plus', private: true }]
  },
  {
    id: 'fecal-qa', category: 'work', icon: '🏥', title: '피칼스캐너', subtitle: '배포 앱 유지보수 · 병원 QA', period: '2025.10 — 현재',
    description: '현재 배포 중인 보라색 피칼스캐너 앱의 병원 QA에 대응하고, 별도 의료용 앱의 개발·검증을 진행했습니다.',
    tags: ['Flutter', 'Dart', 'Go', 'Firebase'], role: '유지보수 / QA / 의료용 앱 개발',
    situation: '배포 중인 피칼스캐너에서 경북대병원 피드백에 따른 분석·결과 표시 점검이 필요했습니다. 별도로 Fecal Scanner-M 개발도 진행했습니다.',
    task: '병원 QA를 재현하고 분석 요청과 결과 표시 흐름을 수정했습니다. 의료용 앱에서는 로그인·기록·화면 전환을 점검했습니다.',
    action: '배포 앱의 분석 요청과 결과 표시 간 데이터 연결을 정리했습니다. 의료용 앱에서는 로그인 후 기록 조회, 날짜 표시, 이미지 분석, 로그아웃 후 화면 이동에서 발생하는 오류를 각 사용 흐름에 맞춰 수정하고 회귀 검증했습니다.',
    result: '병원 QA에 대응하는 수정 작업을 수행했습니다. 별도 의료용 앱 개발에서는 2026.10.18 기준 모바일 자동화 테스트 54개와 인증 경계 테스트 10개 통과를 확인했습니다.',
    note: '54개·10개는 Fecal Scanner-M 개발·검증 결과이며, 배포 앱의 병원 QA 건수가 아닙니다. 의료용 앱의 임상 참여자 배포나 의료 인증 완료를 의미하지 않습니다.',
    links: [{ label: '피칼스캐너 GitHub · Private', url: 'https://github.com/AICU-LIFE/fecal_scanner_mobile', private: true }, { label: '의료용 앱 GitHub · Private', url: 'https://github.com/AICU-LIFE/fecal_scanner_Medical', private: true }]
  },
  {
    id: 'hackathon', category: 'personal', icon: '🤖', title: '42 Global 해커톤', subtitle: '문서 RAG · 휴가자 업무 대체 에이전트 MVP', period: '2026.09 — 2026.10',
    description: '사내 문서를 근거로 답하고, 부재 중인 담당자의 업무를 권한과 확인 절차에 따라 처리하는 에이전트 MVP입니다.',
    tags: ['Python', 'RAG', 'Ollama', 'MCP'], role: '검색·에이전트 MVP 개발',
    situation: '담당자가 부재할 때 업무 문서를 찾고, 필요한 정보를 확인하며, 처리 내역을 남길 수 있는 흐름이 필요했습니다.',
    task: '문서 근거를 제시하는 검색과 위임 권한·부재 기간·확인 절차를 반영한 업무 대체 에이전트를 하나의 해커톤 프로젝트로 구현했습니다.',
    action: '문서 78개를 178개 청크로 구성하고 OCR·키워드·벡터 검색을 조합했습니다. 에이전트에는 누락 정보 확인, 사용자 확인 후 처리, 접수 번호와 인수인계 기록, 중복 처리 방지 흐름을 구성했습니다.',
    result: 'RAG 테스트 51개(10.02), 에이전트 테스트 95개(10.13)를 통과했습니다. 132개 청크를 사용한 로컬 초기화 측정에서는 캐시 적용 전 8.45초에서 적용 후 0.31초로 줄었습니다.',
    note: '2026년 로컬 프로토타입·모의 데이터 검증입니다. 초기화 시간은 10.02 단일 측정이며 질의 임베딩 시간을 제외합니다. 실제 조직 배포나 자동 결제·승인 운영 실적은 아닙니다.',
    links: [{ label: 'Notion 프로젝트', url: 'https://app.notion.com/p/42-Global-2026-09-2026-10-3fd7746fec7080a7b251d248fe9d84b7' }]
  },
  {
    id: 'lemon', category: 'work', icon: '🍋', title: '레몬헬스케어 협업', subtitle: '프로젝트 PM · 분석 API 연동', period: '2026.09 — 현재',
    description: '외부 파트너와의 요구사항, 일정, 개발·검증 과정을 조율하며 분석 API 연동을 진행했습니다.',
    tags: ['Python', 'FastAPI', 'API', 'PM'], role: 'PM / API 개발',
    situation: '파트너 서비스와 기존 분석 기능을 연결하기 위해 API 요구사항과 검증 기준을 정리해야 했습니다.',
    task: 'AICU 측 프로젝트 PM으로 외부 커뮤니케이션, 요구사항·일정·문서 조율과 API 개발을 담당했습니다.',
    action: '기존 모델의 API 연동 기능을 구현하고 파트너 요구사항을 개발 항목으로 정리했습니다. 배포와 요청 처리 검증 결과를 확인하며 협업을 진행했습니다.',
    result: '2026.10.07 동일 이미지 기반 단일 검증에서 분석 요청 56건 중 56건 성공을 확인했습니다.',
    note: '특정 테스트 조건에서의 검증이며 운영 SLA나 모든 입력의 성공률을 의미하지 않습니다. 기존 모델 연동 업무로, 모델 연구 성과와 구분합니다. 소스는 사내 저장소에서 관리합니다.',
    links: []
  },
  {
    id: 'admin', category: 'work', icon: '🖥️', title: '한국·미국 통합 관리자 웹', subtitle: '다국가 서비스 운영 도구', period: '2026.10',
    description: '국가별 사용자와 기록, 구독·쿠폰·문의 업무를 한곳에서 관리할 수 있는 운영용 웹을 개발했습니다.',
    tags: ['React', 'TypeScript', 'Vite', 'MUI'], role: '관리자 웹 개발 / 배포',
    situation: '한국·미국 서비스의 운영 데이터와 고객 대응 업무를 일관된 화면에서 확인할 필요가 있었습니다.',
    task: '국가별 데이터를 구분해 관리할 수 있는 독립적인 관리자 웹을 구현하고 배포했습니다.',
    action: '사용자·기록 조회, 구독·쿠폰·문의 관리와 데이터 내보내기·다운로드 기능을 구성했습니다. 배포 후 접근과 상태 확인 항목을 점검했습니다.',
    result: '2026.10.11 배포 후 상태·접근 확인 17개 항목을 통과했습니다.',
    note: '17개는 배포 후 상태·접근 확인 범위이며 모든 사용자 시나리오에 대한 종합 테스트 수는 아닙니다. 소스는 사내 저장소에서 관리합니다.',
    links: []
  },
  {
    id: 'band', category: 'personal', icon: '🎸', title: '42 BAND · Deviation', subtitle: '밴드 운영 웹', period: '2026.07 — 2026.08',
    description: '직접 참여하는 두 밴드의 일정, 곡 선정과 콘텐츠를 관리하기 위해 만든 웹 서비스입니다.',
    tags: ['Next.js', 'React', 'TypeScript', 'Supabase'], role: '웹 서비스 개발',
    situation: '밴드의 합주 일정과 곡 선정, 멤버별 정보와 활동 콘텐츠를 함께 관리할 공간이 필요했습니다.',
    task: '42 BAND와 Deviation의 운영에 맞는 웹 기능을 구현했습니다.',
    action: '일정과 곡 선정 투표, 멤버·권한, 게시물 및 사진·영상 관리 기능을 구성했습니다.',
    result: '두 밴드의 운영 요구를 각각의 프로젝트에 반영했습니다. 음악 활동에서 직접 겪은 문제를 웹 서비스 개발로 연결한 작업입니다.',
    links: [{ label: '42 BAND GitHub · Private', url: 'https://github.com/composerboyV/fortytwo_band', private: true }, { label: 'Deviation GitHub · Private', url: 'https://github.com/composerboyV/Deviation_band', private: true }]
  },
  {
    id: 'coupang', category: 'personal', icon: '🚚', title: 'Coupang Order Viewer', subtitle: '주문 메일 기반 데스크톱 도구', period: '2026.05 — 2026.06',
    description: '개인 구매자의 주문 메일을 읽어 주문·배송지 정보를 정리하고 파일로 내보내는 Windows 도구입니다.',
    tags: ['C#', '.NET 8', 'WPF', 'MVVM'], role: '데스크톱 앱 개발',
    situation: '메일에 흩어진 주문 정보를 수동으로 확인하고 정리하는 반복 작업이 있었습니다.',
    task: '개인 주문 메일에서 필요한 정보를 추출하고 로컬에서 조회·내보내기 할 수 있는 도구를 만들었습니다.',
    action: 'MailKit으로 메일을 읽고 주문·배송지 정보를 파싱했습니다. WPF와 MVVM으로 조회 화면을 구성하고, ClosedXML 내보내기와 Windows DPAPI 기반 로컬 정보 보호를 적용했습니다.',
    result: '메일 수집부터 주문 정보 확인, 파일 내보내기까지 하나의 데스크톱 흐름으로 구현했습니다.',
    links: [{ label: 'GitHub · Private', url: 'https://github.com/composerboyV/-Coupang_project', private: true }]
  },
  {
    id: 'webserver', category: 'study', icon: '🌐', title: 'C++ HTTP/1.1 서버', subtitle: '네트워크 · CGI · 협업', period: '2025.05 — 2025.09',
    description: '소켓과 비동기 I/O부터 CGI까지, 웹 요청을 처리하는 서버의 내부 흐름을 직접 구현했습니다.',
    tags: ['C++98', 'Linux', 'epoll', 'CGI'], role: '부팀장 / 구조 설계·CGI 개발',
    situation: '웹 서버 프레임워크에 의존하지 않고 HTTP 요청 처리와 프로세스 간 통신을 이해하는 팀 프로젝트였습니다.',
    task: '부팀장으로 서버 구조와 CGI 실행 흐름을 설계하고 코드 리뷰에 참여했습니다.',
    action: 'non-blocking 소켓과 epoll 기반 I/O를 구성하고 fork·exec·pipe를 이용해 Python·PHP CGI 실행과 결과 전달을 연결했습니다.',
    result: '요청 수신, 처리, 외부 프로그램 실행, 응답 반환으로 이어지는 HTTP/1.1 서버 동작을 구현했습니다.',
    links: [{ label: 'GitHub', url: 'https://github.com/composerboyV/Web_Study' }]
  },
  {
    id: 'raycasting', category: 'study', icon: '🧊', title: 'C 기반 3D 그래픽', subtitle: '2D → 3D 레이캐스팅', period: '2025.03 — 2025.04',
    description: '2차원 맵을 3차원 시점으로 렌더링하며 좌표, 충돌, 텍스처와 화면 투영을 다룬 프로젝트입니다.',
    tags: ['C', 'MiniLibX', 'DDA', 'Raycasting'], role: '그래픽 구현',
    situation: '2차원 맵과 플레이어 위치를 바탕으로 3차원 공간처럼 보이는 화면을 구현해야 했습니다.',
    task: '레이캐스팅과 이동·회전·충돌 처리, 텍스처 표현을 구현했습니다.',
    action: 'DDA로 벽과의 교차 지점을 구하고 거리 기반 화면 투영과 어안 왜곡 보정을 적용했습니다. 이동과 회전 입력을 충돌 검사에 연결했습니다.',
    result: '플레이어 시점과 이동에 따라 갱신되는 3D 표현을 C와 MiniLibX로 구현했습니다.',
    links: [{ label: 'GitHub', url: 'https://github.com/composerboyV/2D_3D_raycasting' }]
  },
  {
    id: 'minishell', category: 'study', icon: '⌨️', title: 'Minishell', subtitle: 'Unix 셸 구현', period: '2024.11 — 2024.12',
    description: '명령어 실행, 파이프와 리다이렉션을 구현하며 Unix의 프로세스와 파일 입출력을 익혔습니다.',
    tags: ['C', 'Unix', 'readline', 'Process'], role: '셸 개발',
    situation: '평소 사용하는 터미널의 명령어가 실제로 어떻게 실행되는지 이해하는 학습 프로젝트였습니다.',
    task: '사용자 입력을 해석하고 명령어 실행 및 입출력을 연결하는 셸을 구현했습니다.',
    action: 'readline 기반 입력, 내장 명령어와 외부 명령 실행, 파이프·리다이렉션 처리를 구성했습니다.',
    result: '명령 입력부터 프로세스 실행과 출력까지 이어지는 Unix 셸의 핵심 동작을 구현했습니다.',
    links: [{ label: 'GitHub', url: 'https://github.com/composerboyV/Mini_Shell' }]
  },
  {
    id: 'gamejam', category: 'study', icon: '🕹️', title: '42 Gyeongsan Game Jam', subtitle: 'Spring is come to 42', period: '2024.05',
    description: '비주얼 노벨의 이야기와 게임 흐름, 음악·효과음을 함께 다루며 협업한 게임잼 프로젝트입니다.',
    tags: ['Python', "Ren’Py", 'Story', 'Sound'], role: '개발 / 기획 / 사운드',
    situation: '게임잼에서 이야기와 플레이 흐름, 사운드가 어우러지는 비주얼 노벨을 만드는 과제였습니다.',
    task: '기획·개발과 배경음악·효과음 작업에 참여했습니다.',
    action: 'Python과 Ren’Py 기반으로 이야기와 게임 흐름을 구성하고 장면에 맞는 음악·효과음을 연결했습니다.',
    result: '팀의 결과물을 itch.io에 공개했습니다. 작곡 경험을 소프트웨어 프로젝트에 활용했습니다.',
    links: [{ label: '게임 보기 · itch.io', url: 'https://binz1215.itch.io/spring-is-come-to-42' }]
  }
];
