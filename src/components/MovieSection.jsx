import { ChevronRight, ChevronLeft } from "lucide-react";
import MovieCard from "./MovieCard";
import { useEffect, useRef, useState } from "react";

export default function MovieSection({ title, category, endpoint }) {
  const [movieData, setMovieData] = useState([]);
  const movieListRef = useRef(null);

  useEffect(() => {
    async function getMovies() {
      const url = `https://api.themoviedb.org/3/${category}/${endpoint}?language=en-US&page=1`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
          accept: "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) return;

      setMovieData(data.results);
    }

    getMovies();
  }, [category, endpoint]);

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

        <div className="flex gap-2">
          <button onClick={handlePrevious}>
            <ChevronLeft size={18} />
          </button>

          <button onClick={handleNext}>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div ref={movieListRef} className="flex gap-4 overflow-hidden">
        {movieData.map(movie => (
          <div key={movie.id} className="w-48 shrink-0">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </section>
  );
}
