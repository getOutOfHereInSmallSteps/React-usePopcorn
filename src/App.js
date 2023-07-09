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

const API_KEY = 'https://www.omdbapi.com/?i=tt3896198&apikey=45871cbf';

const ErrorMessage = ({ children }) => {
  return <p className="error">{children}</p>;
};

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [query, setQuery] = useState('interstellar');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const moviesCount = movies.length;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${API_KEY}&s=${query}`);

        if (!res.ok)
          throw new Error('Something went wrong while fetching movies');

        const resData = await res.json();

        setMovies(resData.Search);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <React.Fragment>
      <NavBar>
        <Search />
        <NumResults moviesCount={moviesCount} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && <MovieList movies={movies} />}
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </Box>
        <Box>
          <WatchedSummary watched={watched} />
          <WatchedList watched={watched} />
        </Box>
      </Main>
    </React.Fragment>
  );
}
