import {
  menuItems,
  libraryItems,
  categoryItems,
  generalItems,
} from "../data/sideBarItem";
import SideBarItem from "./SideBarItem";
export default function SideBar({ selectedCategory, onSelectedCategory }) {
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

  return (
    <div className="w-64 min-h-screen flex flex-col bg-neutral-900 p-6 text-white">
      <h1 className="mb-8 font-bold text-3xl">
        Watch<div className="inline-block w-1 h-1 bg-red-500"></div>
      </h1>

      <p className={sectionTitelStyle}>MENU</p>
      <ul className={listStyle}>{renderItems(menuItems)}</ul>

      <p className={sectionTitelStyle}>LIBRARY</p>
      <ul className={listStyle}>{renderItems(libraryItems)}</ul>

      <p className={sectionTitelStyle}>CATEGORIES</p>
      <ul className={listStyle}>{renderItems(categoryItems)}</ul>
    </div>
  );
}
