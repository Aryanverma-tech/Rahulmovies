import React, { useContext, useState, useEffect, useCallback } from "react";
import { Grid, CircularProgress, Typography, Container, Box } from "@mui/material";
import MovieCard from "../components/MovieCard";
import { MovieContext } from "../context/MovieContext";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMovies } from "../api/config";

const HomePage = ({ searchQuery }) => {
  const { movies, setMovies, totalResults, setTotalResults, loading, setLoading } = useContext(MovieContext);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      const data = await fetchMovies(searchQuery, 1);
      if (data.Search) {
        setMovies(data.Search);
        setTotalResults(parseInt(data.totalResults, 10) || 0);
      }
      setLoading(false);
    };

    loadMovies();
  }, [searchQuery, setMovies, setTotalResults, setLoading]);

  const loadMoreMovies = useCallback(async () => {
    if (movies.length >= totalResults) return; // Stop if all movies are loaded
    const nextPage = page + 1;
    setPage(nextPage);

    const data = await fetchMovies(searchQuery, nextPage);
    if (data.Search) {
      setMovies((prevMovies) => [...prevMovies, ...data.Search]);
    }
  }, [page, movies.length, totalResults, searchQuery, setMovies]);

  return (
    <Container maxWidth="lg">
      <Box textAlign="center" my={4}>
        <Typography variant="h3" fontWeight="bold" color="white">
          🎬 Rahul Movies
        </Typography>
        <Typography variant="subtitle1" color="gray">
          Discover your favorite movies with ease!
        </Typography>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" my={5}>
          <CircularProgress />
        </Box>
      ) : (
        <InfiniteScroll
          dataLength={movies.length}
          next={loadMoreMovies}
          hasMore={movies.length < totalResults}
          loader={<CircularProgress />}
          style={{ overflow: "hidden" }}
        >
          <Grid container spacing={3} justifyContent="center">
            {movies.map((movie) => (
              <Grid item key={movie.imdbID} xs={12} sm={6} md={4} lg={3}>
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>
        </InfiniteScroll>
      )}
    </Container>
  );
};

export default HomePage;
