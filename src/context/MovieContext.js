import React, { createContext, useState } from "react";

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);

  return (
    <MovieContext.Provider value={{ movies, setMovies, totalResults, setTotalResults, loading, setLoading }}>
      {children}
    </MovieContext.Provider>
  );
};
