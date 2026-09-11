import { Star, Heart, Bookmark, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { getMovies, toggleMovie, STORAGE_KEYS } from "../utils/movieStorage";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

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
    if (newStatus) {
      if (key === STORAGE_KEYS.favorites) {
        toast.success(`${title} added to Favorites`);
      }

      if (key === STORAGE_KEYS.wishlists) {
        toast.success(`${title} added to Wishlist`);
      }

      if (key === STORAGE_KEYS.watched) {
        toast.success(`${title} marked as Watched`);
      }
    }

    if (key === STORAGE_KEYS.wishlists && newStatus) {
      setIsWatched(false);
    }

    if (key === STORAGE_KEYS.watched && newStatus) {
      setIsWishlist(false);
    }

    window.dispatchEvent(new Event("movieListUpdated"));
  }

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
      <Link to={`/movie/${movie.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={title}
          className="aspect-[2/3] w-full object-cover"
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
            className={`transition ${
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
            className={`transition ${
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
            className={`transition ${
              isWatched ? "text-red-500" : "text-neutral-400 hover:text-red-500"
            }`}>
            <Eye size={17} />
          </button>
        </div>
      </div>
    </div>
  );
}
