import axios from "axios";

const API_KEY = "b9bd48a6";
const BASE_URL = "https://www.omdbapi.com/";

export const fetchMovies = async (search, page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&s=${search}&page=${page}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return { Search: [], totalResults: "0" };
  }
};

export const fetchMovieDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};
