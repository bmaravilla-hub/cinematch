import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { ThumbsUp, AlertCircle, RefreshCw, Sparkles } from 'lucide-react';
import { useCineMatch } from '../hooks/useCineMatch';
import { MovieCard } from '../components/ui/MovieCard';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Button } from '../components/ui/Button';
import { apiService, type RecommendationItem } from '../services/api';
import './RecommendationsView.css';

export const RecommendationsView: React.FC = () => {
  const { movies, ratings, user, navigate } = useCineMatch();
  const [backendRecs, setBackendRecs] = useState<RecommendationItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const fetchRecommendations = useCallback(() => {
    let isMounted = true;
    setIsLoading(true);
    setFetchError(null);

    apiService.getRecommendations(user.id, 6)
      .then((data) => {
        if (isMounted) {
          setBackendRecs(data || []);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.warn('[RecommendationsView] Error al consultar recomendaciones reales:', err);
          setFetchError(
            'El motor de recomendaciones no está disponible. Asegúrate de que el backend de CineMatch esté ejecutándose en http://localhost:3001.'
          );
          setBackendRecs([]);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [user.id]);

  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations, ratings]);

  const favoriteRating = useMemo(() => {
    return ratings.find((r) => r.score >= 4) || ratings[0];
  }, [ratings]);

  const sourceMovie = useMemo(() => {
    if (!favoriteRating) return movies[0];
    return movies.find((m) => m.id === favoriteRating.movieId) || movies[0];
  }, [favoriteRating, movies]);

  const becauseYouLiked = useMemo(() => {
    if (!sourceMovie) return [];
    return movies
      .filter(
        (m) =>
          m.id !== sourceMovie.id &&
          m.genres.some((g) => sourceMovie.genres.includes(g))
      )
      .slice(0, 5);
  }, [sourceMovie, movies]);

  const strategyLabel = useMemo(() => {
    if (backendRecs.length > 0) {
      const isCollab = backendRecs.some((r) => r.strategy === 'collaborative');
      return isCollab
        ? 'Basadas en usuarios con preferencias afines a las tuyas'
        : 'Títulos destacados con las mejores valoraciones de la comunidad';
    }
    return 'Sugerencias personalizadas para tu perfil';
  }, [backendRecs]);

  return (
    <div className="cm-recs-view">
      <div className="cm-recs-hero">
        <h1 className="cm-recs-title">Recomendaciones para ti</h1>
        <p className="cm-recs-subtitle">
          Sugerencias calculadas a partir de tus valoraciones e intereses cinematográficos.
        </p>
      </div>

      <section className="cm-recs-section">
        <SectionHeader
          title="Recomendaciones personalizadas"
          subtitle={strategyLabel}
          actionText="Ver catálogo completo >"
          onAction={() => navigate('catalog')}
        />

        {isLoading && (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
            <p>Cargando recomendaciones personalizadas...</p>
          </div>
        )}

        {fetchError && !isLoading && (
          <div
            style={{
              padding: '1.5rem',
              borderRadius: '8px',
              backgroundColor: 'rgba(239, 68, 68, 0.08)',
              border: '1px solid rgba(239, 68, 68, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              alignItems: 'flex-start',
              margin: '1rem 0'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#ef4444' }}>
              <AlertCircle size={20} />
              <strong style={{ fontSize: '1rem' }}>Servicio de recomendación desconectado</strong>
            </div>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.4' }}>
              {fetchError}
            </p>
            <Button
              variant="outline"
              size="sm"
              icon={<RefreshCw size={14} />}
              onClick={fetchRecommendations}
            >
              Reintentar conexión
            </Button>
          </div>
        )}

        {!isLoading && !fetchError && backendRecs.length > 0 && (
          <div className="cm-recs-grid">
            {backendRecs.map((rec) => (
              <MovieCard key={rec.movie.id} movie={rec.movie} />
            ))}
          </div>
        )}

        {!isLoading && !fetchError && backendRecs.length === 0 && (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
            <Sparkles size={32} style={{ marginBottom: '0.5rem', color: 'var(--brand-primary)' }} />
            <p>No hay recomendaciones disponibles para este perfil.</p>
          </div>
        )}
      </section>

      {sourceMovie && becauseYouLiked.length > 0 && (
        <section className="cm-recs-section">
          <SectionHeader
            title="Porque te gustó"
            accentTitle={sourceMovie.title}
            subtitle={`Exploración por género: títulos relacionados con ${sourceMovie.genres.join(', ')}`}
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
          <h4>¿Quieres afinar tus recomendaciones?</h4>
          <p>Califica más películas para que el sistema aprenda tus preferencias y te sugiera historias más afines.</p>
        </div>
      </div>
    </div>
  );
};
