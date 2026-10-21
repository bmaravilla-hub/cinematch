import React, { useMemo } from 'react';
import { ThumbsUp } from 'lucide-react';
import { useCineMatch } from '../hooks/useCineMatch';
import { MovieCard } from '../components/ui/MovieCard';
import { SectionHeader } from '../components/ui/SectionHeader';
import './RecommendationsView.css';

export const RecommendationsView: React.FC = () => {
  const { movies, ratings, navigate } = useCineMatch();

  const favoriteRating = useMemo(() => {
    return ratings.find((r) => r.score >= 4) || ratings[0];
  }, [ratings]);

  const sourceMovie = useMemo(() => {
    if (!favoriteRating) return movies[0];
    return movies.find((m) => m.id === favoriteRating.movieId) || movies[0];
  }, [favoriteRating, movies]);

  const becauseYouLiked = useMemo(() => {
    if (!sourceMovie) return movies.slice(0, 5);
    return movies
      .filter(
        (m) =>
          m.id !== sourceMovie.id &&
          m.genres.some((g) => sourceMovie.genres.includes(g))
      )
      .slice(0, 5);
  }, [sourceMovie, movies]);

  const topPicksForYou = useMemo(() => {
    return [...movies]
      .filter((m) => m.id !== sourceMovie?.id && !becauseYouLiked.some((b) => b.id === m.id))
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 5);
  }, [movies, sourceMovie, becauseYouLiked]);

  return (
    <div className="cm-recs-view">
      <div className="cm-recs-hero">
        <h1 className="cm-recs-title">Recomendaciones para ti</h1>
        <p className="cm-recs-subtitle">
          Sugerencias seleccionadas a partir de tus calificaciones y géneros favoritos.
        </p>
      </div>

      <section className="cm-recs-section">
        <SectionHeader
          title="Recomendaciones personalizadas"
          subtitle="Títulos con alta puntuación según tus géneros preferidos"
          actionText="Ver catálogo completo >"
          onAction={() => navigate('catalog')}
        />
        <div className="cm-recs-grid">
          {topPicksForYou.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      {sourceMovie && (
        <section className="cm-recs-section">
          <SectionHeader
            title="Porque te gustó"
            accentTitle={sourceMovie.title}
            subtitle={`Películas con elementos compartidos de ${sourceMovie.genres.join(', ')}`}
          />
          <div className="cm-recs-grid">
            {becauseYouLiked.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
      )}

      <div className="cm-recs-feedback-banner">
        <div className="cm-recs-feedback-icon">
          <ThumbsUp size={22} color="var(--brand-primary)" />
        </div>
        <div className="cm-recs-feedback-text">
          <h4>¿Quieres recomendaciones más precisas?</h4>
          <p>Califica más películas del catálogo para enriquecer tu catálogo personalizado.</p>
        </div>
      </div>
    </div>
  );
};
