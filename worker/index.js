export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/tmdb/")) {
      const path = url.pathname.replace("/api/tmdb/", "");
      const tmdbUrl = `https://api.themoviedb.org/3/${path}${url.search}`;

      const response = await fetch(tmdbUrl, {
        headers: {
          Authorization: `Bearer ${env.TMDB_TOKEN}`,
          accept: "application/json",
        },
      });

      const data = await response.text();

      return new Response(data, {
        status: response.status,
        headers: { "content-type": "application/json" },
      });
    }

    return env.ASSETS.fetch(request);
  },
};
