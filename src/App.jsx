import SideBar from "./components/SideBar";
import Main from "./components/Main";
import Aside from "./components/Aside";
import MovieDetail from "./components/MovieDetail";
import Library from "./components/Library";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState("home");
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);

  return (
    <div className="relative flex min-h-screen">
      <SideBar
        selectedCategory={selectedCategory}
        onSelectedCategory={setSelectedCategory}
      />

      <Main
        selectedItem={selectedCategory}
        key={selectedCategory}
        onOpenLibrary={() => setIsLibraryOpen(true)}
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
      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/library/:type" element={<Library />} />
      </Routes>
    </BrowserRouter>
  );
}
