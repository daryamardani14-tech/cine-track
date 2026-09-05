import { useEffect, useState } from "react";
import UserMovieItem from "./UserMovieItem";
import { getMovies, saveMovies, STORAGE_KEYS } from "../utils/movieStorage";

export default function Aside() {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [wishlistMovies, setWishlistMovies] = useState([]);
  const [watchedMovies, setWatchedMovies] = useState([]);

  function updateMovieLists() {
    setFavoriteMovies(getMovies(STORAGE_KEYS.favorites));
    setWishlistMovies(getMovies(STORAGE_KEYS.wishlists));
    setWatchedMovies(getMovies(STORAGE_KEYS.watched));
  }
  function removeMovie(key, movieId) {
    const movies = getMovies(key);

    const updatedMovies = movies.filter(movie => movie.id !== movieId);

    saveMovies(key, updatedMovies);

    updateMovieLists();
  }

  useEffect(() => {
    updateMovieLists();

    window.addEventListener("movieListUpdated", updateMovieLists);

    return () => {
      window.removeEventListener("movieListUpdated", updateMovieLists);
    };
  }, []);

  return (
    <aside className="h-full w-80 bg-neutral-900 p-6 text-white">
      <h2 className="mb-3 text-sm font-bold tracking-wider text-neutral-400">
        ❤️ MY FAVORITES
      </h2>

      <div className="flex flex-col gap-3">
        {favoriteMovies.slice(-2).map(movie => (
          <UserMovieItem
            movie={movie}
            key={movie.id}
            onRemove={movieId => removeMovie(STORAGE_KEYS.favorites, movieId)}
          />
        ))}
      </div>

      <h2 className="mb-3 mt-8 text-sm font-bold tracking-wider text-neutral-400">
        🔖 WISHLISTS
      </h2>

      <div className="flex flex-col gap-3">
        {wishlistMovies.slice(-2).map(movie => (
          <UserMovieItem
            movie={movie}
            key={movie.id}
            onRemove={movieId => removeMovie(STORAGE_KEYS.wishlists, movieId)}
          />
        ))}
      </div>

      <h2 className="mb-3 mt-8 text-sm font-bold tracking-wider text-neutral-400">
        👁 WATCHED
      </h2>

      <div className="flex flex-col gap-3">
        {watchedMovies.slice(-2).map(movie => (
          <UserMovieItem
            movie={movie}
            key={movie.id}
            onRemove={movieId => removeMovie(STORAGE_KEYS.watched, movieId)}
          />
        ))}
      </div>
    </aside>
  );
}
