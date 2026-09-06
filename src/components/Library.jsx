import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import MovieCard from "./MovieCard";
import { getMovies, STORAGE_KEYS } from "../utils/movieStorage";

export default function Library() {
  const { type } = useParams();
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);

  const libraryTypes = {
    favorites: {
      title: "MY FAVORITES",
      key: STORAGE_KEYS.favorites,
    },
    wishlists: {
      title: "WISHLISTS",
      key: STORAGE_KEYS.wishlists,
    },
    watched: {
      title: "WATCHED",
      key: STORAGE_KEYS.watched,
    },
  };

  const selectedLibrary = libraryTypes[type];

  useEffect(() => {
    if (!selectedLibrary) return;

    setMovies(getMovies(selectedLibrary.key));
  }, [type]);

  if (!selectedLibrary) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-950 text-white">
        Library not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 p-8 text-white">
      <button
        onClick={() => navigate(-1)}
        className="mb-10 flex items-center gap-2 rounded-lg bg-neutral-900 px-4 py-2 text-sm text-neutral-300 transition hover:text-white">
        <ArrowLeft size={18} />
        Back
      </button>

      <div className="mb-6">
        <h1 className="text-2xl font-bold">{selectedLibrary.title}</h1>

        <p className="mt-2 text-sm text-neutral-500">
          {movies.length} {movies.length === 1 ? "Movie" : "Movies"}
        </p>
      </div>

      {movies.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {movies.map(movie => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      ) : (
        <div className="flex min-h-64 items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900/50 text-neutral-500">
          No movies saved here yet.
        </div>
      )}
    </div>
  );
}
