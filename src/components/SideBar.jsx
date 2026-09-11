import { menuItems, libraryItems, categoryItems } from "../data/sideBarItem";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBarItem from "./SideBarItem";
import SearchBar from "./SearchBar";

export default function SideBar({
  selectedCategory,
  onSelectedCategory,
  searchQuery,
  onSearch,
  searchResults,
  onSelectMovie,
}) {
  const [openSection, setOpenSection] = useState(null);

  const navigate = useNavigate();

  const sectionTitelStyle =
    "text-xs font-medium tracking-[6px] text-neutral-500 mt-6 mb-3";

  const listStyle = "flex flex-col gap-2";

  const renderItems = items =>
    items.map(item => (
      <SideBarItem
        item={item}
        key={item.id}
        isActive={item.id === selectedCategory}
        onClick={() => onSelectedCategory(item.id)}
      />
    ));

  function handleSectionClick(section) {
    setOpenSection(openSection === section ? null : section);
  }

  function handleMyLibraryClick(type) {
    navigate(`/library/${type}`);
    setOpenSection(null);
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden min-h-screen flex-col bg-neutral-900 p-6 text-white md:flex lg:w-56 xl:w-64">
        <h1 className="mb-8 text-3xl font-bold">
          Watch
          <div className="inline-block h-1 w-1 bg-red-500"></div>
        </h1>

        <p className={sectionTitelStyle}>MENU</p>
        <ul className={listStyle}>{renderItems(menuItems)}</ul>

        <p className={sectionTitelStyle}>LIBRARY</p>
        <ul className={listStyle}>{renderItems(libraryItems)}</ul>

        <p className={sectionTitelStyle}>CATEGORIES</p>
        <ul className={listStyle}>{renderItems(categoryItems)}</ul>
      </div>

      {/* Mobile Navbar */}
      <div className="fixed left-2 right-2 top-2 z-50 rounded-xl border border-white/5 bg-neutral-800/55 text-white shadow-[0_4px_20px_rgba(0,0,0,0.3)] backdrop-blur-xl md:hidden">
        <div className="flex h-7 items-center gap-2 px-3">
          <h1 className="shrink-0 text-[10px] font-semibold">
            Watch
            <span className="ml-1 inline-block h-1 w-1 bg-red-500"></span>
          </h1>

          <div className="min-w-0 flex-1">
            <SearchBar
              searchQuery={searchQuery}
              onSearch={onSearch}
              searchResults={searchResults}
              onSelectMovie={onSelectMovie}
              hideLibrary
              mobile
            />
          </div>

          <button
            onClick={() => handleSectionClick("browse")}
            className={`shrink-0 text-[10px] font-medium transition ${
              openSection === "browse"
                ? "text-red-500"
                : "text-neutral-400 hover:text-white"
            }`}>
            MENU
          </button>
        </div>

        {openSection === "browse" && (
          <div className="border-t border-white/10 px-3 py-2">
            <div className="flex items-center justify-between gap-2">
              <button
                onClick={() => handleSectionClick("menu")}
                className={`text-[10px] font-medium transition ${
                  openSection === "menu"
                    ? "text-red-500"
                    : "text-neutral-400 hover:text-white"
                }`}>
                MENU
              </button>

              <button
                onClick={() => handleSectionClick("library")}
                className={`text-[10px] font-medium transition ${
                  openSection === "library"
                    ? "text-red-500"
                    : "text-neutral-400 hover:text-white"
                }`}>
                LIBRARY
              </button>

              <button
                onClick={() => handleSectionClick("categories")}
                className={`text-[10px] font-medium transition ${
                  openSection === "categories"
                    ? "text-red-500"
                    : "text-neutral-400 hover:text-white"
                }`}>
                CATEGORIES
              </button>

              <button
                onClick={() => handleSectionClick("my-library")}
                className={`text-[10px] font-medium transition ${
                  openSection === "my-library"
                    ? "text-red-500"
                    : "text-neutral-400 hover:text-white"
                }`}>
                MY LIBRARY
              </button>
            </div>
          </div>
        )}

        {openSection === "menu" && (
          <div className="border-t border-white/10 px-3 py-2">
            <div className="flex flex-wrap gap-2">
              {menuItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectedCategory(item.id);
                    setOpenSection(null);
                  }}
                  className={`rounded-lg px-3 py-2 text-sm transition ${
                    item.id === selectedCategory
                      ? "bg-red-500 text-white"
                      : "bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white"
                  }`}>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {openSection === "library" && (
          <div className="border-t border-white/10 px-3 py-2">
            <div className="flex flex-wrap gap-2">
              {libraryItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectedCategory(item.id);
                    setOpenSection(null);
                  }}
                  className={`rounded-lg px-3 py-2 text-sm transition ${
                    item.id === selectedCategory
                      ? "bg-red-500 text-white"
                      : "bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white"
                  }`}>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {openSection === "categories" && (
          <div className="border-t border-white/10 px-3 py-2">
            <div className="flex flex-wrap gap-2">
              {categoryItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectedCategory(item.id);
                    setOpenSection(null);
                  }}
                  className={`rounded-lg px-3 py-2 text-sm transition ${
                    item.id === selectedCategory
                      ? "bg-red-500 text-white"
                      : "bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white"
                  }`}>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {openSection === "my-library" && (
          <div className="border-t border-white/10 px-3 py-2">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleMyLibraryClick("favorites")}
                className="rounded-lg bg-white/5 px-3 py-2 text-sm text-neutral-400 transition hover:bg-white/10 hover:text-white">
                Favorites
              </button>

              <button
                onClick={() => handleMyLibraryClick("wishlists")}
                className="rounded-lg bg-white/5 px-3 py-2 text-sm text-neutral-400 transition hover:bg-white/10 hover:text-white">
                Wishlists
              </button>

              <button
                onClick={() => handleMyLibraryClick("watched")}
                className="rounded-lg bg-white/5 px-3 py-2 text-sm text-neutral-400 transition hover:bg-white/10 hover:text-white">
                Watched
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
