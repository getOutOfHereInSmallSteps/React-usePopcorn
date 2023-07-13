import { useState, useEffect } from 'react';

export const useLocalStorageState = (key, initialState = []) => {
  const [value, setValue] = useState(() => {
    const storedValue = JSON.parse(localStorage.getItem(key));

    if (!storedValue) return initialState;
    return storedValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
};
