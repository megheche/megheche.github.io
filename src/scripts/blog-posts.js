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
  // Loop to the first entry so readers can keep exploring at the end of a section.
  const next = index >= 0 && sequence.length > 1 ? sequence[(index + 1) % sequence.length] : undefined;
  const link = article.querySelector('[data-next-post]');
  link.hidden = !next;
  const back = article.querySelector('.back-link');
  back.href = `#home/blog${suffix}`;
  back.textContent = filter === 'all' ? '← All blog posts' : `← All ${labels[filter]}s`;
  if (!next) return;
  link.href = `#blog/${next.id}${suffix}`;
  link.querySelector('[data-next-label]').textContent = `Next ${labels[filter]} →`;
  link.querySelector('[data-next-title]').textContent = next.title;
  const image = link.querySelector('img');
  image.hidden = !next.imageSrc;
  if (next.imageSrc) image.src = next.imageSrc;
}
