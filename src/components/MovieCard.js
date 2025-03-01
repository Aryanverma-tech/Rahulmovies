import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

// ✅ Prevents re-rendering unless the movie data changes
const MovieCard = React.memo(({ movie }) => {
  return (
    <Card sx={{ maxWidth: 300, backgroundColor: "#1c1c1c", color: "white" }}>
      <Link to={`/movie/${movie.imdbID}`} style={{ textDecoration: "none", color: "inherit" }}>
        <CardMedia component="img" height="400" image={movie.Poster} alt={movie.Title} />
        <CardContent>
          <Typography variant="h6" fontWeight="bold">
            {movie.Title}
          </Typography>
          <Typography variant="body2" color="gray">
            {movie.Year}
          </Typography>
        </CardContent>
      </Link>
    </Card>
  );
}, (prevProps, nextProps) => prevProps.movie.imdbID === nextProps.movie.imdbID);

export default MovieCard;
