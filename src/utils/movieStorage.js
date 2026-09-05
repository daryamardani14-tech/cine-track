const STORAGE_KEYS = {
  favorites: "cinetrack-favorites",
  wishlists: "cinetrack-wishlists",
  watched: "cinetrack-watched",
};

export function getMovies(key) {
  const movies = localStorage.getItem(key);

  return movies ? JSON.parse(movies) : [];
}

export function saveMovies(key, movies) {
  localStorage.setItem(key, JSON.stringify(movies));
}
export { STORAGE_KEYS };
