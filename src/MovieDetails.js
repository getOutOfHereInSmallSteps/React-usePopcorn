import React, { useEffect, useState } from 'react';

import StarRating from './StarRating';

import { API_KEY } from './data';

export const MovieDetails = ({ selectedId, onCloseMovie }) => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${API_KEY}&i=${selectedId}`);

        const resData = await res.json();

        setMovie(resData);
      } catch (e) {
      } finally {
        setIsLoading(false);
      }
    };

    getMovieDetails();
  }, []);

  return (
    <div className="details">
      <header>
        <button className="btn-back" onClick={onCloseMovie}>
          &larr;
        </button>
        <img src={movie.Poster} alt={`The poster of ${movie.Title}`} />
        <div className="details-overview">
          <h2>{movie.Title}</h2>
          <p>
            {movie.Released} &bull; {movie.Runtime}
          </p>
          <p>{movie.Genre}</p>
          <p>
            <span>⭐️</span>
            {movie.imdbRating} IMDB Rating
          </p>
        </div>
      </header>

      <section>
        <div className="rating">
          <StarRating maxRating={10} size={24} />
        </div>
        <p>
          <em>{movie.Plot}</em>
        </p>
        <p>Starring: {movie.Actors}</p>
        <p>Directed by: {movie.Director}</p>
      </section>

      {isLoading && 'loading...'}
    </div>
  );
};
