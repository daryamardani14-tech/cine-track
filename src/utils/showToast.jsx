import toast from "react-hot-toast";
import { Heart, Bookmark, Eye, Check, X as XIcon } from "lucide-react";

const CONFIG = {
  favorite: { icon: Heart, label: "Favorites" },
  wishlist: { icon: Bookmark, label: "Wishlist" },
  watched: { icon: Eye, label: "Watched" },
};

export function showMovieToast({ type, added, movieTitle }) {
  const { icon: Icon, label } = CONFIG[type];

  toast.custom(
    t => (
      <div
        className={`flex items-center gap-3 overflow-hidden rounded-xl border-y border-r border-white/10 bg-neutral-900 shadow-[0_12px_40px_rgba(0,0,0,0.75)] transition-all duration-300 ${
          t.visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
        }`}
        style={{ minWidth: "280px" }}>
        <div
          className={`h-full w-[3px] self-stretch shrink-0 ${
            added ? "bg-red-500" : "bg-neutral-500"
          }`}
        />

        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
            added
              ? "bg-red-500/15 text-red-500"
              : "bg-white/10 text-neutral-300"
          }`}>
          {added ? <Icon size={16} fill="currentColor" /> : <XIcon size={16} />}
        </div>

        <div className="min-w-0 py-3 pr-4">
          <p className="truncate text-[13px] font-semibold text-white">
            {movieTitle}
          </p>
          <p className="text-[11px] font-medium text-neutral-400">
            {added ? "Added to" : "Removed from"}{" "}
            <span className={added ? "text-red-400" : "text-neutral-300"}>
              {label}
            </span>
          </p>
        </div>

        {added && (
          <Check size={15} className="mr-3 ml-auto shrink-0 text-red-500" />
        )}
      </div>
    ),
    { duration: 2200 },
  );
}
