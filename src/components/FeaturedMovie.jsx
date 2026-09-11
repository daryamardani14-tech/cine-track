import { useEffect, useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { genreNames } from "../data/genreNames";

export default function FeaturedMovie() {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isChanging, setIsChanging] = useState(false);
  const imagePosition = "100% 10%";

  useEffect(() => {
    async function getMovies() {
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

      if (!response.ok) return;

      setMovies(data.results);

      const randomIndex = Math.floor(Math.random() * data.results.length);
      setCurrentIndex(randomIndex);
    }

    getMovies();
  }, []);

  function handleNext() {
    setIsChanging(true);

    setTimeout(() => {
      setCurrentIndex(
        currentIndex === movies.length - 1 ? 0 : currentIndex + 1,
      );
      setIsChanging(false);
    }, 300);
  }

  function handlePrevious() {
    setIsChanging(true);

    setTimeout(() => {
      setCurrentIndex(
        currentIndex === 0 ? movies.length - 1 : currentIndex - 1,
      );
      setIsChanging(false);
    }, 300);
  }

  useEffect(() => {
    if (movies.length === 0 || currentIndex === null) return;

    const interval = setInterval(() => {
      setIsChanging(true);

      setTimeout(() => {
        setCurrentIndex(currentIndex =>
          currentIndex === movies.length - 1 ? 0 : currentIndex + 1,
        );
        setIsChanging(false);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, [movies.length, currentIndex]);

  if (movies.length === 0 || currentIndex === null) return null;

  const movie = movies[currentIndex];
  const title = movie.title || movie.name;

  const genres = movie.genre_ids
    ?.map(id => genreNames[id])
    .filter(Boolean)
    .slice(0, 3);

  return (
    <section className="relative h-[360px] sm:h-[480px] bg-neutral-950">
      <img
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt={title}
        className={`absolute inset-0 z-0 h-full w-full object-cover transition-opacity duration-700 ${
          isChanging ? "opacity-0" : "opacity-100"
        }`}
        style={{ objectPosition: imagePosition }}
      />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      <div className="absolute bottom-10 left-8 z-10">
        <h2 className="mb-3 text-4xl font-bold">{title}</h2>

        <div className="flex flex-wrap gap-2">
          {genres?.map(genre => (
            <span
              key={genre}
              className="rounded-full bg-white/10 px-3 py-1 text-sm backdrop-blur-md">
              {genre}
            </span>
          ))}
        </div>
      </div>

      <div className="absolute left-3 top-1/2 z-10 -translate-y-1/2 sm:left-4">
        <button
          onClick={handlePrevious}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-neutral-500/30 text-white backdrop-blur-md transition hover:bg-neutral-500/50 sm:h-12 sm:w-12">
          <ChevronLeft size={18} className="sm:hidden" />
          <ChevronLeft size={24} className="hidden sm:block" />
        </button>
      </div>

      <div className="absolute right-3 top-1/2 z-10 -translate-y-1/2 sm:right-4">
        <button
          onClick={handleNext}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-neutral-500/30 text-white backdrop-blur-md transition hover:bg-neutral-500/50 sm:h-12 sm:w-12">
          <ChevronRight size={18} className="sm:hidden" />
          <ChevronRight size={24} className="hidden sm:block" />
        </button>
      </div>
    </section>
  );
}
