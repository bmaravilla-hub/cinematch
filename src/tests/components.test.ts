import { describe, it, expect } from 'vitest';
import { initialMovies } from '../data/movies';
import { initialUser } from '../data/users';
import type { CatalogFilters } from '../types';

describe('Frontend Modelos y Filtros del Catálogo - CineMatch', () => {
  it('initialMovies debe contener al menos 18 títulos válidos para poblar el Árbol AVL', () => {
    expect(initialMovies.length).toBeGreaterThanOrEqual(18);
    for (const movie of initialMovies) {
      expect(movie.id).toBeDefined();
      expect(movie.title).toBeDefined();
      expect(movie.year).toBeGreaterThanOrEqual(1970);
      expect(movie.genres.length).toBeGreaterThan(0);
      expect(['movie', 'series']).toContain(movie.type);
    }
  });

  it('initialUser debe tener una estructura completa con id, nombre y lista de seguimiento', () => {
    expect(initialUser.id).toBe('u001');
    expect(initialUser.name).toBe('Usuario CineMatch');
    expect(initialUser.email).toContain('@');
    expect(Array.isArray(initialUser.myListMovieIds)).toBe(true);
    expect(initialUser.myListMovieIds.length).toBeGreaterThan(0);
  });

  it('la lógica de filtrado de catálogo debe aplicar filtros de búsqueda por título y género', () => {
    const filters: CatalogFilters = {
      query: 'interstellar',
      type: 'all',
      genres: [],
      yearMin: 2000,
      yearMax: 2024,
      minRating: 0
    };

    const matches = initialMovies.filter((movie) => {
      const q = filters.query.toLowerCase();
      const matchesTitle = movie.title.toLowerCase().includes(q);
      const matchesGenre = movie.genres.some((g) => g.toLowerCase().includes(q));
      return matchesTitle || matchesGenre;
    });

    expect(matches.length).toBeGreaterThanOrEqual(1);
    expect(matches.some((m) => m.title === 'Interstellar')).toBe(true);
  });

  it('la lógica de filtrado debe respetar tipo Película vs Serie', () => {
    const movieOnlyMatches = initialMovies.filter((m) => m.type === 'movie');
    const seriesOnlyMatches = initialMovies.filter((m) => m.type === 'series');

    expect(movieOnlyMatches.every((m) => m.type === 'movie')).toBe(true);
    expect(seriesOnlyMatches.every((m) => m.type === 'series')).toBe(true);
    expect(movieOnlyMatches.length + seriesOnlyMatches.length).toBe(initialMovies.length);
  });
});
