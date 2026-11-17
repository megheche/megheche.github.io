import posts from '../data/blogPosts.json';

export function postCategory(post) {
  return post.category === 'Interview' || post.videos ? 'interview'
    : post.category === 'Talk' || post.videoId ? 'talk'
      : post.category === 'Article' || post.journalHref ? 'article' : 'note';
}

export function blogFilter() {
  const filter = new URLSearchParams(window.location.hash.split('?')[1]).get('filter');
  return ['talk', 'interview', 'article', 'note'].includes(filter) ? filter : 'all';
}

export function updatePostNavigation(article) {
  if (!article) return;
  const filter = blogFilter();
  const suffix = filter === 'all' ? '' : `?filter=${filter}`;
  const labels = { talk: 'talk', interview: 'interview', article: 'article', note: 'note', all: 'post' };
  const sequence = posts.filter(post => filter === 'all' || postCategory(post) === filter);
  const index = sequence.findIndex(post => post.id === article.dataset.post);
  const back = article.querySelector('.back-link');
  back.href = `#home/blog${suffix}`;
  back.textContent = filter === 'all' ? '← All blog posts' : `← All ${labels[filter]}s`;
  // Wrap in either direction so readers can keep exploring the selected section.
  for (const [direction, offset] of [['previous', -1], ['next', 1]]) {
    const neighbor = index >= 0 && sequence.length > 1
      ? sequence[(index + offset + sequence.length) % sequence.length] : undefined;
    const link = article.querySelector(`[data-${direction}-post]`);
    link.hidden = !neighbor;
    if (!neighbor) continue;
    link.href = `#blog/${neighbor.id}${suffix}`;
    link.querySelector('[data-navigation-label]').textContent = direction === 'previous'
      ? `← Previous ${labels[filter]}` : `Next ${labels[filter]} →`;
    link.querySelector('[data-navigation-title]').textContent = neighbor.title;
    const image = link.querySelector('img');
    link.querySelector('.post-thumbnail').hidden = !neighbor.imageSrc;
    if (neighbor.imageSrc) image.src = neighbor.imageSrc;
  }
}
