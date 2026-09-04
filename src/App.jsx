import SideBar from "./components/SideBar";
import Main from "./components/Main";
import Aside from "./components/Aside";
import { useState } from "react";
export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("home");
  return (
    <div className="flex min-h-screen">
      <SideBar
        selectedCategory={selectedCategory}
        onSelectedCategory={setSelectedCategory}
      />
      <Main selectedItem={selectedCategory} />
      <div className="hidden xl:block">
        <Aside />
      </div>
    </div>
  );
}
