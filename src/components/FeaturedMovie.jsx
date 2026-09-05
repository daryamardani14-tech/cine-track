import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";

const genreNames = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Sci-Fi",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

export default function FeaturedMovie() {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);

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
    setCurrentIndex(currentIndex === movies.length - 1 ? 0 : currentIndex + 1);
  }

  if (movies.length === 0 || currentIndex === null) return null;

  const movie = movies[currentIndex];
  const title = movie.title || movie.name;

  const genres = movie.genre_ids
    ?.map(id => genreNames[id])
    .filter(Boolean)
    .slice(0, 3);

  return (
    <section className="relative h-[420px] overflow-hidden rounded-2xl border border-neutral-700 bg-neutral-800">
      <img
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

      <div className="absolute bottom-8 left-8 z-10">
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

      <div className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
        <button
          onClick={handleNext}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-neutral-500/30 text-white backdrop-blur-md transition hover:bg-neutral-500/50">
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );
}
