import SideBar from "./components/SideBar";
import Main from "./components/Main";
import Aside from "./components/Aside";
export default function App() {
  return (
    <div className="flex min-h-screen">
      <SideBar />
      <Main />
      <Aside />
    </div>
  );
}
