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
- `projects.js`: 프로젝트 카드 요약과 상세 페이지 경로. `category`(work · ai · personal · study)로 홈의 묶음(경력 · AICU / AI 에이전트 · 해커톤 / 개인 도구 / 42 · 학습)이 정해집니다.
- `projects/<id>/index.html`: 프로젝트별 독립 상세 페이지. 상단 문맥표(담당 범위·진행 형태·현재 상태)를 둔 뒤, 프로젝트 성격에 맞춰 `배경과 목표 / 해결 과정 / 구조 / 결과 / 확인 자료` 순서로 편집합니다. 섹션 id(`#problem`, `#decision`, `#architecture`, `#result`, `#evidence`)는 목차 스크립트와 외부 링크를 위해 유지하고 제목만 바꿉니다.
- `project.css`, `project.js`: 상세 페이지 공통 스타일과 현재 목차 표시
- `style.css`: 반응형 화면, 인쇄, 접근성 스타일
- `app.js`: 묶음별 프로젝트 카드, 상세 페이지 연결, 모바일 메뉴, 현재 섹션 표시

GitHub Pages는 `main` 브랜치의 루트에서 배포합니다. `.nojekyll`을 유지합니다.

회사 프로젝트에는 공개용 설명만 기록합니다. Private 저장소 링크는 접근 권한을 제공하지 않습니다. 테스트 수치에는 검증 날짜와 범위를 함께 표시합니다. 최신 내용 기준일: 2026-10-18.

참고한 탐색 구성: https://yoohyeok.github.io/u-it/ (고정 사이드 메뉴와 한 페이지 이력서). 디자인·구현·본문은 이 포트폴리오용으로 작성했습니다.

소개·경험 문구는 본인 인터뷰를 바탕으로 편집했습니다. 프로젝트 카드는 사이트 내 상세 페이지로 연결합니다. 각 상세 페이지의 `확인 자료`에서 기존 GitHub·Notion·Figma·공개 게임 링크를 확인할 수 있으며, 외부 문서와 자동 동기화하지 않습니다.

상세 페이지 구성 참고: https://portfolio-sage-nine-97.vercel.app/projects/notiiv
프로젝트별 배경·해결 과정·결과·확인 자료의 읽기 흐름을 참고하고(요즘IT 「개발자 포트폴리오」 3391 글의 배경→목표→해결→성과 구성 반영), 본문은 기존 포트폴리오의 역할·구현·검증 기록으로 작성했습니다. 수치에는 날짜와 검증 범위를 함께 표시합니다.

상세 페이지는 정적 HTML로 직접 편집합니다. 별도 빌드 없이 새로고침과 직접 URL 접근이 가능하며, JavaScript를 끈 상태에서도 본문과 목차 링크를 읽을 수 있습니다.

| 프로젝트 | 상세 파일 |
| --- | --- |
| 42 Asia Hackathon 2026 in Tokyo (팀 Mirai) | [projects/mirai/index.html](projects/mirai/index.html) |
| 스툴케어 | [projects/stoolcare/index.html](projects/stoolcare/index.html) |
| 피칼스캐너 | [projects/fecal-qa/index.html](projects/fecal-qa/index.html) |
| 피칼스캐너-M | [projects/fecal-m/index.html](projects/fecal-m/index.html) |
| BidScope · 나라장터 입찰 검토 에이전트 | [projects/hackathon/index.html](projects/hackathon/index.html) |
| 서비스별 관리자 웹 | [projects/admin/index.html](projects/admin/index.html) |
| 42 BAND · 악사모 | [projects/band/index.html](projects/band/index.html) |
| Coupang Order Viewer | [projects/coupang/index.html](projects/coupang/index.html) |
| C++ HTTP/1.1 서버 | [projects/webserver/index.html](projects/webserver/index.html) |
| C 기반 3D 그래픽 | [projects/raycasting/index.html](projects/raycasting/index.html) |
| Minishell | [projects/minishell/index.html](projects/minishell/index.html) |

편집 참고: https://brittanychiang.com/ (간결한 프로젝트 소개), https://www.vienzent.dev/portfolio/ (기여 범위와 기술적 판단 중심 사례 설명). 문구 검토에 Claude를 활용하고 최종 사실·범위·표현을 별도로 검토했습니다.

## 검증

`python3 -m unittest discover -s tests -v`

`tests/test_projects.py`가 `projects.js`의 묶음(category), 상세 페이지, 상세 페이지의 "프로젝트 목록" 링크(`../../#<id>`)가 서로 맞는지 확인합니다.

섹션명 `Experience`, `Projects`, `Skills`, `Education`은 [Reactive Resume의 섹션 제목 정의](https://github.com/reactive-resume/reactive-resume/blob/main/apps/web/src/libs/resume/section-title.ts)를 참고했습니다. 본문과 기존 사이트 구성은 유지합니다.
