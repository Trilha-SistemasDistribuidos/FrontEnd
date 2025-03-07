// ReviewCard.jsx
import React from 'react';

const ReviewCard = ({ review }) => {
  return (
    <div className="border border-gray-200 p-4 rounded-lg shadow-md">
      <div className="flex items-center mb-2">
        <span className="ml-2 text-sm text-gray-500">({review.rating} ⭐)</span>
      </div>
      <p className="text-gray-700">{review.comment}</p>
    </div>
  );
};

export default ReviewCard;
