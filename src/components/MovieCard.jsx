import { Star } from "lucide-react";

export default function MovieCard({ movie }) {
  const title = movie.title || movie.name;
  const releaseDate = movie.release_date || movie.first_air_date;

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
      </div>
    </div>
  );
}
