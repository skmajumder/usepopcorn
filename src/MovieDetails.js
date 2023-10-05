import { useEffect, useRef, useState } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";
import useKey from "./hooks/useKey";

const MovieDetails = ({ selectedID, onCloseMovie, onAddWatched, watched }) => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const countRef = useRef(0);

  const isWatched = watched.map((w) => w.imdbID).includes(selectedID);
  const watchedUserRating = watched.find(
    (w) => w.imdbID === selectedID
  )?.userRating;

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

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedID,
      title,
      year,
      poster,
      runtime: Number(runtime.split(" ").at(0)),
      imdbRating: Number(imdbRating),
      userRating,
      countRatingDecision: countRef.current,
    };

    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  useKey("Escape", onCloseMovie);

  useEffect(() => {
    // * AbortController, to abort an asynchronous operation
    const controller = new AbortController();

    const fetchMovieDetails = () => {
      return new Promise(async (resolve, reject) => {
        try {
          setIsLoading(true);
          const response = await fetch(
            `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDBAPI}&i=${selectedID}`,
            {
              signal: controller.signal,
            }
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
        if (error.name !== "AbortError") {
          console.log(error.message);
        }
      });

    return () => {
      controller.abort();
    };
  }, [selectedID]);

  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;

    return () => {
      document.title = "usePopcorn";
    };
  }, [title]);

  useEffect(() => {
    if (userRating) countRef.current += 1;

    return () => {};
  }, [userRating]);

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
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You Rated this movie <span>🌟</span> {watchedUserRating}
                </p>
              )}
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
