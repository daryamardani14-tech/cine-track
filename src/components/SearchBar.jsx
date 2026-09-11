import { Search, Library } from "lucide-react";

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
    <div className={`relative flex gap-2 ${hideLibrary ? "" : "mb-6"}`}>
      <div className="relative min-w-0 flex-1">
        <Search
          size={mobile ? 16 : 20}
          className={`absolute top-1/2 -translate-y-1/2 text-neutral-500 ${
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
              : "w-full rounded-xl border border-white/10 bg-white/10 py-1.5 pl-12 pr-4 text-sm text-white outline-none backdrop-blur-md placeholder:text-neutral-400 focus:border-white/20 shadow-[0_2px_12px_rgba(0,0,0,0.35)]"
          }
        />
        {searchResults.length > 0 && (
          <div className="absolute left-0 right-0 top-full z-20 mt-2 flex flex-col gap-2 rounded-xl border border-neutral-700 bg-neutral-900 p-2">
            {searchResults.slice(0, 6).map(movie => (
              <button
                key={movie.id}
                onClick={() => {
                  onSelectMovie(movie);
                  onSearch("");
                }}
                className="flex items-center gap-3 rounded-lg p-2 text-left hover:bg-neutral-800">
                <img
                  src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                  alt={movie.title}
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
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-neutral-400 backdrop-blur-md transition hover:border-red-500 hover:bg-white/15 hover:text-red-500 sm:h-9 sm:w-9 shadow-[0_2px_12px_rgba(0,0,0,0.35)]">
          <Library size={17} />
        </button>
      )}
    </div>
  );
}
