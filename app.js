const grid = document.querySelector('#project-grid');
const dialog = document.querySelector('#project-dialog');
const content = document.querySelector('#dialog-content');
const menu = document.querySelector('#navigation');
const toggle = document.querySelector('.menu-toggle');
const labels = { work: 'PROFESSIONAL', personal: 'PERSONAL / HACKATHON', study: '42 / LEARNING' };
const escapeHTML = text => String(text).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const tagsHTML = tags => `<div class="tags">${tags.map(tag => `<span>${escapeHTML(tag)}</span>`).join('')}</div>`;
const statusHTML = status => status ? `<p class="project-status">${escapeHTML(status)}</p>` : '';
const galleryHTML = gallery => gallery ? `<section class="project-gallery" aria-label="UX/UI 협업 화면">
  <h3>${escapeHTML(gallery.title)}</h3><p>${escapeHTML(gallery.description)}</p>
  <div class="gallery-grid">${gallery.images.map(item => `<figure><a href="${escapeHTML(item.src)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHTML(item.caption)} 원본 크게 보기"><img src="${escapeHTML(item.src)}" alt="${escapeHTML(item.alt)}" width="750" height="1624" loading="lazy"></a><figcaption>${escapeHTML(item.caption)}</figcaption></figure>`).join('')}</div>
  <p class="gallery-credit">${escapeHTML(gallery.credit)} <a href="${escapeHTML(gallery.source)}" target="_blank" rel="noopener noreferrer">Figma 협업 원본 ↗</a></p>
</section>` : '';
let lastProjectButton;

grid.innerHTML = projects.map(project => `<article class="project-card" data-project-id="${project.id}" data-category="${project.category}">
  <div class="card-top"><span class="project-icon" aria-hidden="true">${project.icon}</span><span class="category-label">${labels[project.category]}</span></div>
  <h3>${escapeHTML(project.title)}</h3><p class="project-period">${escapeHTML(project.subtitle)}<br>${escapeHTML(project.period)}</p>
  ${statusHTML(project.status)}
  <p class="project-desc">${escapeHTML(project.description)}</p>${tagsHTML(project.tags)}
  <div class="card-bottom"><span>${escapeHTML(project.role)}</span><button class="detail-button" data-project="${project.id}" aria-label="${escapeHTML(project.title)} 자세히 보기">${project.gallery ? '화면·개발 이야기' : '자세히 보기'} <span aria-hidden="true">↗</span></button></div>
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

grid.addEventListener('click', event => {
  const button = event.target.closest('[data-project]');
  if (!button) return;
  const project = projects.find(item => item.id === button.dataset.project);
  lastProjectButton = button;
  const blocks = project.sections;
  content.innerHTML = `<span class="project-icon" aria-hidden="true">${project.icon}</span><h2 id="dialog-title">${escapeHTML(project.title)}</h2>
    <p class="dialog-meta">${escapeHTML(project.subtitle)}<br>${escapeHTML(project.period)} · ${escapeHTML(project.role)}</p>${statusHTML(project.status)}${tagsHTML(project.tags)}
    ${galleryHTML(project.gallery)}
    ${blocks.map(({title, body}) => `<section class="case-block"><h3>${escapeHTML(title)}</h3><p>${escapeHTML(body)}</p></section>`).join('')}
    ${project.note ? `<p class="evidence-note">${escapeHTML(project.note)}</p>` : ''}
    <div class="project-links">${project.links.map(link => `<a href="${escapeHTML(link.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(link.label)} ↗</a>`).join('')}</div>
    ${project.links.some(link => link.private) ? '<p class="private-note">Private 저장소는 소유자가 부여한 열람 권한이 필요합니다.</p>' : ''}`;
  dialog.showModal();
  dialog.scrollTop = 0;
  document.body.classList.add('modal-open');
  document.querySelector('#close-dialog').focus();
});
document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const rect = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
  lastProjectButton?.focus({ preventScroll: true });
});
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
