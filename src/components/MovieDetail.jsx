import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Heart, Bookmark, Eye, Star } from "lucide-react";
import { getMovies, saveMovies, STORAGE_KEYS } from "../utils/movieStorage";
import { showMovieToast } from "../utils/showToast";
import { toast } from "react-hot-toast";
import { handleImageError } from "../utils/imageFallback";

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [error, setError] = useState(false);

  const [isFavorite, setIsFavorite] = useState(false);
  const [isWishlist, setIsWishlist] = useState(false);
  const [isWatched, setIsWatched] = useState(false);

  useEffect(() => {
    let ignore = false;

    async function getMovieDetails() {
      setError(false);
      setMovie(null);

      const headers = {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        accept: "application/json",
      };

      try {
        const [movieResponse, creditsResponse] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, {
            headers,
          }),
          fetch(
            `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
            {
              headers,
            },
          ),
        ]);

        if (!movieResponse.ok || !creditsResponse.ok) {
          throw new Error(
            `TMDB request failed: ${movieResponse.status} / ${creditsResponse.status}`,
          );
        }

        const movieData = await movieResponse.json();
        const creditsData = await creditsResponse.json();

        if (ignore) return;

        setMovie(movieData);
        setCredits(creditsData);

        setIsFavorite(
          getMovies(STORAGE_KEYS.favorites).some(
            item => item.id === movieData.id,
          ),
        );

        setIsWishlist(
          getMovies(STORAGE_KEYS.wishlists).some(
            item => item.id === movieData.id,
          ),
        );

        setIsWatched(
          getMovies(STORAGE_KEYS.watched).some(
            item => item.id === movieData.id,
          ),
        );
      } catch (err) {
        if (ignore) return;
        console.error("Failed to load movie details:", err);
        setError(true);
        toast.error("Failed to load movie details");
      }
    }

    getMovieDetails();

    return () => {
      ignore = true;
    };
  }, [id]);

  function toggleMovie(key, isSelected, setIsSelected) {
    const movies = getMovies(key);

    let newStatus;

    if (isSelected) {
      const updatedMovies = movies.filter(item => item.id !== movie.id);
      saveMovies(key, updatedMovies);
      newStatus = false;
    } else {
      saveMovies(key, [...movies, movie]);
      newStatus = true;
    }

    setIsSelected(newStatus);

    const typeMap = {
      [STORAGE_KEYS.favorites]: "favorite",
      [STORAGE_KEYS.wishlists]: "wishlist",
      [STORAGE_KEYS.watched]: "watched",
    };

    showMovieToast({
      type: typeMap[key],
      added: newStatus,
      movieTitle: movie.title,
    });

    if (key === STORAGE_KEYS.wishlists && newStatus) {
      setIsWatched(false);
    }

    if (key === STORAGE_KEYS.watched && newStatus) {
      setIsWishlist(false);
    }

    window.dispatchEvent(new Event("movieListUpdated"));
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-neutral-950 text-white">
        <p className="text-lg font-medium">
          Video not found. An error occurred.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 rounded-lg border-2 border-red-500/60 bg-neutral-900 px-4 py-2 text-sm text-red-500 transition hover:bg-red-500/10">
          <ArrowLeft size={18} />
          Back
        </button>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-950 text-white">
        Loading...
      </div>
    );
  }

  const director = credits?.crew?.find(person => person.job === "Director");

  const cast = credits?.cast?.slice(0, 6);

  const hours = Math.floor(movie.runtime / 60);
  const minutes = movie.runtime % 60;

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="relative min-h-screen overflow-hidden">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          onError={handleImageError}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/75"></div>

        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-black/20"></div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-8">
          <button
            onClick={() => navigate(-1)}
            className="mb-10 flex items-center gap-2 rounded-lg bg-black/40 px-4 py-2 text-sm text-white backdrop-blur-md transition hover:bg-black/60">
            <ArrowLeft size={18} />
            Back
          </button>

          <div className="flex flex-col gap-8 md:flex-row">
            <div className="shrink-0">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                onError={handleImageError}
                className="w-64 rounded-2xl shadow-2xl md:w-72"
              />
            </div>

            <div className="max-w-3xl pt-2">
              <h1 className="text-4xl font-bold md:text-5xl">{movie.title}</h1>

              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-neutral-300">
                <span>{movie.release_date?.slice(0, 4)}</span>

                <span>•</span>

                <span>
                  {hours}h {minutes}m
                </span>

                <span>•</span>

                <span className="flex items-center gap-1">
                  <Star size={15} fill="currentColor" />
                  {movie.vote_average.toFixed(1)}
                </span>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {movie.genres?.map(genre => (
                  <span
                    key={genre.id}
                    className="rounded-full bg-white/10 px-3 py-1 text-sm text-neutral-200 backdrop-blur-md">
                    {genre.name}
                  </span>
                ))}
              </div>

              <p className="mt-8 text-base leading-7 text-neutral-300">
                {movie.overview}
              </p>

              {director && (
                <div className="mt-8">
                  <p className="text-sm text-neutral-500">Director</p>

                  <p className="mt-1 font-medium">{director.name}</p>
                </div>
              )}

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() =>
                    toggleMovie(
                      STORAGE_KEYS.favorites,
                      isFavorite,
                      setIsFavorite,
                    )
                  }
                  className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm transition ${
                    isFavorite
                      ? "border-red-500 bg-red-500/10 text-red-500"
                      : "border-neutral-700 bg-neutral-900/70 text-white hover:border-red-500 hover:text-red-500"
                  }`}>
                  <Heart
                    size={17}
                    fill={isFavorite ? "currentColor" : "none"}
                  />
                  Favorite
                </button>

                <button
                  onClick={() =>
                    toggleMovie(
                      STORAGE_KEYS.wishlists,
                      isWishlist,
                      setIsWishlist,
                    )
                  }
                  className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm transition ${
                    isWishlist
                      ? "border-red-500 bg-red-500/10 text-red-500"
                      : "border-neutral-700 bg-neutral-900/70 text-white hover:border-red-500 hover:text-red-500"
                  }`}>
                  <Bookmark
                    size={17}
                    fill={isWishlist ? "currentColor" : "none"}
                  />
                  Wishlist
                </button>

                <button
                  onClick={() =>
                    toggleMovie(STORAGE_KEYS.watched, isWatched, setIsWatched)
                  }
                  className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm transition ${
                    isWatched
                      ? "border-red-500 bg-red-500/10 text-red-500"
                      : "border-neutral-700 bg-neutral-900/70 text-white hover:border-red-500 hover:text-red-500"
                  }`}>
                  <Eye size={17} fill={isWatched ? "currentColor" : "none"} />
                  Watched
                </button>
              </div>
            </div>
          </div>

          {cast?.length > 0 && (
            <section className="mt-14 max-w-5xl">
              <h2 className="mb-5 text-2xl font-bold">Cast</h2>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
                {cast.map(person => (
                  <div
                    key={person.id}
                    className="overflow-hidden rounded-xl bg-neutral-900/80">
                    {person.profile_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
                        alt={person.name}
                        className="h-48 w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-48 items-center justify-center bg-neutral-800 text-xs text-neutral-500">
                        No Image
                      </div>
                    )}

                    <div className="p-3">
                      <p className="truncate text-sm font-semibold">
                        {person.name}
                      </p>

                      <p className="mt-1 truncate text-xs text-neutral-500">
                        {person.character}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
