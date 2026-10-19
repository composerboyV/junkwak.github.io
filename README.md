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
- `projects.js`: 프로젝트 카드와 프로젝트별 개발 이야기, 저장소 링크
- `style.css`: 반응형 화면, 인쇄, 접근성 스타일
- `app.js`: 필터, 상세 대화상자, 모바일 메뉴, 현재 섹션 표시

GitHub Pages는 `main` 브랜치의 루트에서 배포합니다. `.nojekyll`을 유지합니다.

회사 프로젝트에는 공개용 설명만 기록합니다. Private 저장소 링크는 접근 권한을 제공하지 않습니다. 테스트 수치에는 검증 날짜와 범위를 함께 표시합니다. 최신 내용 기준일: 2026-10-18.

참고한 탐색 구성: https://yoohyeok.github.io/u-it/ (고정 사이드 메뉴와 한 페이지 이력서). 디자인·구현·본문은 이 포트폴리오용으로 작성했습니다.

소개·경험 문구는 본인 인터뷰를 바탕으로 편집했습니다. 프로젝트별 상세 페이지는 Notion 링크로 연결하며 자동 동기화하지 않습니다.

편집 참고: https://brittanychiang.com/ (간결한 프로젝트 소개), https://www.vienzent.dev/portfolio/ (기여 범위와 기술적 판단 중심 사례 설명). 문구 검토에 Claude를 활용하고 최종 사실·범위·표현을 별도로 검토했습니다.

## 작업일지

포트폴리오 메뉴의 **작업일지**는 `./worklog/`로 연결됩니다. 빌드 없는 GitHub Pages용 화면이며, 작성한 내용은 `junkwak.journal.v1` 키로 해당 브라우저의 localStorage에 저장합니다. 서버, 저장소, 방문자에게 일지를 전송하지 않습니다. 로그인 기능이나 기기 간 자동 동기화는 없습니다. 같은 브라우저 프로필을 쓰는 사람은 저장한 내용을 볼 수 있습니다.

- 날짜별 작성·저장, 작성일 표시, 최근 일지, Markdown 다운로드
- JSON 백업·가져오기: 내용이 있는 기존 날짜는 유지하며, 없는 날짜와 빈 날짜만 추가
- Mac 로컬 작업일지에서 **웹으로 옮길 일지 ↓**로 받은 JSON을 가져올 수 있음
- 이 브라우저의 사이트 데이터를 지우면 일지가 삭제되므로 백업 파일로 보관
- 하단 음악은 사용자가 제공한 YouTube 영상/목록 링크의 공식 플레이어이며 직접 열고 재생함
- Git 수집, 비공개 저장소 접근, iPhone·TimeTree 일정 연동은 이 정적 사이트에서 실행하지 않음

작업일지 UI는 기존 로컬 앱의 일지 중심 구성을 재사용합니다. 참고: [Cal.com 분석](https://github.com/VoltAgent/awesome-design-md/blob/main/design-md/cal/DESIGN.md)의 구획과 [Spotify 분석](https://github.com/VoltAgent/awesome-design-md/blob/main/design-md/spotify/DESIGN.md)의 고정 재생바. 이는 커뮤니티 분석이며 공식 디자인 규격이 아닙니다.

검증: `node --test tests/journal.test.js`
