import React from 'react';

export const NumResults = ({ moviesCount }) => {
  return (
    <p className="num-results">
      Found <strong>{moviesCount}</strong> results
    </p>
  );
};
