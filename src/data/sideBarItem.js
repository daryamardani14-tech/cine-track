import { Home, Compass, Star, PlayCircle, Tv, Clock, Film } from "lucide-react";

export const menuItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "popular", label: "Popular", icon: Compass },
  { id: "top-rated", label: "Top Rated", icon: Star },
];

export const libraryItems = [
  { id: "movies", label: "Movies", icon: PlayCircle },
  { id: "tv-series", label: "TV Series", icon: Tv },
];

export const categoryItems = [
  { id: "airing-today", label: "Airing Today", icon: Clock },
  {
    id: "all-movies",
    label: "All Movies",
    icon: Film,
  },
];

export const generalItems = [];
