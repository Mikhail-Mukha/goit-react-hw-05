import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import s from "./App.module.css";
import { ThreeCircles } from "react-loader-spinner";

const MoviesPage = lazy(() =>
  import("./components/pages/MoviesPage/MoviesPage")
);
const HomePage = lazy(() => import("./components/pages/HomePage/HomePage"));
const MovieDetailsPage = lazy(() =>
  import("./components/pages/MovieDetailsPage/MovieDetailsPage")
);
const MovieCast = lazy(() => import("./components/MovieCast/MovieCast"));
const MovieReviews = lazy(() =>
  import("./components/MovieReviews/MovieReviews")
);
const NotFoundPage = lazy(() =>
  import("./components/pages/NotFoundPage/NotFoundPage")
);
const Navigation = lazy(() => import("./components/Navigation/Navigation"));

function App() {
  return (
    <>
      <Navigation />
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
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
