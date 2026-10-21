const grid = document.querySelector('#project-grid');
const menu = document.querySelector('#navigation');
const toggle = document.querySelector('.menu-toggle');
const labels = { work: 'PROFESSIONAL', personal: 'PERSONAL / HACKATHON', study: '42 / LEARNING' };
const escapeHTML = text => String(text).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const tagsHTML = tags => `<div class="tags">${tags.map(tag => `<span>${escapeHTML(tag)}</span>`).join('')}</div>`;
const statusHTML = status => status ? `<p class="project-status">${escapeHTML(status)}</p>` : '';
const iconHTML = project => project.appIcon
  ? `<span class="project-icon project-app-icon"><img src="${escapeHTML(project.appIcon)}" alt="${escapeHTML(project.appIconAlt || `${project.title} 앱 아이콘`)}" width="46" height="46" loading="lazy"></span>`
  : project.logo
    ? `<span class="project-brand"><img src="${escapeHTML(project.logo)}" alt="${escapeHTML(project.logoAlt || project.title)}" width="164" height="39"></span>`
    : project.badge
      ? `<span class="project-icon project-badge" aria-label="${escapeHTML(project.badgeAlt || project.badge)}">${escapeHTML(project.badge)}</span>`
      : `<span class="project-icon" aria-hidden="true">${project.icon}</span>`;

grid.innerHTML = projects.map(project => `<article class="project-card" data-project-id="${project.id}" data-category="${project.category}">
  <div class="card-top">${iconHTML(project)}<span class="category-label">${labels[project.category]}</span></div>
  <h3>${escapeHTML(project.title)}</h3><p class="project-period">${escapeHTML(project.subtitle)}<br>${escapeHTML(project.period)}</p>
  ${statusHTML(project.status)}
  <p class="project-desc">${escapeHTML(project.description)}</p>${tagsHTML(project.tags)}
  <div class="card-bottom"><span>${escapeHTML(project.role)}</span><a class="detail-button" href="${escapeHTML(project.url)}" aria-label="${escapeHTML(project.title)} 자세히 보기">자세히 보기 <span aria-hidden="true">↗</span></a></div>
</article>`).join('');

const cards = [...document.querySelectorAll('.project-card')];
function applyFilter(filter) {
  cards.forEach(card => { card.hidden = filter !== 'all' && card.dataset.category !== filter; });
  document.querySelectorAll('.filter').forEach(button => {
    const active = button.dataset.filter === filter;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  document.querySelector('#project-count').textContent = `${cards.filter(card => !card.hidden).length} PROJECTS`;
}
document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => applyFilter(button.dataset.filter)));
applyFilter('all');

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
