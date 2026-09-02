import { useEffect, useState } from "react";
import featuredMovies from "../data/featuredMovies";
import { ChevronRight } from "lucide-react";

export default function FeaturedMovie() {
  const [movie, setMovie] = useState(featuredMovies[0]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function getMovie() {
      const featuredMovie = featuredMovies[currentIndex];
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&t=${featuredMovie.title}`,
      );

      const data = await response.json();

      console.log(data);
      setMovie({
        ...data,
        image: featuredMovie.image,
      });
    }

    getMovie();
  }, [currentIndex]);

  return (
    <section className="relative h-[420px] rounded-2xl border border-neutral-700 overflow-hidden bg-neutral-800">
      <div className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
        <button
          onClick={() =>
            setCurrentIndex(
              currentIndex === featuredMovies.length - 1 ? 0 : currentIndex + 1,
            )
          }
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-neutral-500/30 text-white backdrop-blur-md transition hover:bg-neutral-500/50">
          <ChevronRight size={24} />
        </button>
      </div>
      {movie && (
        <img
          src={movie.image}
          alt={movie.Title}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      {movie && (
        <div className="absolute bottom-8 left-8 z-10">
          <h2 className="mb-3 text-4xl font-bold">{movie.Title}</h2>

          {movie.Genre && (
            <div className="flex flex-wrap gap-2">
              {movie.Genre.split(",").map(genre => (
                <span
                  key={genre}
                  className="rounded-full bg-white/10 px-3 py-1 text-sm backdrop-blur-md">
                  {genre}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
