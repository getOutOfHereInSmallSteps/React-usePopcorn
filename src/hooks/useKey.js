import { useEffect } from 'react';

export const useKey = (keyCode, callback) => {
  useEffect(() => {
    const escapeCloseHanlder = e => {
      if (e.code.toLowerCase() === keyCode.trim().toLowerCase()) {
        callback();
      }
    };

    document.addEventListener('keydown', escapeCloseHanlder);

    return () => {
      document.removeEventListener('keydown', escapeCloseHanlder);
    };
  }, [keyCode, callback]);
};
