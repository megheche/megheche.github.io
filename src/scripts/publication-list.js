import List from 'list.js';
import { comparePublications } from './publication-sort.js';

const initialized = new WeakSet();

export function initializePublicationList(root) {
  if (initialized.has(root)) return;
  const container = root.querySelector(':scope > .publication-list');
  if (!container || !container.children.length) return;
  const originalNodes = [...container.childNodes];
  const events = new AbortController();
  const controls = root.querySelector('[data-publication-controls]');
  const results = root.querySelector('[data-publication-results]');
  const empty = root.querySelector('[data-publication-no-results]');
  const pagination = root.querySelector('[data-publication-pagination]');
  try {
    const search = controls.querySelector('[data-publication-search]');
    const sort = controls.querySelector('[data-publication-sort]');
    const previous = pagination.querySelector('[data-publication-previous]');
    const next = pagination.querySelector('[data-publication-next]');
    const counter = pagination.querySelector('[data-publication-page]');
    if (!search || !sort || !previous || !next || !counter || !results || !empty) throw new Error('Publication controls are incomplete');
    const pageSize = Number(root.dataset.pageSize);
    const list = new List(root, {
      listClass: 'publication-list', page: pageSize,
      valueNames: [{ data: ['title', 'authors', 'venue', 'year', 'citations'] }],
    });
    let page = 1;

    function render() {
      const count = list.matchingItems.length;
      const totalPages = Math.ceil(count / pageSize);
      page = Math.max(1, Math.min(page, totalPages || 1));
      list.show((page - 1) * pageSize + 1, pageSize);
      empty.hidden = count > 0;
      pagination.hidden = totalPages <= 1;
      previous.setAttribute('aria-disabled', String(page === 1));
      next.setAttribute('aria-disabled', String(page >= totalPages));
      counter.textContent = `Page ${page} of ${totalPages || 1}`;
      const summary = `${count} ${count === 1 ? 'publication' : 'publications'}`;
      results.textContent = count ? `${summary} · Page ${page} of ${totalPages}` : summary;
    }

    function applySort() {
      // The comparator applies direction itself and always keeps missing years last.
      list.sort('title', { order: 'asc', sortFunction: (a, b) => comparePublications(a.values(), b.values(), sort.value) });
    }
    const options = { signal: events.signal };
    search.addEventListener('input', () => {
      list.search(search.value, ['title', 'authors', 'venue', 'year']);
      page = 1;
      render();
    }, options);
    sort.addEventListener('change', () => {
      applySort();
      page = 1;
      render();
    }, options);
    previous.addEventListener('click', () => {
      if (previous.getAttribute('aria-disabled') === 'true') return;
      page -= 1;
      render();
    }, options);
    next.addEventListener('click', () => {
      if (next.getAttribute('aria-disabled') === 'true') return;
      page += 1;
      render();
    }, options);

    applySort();
    render();
    controls.hidden = false;
    results.hidden = false;
    initialized.add(root);
  } catch (error) {
    events.abort();
    container.replaceChildren(...originalNodes);
    [controls, results, empty, pagination].forEach((element) => { if (element) element.hidden = true; });
    console.error('Publication list initialization failed; showing all publications.', error);
  }
}

export function initializePublicationLists() {
  document.querySelectorAll('[data-publication-list]').forEach(initializePublicationList);
}

initializePublicationLists();
