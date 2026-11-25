// Interactive architecture: hover or focus lights a box and its links, click pins it.
// Without JavaScript the diagram and the panel's usage hint still render.
(() => {
  const graph = document.querySelector('#m-graph');
  if (!graph) return;
  const MINE = '내 담당', TEAM = '팀원', BOTH = '함께';
  const D = {
    c1: { title: '방문자 · 회원 화면', owner: MINE, path: 'server/pages.mjs · server/public/mirai/', what: '리버스 엔지니어링으로 파악해 가져온 CCIFJ 웹사이트 791페이지 위에 AI 개요·채팅·My Page를 얹은 화면', made: '원본 HTML은 건드리지 않고 응답할 때 Mirai 스크립트를 삽입하고, 로그인·가입 폼을 회원 API에 연결', why: '실제 TYPO3 사이트에도 스크립트 한 줄로 붙일 수 있다는 걸 보여주려고' },
    c2: { title: '직원 워크스페이스', owner: MINE, path: 'server/public/admin/', what: '승인·매칭 검토·CRM·자료실·인사이트를 한곳에서 보는 직원 화면 (4개 언어)', made: '두 직원 화면을 /admin/ 하나로 합치고, Odoo식 CRM 레코드와 행사 캘린더를 붙임', why: '에이전트가 준비한 결과를 직원이 한 화면에서 결정하도록' },
    c3: { title: 'WhatsApp', owner: MINE, path: 'server/api/whatsapp.mjs', what: '회원이 WhatsApp으로 물으면 홈페이지와 같은 A1이 출처 링크와 함께 답함', made: '서명 확인 후 즉시 200, 번호 붙인 후속 질문, 중복 전달 무시, 발신자별 순서·분당 15건 제한', why: '별도 게이트웨이 서버 없이 사이트와 함께 배포하려고' },
    c4: { title: 'Prisme.ai', owner: TEAM, path: 'docs/prisme-demo.md', what: 'Prisme.ai 대화창에서 A1을 부르는 서명 브리지. 다른 에이전트도 CCIFJ 정보를 플러그인처럼 꺼내 씀', madeLabel: '연결 지점', made: 'Node 서버의 브리지가 받아 홈페이지와 같은 A1 답을 돌려줌', why: '기존 도구 안에서도 같은 답이 나오도록' },
    deploy: { title: 'GitHub Actions → Azure', owner: BOTH, path: '.github/workflows/', what: 'main에 머지되면 Azure App Service에 배포하고 상태를 확인', made: 'Azure OIDC 로그인(저장된 시크릿 없음)과 배포 후 /api/health 확인. Python 런타임을 ZIP에 묶는 건 팀원', why: 'PR이 머지될 때마다 같은 방식으로 배포되게' },
    core: { title: '웹 서버 코어', owner: MINE, path: 'server/app.mjs · server/api/', what: '브라우저와 모든 채널이 만나는 유일한 서버. 인증, 권한, 저장, 에이전트 호출을 맡음', made: 'scrypt·HMAC 세션 쿠키, 같은 출처·JSON 검사, Brotli·ETag 캐시', why: '에이전트는 결과만 돌려주고, 쓰기와 권한은 Node가 쥐도록' },
    gate: { title: '승인 게이트', owner: MINE, path: 'server/api/admin.mjs', what: '에이전트가 만든 제안요청서는 직원이 승인해야만 발송', made: '직원이 본 문안 해시가 있어야 승인, 승인 후 고치면 초안으로(409), 편집·승인·발송을 한 트랜잭션으로', why: '코드 리뷰에서 고친 문안이 승인 없이 나갈 수 있는 경쟁 상태를 찾아서' },
    docs: { title: '자료실', owner: MINE, path: 'server/agents/documents.mjs', what: '직원이 올린 PDF·DOCX를 요약·일정 등록·회원 메일·A1 지식으로 바꿈', made: '브라우저에서 pdf.js 추출, 스캔본은 Tesseract OCR, SHA-256 중복 검사, 공개한 자료만 A1 검색에 포함', why: 'CCIFJ 자료를 A1이 쪽 번호까지 출처로 쓰게 하려고' },
    insight: { title: '인사이트 에이전트 v1', owner: MINE, path: 'server/insights/workflow.mjs', what: '기업 기록에서 후속 지원할 기업을 골라 제안 보고서를 씀 (이후 A4 직원 채팅으로 확장)', made: 'plan(최대 3곳) → 업종 뉴스 검색 → report. ID를 enum으로 묶은 strict JSON Schema를 서버에서 재검증', why: '모델이 없는 기업이나 출처를 지어내지 못하게' },
    a1: { title: 'A1 · Multilingual Concierge', owner: TEAM, path: 'services/agents/', what: '방문자 질문에 출처 번호를 붙여 답하고, 근거가 없으면 추측하지 않고 담당자 연결로 안내', madeLabel: '연결 지점', made: '내가 정한 answer·reply 계약 자리에 연결. AI 개요·채팅·WhatsApp·Prisme.ai가 같은 A1을 씀', why: '근거 없는 답이 회원에게 나가지 않도록' },
    a2: { title: 'A2 · Personal Membership Manager', owner: TEAM, path: 'services/agents/', what: '새 회원의 목표·관심사로 행사·서비스를 고르고, 왜 맞는지 설명', madeLabel: '연결 지점', made: 'recommend·journey 계약을 통해 My Page 대시보드에 표시', why: '회원이 할 일을 먼저 보여주려고' },
    a3: { title: 'A3 · Evidence-based B2B Matching', owner: MINE, path: 'services/agents/', what: '소개 요청을 후보 기업과 조건별 근거(충족·미충족·미확인)로 정리', made: 'match·draftProposal 계약 → 직원 검토 → 승인 게이트', why: 'AI는 결정하지 않고 직원이 결정하도록' },
    a4: { title: 'A4 · Demand Insight', owner: MINE, path: 'services/agents/', what: '앞의 에이전트에서 모인 데이터로 회원 수요와 필요한 연결을 직원에게 보여줌', made: '인사이트 에이전트 v1의 자리를 이어받아 직원 채팅으로 확장', why: '숫자는 코드가, 해석 문장만 모델이 쓰도록' },
    d1: { title: 'Azure MySQL', owner: MINE, path: 'db/migrations/', what: '회원·대화·케이스·결정·CRM 기록 (전용 DB mirai_ccifj)', made: '앱 계정은 읽기·쓰기만, TLS 필수. 관리자 계정과 다른 DB 접근이 거부되는지 실제로 확인', why: '앱이 뚫려도 스키마와 다른 서비스 DB는 못 건드리게' },
    d2: { title: 'Blob Storage', owner: MINE, path: 'scripts/assets/', what: '저장본 사이트의 이미지 3,826개(781MiB)', made: '쓰는 이미지만 올리고 응답할 때 URL을 바꿔 끼움. 792페이지에서 깨진 이미지 0 확인', why: '저장소와 배포 ZIP을 가볍게 (ZIP 20.7MiB)' },
    d3: { title: 'Odoo · GetResponse', owner: MINE, path: 'server/integrations/', what: '상담·매칭·제안 발송을 CRM 리드·활동·메일로 넘김', made: '실제 API 형식의 요청을 outbox에 쌓고 demo/live 모드로 전환. API 키는 보낼 때만 붙임', why: '실제 계정 없이도 연동 구조를 그대로 보여주려고' },
    d4: { title: '프랑스 공공 기업 API', owner: MINE, path: 'server/company-research/', what: 'recherche-entreprises·BODACC로 기업 등록 정보와 공고 조회', made: '출처가 남는 기업 리서치를 회원 등록과 연결하고, 등록되지 않은 재무 정보는 비워 둠', why: '기업 정보를 공개 출처로만 채우려고' },
    d5: { title: 'Mistral · Claude · OpenAI', owner: BOTH, path: 'services/agents/policies/', what: '에이전트의 모델 호출과 mistral-embed 임베딩', madeLabel: '나눈 방식', made: '팀원 에이전트는 Mistral·Claude, 내 인사이트 에이전트 v1은 OpenAI Responses API를 직접 호출', why: '출력은 모두 JSON Schema로 받아 검증하려고' },
    d6: { title: 'SQLite', owner: TEAM, path: 'services/agents/', what: '에이전트 상태와 지식 인덱스(임베딩)', madeLabel: '내가 손댄 것', made: 'Azure 공유 저장소에서 에이전트 준비 상태 확인이 느려지지 않게 조회를 바꿈', why: '앱 시작과 상태 확인이 빨라야 해서' }
  };
  const CH = ['l_c1', 'l_c2', 'l_c3', 'l_c4', 'bus1', 'in_core'];
  const R = {
    c1: [['c1', 'core'], ['l_c1', 'bus1', 'in_core']],
    c2: [['c2', 'core'], ['l_c2', 'bus1', 'in_core']],
    c3: [['c3', 'core', 'a1'], ['l_c3', 'bus1', 'in_core', 'np']],
    c4: [['c4', 'core', 'a1'], ['l_c4', 'bus1', 'in_core', 'np']],
    deploy: [['deploy', 'core', 'gate', 'docs', 'insight', 'a1', 'a2', 'a3', 'a4'], ['dep']],
    core: [['c1', 'c2', 'c3', 'c4', 'core', 'gate', 'docs', 'insight', 'a1', 'a2', 'a3', 'a4', 'd1', 'd2', 'd3', 'd4'], [...CH, 'out_core', 'bus2', 'to_d1', 'to_d2', 'to_d3', 'to_d4', 'np']],
    gate: [['gate', 'core', 'c2', 'a3', 'd1', 'd3'], ['l_c2', 'bus1', 'in_core', 'np', 'out_core', 'bus2', 'to_d1', 'to_d3']],
    docs: [['docs', 'core', 'c2', 'a1', 'd1'], ['l_c2', 'bus1', 'in_core', 'np', 'out_core', 'bus2', 'to_d1']],
    insight: [['insight', 'core', 'c2', 'd5'], ['l_c2', 'bus1', 'in_core', 'ins']],
    a1: [['a1', 'core', 'c1', 'c3', 'c4', 'd5', 'd6'], ['l_c1', 'l_c3', 'l_c4', 'bus1', 'in_core', 'np', 'py_llm', 'py_sql']],
    a2: [['a2', 'core', 'c1', 'd5', 'd6'], ['l_c1', 'bus1', 'in_core', 'np', 'py_llm', 'py_sql']],
    a3: [['a3', 'core', 'c1', 'c2', 'gate', 'd5'], ['l_c1', 'l_c2', 'bus1', 'in_core', 'np', 'py_llm']],
    a4: [['a4', 'core', 'c2', 'insight', 'd5'], ['l_c2', 'bus1', 'in_core', 'np', 'py_llm']],
    d1: [['d1', 'core'], ['out_core', 'bus2', 'to_d1']],
    d2: [['d2', 'core', 'c1'], ['l_c1', 'bus1', 'in_core', 'out_core', 'bus2', 'to_d2']],
    d3: [['d3', 'core', 'gate'], ['out_core', 'bus2', 'to_d3']],
    d4: [['d4', 'core', 'c2'], ['l_c2', 'bus1', 'in_core', 'out_core', 'bus2', 'to_d4']],
    d5: [['d5', 'a1', 'a2', 'a3', 'a4', 'insight'], ['py_llm', 'ins']],
    d6: [['d6', 'a1', 'a2'], ['py_sql']]
  };
  const KIND = { [MINE]: 'mine', [TEAM]: 'team', [BOTH]: 'both' };
  const nodes = [...graph.querySelectorAll('.m-node')];
  const edges = [...graph.querySelectorAll('.m-edges path[data-e]')];
  const $ = id => document.getElementById(id);
  const panel = { title: $('m-p-title'), owner: $('m-p-owner'), path: $('m-p-path'), what: $('m-p-what'), madeK: $('m-p-made-k'), made: $('m-p-made'), why: $('m-p-why') };
  const hint = { title: panel.title.textContent, what: panel.what.textContent, madeK: panel.madeK.textContent, made: panel.made.textContent, why: panel.why.textContent };
  let hover = null, pinned = null;

  function render() {
    const active = hover || pinned;
    const rel = active ? R[active] : null;
    nodes.forEach(node => {
      const id = node.dataset.id;
      node.classList.toggle('dim', !!rel && !rel[0].includes(id));
      node.classList.toggle('active', id === active);
      node.classList.toggle('pinned', id === pinned);
      node.setAttribute('aria-pressed', String(id === pinned));
    });
    edges.forEach(path => {
      const on = !!rel && rel[1].includes(path.dataset.e);
      path.classList.toggle('on', on);
      path.classList.toggle('dim', !!rel && !on);
      if (path.dataset.head) path.setAttribute('marker-end', `url(#m-head${on ? '-on' : rel ? '-dim' : ''})`);
    });
    const d = active ? D[active] : null;
    panel.title.textContent = d ? d.title : hint.title;
    panel.owner.hidden = !d;
    if (d) { panel.owner.textContent = d.owner; panel.owner.dataset.kind = KIND[d.owner]; }
    panel.path.textContent = d ? d.path : '';
    panel.what.textContent = d ? d.what : hint.what;
    panel.madeK.textContent = d ? (d.madeLabel || '내가 만든 것') : hint.madeK;
    panel.made.textContent = d ? d.made : hint.made;
    panel.why.textContent = d ? d.why : hint.why;
  }

  nodes.forEach(node => {
    const id = node.dataset.id;
    const enter = () => { hover = id; render(); };
    const leave = () => { hover = null; render(); };
    node.addEventListener('mouseenter', enter);
    node.addEventListener('mouseleave', leave);
    node.addEventListener('focus', enter);
    node.addEventListener('blur', leave);
    node.addEventListener('click', () => { pinned = pinned === id ? null : id; render(); });
  });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && pinned) { pinned = null; render(); } });
  render();

  // The fixed-size diagram first fits its box; zooming in lets you scroll around it.
  const scroll = graph.parentElement;
  const scrollHint = document.querySelector('.m-arch-hint');
  if (scrollHint) scrollHint.style.display = 'none';
  const sizer = document.createElement('div');
  sizer.className = 'm-sizer';
  graph.before(sizer);
  sizer.append(graph);
  const bar = document.createElement('div');
  bar.className = 'm-zoom';
  const mk = (text, label) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = text;
    b.setAttribute('aria-label', label);
    return b;
  };
  const zoomOut = mk('－', '축소'), zoomIn = mk('＋', '확대'), zoomFit = mk('맞춤', '상자에 맞추기');
  const pct = document.createElement('span');
  pct.className = 'm-zoom-pct';
  bar.append(zoomOut, pct, zoomIn, zoomFit);
  scroll.before(bar);
  let zoom = 1;
  const fit = () => {
    const scale = Math.min(1, scroll.clientWidth / graph.offsetWidth) * zoom;
    graph.style.transform = scale === 1 ? '' : `scale(${scale})`;
    sizer.style.width = `${graph.offsetWidth * scale}px`;
    sizer.style.height = `${graph.offsetHeight * scale}px`;
    scroll.classList.toggle('zoomed', zoom > 1);
    pct.textContent = `${Math.round(scale * 100)}%`;
    zoomOut.disabled = zoom <= 1;
    zoomFit.disabled = zoom === 1;
    zoomIn.disabled = scale >= 2;
  };
  const setZoom = z => { zoom = Math.max(1, z); fit(); };
  zoomIn.addEventListener('click', () => setZoom(zoom * 1.5));
  zoomOut.addEventListener('click', () => setZoom(zoom / 1.5));
  zoomFit.addEventListener('click', () => setZoom(1));
  fit();
  if ('ResizeObserver' in window) new ResizeObserver(fit).observe(scroll);
  else window.addEventListener('resize', fit);
})();
