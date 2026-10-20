import React from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import type { Movie } from '../../types';
import { useCineMatch } from '../../hooks/useCineMatch';
import { RatingBadge } from './RatingBadge';
import './MovieCard.css';

export interface MovieCardProps {
  movie: Movie;
  showRemove?: boolean;
  onRemove?: () => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  showRemove = false,
  onRemove
}) => {
  const { selectMovie, toggleMyList, isInMyList } = useCineMatch();
  const inList = isInMyList(movie.id);

  const handleCardClick = () => {
    selectMovie(movie.id);
  };

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (showRemove && onRemove) {
      onRemove();
    } else {
      toggleMyList(movie.id);
    }
  };

  return (
    <div className="cm-movie-card" onClick={handleCardClick} role="button" tabIndex={0}>
      <div className="cm-movie-card-poster-wrap">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="cm-movie-card-poster"
          loading="lazy"
        />
        <div className="cm-movie-card-overlay">
          <div className="cm-movie-card-top-actions">
            <RatingBadge rating={movie.rating} size="sm" />
            <button
              type="button"
              className={`cm-movie-card-bookmark ${inList ? 'active' : ''}`}
              onClick={handleBookmarkClick}
              aria-label={inList ? 'Quitar de mi lista' : 'Agregar a mi lista'}
            >
              {inList ? (
                <BookmarkCheck size={16} color="var(--brand-primary)" fill="var(--brand-primary)" />
              ) : (
                <Bookmark size={16} color="#FFFFFF" />
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="cm-movie-card-info">
        <h4 className="cm-movie-card-title" title={movie.title}>{movie.title}</h4>
        <div className="cm-movie-card-meta">
          <span className="cm-movie-card-year">{movie.year}</span>
          <span className="cm-movie-card-dot">•</span>
          <span className="cm-movie-card-genre">{movie.genres[0]}</span>
        </div>
      </div>
    </div>
  );
};
