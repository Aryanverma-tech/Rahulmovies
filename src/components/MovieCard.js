import React from "react";
import { Card, CardContent, Typography, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <Card sx={{ maxWidth: 250, margin: 2 }}>
      <Link to={`/movie/${movie.imdbID}`} style={{ textDecoration: "none" }}>
        <CardMedia component="img" height="350" image={movie.Poster} alt={movie.Title} />
        <CardContent>
          <Typography variant="h6">{movie.Title}</Typography>
          <Typography variant="body2" color="textSecondary">{movie.Year}</Typography>
        </CardContent>
      </Link>
    </Card>
  );
};

export default MovieCard;
