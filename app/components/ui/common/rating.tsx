import { useEffect } from "react";

interface RatingInputProps {
  rating: number | undefined;
  setRating: React.Dispatch<number>;
}

export default function RatingInput({ rating, setRating }: RatingInputProps) {
  return (
    <div className="rating">
      <input
        type="radio"
        name="rating-4"
        className="mask mask-star-2 bg-green-500"
        checked={rating === 1}
        onChange={(e) => setRating(1)}
      />
      <input
        type="radio"
        name="rating-4"
        className="mask mask-star-2 bg-green-500"
        checked={rating === 2}
        onChange={(e) => {
          setRating(2);
        }}
      />
      <input
        type="radio"
        name="rating-4"
        className="mask mask-star-2 bg-green-500"
        checked={rating === 3}
        onChange={(e) => setRating(3)}
      />
      <input
        type="radio"
        name="rating-4"
        className="mask mask-star-2 bg-green-500"
        checked={rating === 4}
        onChange={(e) => setRating(4)}
      />
      <input
        type="radio"
        name="rating-4"
        className="mask mask-star-2 bg-green-500"
        checked={rating === 5}
        onChange={(e) => setRating(5)}
      />
    </div>
  );
}
