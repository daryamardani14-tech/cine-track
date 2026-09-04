import { categorySections } from "../data/categorySections";
import FeaturedMovie from "./FeaturedMovie";
import MovieSection from "./MovieSection";
import MovieCard from "./MovieCard";
import { useEffect, useState } from "react";

export default function Main({ selectedItem }) {
  const sections = categorySections[selectedItem];
  const category =
    selectedItem === "tv-series" || selectedItem === "airing-today"
      ? "tv"
      : "movie";

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (selectedItem !== "movies") return;

    async function getMovies() {
      const endpoints = ["popular", "top_rated", "upcoming", "now_playing"];

      const responses = await Promise.all(
        endpoints.map(endpoint =>
          fetch(
            `https://api.themoviedb.org/3/movie/${endpoint}?language=en-US&page=1`,
            {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
                accept: "application/json",
              },
            },
          ).then(response => response.json()),
        ),
      );

      const allMovies = responses.flatMap(data => data.results);

      setMovies(allMovies.slice(0, 16));
    }

    getMovies();
  }, [selectedItem]);

  return (
    <div className="min-w-0 flex-1 bg-neutral-950 p-8 text-white">
      <FeaturedMovie />

      {selectedItem === "movies" ? (
        <section className="mt-8">
          <h2 className="mb-4 text-xl font-bold">Movies</h2>

          <div className="grid grid-cols-4 gap-4">
            {movies.map(movie => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>
        </section>
      ) : sections ? (
        <>
          {sections.map(section => (
            <MovieSection
              key={`${category}-${section.endpoint}`}
              title={section.title}
              category={category}
              endpoint={section.endpoint}
            />
          ))}
        </>
      ) : (
        <div className="flex h-full items-center justify-center text-neutral-500">
          این بخش هنوز آماده نیست
        </div>
      )}
    </div>
  );
}
