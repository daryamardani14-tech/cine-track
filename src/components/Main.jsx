import FeaturedMovie from "./FeaturedMovie";
import MovieSection from "./MovieSection";
export default function Main() {
  return (
    <div className="flex-1 min-w-0 bg-neutral-950 p-8 text-white">
      <FeaturedMovie />
      <MovieSection />
    </div>
  );
}
