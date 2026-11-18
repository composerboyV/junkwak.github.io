// Shared interactive architecture. Each `.ax` holds its data in <script type="application/json" class="ax-data">.
// Hover or focus lights a box and its links, click pins it; example buttons replay a request step by step.
(() => {
  const OWNER = { mine: '내 담당', team: '팀원', both: '함께' };
  const NS = 'http://www.w3.org/2000/svg';
  const el = (tag, cls, text) => {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text != null) node.textContent = text;
    return node;
  };
  const svg = (tag, attrs) => {
    const node = document.createElementNS(NS, tag);
    Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, v));
    return node;
  };
  let uid = 0;

  function build(root) {
    const data = JSON.parse(root.querySelector('.ax-data').textContent);
    const id = `ax${uid++}`;
    const byId = {};
    const colOf = {};
    data.columns.forEach((col, ci) => col.nodes.forEach(n => { byId[n.id] = n; colOf[n.id] = ci; }));
    const scenarios = data.scenarios || [];
    root.querySelectorAll(':scope > :not(.ax-data)').forEach(child => child.remove());

    const head = el('div', 'ax-head');
    const intro = el('div');
    intro.append(el('p', 'ax-title', data.title), el('p', 'ax-sub', data.sub || '상자에 마우스를 올리거나 누르면 연결이 밝아지고 아래에 설명이 나옵니다.'));
    head.append(intro);
    if (!data.solo) {
      const legend = el('p', 'ax-legend');
      const mine = el('span', 'mine');
      mine.append(el('b', '', '●'), ' 내 담당');
      legend.append(mine, el('span', '', '팀원'));
      head.append(legend);
    }
    root.append(head);

    const plays = el('div', 'ax-plays');
    if (scenarios.length) {
      plays.append(el('span', 'ax-plays-k', '예시 재생'));
      root.append(plays);
    }
    const hint = el('p', 'ax-hint', '옆으로 밀어서 전체 구성 보기 →');
    root.append(hint);

    const scroll = el('div', 'ax-scroll');
    scroll.tabIndex = 0;
    scroll.setAttribute('aria-label', '시스템 구성도, 가로로 스크롤할 수 있습니다');
    const graph = el('div', 'ax-graph');
    graph.style.minWidth = `${data.columns.length * 230}px`;
    const edgeSvg = svg('svg', { class: 'ax-edges', 'aria-hidden': 'true' });
    const defs = svg('defs', {});
    [['', '#67627f'], ['-on', '#b69cff'], ['-dim', '#2a2836']].forEach(([s, fill]) => {
      const m = svg('marker', { id: `${id}-head${s}`, viewBox: '0 0 8 8', refX: 8, refY: 4, markerWidth: 8, markerHeight: 8, markerUnits: 'userSpaceOnUse', orient: 'auto' });
      m.append(svg('path', { d: 'M0 0 L8 4 L0 8 Z', fill }));
      defs.append(m);
    });
    edgeSvg.append(defs);
    graph.append(edgeSvg);

    const nodeEls = {};
    data.columns.forEach(col => {
      const c = el('div', 'ax-col');
      c.append(el('p', 'ax-col-label', col.label));
      const list = el('div', 'ax-col-nodes');
      col.nodes.forEach(n => {
        const b = el('button', `ax-node${n.owner === 'mine' ? ' mine' : ''}`);
        b.type = 'button';
        b.dataset.id = n.id;
        const t = el('b');
        if (n.owner === 'mine' && !data.solo) { const i = el('i', '', '● '); i.setAttribute('aria-hidden', 'true'); t.append(i); }
        t.append(n.title);
        b.append(t);
        if (n.sub) b.append(el('small', '', n.sub));
        nodeEls[n.id] = b;
        list.append(b);
      });
      c.append(list);
      graph.append(c);
    });
    scroll.append(graph);
    root.append(scroll);

    const edges = (data.edges || []).map(e => {
      const path = svg('path', { 'marker-end': `url(#${id}-head)` });
      if (e.dashed) path.classList.add('dashed');
      edgeSvg.append(path);
      const label = e.label ? svg('text', { 'text-anchor': 'middle' }) : null;
      if (label) { label.textContent = e.label; edgeSvg.append(label); }
      return { ...e, path, label };
    });

    const panel = el('div', 'ax-panel');
    panel.setAttribute('aria-live', 'polite');
    const ph = el('div', 'ax-panel-head');
    const pTitle = el('strong');
    const pOwner = el('span', 'ax-owner');
    const pPath = el('code');
    ph.append(pTitle, pOwner, pPath);
    const cols = el('div', 'ax-panel-cols');
    const slots = [0, 1, 2].map(() => {
      const box = el('div');
      const k = el('p', 'ax-panel-k');
      const v = el('p');
      const pre = el('pre');
      box.append(k, v, pre);
      cols.append(box);
      return { box, k, v, pre };
    });
    const ctrl = el('div', 'ax-ctrl');
    const prev = el('button', '', '← 이전');
    const next = el('button', '', '다음 →');
    const stop = el('button', '', '닫기');
    const count = el('span');
    [prev, next, stop].forEach(b => { b.type = 'button'; });
    ctrl.append(prev, next, stop, count);
    panel.append(ph, cols, ctrl);
    root.append(panel);

    function place() {
      hint.classList.toggle('show', scroll.scrollWidth > scroll.clientWidth + 4);
      const g = graph.getBoundingClientRect();
      edgeSvg.setAttribute('width', g.width);
      edgeSvg.setAttribute('height', g.height);
      const box = n => {
        const r = nodeEls[n].getBoundingClientRect();
        return { l: r.left - g.left, r: r.right - g.left, t: r.top - g.top, b: r.bottom - g.top, cx: r.left - g.left + r.width / 2, cy: r.top - g.top + r.height / 2 };
      };
      edges.forEach(e => {
        if (!nodeEls[e.from] || !nodeEls[e.to]) return;
        const a = box(e.from), b = box(e.to);
        let d, lx, ly;
        if (colOf[e.from] === colOf[e.to]) {
          const down = a.cy < b.cy;
          const y1 = down ? a.b : a.t, y2 = down ? b.t : b.b;
          d = `M${a.cx} ${y1} V${y2}`;
          lx = a.cx + 8; ly = (y1 + y2) / 2;
        } else {
          const fwd = colOf[e.from] < colOf[e.to];
          const x1 = fwd ? a.r : a.l, x2 = fwd ? b.l : b.r;
          const mx = x1 + (fwd ? 28 : -28);
          d = `M${x1} ${a.cy} H${mx} V${b.cy} H${x2}`;
          lx = (mx + x2) / 2; ly = b.cy - 6;
        }
        e.path.setAttribute('d', d);
        if (e.label) {
          e.label.setAttribute('x', lx);
          e.label.setAttribute('y', ly);
          e.label.setAttribute('text-anchor', colOf[e.from] === colOf[e.to] ? 'start' : 'middle');
        }
      });
    }

    let hover = null, pinned = null, play = null;
    const touches = (e, ids) => ids.includes(e.from) && ids.includes(e.to);

    function render() {
      let lit = null, active = null, done = [], litEdges = [];
      if (play) {
        const steps = scenarios[play.s].steps;
        const seen = steps.slice(0, play.i + 1).map(s => s.node);
        active = steps[play.i].node;
        done = seen.slice(0, -1);
        lit = seen;
        for (let k = 1; k <= play.i; k++) {
          const a = steps[k - 1].node, b = steps[k].node;
          edges.forEach(e => { if ((e.from === a && e.to === b) || (e.from === b && e.to === a)) litEdges.push(e); });
        }
      } else {
        active = hover || pinned;
        if (active) {
          litEdges = edges.filter(e => e.from === active || e.to === active);
          lit = [active, ...litEdges.flatMap(e => [e.from, e.to])];
        }
      }
      Object.entries(nodeEls).forEach(([nid, b]) => {
        b.classList.toggle('dim', !!lit && !lit.includes(nid));
        b.classList.toggle('active', nid === active);
        b.classList.toggle('done', done.includes(nid) && nid !== active);
        b.classList.toggle('pinned', !play && nid === pinned);
        b.setAttribute('aria-pressed', String(!play && nid === pinned));
        b.querySelector('.ax-step')?.remove();
      });
      if (play) {
        scenarios[play.s].steps.slice(0, play.i + 1).forEach((s, k) => {
          const b = nodeEls[s.node];
          b.querySelector('.ax-step')?.remove();
          b.append(el('span', 'ax-step', String(k + 1)));
        });
      }
      edges.forEach(e => {
        const on = litEdges.includes(e);
        const dim = !!lit && !on;
        e.path.classList.toggle('on', on);
        e.path.classList.toggle('dim', dim);
        e.path.setAttribute('marker-end', `url(#${id}-head${on ? '-on' : dim ? '-dim' : ''})`);
        e.label?.classList.toggle('on', on);
      });
      plays.querySelectorAll('button').forEach((b, k) => b.setAttribute('aria-pressed', String(!!play && play.s === k)));

      const show = (slot, k, v, pre) => {
        slot.box.hidden = k == null;
        slot.k.textContent = k || '';
        slot.v.textContent = v || '';
        slot.v.hidden = !v;
        slot.pre.textContent = pre || '';
        slot.pre.hidden = !pre;
      };
      ctrl.hidden = !play;
      if (play) {
        const sc = scenarios[play.s], st = sc.steps[play.i], n = byId[st.node];
        pTitle.textContent = st.title;
        pOwner.hidden = false; pOwner.dataset.kind = 'step'; pOwner.textContent = `${play.i + 1} / ${sc.steps.length}`;
        pPath.textContent = n ? n.title : '';
        cols.dataset.mode = 'play';
        show(slots[0], '들어오는 값', '', st.in);
        show(slots[1], '나가는 값', '', st.out);
        show(slots[2], null);
        prev.disabled = play.i === 0;
        next.disabled = play.i === sc.steps.length - 1;
        count.textContent = sc.name;
        // Keep the current step's box in view when the diagram scrolls sideways (phones).
        const b = nodeEls[st.node];
        if (b && scroll.scrollWidth > scroll.clientWidth) {
          const x = b.closest('.ax-col').offsetLeft + b.offsetLeft;
          scroll.scrollTo({ left: x - (scroll.clientWidth - b.offsetWidth) / 2, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
        }
        return;
      }
      delete cols.dataset.mode;
      const n = active ? byId[active] : null;
      if (!n) {
        pTitle.textContent = '상자에 마우스를 올리거나 눌러보세요';
        pOwner.hidden = true; pPath.textContent = '';
        show(slots[0], '하는 일', data.solo ? '상자마다 맡은 일과 실제 코드 위치가 나옵니다.' : '● 표시와 보라 테두리가 제가 맡은 부분이고, 회색 상자는 팀원이 맡았습니다.');
        show(slots[1], '보는 법', '상자를 누르면 설명이 고정되고, 다시 누르면 풀립니다.');
        show(slots[2], '예시 재생', scenarios.length ? '위의 예시 버튼을 누르면 실제 요청이 어떤 순서로 처리되는지 단계별로 보여줍니다.' : '연결된 상자와 선만 밝게 남아서 데이터가 어디로 흐르는지 보입니다.');
        return;
      }
      pTitle.textContent = n.title;
      pOwner.hidden = data.solo || !n.owner;
      if (!pOwner.hidden) { pOwner.textContent = OWNER[n.owner]; pOwner.dataset.kind = n.owner; }
      pPath.textContent = n.path || '';
      show(slots[0], '하는 일', n.what);
      show(slots[1], n.madeLabel || (data.solo ? '구현' : '내가 만든 것'), n.made);
      show(slots[2], '이유', n.why);
    }

    scenarios.forEach((sc, s) => {
      const b = el('button', '', sc.name);
      b.type = 'button';
      if (sc.input) b.title = sc.input;
      b.addEventListener('click', () => { play = play && play.s === s ? null : { s, i: 0 }; pinned = null; render(); });
      plays.append(b);
    });
    prev.addEventListener('click', () => { if (play && play.i > 0) { play.i--; render(); } });
    next.addEventListener('click', () => { if (play && play.i < scenarios[play.s].steps.length - 1) { play.i++; render(); } });
    stop.addEventListener('click', () => { play = null; render(); });

    Object.entries(nodeEls).forEach(([nid, b]) => {
      const enter = () => { if (!play) { hover = nid; render(); } };
      const leave = () => { if (!play) { hover = null; render(); } };
      b.addEventListener('mouseenter', enter);
      b.addEventListener('mouseleave', leave);
      b.addEventListener('focus', enter);
      b.addEventListener('blur', leave);
      b.addEventListener('click', () => { play = null; hover = null; pinned = pinned === nid ? null : nid; render(); });
    });
    root.addEventListener('keydown', event => {
      if (event.key === 'Escape') { pinned = null; play = null; render(); }
      if (play && event.key === 'ArrowRight') next.click();
      if (play && event.key === 'ArrowLeft') prev.click();
    });

    place();
    render();
    if ('ResizeObserver' in window) new ResizeObserver(place).observe(graph);
    else window.addEventListener('resize', place);
    document.fonts?.ready.then(place);
  }

  document.querySelectorAll('.ax').forEach(root => {
    try { build(root); } catch (err) { console.error('architecture diagram', err); }
  });
})();
