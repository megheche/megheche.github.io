document.querySelectorAll('[data-portfolio]').forEach((root) => {
  if (root.dataset.initialized) return;
  const toolbar = root.querySelector('.portfolio-toolbar');
  if (!toolbar) return;
  const buttons = [...toolbar.querySelectorAll('[data-filter]')];
  const cards = [...root.querySelectorAll('.portfolio-card')];
  function applyFilter(button) {
    const filter = button.dataset.filter;
    buttons.forEach((item) => {
      item.classList.toggle('is-active', item === button);
      item.setAttribute('aria-pressed', String(item === button));
    });
    cards.forEach((card) => {
      card.hidden = filter !== 'all' && card.dataset.category !== filter;
    });
  }
  buttons.forEach((button) => button.addEventListener('click', () => applyFilter(button)));
  if (buttons.length) applyFilter(buttons.find((button) => button.dataset.filter === 'all') ?? buttons[0]);
  toolbar.hidden = false;
  root.dataset.initialized = 'true';
});
