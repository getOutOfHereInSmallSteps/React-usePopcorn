import React from 'react';
import { WatchedMovie } from './WatchedMovie';

export const WatchedList = ({ watched }) => {
  return (
    <ul className="list">
      {watched.map(movie => (
        <WatchedMovie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
};
