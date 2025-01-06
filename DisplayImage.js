import React from 'react';
import { useLocation } from 'react-router-dom';

const DisplayImage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const image = queryParams.get('image');

  return (
    <div>
      <h2>Uploaded Image</h2>
      {image ? (
        <img src={`http://localhost:3001/images/${image}`} alt="Uploaded" />
      ) : (
        <p>No image uploaded.</p>
      )}
    </div>
  );
};

export default DisplayImage;
