import React, { useState } from 'react';

import { tempMovieData } from './data';
import { tempWatchedData } from './data';

import { Main } from './Main';
import { MovieList } from './MovieList';
import { NavBar } from './NavBar';
import { NumResults } from './NumResults';
import { Search } from './Search';
import { WatchedSummary } from './WatchedSummary';
import { WatchedList } from './WatchedList';
import { Box } from './Box';

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);
  const moviesCount = movies.length;

  return (
    <React.Fragment>
      <NavBar>
        <Search />
        <NumResults moviesCount={moviesCount} />
      </NavBar>
      <Main>
        <Box>
          <MovieList movies={movies} />
        </Box>
        <Box>
          <WatchedSummary watched={watched} />
          <WatchedList watched={watched} />
        </Box>
      </Main>
    </React.Fragment>
  );
}
