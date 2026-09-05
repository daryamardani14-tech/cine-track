import SideBar from "./components/SideBar";
import Main from "./components/Main";
import Aside from "./components/Aside";
import { useState } from "react";

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("home");
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <SideBar
        selectedCategory={selectedCategory}
        onSelectedCategory={setSelectedCategory}
      />

      <Main
        selectedItem={selectedCategory}
        key={selectedCategory}
        onOpenLibrary={() => setIsLibraryOpen(true)}
      />

      <div className="hidden self-stretch xl:block">
        <Aside />
      </div>

      {isLibraryOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 xl:hidden">
          <div className="absolute right-0 top-0 h-full">
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
