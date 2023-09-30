import Movie from "./Movie";

const MovieList = ({ movies, onSelectedMovie }) => {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie key={movie?.imdbID} movie={movie} onSelectedMovie={onSelectedMovie} />
      ))}
    </ul>
  );
};

export default MovieList;
