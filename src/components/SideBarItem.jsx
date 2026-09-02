export default function SideBarItem({ item }) {
  const Icon = item.icon;
  return (
    <li className="flex items-center gap-3 px-2 py-2">
      <Icon />
      {item.label}
    </li>
  );
}
