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

export function toggleMovie(key, movie) {
  const movies = getMovies(key);

  const movieExists = movies.some(item => item.id === movie.id);

  if (movieExists) {
    const updatedMovies = movies.filter(item => item.id !== movie.id);

    saveMovies(key, updatedMovies);

    return false;
  }

  if (key === STORAGE_KEYS.wishlists) {
    const watchedMovies = getMovies(STORAGE_KEYS.watched);

    const updatedWatchedMovies = watchedMovies.filter(
      item => item.id !== movie.id,
    );

    saveMovies(STORAGE_KEYS.watched, updatedWatchedMovies);
  }

  if (key === STORAGE_KEYS.watched) {
    const wishlistMovies = getMovies(STORAGE_KEYS.wishlists);

    const updatedWishlistMovies = wishlistMovies.filter(
      item => item.id !== movie.id,
    );

    saveMovies(STORAGE_KEYS.wishlists, updatedWishlistMovies);
  }

  saveMovies(key, [...movies, movie]);

  return true;
}

export { STORAGE_KEYS };
