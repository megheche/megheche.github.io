const sections = [...document.querySelectorAll('.page-section')];

const navigationLinks = [...document.querySelectorAll('[data-section]')];
const sectionIds = sections.map((section) => section.id);
const menuToggle = document.querySelector('#menuToggle');
const mobileNavPanel = document.querySelector('#mobileNavPanel');
const sidebarScrim = document.querySelector('#sidebarScrim');
let currentIndex = 0;
let activatedOnce = false;
const contentShell = document.querySelector('.content-shell');
let wheelDistance = 0;
let wheelDirection = 0;
let wheelBoundaryDirection = 0;
let wheelResetTimer;
let armedWheelBoundary = null;
let armedTouchBoundary = null;
let scrollNavigationLocked = false;
let scrollNavigationLockTimer;
let touchStart = null;
const wheelPageSwitchThreshold = 500;
const wheelGestureResetDelay = 20;
const touchPageSwitchThreshold = 200;

function closeMenu() {
  mobileNavPanel?.classList.remove('is-open');
  menuToggle?.classList.remove('is-open');
  sidebarScrim?.classList.remove('is-visible');
  menuToggle?.setAttribute('aria-expanded', 'false');
  menuToggle?.setAttribute('aria-label', 'Open navigation');
  if (mobileNavPanel) mobileNavPanel.inert = true;
  if (contentShell) contentShell.inert = false;
}

function openMenu() {
  mobileNavPanel?.classList.add('is-open');
  menuToggle?.classList.add('is-open');
  sidebarScrim?.classList.add('is-visible');
  menuToggle?.setAttribute('aria-expanded', 'true');
  menuToggle?.setAttribute('aria-label', 'Close navigation');
  if (mobileNavPanel) mobileNavPanel.inert = false;
  if (contentShell) contentShell.inert = true;
  mobileNavPanel?.querySelector('a')?.focus();
}

function activateSection(id, updateHash = true, postId) {
  const blogIndex = document.querySelector('[data-blog-index]');
  const posts = [...document.querySelectorAll('[data-post]')];
  const selectedPost = id === 'blog' ? posts.find(post => post.dataset.post === postId) : undefined;
  if (id === 'blog' && !selectedPost) { id = 'home'; postId = 'blog'; }
  posts.forEach(post => { post.hidden = post !== selectedPost; });
  const nextIndex = sectionIds.indexOf(id);
  if (nextIndex === -1) return;
  const sectionChanged = nextIndex !== currentIndex;
  if (sectionChanged) {
    resetWheelGesture();
    armedWheelBoundary = null;
    armedTouchBoundary = null;
    touchStart = null;
  }
  currentIndex = nextIndex;
  sections.forEach((section, index) => {
    const isActive = index === currentIndex;
    section.classList.toggle('is-active', isActive);
    section.inert = !isActive;
    for (const frame of section.querySelectorAll('iframe[src]')) {
      const post = frame.closest('[data-post]');
      if (!isActive || post?.hidden) {
        // Remove the browsing context so video playback and iframe history stop together.
        const placeholder = frame.cloneNode(false);
        placeholder.dataset.src = frame.src;
        placeholder.removeAttribute('src');
        frame.replaceWith(placeholder);
      }
    }
    if (isActive) {
      for (const template of section.querySelectorAll('template[data-deferred-image]')) {
        template.replaceWith(template.content.cloneNode(true));
      }
      for (const frame of section.querySelectorAll('iframe[data-src]')) {
        if (frame.closest('[data-post]')?.hidden) continue;
        // Set the initial URL before insertion to avoid adding iframe history entries.
        const player = frame.cloneNode(false);
        player.src = frame.dataset.src;
        player.removeAttribute('data-src');
        frame.replaceWith(player);
      }
      section.scrollTop = 0;
      section.scrollLeft = 0;
      if (id === 'home' && postId === 'blog' && blogIndex) {
        section.scrollTop = blogIndex.getBoundingClientRect().top - section.getBoundingClientRect().top + section.scrollTop - 24;
      }
      // The top edge is already reached when a section opens.
      armedWheelBoundary = { sectionId: section.id, direction: -1 };
      armedTouchBoundary = { sectionId: section.id, direction: -1 };
    }
    section.setAttribute('aria-hidden', String(!isActive));
  });

  const navigationId = id === 'blog' ? 'home' : id;
  navigationLinks.forEach((link) => {
    link.classList.toggle('is-active', link.dataset.section === navigationId);
    if (link.classList.contains('rail-link') || link.classList.contains('mobile-nav-link')) {
      if (link.dataset.section === navigationId) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    }
  });

  if (updateHash && window.location.hash !== `#${id}`) {
    if (sectionChanged) window.location.hash = id;
    else history.replaceState(null, '', `#${id}`);
  }
  closeMenu();
  window.scrollTo(0, 0);
  if (contentShell) contentShell.scrollLeft = 0;
  const sectionName = document.querySelector(`.rail-link[data-section="${id}"] span`)?.textContent || 'Home';
  const title = selectedPost?.querySelector('h3')?.textContent || sectionName;
  document.title = `${title} · Mireille El Gheche`;
  if (activatedOnce) sections[currentIndex]?.focus({ preventScroll: true });
  activatedOnce = true;
}

