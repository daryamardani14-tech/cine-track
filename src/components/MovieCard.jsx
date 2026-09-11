import { Star, Heart, Bookmark, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { getMovies, toggleMovie, STORAGE_KEYS } from "../utils/movieStorage";
import { useEffect, useState } from "react";
import { showMovieToast } from "../utils/showToast";

export default function MovieCard({ movie }) {
  const title = movie.title || movie.name;
  const releaseDate = movie.release_date || movie.first_air_date;

  const [isFavorite, setIsFavorite] = useState(false);
  const [isWishlist, setIsWishlist] = useState(false);
  const [isWatched, setIsWatched] = useState(false);

  useEffect(() => {
    function updateMovieStatus() {
      setIsFavorite(
        getMovies(STORAGE_KEYS.favorites).some(item => item.id === movie.id),
      );

      setIsWishlist(
        getMovies(STORAGE_KEYS.wishlists).some(item => item.id === movie.id),
      );

      setIsWatched(
        getMovies(STORAGE_KEYS.watched).some(item => item.id === movie.id),
      );
    }

    updateMovieStatus();

    window.addEventListener("movieListUpdated", updateMovieStatus);

    return () => {
      window.removeEventListener("movieListUpdated", updateMovieStatus);
    };
  }, [movie.id]);

  function handleToggle(key, isSelected, setIsSelected) {
    const newStatus = toggleMovie(key, movie);

    setIsSelected(newStatus);

    const typeMap = {
      [STORAGE_KEYS.favorites]: "favorite",
      [STORAGE_KEYS.wishlists]: "wishlist",
      [STORAGE_KEYS.watched]: "watched",
    };

    showMovieToast({
      type: typeMap[key],
      added: newStatus,
      movieTitle: title,
    });

    if (key === STORAGE_KEYS.wishlists && newStatus) {
      setIsWatched(false);
    }

    if (key === STORAGE_KEYS.watched && newStatus) {
      setIsWishlist(false);
    }

    window.dispatchEvent(new Event("movieListUpdated"));
  }

  return (
    <div className="group overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-md transition-transform duration-300 hover:-translate-y-1">
      <Link to={`/movie/${movie.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={title}
          className="aspect-[2/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />

        <div className="p-3">
          <h3 className="mb-2 h-10 text-sm font-semibold">{title}</h3>

          <div className="flex items-center justify-between text-xs text-neutral-400">
            <span>{releaseDate?.slice(0, 4)}</span>

            <span className="flex items-center gap-1">
              {movie.vote_average.toFixed(1)}
              <Star size={14} fill="currentColor" />
            </span>
          </div>
        </div>
      </Link>

      <div className="px-3 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              handleToggle(STORAGE_KEYS.favorites, isFavorite, setIsFavorite)
            }
            className={`transition-transform duration-200 hover:scale-110 ${
              isFavorite
                ? "text-red-500"
                : "text-neutral-400 hover:text-red-500"
            }`}>
            <Heart size={17} fill={isFavorite ? "currentColor" : "none"} />
          </button>

          <button
            onClick={() =>
              handleToggle(STORAGE_KEYS.wishlists, isWishlist, setIsWishlist)
            }
            className={`transition-transform duration-200 hover:scale-110 ${
              isWishlist
                ? "text-red-500"
                : "text-neutral-400 hover:text-red-500"
            }`}>
            <Bookmark size={17} fill={isWishlist ? "currentColor" : "none"} />
          </button>

          <button
            onClick={() =>
              handleToggle(STORAGE_KEYS.watched, isWatched, setIsWatched)
            }
            className={`transition-transform duration-200 hover:scale-110 ${
              isWatched ? "text-red-500" : "text-neutral-400 hover:text-red-500"
            }`}>
            <Eye size={17} />
          </button>
        </div>
      </div>
    </div>
  );
}
