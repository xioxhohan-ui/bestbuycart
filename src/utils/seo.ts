export function updatePageSEO(title: string, description: string) {
  if (typeof document !== 'undefined') {
    document.title = `${title} | Best Buy Cart`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }
  }
}
