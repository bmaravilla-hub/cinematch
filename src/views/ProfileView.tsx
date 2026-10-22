import React, { useState } from 'react';
import { Star, Bell, PlaySquare, ShieldAlert, Edit3 } from 'lucide-react';
import { useCineMatch } from '../hooks/useCineMatch';
import { Button } from '../components/ui/Button';
import { Tabs } from '../components/ui/Tabs';
import { StarRating } from '../components/ui/StarRating';
import { MovieCard } from '../components/ui/MovieCard';
import './ProfileView.css';

export const ProfileView: React.FC = () => {
  const { user, movies, ratings, preferences, updatePreferences, selectMovie } = useCineMatch();
  const [activeTab, setActiveTab] = useState<'ratings' | 'list' | 'preferences'>('ratings');
  const [editSuccess, setEditSuccess] = useState(false);

  const ratedMovies = ratings
    .map((r) => {
      const movie = movies.find((m) => m.id === r.movieId);
      return { rating: r, movie };
    })
    .filter((item): item is { rating: typeof item.rating; movie: NonNullable<typeof item.movie> } =>
      Boolean(item.movie)
    );

  const savedMovies = movies.filter((m) => user.myListMovieIds.includes(m.id));

  const tabs = [
    { id: 'ratings', label: 'Historial de calificaciones', badge: ratedMovies.length },
    { id: 'list', label: 'Mi lista', badge: savedMovies.length },
    { id: 'preferences', label: 'Preferencias' }
  ];

  const handleEditProfile = () => {
    setEditSuccess(true);
    setTimeout(() => setEditSuccess(false), 2000);
  };

  return (
    <div className="cm-profile-view">
      <header className="cm-profile-header">
        <div className="cm-profile-user-info">
          <div className="cm-profile-avatar-wrap">
            <img src={user.avatarUrl} alt={user.name} className="cm-profile-avatar" />
          </div>
          <div className="cm-profile-details">
            <h1 className="cm-profile-name">{user.name}</h1>
            <p className="cm-profile-email">{user.email}</p>
            <div className="cm-profile-stats">
              <span className="cm-profile-stat-badge">
                <Star size={13} fill="var(--accent-pink)" stroke="none" />
                {ratedMovies.length} calificaciones
              </span>
              <span className="cm-profile-stat-badge">
                {savedMovies.length} guardadas
              </span>
            </div>
          </div>
        </div>

        <Button
          variant="secondary"
          size="sm"
          icon={<Edit3 size={14} />}
          onClick={handleEditProfile}
        >
          {editSuccess ? 'Perfil guardado' : 'Editar perfil'}
        </Button>
      </header>

      <div className="cm-profile-tabs-wrap">
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onChange={(tabId) => setActiveTab(tabId as any)}
          variant="underline"
        />
      </div>

      <div className="cm-profile-content">
        {activeTab === 'ratings' && (
          <div className="cm-profile-history-list">
            {ratedMovies.length > 0 ? (
              ratedMovies.map(({ rating, movie }) => (
                <div
                  key={rating.id}
                  className="cm-history-row"
                  onClick={() => selectMovie(movie.id)}
                  role="button"
                  tabIndex={0}
                >
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="cm-history-thumb"
                  />
                  <div className="cm-history-info">
                    <h4 className="cm-history-title">{movie.title}</h4>
                    <span className="cm-history-meta">
                      {movie.year} • {movie.genres.join(', ')}
                    </span>
                    {rating.review && (
                      <p className="cm-history-review">"{rating.review}"</p>
                    )}
                  </div>
                  <div className="cm-history-score-wrap">
                    <StarRating value={rating.score} size={15} />
                    <span className="cm-history-date">{rating.createdAt}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="cm-history-empty">Todavía no has calificado películas.</p>
            )}
          </div>
        )}

        {activeTab === 'list' && (
          <div className="cm-profile-saved-grid">
            {savedMovies.length > 0 ? (
              savedMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
            ) : (
              <p className="cm-history-empty">Todavía no tienes películas en tu lista.</p>
            )}
          </div>
        )}

        {activeTab === 'preferences' && (
          <div className="cm-profile-preferences-card">
            <div className="cm-pref-item">
              <div className="cm-pref-text">
                <div className="cm-pref-title-row">
                  <Bell size={18} color="var(--brand-secondary)" />
                  <h4>Notificaciones por correo</h4>
                </div>
                <p>Recibe avisos sobre nuevos estrenos y recomendaciones semanales.</p>
              </div>
              <label className="cm-switch">
                <input
                  type="checkbox"
                  checked={preferences.notifications}
                  onChange={(e) => updatePreferences({ notifications: e.target.checked })}
                />
                <span className="cm-slider" />
              </label>
            </div>

            <div className="cm-pref-item">
              <div className="cm-pref-text">
                <div className="cm-pref-title-row">
                  <PlaySquare size={18} color="var(--brand-secondary)" />
                  <h4>Reproducción automática de trailers</h4>
                </div>
                <p>Inicia clips y trailers automáticamente al abrir el detalle de una película.</p>
              </div>
              <label className="cm-switch">
                <input
                  type="checkbox"
                  checked={preferences.autoplayTrailers}
                  onChange={(e) => updatePreferences({ autoplayTrailers: e.target.checked })}
                />
                <span className="cm-slider" />
              </label>
            </div>

            <div className="cm-pref-item">
              <div className="cm-pref-text">
                <div className="cm-pref-title-row">
                  <ShieldAlert size={18} color="var(--brand-secondary)" />
                  <h4>Filtro de contenido adulto</h4>
                </div>
                <p>Ocultar títulos con clasificación R o temas explícitos en los resultados.</p>
              </div>
              <label className="cm-switch">
                <input
                  type="checkbox"
                  checked={preferences.adultContent}
                  onChange={(e) => updatePreferences({ adultContent: e.target.checked })}
                />
                <span className="cm-slider" />
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
