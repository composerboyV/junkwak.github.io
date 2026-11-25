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
    // Zoom controls: the diagram always fits its box first; zooming in lets you scroll around it.
    const zoomBar = el('div', 'ax-zoom');
    const zoomOut = el('button', '', '－'), zoomFit = el('button', '', '맞춤'), zoomIn = el('button', '', '＋');
    zoomOut.setAttribute('aria-label', '축소');
    zoomIn.setAttribute('aria-label', '확대');
    zoomFit.setAttribute('aria-label', '상자에 맞추기');
    [zoomOut, zoomFit, zoomIn].forEach(b => { b.type = 'button'; });
    const zoomPct = el('span', 'ax-zoom-pct');
    zoomBar.append(zoomOut, zoomPct, zoomIn, zoomFit);
    root.append(zoomBar);

    const scroll = el('div', 'ax-scroll');
    scroll.tabIndex = 0;
    scroll.setAttribute('aria-label', '시스템 구성도');
    const sizer = el('div', 'ax-sizer');
    const graph = el('div', 'ax-graph');
    const edgeSvg = svg('svg', { class: 'ax-edges', 'aria-hidden': 'true' });
    const defs = svg('defs', {});
    [['', '#8580a3'], ['-on', '#b69cff'], ['-dim', '#2a2836']].forEach(([s, fill]) => {
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
    sizer.append(graph);
    scroll.append(sizer);
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

    // zoom is relative to the fitted size: 1 = whole diagram fits the box.
    let zoom = 1, scale = 1;
    function fit() {
      const gap = parseFloat(getComputedStyle(graph).columnGap) || 56;
      const n = data.columns.length;
      const box = scroll.clientWidth;
      const layoutW = Math.max(box, n * 115 + (n - 1) * gap + 28);
      graph.style.width = `${layoutW}px`;
      const fitScale = Math.min(1, box / layoutW);
      scale = fitScale * zoom;
      graph.style.transform = scale === 1 ? '' : `scale(${scale})`;
      sizer.style.width = `${layoutW * scale}px`;
      sizer.style.height = `${graph.offsetHeight * scale}px`;
      scroll.classList.toggle('zoomed', zoom > 1);
      zoomPct.textContent = `${Math.round(scale * 100)}%`;
      zoomOut.disabled = zoom <= 1;
      zoomFit.disabled = zoom === 1;
      zoomIn.disabled = scale >= 2;
    }
    const setZoom = z => { zoom = Math.max(1, z); fit(); place(); };
    zoomIn.addEventListener('click', () => setZoom(zoom * 1.5));
    zoomOut.addEventListener('click', () => setZoom(zoom / 1.5));
    zoomFit.addEventListener('click', () => setZoom(1));

    // Orthogonal path through the given points, corners rounded.
    function roundPath(raw, r) {
      const p = raw.filter((q, i) => !i || q[0] !== raw[i - 1][0] || q[1] !== raw[i - 1][1]);
      let d = `M${p[0][0]} ${p[0][1]}`;
      for (let i = 1; i < p.length - 1; i++) {
        const [x0, y0] = p[i - 1], [x1, y1] = p[i], [x2, y2] = p[i + 1];
        const d1 = Math.hypot(x1 - x0, y1 - y0), d2 = Math.hypot(x2 - x1, y2 - y1);
        const k = Math.min(r, d1 / 2, d2 / 2);
        if (k < 1) { d += ` L${x1} ${y1}`; continue; }
        d += ` L${x1 - (x1 - x0) / d1 * k} ${y1 - (y1 - y0) / d1 * k} Q${x1} ${y1} ${x1 + (x2 - x1) / d2 * k} ${y1 + (y2 - y1) / d2 * k}`;
      }
      const last = p[p.length - 1];
      return { d: `${d} L${last[0]} ${last[1]}`, pts: p };
    }

    // Edges are routed in the gutters between columns, each bundle in its own lane, so no line
    // runs behind a box. Positions come from layout offsets, which the zoom transform never changes.
    function place() {
      const gap = parseFloat(getComputedStyle(graph).columnGap) || 40;
      graph.classList.toggle('tight', gap < 50);
      edgeSvg.setAttribute('width', graph.offsetWidth);
      edgeSvg.setAttribute('height', graph.offsetHeight);
      // Keep lines and arrowheads readable when the whole diagram is shrunk to fit.
      const sw = Math.max(2, 1.6 / scale), head = Math.max(8, 7.5 / scale);
      edgeSvg.style.setProperty('--sw', sw);
      defs.querySelectorAll('marker').forEach(m => { m.setAttribute('markerWidth', head); m.setAttribute('markerHeight', head); });

      const boxes = {};
      Object.keys(nodeEls).forEach(n => {
        const e = nodeEls[n], c = e.closest('.ax-col');
        const l = c.offsetLeft + e.offsetLeft, t = c.offsetTop + e.offsetTop, w = e.offsetWidth, h = e.offsetHeight;
        boxes[n] = { l, r: l + w, t, b: t + h, cx: l + w / 2, cy: t + h / 2 };
      });
      const cols = data.columns.map(col => col.nodes.map(n => boxes[n.id]).sort((a, b) => a.t - b.t));
      const colL = cols.map(c => Math.min(...c.map(b => b.l))), colR = cols.map(c => Math.max(...c.map(b => b.r)));
      const last = cols.length - 1;
      const blocked = (c, y) => cols[c].some(b => y > b.t - 6 && y < b.b + 6);
      const bottom = Math.max(...Object.values(boxes).map(b => b.b)) + 8;

      // Where both an incoming and an outgoing line use one side of a box, split them apart.
      const uses = {};
      const use = (n, side, kind) => { ((uses[`${n}:${side}`] ||= {})[kind] = true); };
      const live = edges.filter(e => boxes[e.from] && boxes[e.to]);
      live.forEach(e => {
        e.L1 = e.L2 = e.via = null;
        const ca = colOf[e.from], cb = colOf[e.to];
        if (ca === cb) {
          const a = boxes[e.from], b = boxes[e.to];
          e.adjacent = last === 0 || !cols[ca].some(o => o !== a && o !== b && o.cy > Math.min(a.cy, b.cy) && o.cy < Math.max(a.cy, b.cy));
          e.side = ca < last ? 'r' : 'l';
          if (!e.adjacent) { use(e.from, e.side, 'out'); use(e.to, e.side, 'in'); }
        } else {
          e.dir = cb > ca ? 1 : -1;
          use(e.from, e.dir > 0 ? 'r' : 'l', 'out');
          use(e.to, e.dir > 0 ? 'l' : 'r', 'in');
        }
      });
      const port = (n, side, kind) => {
        const u = uses[`${n}:${side}`], b = boxes[n];
        return b.cy + (u && u.in && u.out && b.b - b.t >= 30 ? (kind === 'out' ? -6 : 6) : 0);
      };

      // First pass: pick each edge's route and the gutter lanes it needs.
      const lanes = {};
      const lane = (g, key, y) => { const L = ((lanes[g] ||= {})[key] ||= { ys: [] }); L.ys.push(y); return L; };
      live.forEach(e => {
        const a = boxes[e.from], b = boxes[e.to], ca = colOf[e.from], cb = colOf[e.to];
        if (ca === cb) {
          if (e.adjacent) return;
          e.ya = port(e.from, e.side, 'out'); e.yb = port(e.to, e.side, 'in');
          e.L1 = lane(e.side === 'r' ? ca : ca - 1, `b:${e.from}`, e.ya);
          return;
        }
        const out = e.dir > 0 ? 'r' : 'l', inn = e.dir > 0 ? 'l' : 'r';
        e.ya = port(e.from, out, 'out'); e.yb = port(e.to, inn, 'in');
        const gs = e.dir > 0 ? ca : ca - 1, gt = e.dir > 0 ? cb - 1 : cb;
        const between = [];
        for (let c = ca + e.dir; c !== cb; c += e.dir) between.push(c);
        const free = y => !between.some(c => blocked(c, y));
        if (gs === gt || free(e.yb)) { e.L1 = lane(gs, `s:${e.from}:${e.dir}`, e.ya); e.via = null; return; }
        if (free(e.ya)) { e.L2 = lane(gt, `t:${e.to}:${e.dir}`, e.yb); e.via = null; return; }
        // Neither end has a clear run: cross the columns in between through a gap between boxes.
        const cand = [bottom];
        between.forEach(c => cols[c].forEach((o, i) => { if (i) cand.push((cols[c][i - 1].b + o.t) / 2); cand.push(o.t - 10, o.b + 10); }));
        e.via = cand.filter(free).sort((p, q) => Math.abs(p - e.ya) + Math.abs(p - e.yb) - Math.abs(q - e.ya) - Math.abs(q - e.yb))[0] ?? bottom;
        e.L1 = lane(gs, `s:${e.from}:${e.dir}`, e.ya);
        e.L2 = lane(gt, `t:${e.to}:${e.dir}`, e.yb);
      });
      // Spread the lanes of each gutter evenly across it.
      Object.keys(lanes).forEach(g => {
        const left = colR[g], width = colL[+g + 1] - left;
        const list = Object.values(lanes[g]).sort((p, q) => p.ys[0] - q.ys[0]);
        list.forEach((L, i) => { L.x = left + width * (i + 1) / (list.length + 1); });
      });

      const twin = e => live.some(o => o !== e && o.from === e.to && o.to === e.from);
      live.forEach(e => {
        const a = boxes[e.from], b = boxes[e.to];
        let pts;
        if (e.dir === undefined && e.adjacent) {
          const down = a.cy < b.cy, x = a.cx + (twin(e) ? (down ? -9 : 9) : 0);
          pts = [[x, down ? a.b : a.t], [x, down ? b.t : b.b]];
        } else if (e.dir === undefined) {
          const x = e.side === 'r' ? a.r : a.l, xb = e.side === 'r' ? b.r : b.l;
          pts = [[x, e.ya], [e.L1.x, e.ya], [e.L1.x, e.yb], [xb, e.yb]];
        } else {
          const x1 = e.dir > 0 ? a.r : a.l, x2 = e.dir > 0 ? b.l : b.r;
          if (e.via != null) pts = [[x1, e.ya], [e.L1.x, e.ya], [e.L1.x, e.via], [e.L2.x, e.via], [e.L2.x, e.yb], [x2, e.yb]];
          else { const x = (e.L1 || e.L2).x; pts = [[x1, e.ya], [x, e.ya], [x, e.yb], [x2, e.yb]]; }
        }
        const route = roundPath(pts, 7);
        e.path.setAttribute('d', route.d);
        if (e.label) {
          const [px, py] = route.pts[route.pts.length - 2], [qx, qy] = route.pts[route.pts.length - 1];
          const vertical = px === qx;
          e.label.setAttribute('x', vertical ? qx + 8 : (px + qx) / 2);
          e.label.setAttribute('y', vertical ? (py + qy) / 2 : qy - 7);
          e.label.setAttribute('text-anchor', vertical ? 'start' : 'middle');
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
        if (on) { edgeSvg.append(e.path); if (e.label) edgeSvg.append(e.label); }
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

    const refresh = () => { fit(); place(); };
    refresh();
    render();
    if ('ResizeObserver' in window) {
      const ro = new ResizeObserver(refresh);
      ro.observe(scroll);
      ro.observe(graph);
    } else window.addEventListener('resize', refresh);
    document.fonts?.ready.then(refresh);
  }

  document.querySelectorAll('.ax').forEach(root => {
    try { build(root); } catch (err) { console.error('architecture diagram', err); }
  });
})();