function moveSection(direction) {
  const section = sections[currentIndex];
  if (!section || section.id === 'blog') return;
  const destinations = sectionIds.filter(id => id !== 'blog');
  const index = destinations.indexOf(section.id);
  if (direction < 0 && index === 0) return;
  activateSection(destinations[(index + direction + destinations.length) % destinations.length]);
}

function canScrollWithinSection(section, target, direction) {
  let element = target;
  while (element instanceof Element) {
    const styles = window.getComputedStyle(element);
    const hasScrollableOverflow = /(auto|scroll|overlay)/.test(styles.overflowY);
    const maxScrollTop = element.scrollHeight - element.clientHeight;

    if ((element === section || hasScrollableOverflow) && maxScrollTop > 1) {
      if (direction > 0 && element.scrollTop < maxScrollTop - 1) return true;
      if (direction < 0 && element.scrollTop > 1) return true;
    }

    if (element === section) break;
    element = element.parentElement;
  }
  return false;
}

function sectionHasVerticalScroll(section) {
  return section.scrollHeight > section.clientHeight + 1;
}

function lockScrollNavigation() {
  scrollNavigationLocked = true;
  window.clearTimeout(scrollNavigationLockTimer);
  scrollNavigationLockTimer = window.setTimeout(() => {
    scrollNavigationLocked = false;
  }, 700);
}

function resetWheelGesture() {
  wheelDistance = 0;
  wheelDirection = 0;
  wheelBoundaryDirection = 0;
  window.clearTimeout(wheelResetTimer);
}

function finishWheelGesture() {
  const sectionId = sections[currentIndex]?.id;
  if (wheelBoundaryDirection && sectionId) {
    armedWheelBoundary = { sectionId, direction: wheelBoundaryDirection };
  }
  resetWheelGesture();
}

function scheduleWheelGestureEnd() {
  window.clearTimeout(wheelResetTimer);
  wheelResetTimer = window.setTimeout(finishWheelGesture, wheelGestureResetDelay);
}

function sectionIsAtEdge(section, direction) {
  const maxScrollTop = section.scrollHeight - section.clientHeight;
  return direction > 0
    ? maxScrollTop > 1 && section.scrollTop >= maxScrollTop - 1
    : section.scrollTop <= 1;
}

function recordSectionEdge(section) {
  if (section !== sections[currentIndex]) return;

  if (armedWheelBoundary?.sectionId === section.id && !sectionIsAtEdge(section, armedWheelBoundary.direction)) {
    armedWheelBoundary = null;
  }
  if (armedTouchBoundary?.sectionId === section.id && !sectionIsAtEdge(section, armedTouchBoundary.direction)) {
    armedTouchBoundary = null;
  }

  if (wheelDirection && sectionIsAtEdge(section, wheelDirection)) {
    wheelBoundaryDirection = wheelDirection;
  }

  if (touchStart?.index === currentIndex && touchStart.direction && sectionIsAtEdge(section, touchStart.direction)) {
    touchStart.hitEdge = true;
  }
}

function handleWheelNavigation(event) {
  const section = sections[currentIndex];
  const target = event.target instanceof Element ? event.target : null;
  if (
    sections.length < 2 ||
    !section ||
    !target ||
    !section.contains(target) ||
    mobileNavPanel?.classList.contains('is-open') ||
    event.ctrlKey ||
    Math.abs(event.deltaY) <= Math.abs(event.deltaX)
  ) return;

  const multiplier = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1;
  const delta = event.deltaY * multiplier;
  const direction = delta > 0 ? 1 : -1;

  if (canScrollWithinSection(section, target, direction)) {
    wheelDistance = 0;
    wheelDirection = direction;
    wheelBoundaryDirection = 0;
    armedWheelBoundary = null;
    armedTouchBoundary = null;
    scheduleWheelGestureEnd();
    return;
  }

  event.preventDefault();
  if (!sectionHasVerticalScroll(section)) {
    if (direction !== wheelDirection) wheelDistance = 0;
    wheelDirection = direction;
    wheelBoundaryDirection = 0;
    armedWheelBoundary = null;
    armedTouchBoundary = null;
    scheduleWheelGestureEnd();
    if (scrollNavigationLocked) return;

    wheelDistance += Math.abs(delta);
    if (wheelDistance >= wheelPageSwitchThreshold) {
      resetWheelGesture();
      lockScrollNavigation();
      moveSection(direction);
    }
    return;
  }

  if (direction !== wheelDirection) wheelDistance = 0;
  wheelDirection = direction;
  wheelBoundaryDirection = direction;
  scheduleWheelGestureEnd();
  if (scrollNavigationLocked) return;

  const isArmed = armedWheelBoundary?.sectionId === section.id && armedWheelBoundary.direction === direction;
  if (!isArmed) return;

  wheelDistance += Math.abs(delta);

  if (wheelDistance >= wheelPageSwitchThreshold) {
    armedWheelBoundary = null;
    resetWheelGesture();
    lockScrollNavigation();
    moveSection(direction);
  }
}

