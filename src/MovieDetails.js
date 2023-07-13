import React, { useEffect, useRef, useState } from 'react';

import StarRating from './StarRating';

import { API_KEY } from './data';
import { Loader } from './Loader';

export const MovieDetails = ({
  selectedId,
  onCloseMovie,
  onAddWatched,
  watched,
}) => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState('');

  const countRef = useRef(0);

  const isWatched = watched.filter(el => el.imdbId === selectedId).length > 0;
  const watchedUserRating = watched.find(
    el => el.imdbId === selectedId
  )?.userRating;

  const addHandler = () => {
    const newWatchedMovie = {
      imdbId: selectedId,
      imdbRating: +movie.imdbRating,
      Title: movie.Title,
      year: movie.Year,
      runtime: +movie.Runtime.split(' ')[0],
      Poster: movie.Poster,
      userRating,
      countRatingDecisions: countRef.current,
    };

    onAddWatched(newWatchedMovie);
    onCloseMovie();
  };

  useEffect(() => {
    if (userRating) {
      ++countRef.current;
    }
  }, [userRating]);

  useEffect(() => {
    const escapeCloseHanlder = e => {
      if (e.code === 'Escape' || e.code === 'Esc') {
        onCloseMovie();
      }
    };

    document.addEventListener('keydown', escapeCloseHanlder);

    return () => {
      document.removeEventListener('keydown', escapeCloseHanlder);
    };
  }, []);

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
  }, [selectedId]);

  useEffect(() => {
    if (!movie.Title) return;
    document.title = `Movie | ${movie.Title}`;

    return () => {
      document.title = 'UsePopcorn';
    };
  }, [movie]);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <React.Fragment>
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
              {!isWatched ? (
                <React.Fragment>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 ? (
                    <button onClick={addHandler} className="btn-add">
                      + Add to list
                    </button>
                  ) : null}
                </React.Fragment>
              ) : (
                <p>You rated this movie {watchedUserRating}</p>
              )}
            </div>
            <p>
              <em>{movie.Plot}</em>
            </p>
            <p>Starring: {movie.Actors}</p>
            <p>Directed by: {movie.Director}</p>
          </section>
        </React.Fragment>
      )}
    </div>
  );
};
