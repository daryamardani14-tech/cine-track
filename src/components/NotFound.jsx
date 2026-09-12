import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-neutral-950 text-white">
      <p className="text-lg font-medium">This page was not found.</p>
      <Link
        to="/"
        className="rounded-xl border-2 border-red-500/60 bg-neutral-900 px-4 py-2 text-sm font-medium text-red-500 transition hover:bg-red-500/10">
        Returning home
      </Link>
    </div>
  );
}
