export function checkTmdbToken() {
  if (!import.meta.env.VITE_TMDB_TOKEN) {
    console.error(
      "VITE_TMDB_TOKEN is missing. Create a .env file with VITE_TMDB_TOKEN=your_token",
    );
    return false;
  }
  return true;
}
