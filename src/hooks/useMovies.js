import { useEffect, useState } from "react";

function useMovies(query, callbackFn) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // * AbortController, to abort an asynchronous operation
    const controller = new AbortController();

    // * Fetch Movie Data from OMDB
    async function fetchMovies() {
      try {
        callbackFn?.();

        setIsLoading(true);
        setError("");

        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDBAPI}&s=${query}`,
          { signal: controller.signal }
        );
        /**
         * * Checking response is ok or not. If not, then throw an error.
         */
        if (!response.ok)
          throw new Error("Something went wrong with the fetching movie Data");

        const responseData = await response.json();
        /**
         * * Checking movie data is found or not. If not, then throw an error.
         */
        if (responseData.Response === "False")
          throw new Error("Movie not found, Try another movie");

        setMovies(responseData?.Search);
        setError("");
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    if (query.length < 3) {
      setMovies([]);
      setError("");

      return;
    }

    // handleCloseMovie();
    fetchMovies();

    return function () {
      // Cancel any asynchronous operations that are still in progress.
      controller.abort();
    };
  }, [query]);

  return { movies, isLoading, error };
}

export default useMovies;
