# Junki Kwak · Portfolio

곽준기의 개발 포트폴리오. HTML, CSS, JavaScript로 작성한 반응형 정적 사이트입니다.

**사이트:** https://composerboyv.github.io/junkwak.github.io/

## 로컬 실행

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

http://127.0.0.1:8765 에서 확인합니다. 빌드나 패키지 설치가 필요하지 않습니다.

## 수정

- `index.html`: 소개, 경력, 기술, 교육, 연락처
- `projects.js`: 프로젝트 카드 요약과 상세 페이지 경로
- `projects/<id>/index.html`: 프로젝트별 독립 상세 페이지. `01 문제 / 02 결정 / 03 결과 / 04 근거` 순서로 본문과 관련 자료를 편집합니다.
- `project.css`, `project.js`: 상세 페이지 공통 스타일과 현재 목차 표시
- `style.css`: 반응형 화면, 인쇄, 접근성 스타일
- `app.js`: 프로젝트 필터, 상세 페이지 연결, 모바일 메뉴, 현재 섹션 표시

GitHub Pages는 `main` 브랜치의 루트에서 배포합니다. `.nojekyll`을 유지합니다.

회사 프로젝트에는 공개용 설명만 기록합니다. Private 저장소 링크는 접근 권한을 제공하지 않습니다. 테스트 수치에는 검증 날짜와 범위를 함께 표시합니다. 최신 내용 기준일: 2026-10-18.

참고한 탐색 구성: https://yoohyeok.github.io/u-it/ (고정 사이드 메뉴와 한 페이지 이력서). 디자인·구현·본문은 이 포트폴리오용으로 작성했습니다.

소개·경험 문구는 본인 인터뷰를 바탕으로 편집했습니다. 프로젝트 카드는 사이트 내 상세 페이지로 연결합니다. 각 상세 페이지의 `04 근거`에서 기존 GitHub·Notion·Figma·공개 게임 링크를 확인할 수 있으며, 외부 문서와 자동 동기화하지 않습니다.

상세 페이지 구성 참고: https://portfolio-sage-nine-97.vercel.app/projects/notiiv
프로젝트별 문제·결정·결과·근거의 읽기 흐름을 참고하고, 본문은 기존 포트폴리오의 역할·구현·검증 기록으로 작성했습니다. 수치에는 날짜와 검증 범위를 함께 표시합니다.

상세 페이지는 정적 HTML로 직접 편집합니다. 별도 빌드 없이 새로고침과 직접 URL 접근이 가능하며, JavaScript를 끈 상태에서도 본문과 목차 링크를 읽을 수 있습니다.

| 프로젝트 | 상세 파일 |
| --- | --- |
| 스툴케어 | [projects/stoolcare/index.html](projects/stoolcare/index.html) |
| 피칼스캐너 | [projects/fecal-qa/index.html](projects/fecal-qa/index.html) |
| 42 Global 해커톤 | [projects/hackathon/index.html](projects/hackathon/index.html) |
| 레몬헬스케어 협업 | [projects/lemon/index.html](projects/lemon/index.html) |
| 한국·미국 통합 관리자 웹 | [projects/admin/index.html](projects/admin/index.html) |
| 42 BAND · Deviation | [projects/band/index.html](projects/band/index.html) |
| Coupang Order Viewer | [projects/coupang/index.html](projects/coupang/index.html) |
| C++ HTTP/1.1 서버 | [projects/webserver/index.html](projects/webserver/index.html) |
| C 기반 3D 그래픽 | [projects/raycasting/index.html](projects/raycasting/index.html) |
| Minishell | [projects/minishell/index.html](projects/minishell/index.html) |
| 42 Gyeongsan Game Jam | [projects/gamejam/index.html](projects/gamejam/index.html) |

편집 참고: https://brittanychiang.com/ (간결한 프로젝트 소개), https://www.vienzent.dev/portfolio/ (기여 범위와 기술적 판단 중심 사례 설명). 문구 검토에 Claude를 활용하고 최종 사실·범위·표현을 별도로 검토했습니다.

## GitHub push 자동 반영

