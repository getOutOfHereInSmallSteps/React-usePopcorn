import React, { useEffect, useState } from 'react';

// import { tempMovieData } from './data';
// import { tempWatchedData } from './data';

import { Main } from './Main';
import { MovieList } from './MovieList';
import { NavBar } from './NavBar';
import { NumResults } from './NumResults';
import { Search } from './Search';
import { WatchedSummary } from './WatchedSummary';
import { WatchedList } from './WatchedList';
import { Box } from './Box';
import { Loader } from './Loader';
import { ErrorMessage } from './ErrorMessage';
import { MovieDetails } from './MovieDetails';

const API_KEY = 'https://www.omdbapi.com/?apikey=45871cbf';

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [query, setQuery] = useState('Interstellar');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  const movieSelectHandler = movieId => {
    setSelectedId(prevId => (prevId === movieId ? null : movieId));
  };

  const closeMovieHandler = () => {
    setSelectedId(null);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      setError('');
      setIsLoading(true);
      try {
        const res = await fetch(`${API_KEY}&s=${query}`);

        if (!res.ok) {
          throw new Error('Something went wrong while fetching movies');
        }

        const resData = await res.json();

        if (resData.Response === 'False') {
          throw new Error('No movies found');
        }

        setMovies(resData.Search);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (!query.length) {
      setMovies([]);
      setError('');
      return;
    }
    fetchMovies();
  }, [query]);

  return (
    <React.Fragment>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults moviesCount={movies.length} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList onSelectMovie={movieSelectHandler} movies={movies} />
          )}
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={closeMovieHandler}
            />
          ) : (
            <React.Fragment>
              <WatchedSummary watched={watched} />
              <WatchedList watched={watched} />
            </React.Fragment>
          )}
        </Box>
      </Main>
    </React.Fragment>
  );
}
