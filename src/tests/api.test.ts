import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { apiService } from '../services/api';

describe('Frontend apiService - Integración y Comunicación REST con CineMatch Backend', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('getMovies debe obtener el catálogo ordenado y mapear averageRating a rating', async () => {
    const mockApiResponse = {
      success: true,
      count: 2,
      data: [
        { id: 'm101', title: 'Interstellar', averageRating: 4.8, ratingCount: 100 },
        { id: 'm102', title: 'Inception', averageRating: 4.9, ratingCount: 200 }
      ]
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockApiResponse
    });

    const movies = await apiService.getMovies();
    expect(movies.length).toBe(2);
    expect(movies[0].rating).toBe(4.8);
    expect(movies[1].rating).toBe(4.9);
    expect(global.fetch).toHaveBeenCalledWith('/api/movies');
  });

  it('getRecommendations debe consultar el endpoint colaborativo sin inventar datos', async () => {
    const mockRecsResponse = {
      success: true,
      userId: 'u001',
      limit: 2,
      data: [
        {
          movie: { id: 'm105', title: 'Cyber Blade 2099', averageRating: 4.5 },
          score: 4.75,
          strategy: 'collaborative',
          reason: 'Usuarios afines (Score: 4.75)'
        }
      ]
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockRecsResponse
    });

    const recs = await apiService.getRecommendations('u001', 2);
    expect(recs.length).toBe(1);
    expect(recs[0].strategy).toBe('collaborative');
    expect(recs[0].movie.id).toBe('m105');
  });

  it('registerUser debe enviar POST /api/users con el DTO correcto', async () => {
    const mockUserResponse = {
      success: true,
      data: {
        id: 'u_test_99',
        name: 'Carlos Ruiz',
        email: 'carlos@cinematch.com',
        avatarUrl: 'https://example.com/avatar.png',
        myListMovieIds: []
      }
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockUserResponse
    });

    const created = await apiService.registerUser({
      name: 'Carlos Ruiz',
      email: 'carlos@cinematch.com'
    });

    expect(created.id).toBe('u_test_99');
    expect(created.name).toBe('Carlos Ruiz');
    expect(global.fetch).toHaveBeenCalledWith('/api/users', expect.objectContaining({
      method: 'POST'
    }));
  });

  it('postRating debe enviar calificación entre 1 y 5 al backend', async () => {
    const mockRatingResponse = {
      success: true,
      data: {
        rating: { id: 'r1', userId: 'u001', movieId: 'm101', score: 5, createdAt: '2026-11-23' },
        updatedMovie: { id: 'm101', title: 'Interstellar', averageRating: 4.9, ratingCount: 101 }
      }
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockRatingResponse
    });

    const result = await apiService.postRating('u001', 'm101', 5, 'Excelente');
    expect(result.rating.score).toBe(5);
    expect(result.updatedMovie?.rating).toBe(4.9);
  });
});
