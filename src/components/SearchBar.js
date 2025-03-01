import React, { useState, useEffect, useContext } from "react";
import { TextField, CircularProgress } from "@mui/material";
import { fetchMovies } from "../api/confik";
import { MovieContext } from "../context/MovieContext";
import debounce from "lodash.debounce";

const SearchBar = () => {
  const { setMovies, setTotalResults, setLoading } = useContext(MovieContext);
  const [query, setQuery] = useState("");

  const handleSearch = debounce(async (searchTerm) => {
    setLoading(true);
    const data = await fetchMovies(searchTerm);
    setMovies(data.Search || []);
    setTotalResults(data.totalResults || 0);
    setLoading(false);
  }, 500);

  useEffect(() => {
    if (query) handleSearch(query);
  }, [query]);

  return (
    <TextField
      fullWidth
      variant="outlined"
      label="Search Movies..."
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};

export default SearchBar;
