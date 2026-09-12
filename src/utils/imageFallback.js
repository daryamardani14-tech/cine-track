export const FALLBACK_POSTER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='750' viewBox='0 0 500 750'%3E%3Crect width='500' height='750' fill='%23262626'/%3E%3Ctext x='250' y='375' font-family='sans-serif' font-size='24' fill='%23737373' text-anchor='middle' dominant-baseline='middle'%3ENo Image%3C/text%3E%3C/svg%3E";

export function handleImageError(event) {
  if (event.target.src === FALLBACK_POSTER) return;
  event.target.src = FALLBACK_POSTER;
}
