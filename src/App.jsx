import SideBar from "./components/SideBar";
import Main from "./components/Main";
import Aside from "./components/Aside";
import MovieDetail from "./components/MovieDetail";
import Library from "./components/Library";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import CustomCursor from "./components/CustomCursor";

function Dashboard() {
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState("home");
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    async function searchMovies() {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
          searchQuery,
        )}&language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            accept: "application/json",
          },
        },
      );

      const data = await response.json();

      if (!response.ok) return;

      setSearchResults(data.results);
    }

    searchMovies();
  }, [searchQuery]);

  return (
    <div className="relative flex min-h-screen">
      <SideBar
        selectedCategory={selectedCategory}
        onSelectedCategory={setSelectedCategory}
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
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/library/:type" element={<Library />} />
      </Routes>
    </BrowserRouter>
  );
}
