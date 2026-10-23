import React, { useState, useEffect } from 'react';
import { Play, Bookmark, BookmarkCheck, ArrowLeft, Star, Film, CheckCircle2, AlertCircle } from 'lucide-react';
import { useCineMatch } from '../hooks/useCineMatch';
import { Button } from '../components/ui/Button';
import { StarRating } from '../components/ui/StarRating';
import { Tabs } from '../components/ui/Tabs';
import { RatingBadge } from '../components/ui/RatingBadge';
import './MovieDetailView.css';

export const MovieDetailView: React.FC = () => {
  const {
    selectedMovie,
    user,
    toggleMyList,
    isInMyList,
    rateMovie,
    getMovieRating,
    ratings,
    navigate
  } = useCineMatch();

  const [activeTab, setActiveTab] = useState<'info' | 'cast' | 'reviews'>('info');
  const [showTrailerModal, setShowTrailerModal] = useState(false);
  const [userScore, setUserScore] = useState<number>(() => {
    return getMovieRating(selectedMovie?.id || '')?.score || 5;
  });
  const [userReview, setUserReview] = useState<string>(() => {
    return getMovieRating(selectedMovie?.id || '')?.review || '';
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Sincronizar el formulario cuando cambie la película o las calificaciones del backend
  useEffect(() => {
    const existing = ratings.find((r) => r.movieId === selectedMovie?.id && r.userId === user.id);
    setUserScore(existing?.score || 5);
    setUserReview(existing?.review || '');
  }, [selectedMovie?.id, ratings, user.id]);

  if (!selectedMovie) {
    return (
      <div className="cm-detail-not-found">
        <p>No se seleccionó ninguna película.</p>
        <Button variant="primary" onClick={() => navigate('catalog')}>
          Ir al catálogo
        </Button>
      </div>
    );
  }

  const inList = isInMyList(selectedMovie.id);
  const movieRatings = ratings.filter((r) => r.movieId === selectedMovie.id);

  const handleSaveRating = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      await rateMovie(selectedMovie.id, userScore, userReview);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    } catch (err: any) {
      setSaveError(err.message || 'No fue posible registrar la calificación en el backend');
      setTimeout(() => setSaveError(null), 4000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const tabs = [
    { id: 'info', label: 'Información' },
    { id: 'cast', label: 'Reparto' },
    { id: 'reviews', label: 'Reseñas', badge: movieRatings.length }
  ];

  return (
    <div className="cm-movie-detail-view">
      <button
        type="button"
        className="cm-detail-back-btn"
        onClick={() => navigate('catalog')}
      >
        <ArrowLeft size={16} /> Volver al catálogo
      </button>

      <section
        className="cm-detail-hero"
        style={{ backgroundImage: `url(${selectedMovie.backdropUrl})` }}
      >
        <div className="cm-detail-hero-overlay" />

        <div className="cm-detail-hero-content">
          <div className="cm-detail-poster-wrap">
            <img
              src={selectedMovie.posterUrl}
              alt={selectedMovie.title}
              className="cm-detail-poster"
            />
          </div>

          <div className="cm-detail-meta">
            <div className="cm-detail-badges">
              <span className="cm-detail-type-badge">{selectedMovie.type === 'movie' ? 'Película' : 'Serie'}</span>
              <RatingBadge rating={selectedMovie.rating} count={selectedMovie.ratingCount} />
            </div>

            <h1 className="cm-detail-title">{selectedMovie.title}</h1>

            <div className="cm-detail-specs">
              <span>{selectedMovie.year}</span>
              <span className="dot">•</span>
              <span>{selectedMovie.duration}</span>
              <span className="dot">•</span>
              <span className="genres">{selectedMovie.genres.join(', ')}</span>
            </div>

            <p className="cm-detail-synopsis-preview">{selectedMovie.synopsis}</p>

            <div className="cm-detail-actions">
              <Button
                variant="primary"
                size="lg"
                icon={<Play size={18} fill="#FFFFFF" />}
                onClick={() => setShowTrailerModal(true)}
              >
                Ver trailer
              </Button>

              <Button
                variant={inList ? 'secondary' : 'outline'}
                size="lg"
                icon={
                  inList ? (
                    <BookmarkCheck size={18} color="var(--brand-primary)" />
                  ) : (
                    <Bookmark size={18} />
                  )
                }
                onClick={() => toggleMyList(selectedMovie.id)}
              >
                {inList ? 'En mi lista' : 'Mi lista'}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="cm-detail-body">
        <div className="cm-detail-main">
          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            onChange={(tabId) => setActiveTab(tabId as any)}
            variant="underline"
          />

          <div className="cm-detail-tab-content">
            {activeTab === 'info' && (
              <div className="cm-tab-info">
                <div className="cm-info-block">
                  <h3>Sinopsis</h3>
                  <p>{selectedMovie.synopsis}</p>
                </div>

                <div className="cm-info-grid">
                  <div className="cm-info-item">
                    <span className="cm-info-label">Director</span>
                    <span className="cm-info-value">{selectedMovie.director}</span>
                  </div>
                  <div className="cm-info-item">
                    <span className="cm-info-label">Fecha de lanzamiento</span>
                    <span className="cm-info-value">{selectedMovie.releaseDate}</span>
                  </div>
                  <div className="cm-info-item">
                    <span className="cm-info-label">Duración</span>
                    <span className="cm-info-value">{selectedMovie.duration}</span>
                  </div>
                  <div className="cm-info-item">
                    <span className="cm-info-label">Géneros</span>
                    <span className="cm-info-value">{selectedMovie.genres.join(', ')}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'cast' && (
              <div className="cm-tab-cast">
                <div className="cm-cast-grid">
                  {selectedMovie.cast.map((actor, idx) => (
                    <div key={idx} className="cm-cast-card">
                      <div className="cm-cast-avatar">
                        <Film size={22} color="var(--brand-secondary)" />
                      </div>
                      <span className="cm-cast-name">{actor}</span>
                      <span className="cm-cast-role">Reparto principal</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="cm-tab-reviews">
                {movieRatings.length > 0 ? (
                  <div className="cm-reviews-list">
                    {movieRatings.map((r) => (
                      <div key={r.id} className="cm-review-item">
                        <div className="cm-review-header">
                          <div className="cm-review-user">
                            <span className="cm-review-avatar">U</span>
                            <span className="cm-review-name">Usuario CineMatch</span>
                          </div>
                          <div className="cm-review-stars">
                            <StarRating value={r.score} size={14} />
                            <span className="cm-review-date">{r.createdAt}</span>
                          </div>
                        </div>
                        {r.review && <p className="cm-review-body">{r.review}</p>}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="cm-no-reviews">
                    Aún no hay reseñas registradas para esta película. ¡Sé el primero en calificarla!
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        <aside className="cm-detail-rating-card">
          <h3 className="cm-rating-card-title">Califica esta película</h3>
          <p className="cm-rating-card-desc">
            Tu puntuación se integrará a tus recomendaciones e historial de perfil.
          </p>

          <form onSubmit={handleSaveRating} className="cm-rating-form">
            <div className="cm-rating-stars-interactive">
              <StarRating
                value={userScore}
                interactive
                onChange={(score) => setUserScore(score)}
                size={26}
              />
              <span className="cm-interactive-score-label">
                {userScore} de 5 estrellas
              </span>
            </div>

            <div className="cm-rating-textarea-wrap">
              <label htmlFor="review-text" className="cm-rating-label">
                Reseña u opinión (opcional)
              </label>
              <textarea
                id="review-text"
                rows={4}
                className="cm-rating-textarea"
                placeholder="Escribe lo que te pareció la dirección, actuaciones o guion..."
                value={userReview}
                onChange={(e) => setUserReview(e.target.value)}
              />
            </div>

            <Button
              variant="primary"
              type="submit"
              disabled={isSubmitting}
              icon={<Star size={16} fill="#FFFFFF" />}
            >
              {isSubmitting ? 'Guardando en servidor...' : 'Guardar calificación'}
            </Button>

            {saveSuccess && (
              <div className="cm-rating-success-message">
                <CheckCircle2 size={16} color="var(--brand-secondary)" />
                <span>¡Calificación registrada y persistida con éxito!</span>
              </div>
            )}

            {saveError && (
              <div
                className="cm-rating-success-message"
                style={{
                  borderColor: 'rgba(239, 68, 68, 0.4)',
                  background: 'rgba(239, 68, 68, 0.1)',
                  color: '#ef4444'
                }}
              >
                <AlertCircle size={16} color="#ef4444" />
                <span>{saveError}</span>
              </div>
            )}
          </form>
        </aside>
      </div>

      {showTrailerModal && (
        <div className="cm-trailer-modal-backdrop" onClick={() => setShowTrailerModal(false)}>
          <div className="cm-trailer-modal" onClick={(e) => e.stopPropagation()}>
            <div className="cm-trailer-header">
              <h3>Trailer: {selectedMovie.title}</h3>
              <button
                type="button"
                className="cm-trailer-close"
                onClick={() => setShowTrailerModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="cm-trailer-player-mock">
              <Film size={64} color="var(--brand-primary)" />
              <p>Simulación de reproductor cinematográfico para {selectedMovie.title}</p>
              <Button variant="primary" size="sm" onClick={() => setShowTrailerModal(false)}>
                Cerrar vista previa
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
