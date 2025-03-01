import React, { useContext, useState, useEffect, useCallback, useMemo, useRef } from "react";
import { Grid, CircularProgress, Typography, Container, Box } from "@mui/material";
import MovieCard from "../components/MovieCard";
import { MovieContext } from "../context/MovieContext";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMovies } from "../api/config";

const HomePage = ({ searchQuery }) => {
  const { movies, setMovies, totalResults, setTotalResults, loading, setLoading } = useContext(MovieContext);
  const [page, setPage] = useState(1);
  const hasMoreRef = useRef(true);

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      const data = await fetchMovies(searchQuery, 1);
      if (data.Search) {
        setMovies(data.Search);
      }
      setTotalResults(data.totalResults || 0);
      setLoading(false);
    };

    loadMovies();
  }, [searchQuery, setMovies, setTotalResults, setLoading]);

  const loadMoreMovies = useCallback(async () => {
    if (loading || !hasMoreRef.current) return; 
    setLoading(true);
    const nextPage = page + 1;
    const data = await fetchMovies(searchQuery, nextPage);
    if (data.Search) {
      setMovies((prevMovies) => [...prevMovies, ...data.Search]);
      setPage(nextPage);
    } else {
      hasMoreRef.current = false;
    }
    setLoading(false);
  }, [page, searchQuery, setMovies, loading]);

  const memoizedMovies = useMemo(() => movies, [movies]);

  return (
    <Container maxWidth="lg" sx={{ backgroundColor: "#121212", color: "white", minHeight: "100vh", paddingBottom: "2rem", padding: "20px" }}>
      {/* Title Section */}
      <Box textAlign="left" my={4}>
        <Typography variant="h2" fontWeight="bold" color="white" sx={{ fontSize: "3rem", textTransform: "uppercase", letterSpacing: "2px" }}>
          🎬 MoviesForEnergy
        </Typography>
      </Box>

      {/* Movie Listings */}
      {loading && page === 1 ? (
        <Box display="flex" justifyContent="center" my={5}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ overflow: "hidden", padding: "10px", borderRadius: "8px", backgroundColor: "#1A1A1A" }}>
          <InfiniteScroll
            dataLength={memoizedMovies.length}
            next={loadMoreMovies}
            hasMore={memoizedMovies.length < totalResults}
            loader={<CircularProgress sx={{ display: "block", margin: "auto" }} />}
            style={{ overflow: "visible" }}
          >
            <Grid container spacing={4} justifyContent="flex-start">
              {memoizedMovies.map((movie) => (
                <Grid item key={movie.imdbID} xs={12} sm={6} md={4} lg={3} sx={{ transition: "transform 0.3s", '&:hover': { transform: "scale(1.05)" } }}>
                  <MovieCard movie={movie} />
                </Grid>
              ))}
            </Grid>
          </InfiniteScroll>
        </Box>
      )}
    </Container>
  );
};

export default HomePage;
