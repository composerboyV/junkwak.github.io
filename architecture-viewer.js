// Move the live diagram into a modal so its interactions and current state stay intact.
(() => {
  if (typeof HTMLDialogElement === 'undefined') return;

  document.querySelectorAll('.ax, .m-arch').forEach((diagram, index) => {
    const head = diagram.querySelector('.ax-head, .m-arch-head');
    if (!head) return;
    const name = diagram.querySelector('.ax-title, .m-arch-title')?.textContent || '시스템 구성도';
    const open = document.createElement('button');
    open.type = 'button';
    open.className = 'architecture-expand';
    open.textContent = '넓게 보기 ↗';
    open.setAttribute('aria-haspopup', 'dialog');
    open.setAttribute('aria-label', `${name} 넓게 보기`);
    head.append(open);

    const dialog = document.createElement('dialog');
    dialog.className = 'architecture-viewer';
    dialog.id = `architecture-viewer-${index}`;
    open.setAttribute('aria-controls', dialog.id);
    const toolbar = document.createElement('div');
    toolbar.className = 'architecture-viewer-toolbar';
    const title = document.createElement('strong');
    title.id = `${dialog.id}-title`;
    title.textContent = name;
    dialog.setAttribute('aria-labelledby', title.id);
    const close = document.createElement('button');
    close.type = 'button';
    close.className = 'architecture-close';
    close.textContent = '닫기 ×';
    close.setAttribute('aria-label', '넓게 보기 닫기');
    close.autofocus = true;
    toolbar.append(title, close);
    const content = document.createElement('div');
    content.className = 'architecture-viewer-content';
    dialog.append(toolbar, content);
    // Keep the dialog under the same parent to preserve page-specific CSS variables.
    diagram.after(dialog);

    let placeholder = null;
    let position = null;
    let diagramScroll = null;
    const redraw = () => requestAnimationFrame(() => window.dispatchEvent(new Event('resize')));

    function restore() {
      if (!placeholder) return;
      placeholder.replaceWith(diagram);
      placeholder = null;
      document.documentElement.classList.remove('architecture-viewer-open');
      if (diagramScroll) {
        const scroll = diagram.querySelector('.ax-scroll, .m-arch-scroll');
        scroll.scrollLeft = diagramScroll.left;
        scroll.scrollTop = diagramScroll.top;
      }
      window.scrollTo({ left: position.x, top: position.y, behavior: 'instant' });
      open.focus({ preventScroll: true });
      redraw();
    }

    function dismiss() {
      if (!dialog.open) return;
      dialog.close();
      restore();
    }

    open.addEventListener('click', () => {
      if (dialog.open) return;
      position = { x: window.scrollX, y: window.scrollY };
      const scroll = diagram.querySelector('.ax-scroll, .m-arch-scroll');
      diagramScroll = scroll ? { left: scroll.scrollLeft, top: scroll.scrollTop } : null;
      const style = getComputedStyle(diagram);
      placeholder = document.createElement('div');
      placeholder.className = 'architecture-placeholder';
      placeholder.style.height = `${diagram.getBoundingClientRect().height}px`;
      placeholder.style.marginTop = style.marginTop;
      placeholder.style.marginBottom = style.marginBottom;
      placeholder.setAttribute('aria-hidden', 'true');
      diagram.before(placeholder);
      content.append(diagram);
      document.documentElement.classList.add('architecture-viewer-open');
      dialog.showModal();
      content.scrollTop = 0;
      close.focus({ preventScroll: true });
      redraw();
    });
    close.addEventListener('click', dismiss);
    dialog.addEventListener('cancel', event => {
      event.preventDefault();
      dismiss();
    });
    dialog.addEventListener('close', restore);
    dialog.addEventListener('keydown', event => {
      // Escape closes this view without resetting a pinned node or running example.
      if (event.key === 'Escape') event.stopPropagation();
    }, true);
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right ||
          event.clientY < rect.top || event.clientY > rect.bottom) dismiss();
    });
    window.addEventListener('beforeprint', dismiss);
  });
})();
