# CineTrack

A movie discovery and tracking web app built with React.

[GitHub Repository](https://github.com/daryamardani14-tech/cine-track) · Live Demo coming soon

![CineTrack Preview](public/cine-track-preview.png)

## Features

- Browse popular, top-rated, upcoming, and currently playing movies
- Browse TV series and airing today
- Search for movies
- View movie details, cast, director, genres, rating, and release date
- Add movies to Favorites
- Add movies to Wishlist
- Mark movies as Watched
- Personal library for saved movies
- Responsive layout for desktop and mobile
- Dark cinematic UI
- Toast notifications for library actions

## Tech Stack

- React
- Vite
- Tailwind CSS
- React Router
- Lucide React
- TMDB API

## Getting Started

Clone the repository and install the dependencies:

```bash
npm install
```

Create a `.env` file in the project root and add your TMDB token:

```env
VITE_TMDB_TOKEN=your_token_here
```

Start the development server:

```bash
npm run dev
```

The app will be available at the local address shown in the terminal.

## Build

To create a production build:

```bash
npm run build
```

The production files will be generated in the `dist` folder.

## API

Movie and TV data is provided by [The Movie Database (TMDB)](https://www.themoviedb.org/).

This project is not affiliated with or endorsed by TMDB.

## Project Status

CineTrack is a portfolio project and is still open to small UI and UX improvements.

## License

This project is for learning and portfolio purposes.
