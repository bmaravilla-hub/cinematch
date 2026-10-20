import React, { useMemo } from 'react';
import { RotateCcw, Filter, Star } from 'lucide-react';
import { useCineMatch } from '../hooks/useCineMatch';
import { Tabs } from '../components/ui/Tabs';
import { MovieCard } from '../components/ui/MovieCard';
import { EmptyState } from '../components/ui/EmptyState';
import { Button } from '../components/ui/Button';
import './CatalogView.css';

const GENRE_LIST = [
  'Acción',
  'Aventura',
  'Ciencia ficción',
  'Comedia',
  'Drama',
  'Terror',
  'Thriller',
  'Misterio'
];

export const CatalogView: React.FC = () => {
  const { movies, filters, setCatalogFilters, clearFilters } = useCineMatch();

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      if (filters.query.trim()) {
        const q = filters.query.toLowerCase();
        const matchesTitle = movie.title.toLowerCase().includes(q);
        const matchesGenre = movie.genres.some((g) => g.toLowerCase().includes(q));
        const matchesDirector = movie.director.toLowerCase().includes(q);
        const matchesCast = movie.cast.some((c) => c.toLowerCase().includes(q));
        if (!matchesTitle && !matchesGenre && !matchesDirector && !matchesCast) {
          return false;
        }
      }

      if (filters.type !== 'all' && movie.type !== filters.type) {
        return false;
      }

      if (filters.genres.length > 0) {
        const hasGenre = filters.genres.some((selectedGenre) =>
          movie.genres.includes(selectedGenre)
        );
        if (!hasGenre) return false;
      }

      if (movie.year < filters.yearMin || movie.year > filters.yearMax) {
        return false;
      }

      if (filters.minRating > 0 && movie.rating < filters.minRating) {
        return false;
      }

      return true;
    });
  }, [movies, filters]);

  const handleGenreToggle = (genre: string) => {
    const isSelected = filters.genres.includes(genre);
    const updated = isSelected
      ? filters.genres.filter((g) => g !== genre)
      : [...filters.genres, genre];
    setCatalogFilters({ genres: updated });
  };

  const tabs = [
    { id: 'all', label: 'Todos', badge: movies.length },
    { id: 'movie', label: 'Películas', badge: movies.filter((m) => m.type === 'movie').length },
    { id: 'series', label: 'Series', badge: movies.filter((m) => m.type === 'series').length }
  ];

  return (
    <div className="cm-catalog-view">
      <div className="cm-catalog-layout">
        <aside className="cm-catalog-sidebar">
          <div className="cm-catalog-filter-head">
            <span className="cm-filter-title">
              <Filter size={16} /> Filtros
            </span>
            {(filters.genres.length > 0 ||
              filters.minRating > 0 ||
              filters.yearMin > 2000 ||
              filters.yearMax < 2024 ||
              filters.query) && (
              <button type="button" className="cm-filter-reset-link" onClick={clearFilters}>
                <RotateCcw size={12} /> Limpiar
              </button>
            )}
          </div>

          <div className="cm-filter-group">
            <label className="cm-filter-label">Géneros</label>
            <div className="cm-genre-list">
              {GENRE_LIST.map((genre) => {
                const checked = filters.genres.includes(genre);
                return (
                  <label key={genre} className="cm-checkbox-item">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleGenreToggle(genre)}
                    />
                    <span>{genre}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="cm-filter-group">
            <label className="cm-filter-label">Año de estreno</label>
            <div className="cm-year-range-display">
              <span>{filters.yearMin}</span>
              <span>—</span>
              <span>{filters.yearMax}</span>
            </div>
            <div className="cm-year-inputs">
              <input
                type="range"
                min="2000"
                max="2024"
                value={filters.yearMin}
                onChange={(e) =>
                  setCatalogFilters({
                    yearMin: Math.min(Number(e.target.value), filters.yearMax)
                  })
                }
                className="cm-range-slider"
              />
              <input
                type="range"
                min="2000"
                max="2024"
                value={filters.yearMax}
                onChange={(e) =>
                  setCatalogFilters({
                    yearMax: Math.max(Number(e.target.value), filters.yearMin)
                  })
                }
                className="cm-range-slider"
              />
            </div>
          </div>

          <div className="cm-filter-group">
            <label className="cm-filter-label">Calificación mínima</label>
            <div className="cm-rating-filter-options">
              {[0, 2, 3, 4, 4.5].map((rate) => (
                <button
                  key={rate}
                  type="button"
                  className={`cm-rating-chip ${filters.minRating === rate ? 'active' : ''}`}
                  onClick={() => setCatalogFilters({ minRating: rate })}
                >
                  <Star size={13} fill={filters.minRating === rate ? '#FFFFFF' : 'var(--accent-pink)'} stroke="none" />
                  {rate === 0 ? 'Todas' : `${rate}+`}
                </button>
              ))}
            </div>
          </div>

          <Button variant="secondary" size="sm" onClick={clearFilters}>
            Restablecer filtros
          </Button>
        </aside>

        <section className="cm-catalog-content">
          <div className="cm-catalog-top-bar">
            <Tabs
              tabs={tabs}
              activeTab={filters.type}
              onChange={(tabId) => setCatalogFilters({ type: tabId as any })}
              variant="pills"
            />
            <span className="cm-catalog-count">
              {filteredMovies.length} {filteredMovies.length === 1 ? 'resultado' : 'resultados'}
            </span>
          </div>

          <div className="cm-catalog-header-text">
            <h1 className="cm-catalog-heading">
              {filters.query ? 'Resultados de búsqueda' : 'Catálogo completo'}
            </h1>
            {filters.query && (
              <p className="cm-catalog-query-desc">
                Se encontraron {filteredMovies.length} resultados para "{filters.query}"
              </p>
            )}
          </div>

          {filteredMovies.length > 0 ? (
            <div className="cm-catalog-grid">
              {filteredMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No encontramos películas con estos filtros"
              description="Intenta ajustando el rango de año, retirando algunos géneros o limpiando el término de búsqueda."
              actionText="Limpiar filtros"
              onAction={clearFilters}
            />
          )}
        </section>
      </div>
    </div>
  );
};
