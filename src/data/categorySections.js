export const categorySections = {
  home: [
    { title: "Popular Movies", endpoint: "popular" },
    { title: "Top Rated Movies", endpoint: "top_rated" },
    { title: "Upcoming Movies", endpoint: "upcoming" },
  ],

  popular: [{ title: "Popular Movies", endpoint: "popular" }],

  "top-rated": [{ title: "Top Rated Movies", endpoint: "top_rated" }],

  movies: [
    { title: "Popular Movies", endpoint: "popular" },
    { title: "Top Rated Movies", endpoint: "top_rated" },
    { title: "Upcoming Movies", endpoint: "upcoming" },
    { title: "Now Playing", endpoint: "now_playing" },
  ],

  "tv-series": [
    { title: "Popular Series", endpoint: "popular" },
    { title: "Top Rated Series", endpoint: "top_rated" },
    { title: "Airing Today", endpoint: "airing_today" },
    { title: "On The Air", endpoint: "on_the_air" },
  ],

  "airing-today": [{ title: "Airing Today", endpoint: "airing_today" }],

  "all-movies": [{ title: "All Movies", endpoint: "discover" }],
};
