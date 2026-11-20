const groupsEl = document.querySelector('#project-groups');
const menu = document.querySelector('#navigation');
const toggle = document.querySelector('.menu-toggle');
const labels = { work: 'PROFESSIONAL', ai: 'AI AGENTS', personal: 'PERSONAL', study: '42 / LEARNING' };
// Cards are shown in these groups, in this order; each project's "category" in projects.js picks its group.
const groups = [
  { id: 'work', title: '경력 · AICU', note: '회사에서 만들고 운영하는 헬스케어 서비스' },
  { id: 'ai', title: 'AI 에이전트 · 해커톤', note: 'LLM 에이전트를 실제 서비스 위에서 동작하게 만든 프로젝트' },
  { id: 'personal', title: '개인 도구', note: '직접 쓰려고 만든 웹과 데스크톱 도구' },
  { id: 'study', title: '42 · 학습', note: 'C · C++로 시스템 기본기를 다진 과제' }
];
const escapeHTML = text => String(text).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const tagsHTML = tags => `<div class="tags">${tags.map(tag => `<span>${escapeHTML(tag)}</span>`).join('')}</div>`;
const statusHTML = status => status ? `<p class="project-status">${escapeHTML(status)}</p>` : '';
const awardHTML = award => award ? `<p class="project-award">${escapeHTML(award)}</p>` : '';
const iconHTML = project => project.appIcon
  ? `<span class="project-icon project-app-icon"><img src="${escapeHTML(project.appIcon)}" alt="${escapeHTML(project.appIconAlt || `${project.title} 앱 아이콘`)}" width="46" height="46" loading="lazy"></span>`
  : project.logo
    ? `<span class="project-brand"><img src="${escapeHTML(project.logo)}" alt="${escapeHTML(project.logoAlt || project.title)}" width="164" height="39"></span>`
    : project.badge
      ? `<span class="project-icon project-badge" aria-label="${escapeHTML(project.badgeAlt || project.badge)}">${escapeHTML(project.badge)}</span>`
      : `<span class="project-icon" aria-hidden="true">${project.icon}</span>`;

const thumbHTML = project => project.thumbnail
  ? `<a class="project-thumb" href="${escapeHTML(project.url)}" tabindex="-1" aria-hidden="true"><img src="${escapeHTML(project.thumbnail)}" alt="${escapeHTML(project.thumbnailAlt || '')}" loading="lazy" decoding="async"></a>`
  : '';

// id lets a detail page's "프로젝트 목록" link (../../#<id>) land back on its card.
const cardHTML = project => `<article class="project-card${project.thumbnail ? ' has-thumb' : ''}" id="${project.id}" data-project-id="${project.id}" data-category="${project.category}">
  ${thumbHTML(project)}
  <div class="card-top">${iconHTML(project)}<span class="category-label">${labels[project.category]}</span></div>
  <h3>${escapeHTML(project.title)}</h3><p class="project-sub">${escapeHTML(project.subtitle)}</p><p class="project-period">${escapeHTML(project.period)}</p>
  ${awardHTML(project.award)}${statusHTML(project.status)}
  <p class="project-desc">${escapeHTML(project.description)}</p>${tagsHTML(project.tags)}
  <div class="card-bottom"><span>${escapeHTML(project.role)}</span><a class="detail-button" href="${escapeHTML(project.url)}" aria-label="${escapeHTML(project.title)} 자세히 보기">자세히 보기 <span aria-hidden="true">↗</span></a></div>
</article>`;

const grouped = groups.map(group => ({ ...group, items: projects.filter(project => project.category === group.id) }));
groupsEl.innerHTML = grouped.map(group => `<section class="project-group" id="group-${group.id}" aria-labelledby="group-${group.id}-title">
  <header class="project-group-head"><h3 id="group-${group.id}-title">${escapeHTML(group.title)} <span>${group.items.length}</span></h3><p>${escapeHTML(group.note)}</p></header>
  <div class="project-grid">${group.items.map(cardHTML).join('')}</div>
</section>`).join('');
document.querySelector('.group-jump').innerHTML = grouped.map(group => `<a href="#group-${group.id}">${escapeHTML(group.title)} <span>${group.items.length}</span></a>`).join('');
// The cards only exist once this script runs, so finish a #<project-id> jump the browser could not make.
if (location.hash) document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView();

function closeMenu() { menu.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
toggle.addEventListener('click', () => { const open = menu.classList.toggle('open'); toggle.setAttribute('aria-expanded', String(open)); });
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu.classList.contains('open')) { closeMenu(); toggle.focus(); } });
document.addEventListener('click', event => { if (!event.target.closest('.sidebar')) closeMenu(); });
const navLinks = [...menu.querySelectorAll('a')];
const sections = [...document.querySelectorAll('main > section')];
let ticking = false;
function updateNavigation() {
  const target = sections.filter(section => section.getBoundingClientRect().top <= window.innerHeight * .35).at(-1) || sections[0];
  navLinks.forEach(link => {
    const active = link.hash === `#${target.id}`;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
  });
  ticking = false;
}
window.addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(updateNavigation); ticking = true; } }, { passive: true });
window.addEventListener('resize', updateNavigation);
updateNavigation();
document.querySelector('#print-resume').addEventListener('click', () => window.print());

if (!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
  // (selector, variant, stagger-ms) — stagger is applied to the Nth matching element inside its group.
  const groups = [
    ['.hero-copy > *', '', 100],
    ['.hero-portrait', 'reveal-left', 200],
    ['.hero-footer > *', '', 80],
    ['.section-heading > div > *', 'reveal-down', 80],
    ['.section-heading .section-note', '', 160],
    ['.experience-row', 'reveal-scale', 0],
    ['.personal-story .story-copy > *', '', 80],
    ['.personal-story .story-photos figure', 'reveal-left', 140],
    ['.project-toolbar > *', '', 80],
    ['.project-group-head', '', 0],
    ['.project-card', 'reveal-scale', 90],
    ['.project-footnote', '', 0],
    ['.skills-grid article', 'reveal-scale', 110],
    ['.education-list article', '', 90],
    ['.learning li', '', 70],
    ['.contact-section > *', '', 120]
  ];

  const tagged = new Set();
  groups.forEach(([selector, variant, stagger]) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el, i) => {
      if (tagged.has(el)) return;
      tagged.add(el);
      el.classList.add('reveal');
      if (variant) el.classList.add(variant);
      // Half the listed stagger, and long lists stop adding delay after a few items so nothing waits.
      if (stagger) el.style.setProperty('--reveal-delay', `${Math.min(i, 5) * stagger / 2}ms`);
    });
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.classList.add('revealed');
      observer.unobserve(el);
      // After the transition finishes, drop .reveal so other transitions (e.g. card hover) take over cleanly.
      setTimeout(() => {
        el.classList.remove('reveal', 'reveal-down', 'reveal-left', 'reveal-right', 'reveal-scale');
        el.style.removeProperty('--reveal-delay');
      }, 1100);
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -2% 0px' });

  tagged.forEach(el => observer.observe(el));
}
