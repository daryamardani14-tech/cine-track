import {
  Home,
  Users,
  Compass,
  Award,
  User,
  Clock,
  Star,
  Download,
  Tv,
  PlayCircle,
  Video,
  Settings,
  LogOut,
} from "lucide-react";

export const menuItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "community", label: "Community", icon: Users },
  { id: "discover", label: "Discover", icon: Compass },
  { id: "awards", label: "Awards", icon: Award },
  { id: "celebs", label: "Celebs", icon: User },
];

export const libraryItems = [
  { id: "recent", label: "Recent", icon: Clock },
  { id: "top-rated", label: "Top rated", icon: Star },
  { id: "downloaded", label: "Downloaded", icon: Download },
];

export const categoryItems = [
  { id: "tv-series", label: "TV Series", icon: Tv },
  { id: "movies", label: "Movies", icon: PlayCircle },
  { id: "trailers", label: "Trailers", icon: Video },
];

export const generalItems = [
  { id: "settings", label: "Settings", icon: Settings },
  { id: "logout", label: "Log out", icon: LogOut },
];
