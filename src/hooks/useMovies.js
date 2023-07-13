import { useEffect, useState } from 'react';

import { API_KEY } from '../data';

export const useMovies = query => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const fetchMovies = async () => {
      setError('');
      setIsLoading(true);
      try {
        const res = await fetch(`${API_KEY}&s=${query}`, {
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error('Something went wrong while fetching movies');
        }

        const resData = await res.json();

        if (resData.Response === 'False') {
          throw new Error('No movies found');
        }

        setMovies(resData.Search);
        setError('');
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
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

    return () => {
      controller.abort();
    };
  }, [query]);

  return { movies, isLoading, error };
};
