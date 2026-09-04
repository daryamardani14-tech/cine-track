export default function SideBarItem({ item, isActive, onClick }) {
  const Icon = item.icon;
  return (
    <li
      onClick={onClick}
      className={`flex items-center gap-3 px-2 py-2 cursor-pointer rounded-lg ${isActive ? "bg-red-500 text-white" : "text-neutral-400"}`}>
      <Icon />
      {item.label}
    </li>
  );
}
