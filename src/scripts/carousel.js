const initialized = new WeakSet();

export function initializeCarousel(root) {
  if (initialized.has(root)) return;

  const viewport = root.querySelector(':scope > [data-carousel-viewport]');
  const controls = root.querySelector(':scope > [data-carousel-controls]');
  if (!viewport || !controls) return;
  const content = [...viewport.children];
  if (content.length < 2) {
    initialized.add(root);
    return;
  }

  const originalNodes = [...viewport.childNodes];
  const events = new AbortController();
  try {
    const previous = controls.querySelector('[data-carousel-previous]');
    const next = controls.querySelector('[data-carousel-next]');
    const counter = controls.querySelector('[data-carousel-counter]');
    const indicators = controls.querySelector('[data-carousel-indicators]');
    const status = root.querySelector(':scope > [data-carousel-status]');
    const dotsMode = root.dataset.carouselMode === 'dots';
    if (!status || (dotsMode ? !indicators : !previous || !next || !counter)) {
      throw new Error('Carousel controls are incomplete');
    }

    const slides = content.map((_, index) => {
      const slide = document.createElement('div');
      slide.className = 'carousel__slide';
      slide.setAttribute('role', 'group');
      slide.setAttribute('aria-roledescription', 'slide');
      slide.setAttribute('aria-label', `${index + 1} of ${content.length}`);
      return slide;
    });
    const dots = dotsMode ? slides.map((_, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.setAttribute('aria-label', `Show slide ${index + 1} of ${slides.length}`);
      return button;
    }) : [];
    let current = -1;
    function selectSlide(index, announce = true) {
      const selected = (index + slides.length) % slides.length;
      if (selected === current) return;
      current = selected;
      slides.forEach((slide, position) => {
        const active = position === current;
        slide.classList.toggle('carousel__slide--active', active);
        slide.inert = !active;
        if (active) {
          slide.removeAttribute('aria-hidden');
          dots[position]?.setAttribute('aria-current', 'true');
        } else {
          slide.setAttribute('aria-hidden', 'true');
          dots[position]?.removeAttribute('aria-current');
        }
      });
      if (counter) counter.textContent = `${current + 1} / ${slides.length}`;
      if (announce) status.textContent = `Slide ${current + 1} of ${slides.length}`;
    }

    const options = { signal: events.signal };
    previous?.addEventListener('click', () => selectSlide(current - 1), options);
    next?.addEventListener('click', () => selectSlide(current + 1), options);
    dots.forEach((dot, index) => dot.addEventListener('click', () => selectSlide(index), options));
    controls.addEventListener('keydown', (event) => {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if (![previous, next, ...dots].includes(event.target)) return;
      const destinations = {
        ArrowLeft: current - 1, ArrowRight: current + 1,
        Home: 0, End: slides.length - 1,
      };
      if (!(event.key in destinations)) return;
      event.preventDefault();
      selectSlide(destinations[event.key]);
    }, options);

    slides.forEach((slide, index) => slide.append(content[index]));
    viewport.replaceChildren(...slides);
    indicators?.replaceChildren(...dots);
    selectSlide(0, false);
    root.setAttribute('role', 'region');
    root.setAttribute('aria-roledescription', 'carousel');
    root.setAttribute('aria-label', root.dataset.carouselLabel);
    root.classList.add('carousel--enhanced');
    controls.hidden = false;
    status.hidden = false;
    initialized.add(root);
  } catch (error) {
    events.abort();
    viewport.replaceChildren(...originalNodes);
    controls.querySelector('[data-carousel-indicators]')?.replaceChildren();
    root.classList.remove('carousel--enhanced');
    root.removeAttribute('role');
    root.removeAttribute('aria-roledescription');
    root.removeAttribute('aria-label');
    controls.hidden = true;
    const status = root.querySelector(':scope > [data-carousel-status]');
    if (status) status.hidden = true;
    console.error('Carousel initialization failed; showing all slides.', error);
  }
}

export function initializeCarousels() {
  document.querySelectorAll('[data-carousel]').forEach(initializeCarousel);
}

initializeCarousels();
