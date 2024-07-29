import { useParams } from "react-router-dom";
import s from "./MovieCast.module.css";
import { fetchMovieCredits } from "../../api";
import { useEffect, useState } from "react";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);
  const [notCast, setNotCast] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMovieCredits(movieId);
        if (data.length === 0) {
          setNotCast(true);
        } else {
          setCast(data);
          setNotCast(false);
        }
        setError(null);
      } catch (error) {
        setError("Failed to fetch movie credits.");
        setNotCast(false);
      }
    };
    fetchData();
  }, [movieId]);

  return (
    <div>
      {error && <p className={s.error}>{error}</p>}
      {notCast && !error && <p className={s.error}>Cast is missing.</p>}
      <ul>
        {cast.map((actor) => {
          return (
            <li key={actor.cast_id}>
              <p className={s.p}>{actor.name}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MovieCast;
