import { ChevronRight, ChevronLeft } from "lucide-react";
import MovieCard from "./MovieCard";
import { useEffect, useState } from "react";

export default function MovieSection() {
  console.log("MovieSection rendered");
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    async function getMovies() {
      console.log(import.meta.env.VITE_TMDB_TOKEN);
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            accept: "application/json",
          },
        },
      );

      const data = await response.json();

      console.log(data);
      if (!response.ok) return;
      setMovieData(data.results);
    }

    getMovies();
  }, []);

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Popular Movies</h2>

        <div className="flex gap-2">
          <button>
            <ChevronLeft size={18} />
          </button>

          <button>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {movieData.map(movie => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </section>
  );
}
