import { Star, Heart, Bookmark, Eye } from "lucide-react";
import { getMovies, saveMovies, STORAGE_KEYS } from "../utils/movieStorage";

export default function MovieCard({ movie }) {
  const title = movie.title || movie.name;
  const releaseDate = movie.release_date || movie.first_air_date;

  function addMovie(key) {
    const movies = getMovies(key);

    const movieExists = movies.some(item => item.id === movie.id);

    if (movieExists) return;

    saveMovies(key, [...movies, movie]);

    window.dispatchEvent(new Event("movieListUpdated"));
  }

  return (
    <div className="overflow-hidden rounded-xl bg-neutral-800">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={title}
        className="h-64 w-full object-cover"
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

        <div className="mt-3 flex items-center gap-2">
          <button
            onClick={() => addMovie(STORAGE_KEYS.favorites)}
            className="text-neutral-400 transition hover:text-red-500">
            <Heart size={17} />
          </button>

          <button
            onClick={() => addMovie(STORAGE_KEYS.wishlists)}
            className="text-neutral-400 transition hover:text-red-500">
            <Bookmark size={17} />
          </button>

          <button
            onClick={() => addMovie(STORAGE_KEYS.watched)}
            className="text-neutral-400 transition hover:text-red-500">
            <Eye size={17} />
          </button>
        </div>
      </div>
    </div>
  );
}
