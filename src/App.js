import React, { useState } from 'react';

// import { tempMovieData } from './data';
// import { tempWatchedData } from './data';
// import { API_KEY } from './data';

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

import { useMovies } from './hooks/useMovies';
import { useLocalStorageState } from './hooks/useLocalStorageState';

export default function App() {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  const [watched, setWatched] = useLocalStorageState('watched');

  const { movies, isLoading, error } = useMovies(query);

  const movieSelectHandler = movieId => {
    setSelectedId(prevId => (prevId === movieId ? null : movieId));
  };

  const closeMovieHandler = () => {
    setSelectedId(null);
  };

  const addWatchedMovieHandler = movie => {
    setWatched(prevWatched => {
      return [...prevWatched, movie];
    });
  };

  const deleteWatchedHandler = id => {
    setWatched(prevWatched => prevWatched.filter(el => el.imdbId !== id));
  };

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
              onAddWatched={addWatchedMovieHandler}
              watched={watched}
            />
          ) : (
            <React.Fragment>
              <WatchedSummary watched={watched} />
              <WatchedList
                watched={watched}
                onDeleteWatched={deleteWatchedHandler}
              />
            </React.Fragment>
          )}
        </Box>
      </Main>
    </React.Fragment>
  );
}
