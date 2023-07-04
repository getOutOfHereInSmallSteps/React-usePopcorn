import React from 'react';

const containerStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
};

const starContainerStyles = {
  display: 'flex',
  gap: '4px',
};

const textStyle = {
  lineHeight: '1',
  margin: '0',
};

export const StarRating = ({ maxRating = 5 }) => {
  return (
    <div style={containerStyles}>
      <div style={starContainerStyles}>
        {Array.from({ length: maxRating }, (_, i) => (
          <span>S{i + 1}</span>
        ))}
      </div>
      <p style={textStyle}>10</p>
    </div>
  );
};
