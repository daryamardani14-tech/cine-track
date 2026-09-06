import { useEffect, useState } from "react";
import UserMovieItem from "./UserMovieItem";
import { getMovies, saveMovies, STORAGE_KEYS } from "../utils/movieStorage";
import { Link } from "react-router-dom";

export default function Aside() {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [wishlistMovies, setWishlistMovies] = useState([]);
  const [watchedMovies, setWatchedMovies] = useState([]);

  const nextSectionTitleStyle =
    "mt-8 text-base font-bold tracking-wider text-white mb-5";

  function updateMovieLists() {
    setFavoriteMovies(getMovies(STORAGE_KEYS.favorites));
    setWishlistMovies(getMovies(STORAGE_KEYS.wishlists));
    setWatchedMovies(getMovies(STORAGE_KEYS.watched));
  }

  function removeMovie(key, movieId) {
    const movies = getMovies(key);

    const updatedMovies = movies.filter(movie => movie.id !== movieId);

    saveMovies(key, updatedMovies);
    window.dispatchEvent(new Event("movieListUpdated"));
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
    <aside className="h-full w-[85vw] max-w-80 border-l border-white/10 bg-neutral-900/70 p-4 text-white backdrop-blur-xl sm:w-80 sm:p-6 overflow-y-auto">
      <h1 className="mb-12 text-xl font-bold tracking-wider">LIBRARY</h1>

      <h2 className="mt-15 mb-5 text-base font-bold tracking-wider text-white">
        ❤️ MY FAVORITES
      </h2>

      {favoriteMovies.length > 0 ? (
        <>
          <div className="flex flex-col gap-3">
            {favoriteMovies.slice(-2).map(movie => (
              <UserMovieItem
                movie={movie}
                key={movie.id}
                onRemove={movieId =>
                  removeMovie(STORAGE_KEYS.favorites, movieId)
                }
              />
            ))}
          </div>

          <Link
            to="/library/favorites"
            className="mt-3 block w-full rounded-lg bg-red-500 px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-red-600">
            See More
          </Link>
        </>
      ) : (
        <p className="text-sm text-neutral-500">
          You haven't added any favorite movies yet.
        </p>
      )}

      <h2 className={nextSectionTitleStyle}>🔖 WISHLISTS</h2>

      {wishlistMovies.length > 0 ? (
        <>
          <div className="flex flex-col gap-3">
            {wishlistMovies.slice(-2).map(movie => (
              <UserMovieItem
                movie={movie}
                key={movie.id}
                onRemove={movieId =>
                  removeMovie(STORAGE_KEYS.wishlists, movieId)
                }
              />
            ))}
          </div>

          <Link
            to="/library/wishlists"
            className="mt-3 block w-full rounded-lg bg-red-500 px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-red-600">
            See More
          </Link>
        </>
      ) : (
        <p className="text-sm text-neutral-500">
          You haven't added any movies to your wishlist yet.
        </p>
      )}

      <h2 className={nextSectionTitleStyle}>👁 WATCHED</h2>

      {watchedMovies.length > 0 ? (
        <>
          <div className="flex flex-col gap-3">
            {watchedMovies.slice(-2).map(movie => (
              <UserMovieItem
                movie={movie}
                key={movie.id}
                onRemove={movieId => removeMovie(STORAGE_KEYS.watched, movieId)}
              />
            ))}
          </div>

          <Link
            to="/library/watched"
            className="mt-3 block w-full rounded-lg bg-red-500 px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-red-600">
            See More
          </Link>
        </>
      ) : (
        <p className="text-sm text-neutral-500">
          You haven't watched any movies yet.
        </p>
      )}
    </aside>
  );
}