function handleTouchStart(event) {
  const section = sections[currentIndex];
  const target = event.target instanceof Element ? event.target : null;
  if (
    sections.length < 2 ||
    event.touches.length !== 1 ||
    !section ||
    !target ||
    !section.contains(target) ||
    mobileNavPanel?.classList.contains('is-open')
  ) {
    touchStart = null;
    return;
  }

  const touch = event.touches[0];
  touchStart = { x: touch.clientX, y: touch.clientY, target, index: currentIndex, direction: 0, hitEdge: false };
}

function handleTouchMove(event) {
  if (!touchStart || event.touches.length !== 1 || touchStart.index !== currentIndex) return;

  const section = sections[currentIndex];
  const touch = event.touches[0];
  const deltaX = touch.clientX - touchStart.x;
  const deltaY = touch.clientY - touchStart.y;
  if (Math.abs(deltaY) <= Math.abs(deltaX) || deltaY === 0) return;

  const direction = deltaY < 0 ? 1 : -1;
  touchStart.direction = direction;
  if (canScrollWithinSection(section, touchStart.target, direction)) {
    touchStart.hitEdge = false;
    armedWheelBoundary = null;
    armedTouchBoundary = null;
    return;
  }

  event.preventDefault();
  touchStart.hitEdge = true;
  if (scrollNavigationLocked) return;
  if (Math.abs(deltaY) < touchPageSwitchThreshold) return;

  if (!sectionHasVerticalScroll(section)) {
    armedWheelBoundary = null;
    armedTouchBoundary = null;
    touchStart = null;
    lockScrollNavigation();
    moveSection(direction);
    return;
  }

  const isArmed = armedTouchBoundary?.sectionId === section.id && armedTouchBoundary.direction === direction;
  if (!isArmed) return;

  armedTouchBoundary = null;
  touchStart = null;
  lockScrollNavigation();
  moveSection(direction);
}

function finishTouchGesture(cancelled = false) {
  if (!touchStart) return;
  const section = sections[touchStart.index];
  if (
    !cancelled &&
    section &&
    touchStart.direction &&
    (touchStart.hitEdge || !canScrollWithinSection(section, touchStart.target, touchStart.direction))
  ) {
    armedTouchBoundary = { sectionId: section.id, direction: touchStart.direction };
  }
  touchStart = null;
}

sections.forEach((section) => {
  section.addEventListener('scroll', () => recordSectionEdge(section), { passive: true });
});
window.addEventListener('wheel', handleWheelNavigation, { passive: false });
window.addEventListener('touchstart', handleTouchStart, { passive: true });
window.addEventListener('touchmove', handleTouchMove, { passive: false });
window.addEventListener('touchend', () => finishTouchGesture(), { passive: true });
window.addEventListener('touchcancel', () => finishTouchGesture(true), { passive: true });

navigationLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const id = link.dataset.section;
    if (!id) return;
    event.preventDefault();
    activateSection(id);
  });
});

function activateSectionFromLocation() {
  const [page, postId] = window.location.hash.slice(1).split('/');
  const aliases = { publications: 'research', teaching: 'courses', projects: 'blog', talks: 'blog' };
  const id = aliases[page] || page;
  const sectionId = sectionIds.includes(id) ? id : 'home';
  activateSection(sectionId, false, postId);
}

window.addEventListener('hashchange', activateSectionFromLocation);
window.addEventListener('popstate', activateSectionFromLocation);

if (menuToggle && mobileNavPanel) {
  menuToggle.addEventListener('click', () => {
    if (mobileNavPanel.classList.contains('is-open')) closeMenu();
    else openMenu();
  });
}
sidebarScrim?.addEventListener('click', closeMenu);

sections.forEach(section => {
  section.tabIndex = -1;
  const heading = section.querySelector('h1, h2');
  if (heading) {
    heading.id = `${section.id}-title`;
    section.setAttribute('aria-labelledby', heading.id);
  }
});
if (mobileNavPanel) mobileNavPanel.inert = true;
document.querySelector('.skip-link')?.addEventListener('click', event => {
  event.preventDefault();
  sections[currentIndex]?.focus({ preventScroll: true });
});
window.addEventListener('keydown', event => {
  if (!mobileNavPanel?.classList.contains('is-open')) return;
  if (event.key === 'Escape') {
    closeMenu();
    menuToggle?.focus();
  }
  if (event.key === 'Tab') {
    const targets = [...mobileNavPanel.querySelectorAll('a, button'), menuToggle].filter(Boolean);
    const index = targets.indexOf(document.activeElement);
    event.preventDefault();
    targets[(index + (event.shiftKey ? -1 : 1) + targets.length) % targets.length].focus();
  }
});
window.matchMedia('(min-width: 1025px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
if (sectionIds.length) activateSectionFromLocation();
