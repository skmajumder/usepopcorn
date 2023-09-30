import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";

const MovieDetails = ({ selectedID, onCloseMovie }) => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  useEffect(() => {
    const fetchMovieDetails = () => {
      return new Promise(async (resolve, reject) => {
        try {
          setIsLoading(true);
          const response = await fetch(
            `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDBAPI}&i=${selectedID}`
          );

          if (!response.ok) {
            throw new Error(
              "Something went wrong with the fetching movie Data"
            );
          }

          const responseData = await response.json();
          resolve(responseData);
        } catch (error) {
          reject(error);
        } finally {
          setIsLoading(false);
        }
      });
    };

    fetchMovieDetails()
      .then((movieData) => {
        setMovie(movieData);
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      // Cleanup function
    };
  }, [selectedID]);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Post of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb Rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              <StarRating maxRating={10} size={24} />
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring: {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
