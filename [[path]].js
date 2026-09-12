export async function onRequest(context) {
  const { request, env, params } = context;

  const path = params.path ? params.path.join("/") : "";
  const url = new URL(request.url);

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
    headers: {
      "content-type": "application/json",
    },
  });
}
