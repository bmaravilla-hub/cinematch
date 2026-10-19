import React, { useState } from 'react';
import { Star } from 'lucide-react';
import './StarRating.css';

export interface StarRatingProps {
  value: number;
  max?: number;
  interactive?: boolean;
  onChange?: (score: number) => void;
  size?: number;
}

export const StarRating: React.FC<StarRatingProps> = ({
  value,
  max = 5,
  interactive = false,
  onChange,
  size = 18
}) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const displayValue = hoverValue !== null ? hoverValue : value;

  return (
    <div
      className={`cm-star-rating ${interactive ? 'interactive' : ''}`}
      onMouseLeave={() => interactive && setHoverValue(null)}
      role={interactive ? 'radiogroup' : undefined}
      aria-label="Calificación con estrellas"
    >
      {Array.from({ length: max }, (_, index) => {
        const starNumber = index + 1;
        const isFilled = starNumber <= Math.round(displayValue);

        return (
          <button
            key={starNumber}
            type="button"
            className={`cm-star-btn ${isFilled ? 'filled' : ''}`}
            disabled={!interactive}
            onClick={() => interactive && onChange && onChange(starNumber)}
            onMouseEnter={() => interactive && setHoverValue(starNumber)}
            aria-label={`${starNumber} de ${max} estrellas`}
          >
            <Star
              size={size}
              className={`cm-star-icon ${isFilled ? 'filled' : ''}`}
              fill={isFilled ? 'var(--accent-pink)' : 'transparent'}
              stroke={isFilled ? 'var(--accent-pink)' : 'var(--text-dim)'}
              strokeWidth={1.8}
            />
          </button>
        );
      })}
    </div>
  );
};
