import { ChevronRight, ChevronLeft } from "lucide-react";
import MovieCard from "./MovieCard";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";

export default function MovieSection({ title, category, endpoint, isHome }) {
  const [movieData, setMovieData] = useState([]);
  const movieListRef = useRef(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let ignore = false;

    async function getMovies() {
      setLoading(true);

      const url =
        endpoint === "discover"
          ? `https://api.themoviedb.org/3/discover/movie?language=en-US&page=${page}`
          : `https://api.themoviedb.org/3/${category}/${endpoint}?language=en-US&page=1`;

      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`TMDB request failed: ${response.status}`);
        }

        const data = await response.json();

        if (ignore) return;

        if (endpoint === "discover") {
          setMovieData(currentMovies => [...currentMovies, ...data.results]);
          setHasMore(page < data.total_pages);
        } else {
          setMovieData(data.results);
        }
      } catch (error) {
        if (ignore) return;
        console.error(`Failed to load "${title}" section:`, error);
        toast.error(`Failed to load "${title}".`);

        if (endpoint === "discover") {
          setHasMore(false);
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    getMovies();

    return () => {
      ignore = true;
    };
  }, [category, endpoint, page, title]);

  useEffect(() => {
    if (endpoint !== "discover") return;

    function handleScroll() {
      if (
        window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 500 &&
        !loading &&
        hasMore
      ) {
        setPage(currentPage => currentPage + 1);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [endpoint, loading, hasMore]);

  function handleNext() {
    movieListRef.current.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  }

  function handlePrevious() {
    movieListRef.current.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  }

  return (
    <section className="mt-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">{title}</h2>

        {isHome && (
          <div className="flex gap-2">
            <button
              onClick={handlePrevious}
              className="rounded-lg p-2 text-neutral-400 transition hover:bg-neutral-800 hover:text-white">
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={handleNext}
              className="rounded-lg p-2 text-neutral-400 transition hover:bg-neutral-800 hover:text-white">
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>

      <div
        ref={movieListRef}
        className={
          isHome
            ? "flex gap-4 overflow-hidden"
            : "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
        }>
        {(endpoint === "discover" ? movieData : movieData.slice(0, 20)).map(
          movie => (
            <div
              key={movie.id}
              className={isHome ? "w-48 shrink-0" : "min-w-0"}>
              <MovieCard movie={movie} />
            </div>
          ),
        )}
      </div>

      {endpoint === "discover" && loading && (
        <p className="mt-6 text-center text-sm text-neutral-500">
          Loading more movies...
        </p>
      )}

      {endpoint === "discover" && !hasMore && (
        <p className="mt-6 text-center text-sm text-neutral-500">
          No more movies.
        </p>
      )}
    </section>
  );
}
