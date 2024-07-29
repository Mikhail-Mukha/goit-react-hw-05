import { useEffect, useState } from "react";
import s from "./HomePage.module.css";
import { fetchTrendingMovies } from "../../../api";
import MovieList from "../../MovieList/MovieList";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const FetchData = async () => {
      try {
        const data = await fetchTrendingMovies();
        setMovies(data);
      } catch (error) {
        setError("Error fetching trending movies. Please try again later.");
      }
    };
    FetchData();
  });

  return (
    <div>
      <h2 className={s.title}>The most current movies:</h2>
      {error ? <p>{error}</p> : <MovieList movies={movies} />}
    </div>
  );
};

export default HomePage;
