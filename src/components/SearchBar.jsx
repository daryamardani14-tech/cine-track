import { Search } from "lucide-react";

export default function SearchBar({
  searchQuery,
  onSearch,
  searchResults,
  onSelectMovie,
}) {
  return (
    <div className="relative mb-6">
      <Search
        size={20}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"
      />

      <input
        type="text"
        value={searchQuery}
        onChange={e => onSearch(e.target.value)}
        placeholder="Search movies..."
        className="w-full rounded-xl border border-neutral-700 bg-neutral-900 py-2.5 pl-12 pr-4 text-white outline-none placeholder:text-neutral-500 focus:border-red-500"
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
  );
}