`42_hackathon`의 `main`에 push → 해당 저장소의 `portfolio-sync.yml` 실행 → 공개용 요약 JSON만 이 저장소에 커밋 → 기존 GitHub Pages 배포로 메인 포트폴리오와 작업일지 갱신.

- 메인 페이지의 해커톤 카드와 최근 업데이트, `/worklog/`의 날짜별 작업 요약을 같은 JSON으로 표시합니다.
- 작은 달력은 날짜 선택용입니다. 커밋 수와 파일 목록으로 달력을 채우지 않습니다.
- 화면은 60초마다 새 배포 데이터를 확인합니다. push 뒤 반영 시간은 Actions와 Pages 배포 시간에 따라 달라집니다.
- 현재 연결 대상은 개인 `42_hackathon/main`입니다. 회사 저장소는 자동 반영에서 제외합니다.
- 최근 90일의 병합을 제외한 커밋 제목 접두어를 고정된 작업 유형으로 분류하고 날짜별 개수를 계산합니다. 원문, 파일명, 코드, 작성자 개인정보, 비공개 SHA는 내보내지 않습니다.
- 공동 기여를 포함한 저장소 기록입니다. 작업 시간, 개인 기여량, 테스트 통과나 배포 성공을 추정하지 않습니다.
- 상세 프로젝트 소개와 성과 수치는 자동으로 다시 쓰지 않습니다. 최신 작업 요약과 날짜가 자동 갱신됩니다.

`worklog/data/hackathon.json`의 `syncMode`가 `initial-snapshot`이면 첫 자료만 반영한 상태이며 연동 키 등록 전입니다. 실제 Actions가 생성해야 `github-actions`가 됩니다. 화면도 이를 구분해 표시합니다.

### 최초 연결

`python3 scripts/setup_portfolio_sync.py`

GitHub CLI 로그인 후 포트폴리오 저장소 한 곳에 쓸 수 있는 새 전용 deploy key를 만들고, 해커톤 저장소의 `PORTFOLIO_DEPLOY_KEY` Actions Secret에 등록합니다. 개인 SSH 키를 복사하지 않습니다. 생성한 임시 키 파일은 제거합니다. 등록 후 첫 workflow를 실행합니다. Mac이 꺼져 있어도 이후 push는 GitHub에서 처리됩니다.

GitHub 계정은 두 저장소의 관리 권한이 필요합니다. 설정 스크립트는 일부만 등록된 기존 키를 자동으로 덮어쓰지 않습니다.

[자동화 실행 상태](https://github.com/composerboyV/42_hackathon/actions/workflows/portfolio-sync.yml)

### 공개 요약 생성 / 검증

`python3 scripts/export_activity.py --source /path/to/source --project hackathon --output worklog/data/hackathon.json`

`python3 -m unittest discover -s tests -p 'test_*.py' -v`

`node --test tests/journal.test.js`

### 개인 메모

기존 수동 일지는 작업일지의 접힌 **내 메모**에 보존했습니다. `junkwak.journal.v1` localStorage를 계속 사용하며, 방문자에게 공개하거나 Git에 넣지 않습니다. 같은 브라우저 프로필을 사용하는 사람은 읽을 수 있습니다. 백업/가져오기/Markdown 다운로드를 지원합니다. 기기 간 자동 동기화와 아이폰 일정 연결은 별개이며 아직 연결 전입니다.

음악은 사용자가 제공한 YouTube 공식 플레이어로 연결합니다. 디자인 참고: [Cal.com 분석](https://github.com/VoltAgent/awesome-design-md/blob/main/design-md/cal/DESIGN.md), [Spotify 분석](https://github.com/VoltAgent/awesome-design-md/blob/main/design-md/spotify/DESIGN.md).

섹션명 `Experience`, `Projects`, `Skills`, `Education`은 [Reactive Resume의 섹션 제목 정의](https://github.com/reactive-resume/reactive-resume/blob/main/apps/web/src/libs/resume/section-title.ts)를 참고했습니다. 본문과 기존 사이트 구성은 유지합니다.
