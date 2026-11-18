// The page content and anchor navigation also work without JavaScript.
(() => {
  const links = [...document.querySelectorAll('.case-contents a')];
  const sections = links.map(link => document.querySelector(link.hash));
  let ticking = false;

  function updateContents() {
    const threshold = window.matchMedia('(max-width: 760px)').matches ? 112 : 100;
    const atBottom = window.scrollY > 0 &&
      window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4;
    const current = atBottom
      ? sections.at(-1)
      : sections.filter(section => section.getBoundingClientRect().top <= threshold).at(-1) || sections[0];
    links.forEach(link => {
      if (link.hash === `#${current.id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    ticking = false;
  }

  function scheduleUpdate() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateContents);
  }
  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate);
  window.addEventListener('pageshow', scheduleUpdate);
  updateContents();
})();
