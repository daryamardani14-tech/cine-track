import { toast } from "react-hot-toast";

const STORAGE_KEYS = {
  favorites: "cinetrack-favorites",
  wishlists: "cinetrack-wishlists",
  watched: "cinetrack-watched",
};

export function getMovies(key) {
  try {
    const movies = localStorage.getItem(key);

    return movies ? JSON.parse(movies) : [];
  } catch (error) {
    console.error(`Failed to read "${key}" from storage:`, error);
    return [];
  }
}

export function saveMovies(key, movies) {
  try {
    localStorage.setItem(key, JSON.stringify(movies));
    return true;
  } catch (error) {
    console.error(`Failed to save "${key}" to storage:`, error);
    toast.error(
      "Couldn't save your changes. Your browser storage may be full or restricted.",
    );
    return false;
  }
}

export function toggleMovie(key, movie) {
  const movies = getMovies(key);

  const movieExists = movies.some(item => item.id === movie.id);

  if (movieExists) {
    const updatedMovies = movies.filter(item => item.id !== movie.id);

    const success = saveMovies(key, updatedMovies);

    return success ? false : true;
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

  const success = saveMovies(key, [...movies, movie]);

  return success;
}

export { STORAGE_KEYS };
