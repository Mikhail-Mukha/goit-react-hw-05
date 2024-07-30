import { Suspense, useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { ThreeCircles } from "react-loader-spinner";
import { fetchMovieDetails } from "../../api";
import s from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState([]);
  const { movieId } = useParams();
  const [error, setError] = useState(null);
  const location = useLocation();
  const goBack = useRef(location.state ?? "/");

  useEffect(() => {
    try {
      const getData = async () => {
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      };
      getData();
    } catch (error) {
      setError("Error fetching movie details. Please try again later.");
    }
  }, [movieId]);
  if (!movie) {
    return (
      <div className={s.loader}>
        <ThreeCircles
          visible={true}
          height="50"
          width="50"
          color="rgb(9, 217, 186)"
          ariaLabel="three-circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  if (error) {
    return <div className={s.error}>{error}</div>;
  }

  return (
    <>
      <Link className={s.btn} to={goBack.current}>
        Go back!
      </Link>
      <div className={s.div}>
        <img
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt={movie.title}
        />
        <div className={s.details}>
          <h3>{movie.title}</h3>
          <p>
            Overview:
            <span>{movie.overview}</span>
          </p>
          <p>
            Runtime:
            <span>{movie.runtime}</span>
          </p>
          <p>
            Popularity:
            <span>{movie.popularity}</span>
          </p>
        </div>
      </div>
      <div className={s.nav}>
        <NavLink className={s.navlink} to="cast">
          Cast
        </NavLink>
        <NavLink className={s.navlink} to="reviews">
          Reviews
        </NavLink>
      </div>
      <Suspense
        fallback={
          <div className={s.loader}>
            <ThreeCircles
              visible={true}
              height="50"
              width="50"
              color="rgb(9, 217, 186)"
              ariaLabel="three-circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </>
  );
};

export default MovieDetailsPage;
