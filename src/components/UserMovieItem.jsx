import { X } from "lucide-react";
import { genreNames } from "../data/genreNames";

export default function UserMovieItem({ movie, onRemove }) {
  const title = movie.title || movie.name;
  const releaseDate = movie.release_date || movie.first_air_date;

  return (
    <div className="relative flex gap-3 rounded-xl bg-neutral-800 p-2">
      <img
        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
        alt={title}
        className="h-24 w-20 rounded-lg object-cover"
      />

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="truncate text-sm font-semibold">{title}</h3>

          <span className="shrink-0 text-xs text-neutral-400">
            ⭐ {movie.vote_average.toFixed(1)}
          </span>
          <button
            onClick={() => onRemove(movie.id)}
            className="shrink-0 text-red-500 hover:text-red-400">
            {" "}
            <X size={14} />{" "}
          </button>
        </div>

        <p className="mt-1 text-xs text-neutral-500">
          {releaseDate?.slice(0, 4)}
        </p>

        <div className="mt-2 flex flex-wrap gap-1">
          {movie.genre_ids?.slice(0, 3).map(id => (
            <span
              key={id}
              className="rounded-full bg-neutral-700 px-2 py-1 text-[10px] text-neutral-300">
              {genreNames[id]}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
