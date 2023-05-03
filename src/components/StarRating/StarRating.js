import React from "react";

const StarRating = ({ rating }) => {
  // create an array with 5 elements representing the stars
  const stars = new Array(5).fill(0);

  // fill the first 'rating' stars with a filled star icon
  for (let i = 0; i < rating; i++) {
    stars[i] = 1;
  }

  return (
    <div className="star-rating">
      {stars.map((star, index) => (
        <span key={index} className={star === 1 ? "filled" : "unfilled"}>
          &#9733;
        </span>
      ))}
    </div>
  );
};

export default StarRating;
