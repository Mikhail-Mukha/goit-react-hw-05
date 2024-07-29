import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../api";
import s from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [notReviews, setNotReviews] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await fetchMovieReviews(movieId);
        if (data.length === 0) {
          setNotReviews(true);
        } else {
          setReviews(data);
          setNotReviews(false);
        }
        setError(null);
      } catch (error) {
        setError("Filed to fetch movie reviews.");
        setNotReviews(false);
      }
    };
    fetchReviews();
  }, [movieId]);
  return (
    <div className={s.reviewsContainer}>
      {error && <p className={s.error}>{error}</p>}
      {notReviews && !error && (
        <p className={s.noReviews}>There are no reviews.</p>
      )}
      <ul className={s.reviewsList}>
        {reviews.map((review) => (
          <li key={review.id} className={s.reviewItem}>
            <p className={s.reviewAuthor}>Author: {review.author}</p>
            <p className={s.reviewContent}>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
