import React, { useContext, useState, useEffect } from "react";
import { Grid, CircularProgress } from "@mui/material";
import MovieCard from "../components/MovieCard";
import { MovieContext } from "../context/MovieContext";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMovies } from "../api/confik";

const HomePage = ({ searchQuery }) => { // ✅ Accept searchQuery as a prop
  const { movies, setMovies, totalResults, setTotalResults, loading, setLoading } = useContext(MovieContext);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      const data = await fetchMovies(searchQuery, 1);
      setMovies(data.Search || []);
      setTotalResults(data.totalResults || 0);
      setLoading(false);
    };

    loadMovies();
  }, [searchQuery]); // ✅ Fetch movies when searchQuery changes

  const loadMoreMovies = async () => {
    const nextPage = page + 1;
    const data = await fetchMovies(searchQuery, nextPage);
    setMovies((prev) => [...prev, ...(data.Search || [])]);
    setPage(nextPage);
  };

  return (
    <div>
      {loading && <CircularProgress />}
      <InfiniteScroll dataLength={movies.length} next={loadMoreMovies} hasMore={movies.length < totalResults} loader={<CircularProgress />}>
        <Grid container spacing={2}>
          {movies.map((movie) => <MovieCard key={movie.imdbID} movie={movie} />)}
        </Grid>
      </InfiniteScroll>
    </div>
  );
};

export default HomePage;
