import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import "./StarRating.css";

const StarRating = ({ projectId }) => {
  const [rating, setRating] = useState(null);
  const [rated, setRated] = useState(false);
  const [hover, setHover] = useState(null);
  const [averageRating, setAverageRating] = useState(null);

  useEffect(() => {
    const ratings = JSON.parse(localStorage.getItem("ratings")) || {};

    if (ratings[projectId]) {
      setRating(ratings[projectId]);
      setRated(true);
    }

    const projectRatings = Object.values(ratings);
    const sum = projectRatings.reduce((total, rating) => total + rating, 0);
    const average = sum / projectRatings.length;
    setAverageRating(average);
  }, [projectId]);

  const handleRatingChange = (selectedRating) => {
    if (!rated) {
      const ratings = JSON.parse(localStorage.getItem("ratings")) || {};
      const updatedRatings = { ...ratings, [projectId]: selectedRating };
      localStorage.setItem("ratings", JSON.stringify(updatedRatings));
      setRating(selectedRating);
      setRated(true);
    }
  };

  return (
    <>
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;

        return (
          <label key={index}>
            <input
              type="radio"
              name={`rating_${projectId}`}
              value={ratingValue}
              onClick={() => handleRatingChange(ratingValue)}
              disabled={rated}
            />
            <FaStar
              size={16}
              className="star"
              color={
                ratingValue <= rating || ratingValue <= hover
                  ? "#ffc107"
                  : "#e4e5e9"
              }
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}

      <span className="rating-label">
        {averageRating && averageRating.toFixed(1)}
      </span>
    </>
  );
};

export default StarRating;
