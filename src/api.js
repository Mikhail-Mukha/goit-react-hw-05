import axios from "axios";

const API_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YjhmNTBlNWM1MmViYTQwODIxNjdiZGMyZDZhNDdjOSIsIm5iZiI6MTcyMjE5MjMzOC41Mzc4Nywic3ViIjoiNjZhNTIwYmU3MGE4YzY2ZDM2ODdjZDJiIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.R0Vb5x3Is6HWJFXufFnSCeS3LZojf2bAVJFXMk7A5t0";
const BASE_URL = "https://api.themoviedb.org/3";

const fetchTrendingMovies = async () => {
  const res = await axios.get(`${BASE_URL}/trending/movie/day`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  return res.data.results;
};

const searchMovies = async (query) => {
  const response = await axios.get(`${BASE_URL}/search/movie`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
    params: {
      query,
    },
  });
  return response.data.results;
};

const fetchMovieDetails = async (movieId) => {
  const res = await axios.get(`${BASE_URL}/movie/${movieId}`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  return res.data;
};

const fetchMovieCredits = async (movieId) => {
  const res = await axios.get(`${BASE_URL}/movie/${movieId}/credits`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  return res.data.cast;
};

const fetchMovieReviews = async (movieId) => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}/reviews`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  return response.data.results;
};

export {
  fetchTrendingMovies,
  searchMovies,
  fetchMovieDetails,
  fetchMovieCredits,
  fetchMovieReviews,
};
