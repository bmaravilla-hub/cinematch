import React from 'react';
import { Plus, Bookmark } from 'lucide-react';
import { useCineMatch } from '../hooks/useCineMatch';
import { MovieCard } from '../components/ui/MovieCard';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import './MyListView.css';

export const MyListView: React.FC = () => {
  const { movies, myList, toggleMyList, navigate } = useCineMatch();

  const savedMovies = movies.filter((m) => myList.includes(m.id));

  return (
    <div className="cm-mylist-view">
      <div className="cm-mylist-header">
        <div className="cm-mylist-header-info">
          <h1 className="cm-mylist-title">Mi lista</h1>
          <p className="cm-mylist-subtitle">
            Películas que deseas ver o que te gustan ({savedMovies.length} guardadas)
          </p>
        </div>
        <Button
          variant="primary"
          icon={<Plus size={16} />}
          onClick={() => navigate('catalog')}
        >
          Agregar películas
        </Button>
      </div>

      {savedMovies.length > 0 ? (
        <div className="cm-mylist-grid">
          {savedMovies.map((movie) => (
            <div key={movie.id} className="cm-mylist-item-wrap">
              <MovieCard
                movie={movie}
                showRemove
                onRemove={() => toggleMyList(movie.id)}
              />
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Bookmark size={36} color="var(--brand-primary)" />}
          title="Todavía no tienes películas guardadas"
          description="Explora nuestro catálogo y agrega tus historias favoritas con un solo clic."
          actionText="Explorar catálogo"
          onAction={() => navigate('catalog')}
        />
      )}
    </div>
  );
};
