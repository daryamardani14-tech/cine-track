import { Search, Library } from "lucide-react";
import { handleImageError } from "../utils/imageFallback";

export default function SearchBar({
  searchQuery,
  onSearch,
  searchResults,
  onSelectMovie,
  onOpenLibrary,
  hideLibrary = false,
  mobile = false,
}) {
  return (
    <div
      className={`relative flex items-stretch gap-2 ${hideLibrary ? "" : "mb-6"}`}>
      <div className="relative min-w-0 flex-1">
        <Search
          size={mobile ? 16 : 20}
          className={`absolute top-1/2 -translate-y-1/2 text-red-500 ${
            mobile ? "left-1" : "left-4"
          }`}
        />
        <input
          type="text"
          value={searchQuery}
          onChange={e => onSearch(e.target.value)}
          placeholder="Search movies..."
          className={
            mobile
              ? "w-full border-0 bg-transparent py-1 pl-7 pr-2 text-xs text-white outline-none placeholder:text-neutral-400"
              : "w-full rounded-xl border-2 border-red-500/60 bg-neutral-900/90 py-2.5 pl-12 pr-4 text-sm font-medium text-white outline-none backdrop-blur-md transition-all duration-200 placeholder:text-neutral-500 focus:border-red-500 focus:bg-neutral-900 focus:shadow-[0_0_0_4px_rgba(239,68,68,0.15),0_4px_20px_rgba(0,0,0,0.5)] shadow-[0_4px_16px_rgba(0,0,0,0.45)]"
          }
        />
        {searchResults.length > 0 && (
          <div className="absolute left-0 right-0 top-full z-20 mt-2 flex flex-col gap-2 rounded-xl border border-red-500/30 bg-neutral-900 p-2 shadow-[0_8px_24px_rgba(0,0,0,0.5)]">
            {searchResults.slice(0, 6).map(movie => (
              <button
                key={movie.id}
                onClick={() => {
                  onSelectMovie(movie);
                  onSearch("");
                }}
                className="flex items-center gap-3 rounded-lg p-2 text-left transition hover:bg-red-500/10">
                <img
                  src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                  alt={movie.title}
                  onError={handleImageError}
                  className="h-14 w-10 rounded object-cover"
                />
                <div>
                  <p className="font-medium">{movie.title}</p>
                  <p className="text-xs text-neutral-500">
                    {movie.release_date?.slice(0, 4)}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {!hideLibrary && (
        <button
          onClick={onOpenLibrary}
          className="flex shrink-0 items-center gap-2 rounded-xl border-2 border-red-500/60 bg-neutral-900/90 px-4 py-2.5 text-sm font-medium text-red-500 backdrop-blur-md transition-all duration-200 hover:border-red-500 hover:bg-red-500/10 hover:shadow-[0_0_0_4px_rgba(239,68,68,0.15)] shadow-[0_4px_16px_rgba(0,0,0,0.45)]">
          <Library size={17} />
          <span>Library</span>
        </button>
      )}
    </div>
  );
}
