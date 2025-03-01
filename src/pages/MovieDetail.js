import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchMovieDetails } from "../api/config";
import { Button, Typography, Container } from "@mui/material";

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchMovieDetails(id).then(setMovie);
  }, [id]);

  if (!movie) return <Typography>Loading...</Typography>;

  return (
    <Container>
      <Button onClick={() => navigate(-1)}>Back</Button>
      <Typography variant="h4">{movie.Title}</Typography>
      <Typography>{movie.Plot}</Typography>
    </Container>
  );
};

export default MovieDetail;
