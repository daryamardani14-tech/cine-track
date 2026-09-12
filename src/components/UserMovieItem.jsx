import { X } from "lucide-react";
import { genreNames } from "../data/genreNames";
import { useState } from "react";
import { showMovieToast } from "../utils/showToast";

export default function UserMovieItem({ movie, onRemove, listType }) {
  const title = movie.title || movie.name;
  const releaseDate = movie.release_date || movie.first_air_date;
  const [showConfirm, setShowConfirm] = useState(false);
  console.log("MOVIE:", title, "genre_ids:", movie.genre_ids);

  function handleConfirmRemove() {
    onRemove(movie.id);
    setShowConfirm(false);

    showMovieToast({
      type: listType,
      added: false,
      movieTitle: title,
    });
  }

  return (
    <div className="relative flex gap-3 rounded-xl bg-neutral-800 p-2">
      <img
        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
        alt={title}
        className="h-24 w-20 rounded-lg object-cover"
      />

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="truncate text-card-title font-semibold">{title}</h3>

          <span className="shrink-0 text-meta text-neutral-400">
            ⭐ {movie.vote_average.toFixed(1)}
          </span>
          <button
            onClick={() => setShowConfirm(true)}
            className="shrink-0 text-red-500 hover:text-red-400">
            <X size={14} />
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
      {showConfirm && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full rounded-xl border border-white/10 bg-neutral-900 p-4 shadow-xl">
            <h3 className="text-sm font-semibold text-white">Remove movie?</h3>

            <p className="mt-2 text-xs text-neutral-400">
              Are you sure you want to remove "{title}"?
            </p>

            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setShowConfirm(false)}
                className="rounded-lg bg-neutral-800 px-3 py-2 text-xs text-neutral-300 transition hover:bg-neutral-700">
                Cancel
              </button>

              <button
                onClick={handleConfirmRemove}
                className="rounded-lg bg-red-500 px-3 py-2 text-xs font-medium text-white transition hover:bg-red-600">
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
