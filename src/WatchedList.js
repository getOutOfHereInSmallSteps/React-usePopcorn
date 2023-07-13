import React from 'react';
import { WatchedMovie } from './WatchedMovie';

export const WatchedList = ({ watched, onDeleteWatched }) => {
  return (
    <ul className="list">
      {watched.map(movie => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbId}
          onDelete={onDeleteWatched}
        />
      ))}
    </ul>
  );
};
