// Shared by static rendering and browser sorting so their orders agree.
export function comparePublications(a, b, sort = 'year-desc') {
  const [field, direction] = sort.split('-');
  if (field === 'year') {
    const missingA = a.year == null || a.year === '';
    const missingB = b.year == null || b.year === '';
    if (missingA !== missingB) return missingA ? 1 : -1;
  }
  const difference = Number(a[field] ?? 0) - Number(b[field] ?? 0);
  if (difference) return direction === 'asc' ? difference : -difference;
  return a.title.localeCompare(b.title, 'en', { sensitivity: 'base' });
}
