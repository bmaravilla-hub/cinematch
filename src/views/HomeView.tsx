import React from 'react';
import { Compass } from 'lucide-react';
import { useCineMatch } from '../hooks/useCineMatch';
import { Button } from '../components/ui/Button';
import { MovieCard } from '../components/ui/MovieCard';
import { SectionHeader } from '../components/ui/SectionHeader';
import './HomeView.css';

export const HomeView: React.FC = () => {
  const { movies, navigate } = useCineMatch();

  const trendingMovies = movies.filter((m) => m.trending).slice(0, 6);
  const featuredMovie = movies[0];

  return (
    <div className="cm-home-view">
      <section className="cm-home-hero">
        <div
          className="cm-hero-backdrop"
          style={{ backgroundImage: `url(${featuredMovie.backdropUrl})` }}
        >
          <div className="cm-hero-overlay" />
        </div>

        <div className="cm-hero-content">
          <h1 className="cm-hero-title">
            Descubre películas que <br />
            <span className="cm-hero-title-accent">van contigo</span>
          </h1>
          <p className="cm-hero-subtitle">
            Recomendaciones personalizadas basadas en tus gustos.
          </p>
          <div className="cm-hero-actions">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('recommendations')}
            >
              Ver recomendaciones
            </Button>
            <Button
              variant="outline"
              size="lg"
              icon={<Compass size={18} />}
              onClick={() => navigate('catalog')}
            >
              Explorar catálogo
            </Button>
          </div>
        </div>
      </section>

      <section className="cm-home-section">
        <SectionHeader
          title="Tendencias esta semana"
          actionText="Ver todas >"
          onAction={() => navigate('catalog')}
        />
        <div className="cm-movie-row">
          {trendingMovies.map((movie) => (
            <div key={movie.id} className="cm-movie-row-item">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
