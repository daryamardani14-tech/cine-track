import SideBar from "./components/SideBar";
import Main from "./components/Main";
import Aside from "./components/Aside";
import MovieDetail from "./components/MovieDetail";
import Library from "./components/Library";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./components/NotFound";
import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import CustomCursor from "./components/CustomCursor";
import useScrollRestoration from "./hooks/useScrollRestoration";

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  useScrollRestoration();
  const selectedCategory =
    location.pathname === "/" ? "home" : location.pathname.slice(1);

  const [isLibraryOpen, setIsLibraryOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    let ignore = false;

    async function searchMovies() {
      try {
        const response = await fetch(
          `/api/tmdb/search/movie?query=${encodeURIComponent(
            searchQuery,
          )}&language=en-US&page=1`,
        );

        if (!response.ok) {
          throw new Error(`TMDB search failed: ${response.status}`);
        }

        const data = await response.json();

        if (ignore) return;
        setSearchResults(data.results);
      } catch (error) {
        if (ignore) return;
        console.error("Search failed:", error);
        toast.error("Search failed. Check your internet connection.");
        setSearchResults([]);
      }
    }

    searchMovies();

    return () => {
      ignore = true;
    };
  }, [searchQuery]);

  return (
    <div className="relative flex min-h-screen">
      <SideBar
        selectedCategory={selectedCategory}
        onSelectedCategory={category => {
          navigate(category === "home" ? "/" : `/${category}`);
        }}
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
        searchResults={searchResults}
        onSelectMovie={movie => navigate(`/movie/${movie.id}`)}
      />

      <Main
        selectedItem={selectedCategory}
        key={selectedCategory}
        onOpenLibrary={() => setIsLibraryOpen(true)}
        searchQuery={searchQuery}
        searchResults={searchResults}
        onSearch={setSearchQuery}
      />

      {isLibraryOpen && (
        <div
          onClick={() => setIsLibraryOpen(false)}
          className="fixed inset-0 z-40 bg-black/60">
          <div
            onClick={e => e.stopPropagation()}
            className="absolute right-0 top-0 h-full">
            <button
              onClick={() => setIsLibraryOpen(false)}
              className="absolute right-4 top-4 z-10 text-xl text-red-500">
              ×
            </button>

            <Aside />
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CustomCursor />
      <Toaster position="top-center" />
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/popular" element={<Dashboard />} />
          <Route path="/top-rated" element={<Dashboard />} />
          <Route path="/movies" element={<Dashboard />} />
          <Route path="/tv-series" element={<Dashboard />} />
          <Route path="/airing-today" element={<Dashboard />} />
          <Route path="/all-movies" element={<Dashboard />} />

          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/library/:type" element={<Library />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
