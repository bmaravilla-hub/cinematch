import React from 'react';
import { Star } from 'lucide-react';
import './RatingBadge.css';

export interface RatingBadgeProps {
  rating: number;
  count?: number;
  size?: 'sm' | 'md';
}

export const RatingBadge: React.FC<RatingBadgeProps> = ({
  rating,
  count,
  size = 'md'
}) => {
  return (
    <div className={`cm-rating-badge cm-rating-badge-${size}`}>
      <Star size={size === 'sm' ? 12 : 14} fill="var(--accent-pink)" stroke="var(--accent-pink)" />
      <span className="cm-rating-value">{rating.toFixed(1)}</span>
      {count !== undefined && (
        <span className="cm-rating-count">
          ({count > 1000 ? `${(count / 1000).toFixed(0)}k` : count})
        </span>
      )}
    </div>
  );
};
