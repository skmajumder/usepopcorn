import React from "react";
import noThumb from "./assets/no-image.png";

const Movie = ({ movie, onSelectedMovie }) => {
  console.log(movie.Poster);
  const moviePoster = movie.Poster === "N/A" ? noThumb : movie.Poster;
  return (
    <li key={movie.imdbID} onClick={() => onSelectedMovie(movie.imdbID)}>
      <img src={moviePoster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
};

export default Movie;
