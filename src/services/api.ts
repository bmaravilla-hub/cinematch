import type { Movie, Rating } from '../types';

const API_BASE_URL = '/api';

export interface RecommendationItem {
  movie: Movie;
  score: number;
  strategy: 'collaborative' | 'fallback_popularity';
  reason: string;
}

export interface PostRatingResult {
  rating: Rating;
  updatedMovie?: Movie;
}

export const apiService = {
  /**
   * Obtiene el catálogo de películas ordenado desde el backend (vía Árbol AVL).
   * Normaliza averageRating hacia rating para componentes visuales de React.
   */
  async getMovies(): Promise<Movie[]> {
    const response = await fetch(`${API_BASE_URL}/movies`);
    if (!response.ok) {
      throw new Error(`Error HTTP al consultar películas: ${response.status} ${response.statusText}`);
    }
    const json = await response.json();
    if (!json.success || !Array.isArray(json.data)) {
      throw new Error('La respuesta del servidor no contiene un catálogo válido');
    }
    return json.data.map((m: any) => ({
      ...m,
      rating: typeof m.averageRating === 'number' ? m.averageRating : (m.rating || 0)
    }));
  },

  /**
   * Obtiene recomendaciones generadas por el algoritmo de filtrado colaborativo o respaldo en el backend.
   * NO simula resultados con .sort() si el backend no responde.
   */
  async getRecommendations(userId: string, limit: number = 6): Promise<RecommendationItem[]> {
    const response = await fetch(`${API_BASE_URL}/recommendations?userId=${encodeURIComponent(userId)}&limit=${limit}`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || `Error del servidor (${response.status}) al calcular recomendaciones`);
    }
    const json = await response.json();
    if (!json.success || !Array.isArray(json.data)) {
      throw new Error('Respuesta inválida del motor de recomendaciones');
    }
    return json.data.map((item: any) => ({
      ...item,
      movie: {
        ...item.movie,
        rating: typeof item.movie.averageRating === 'number' ? item.movie.averageRating : (item.movie.rating || 0)
      }
    }));
  },

  /**
   * Envía una calificación al backend para persistirla en el Grafo, Lista Enlazada y Árbol AVL.
   * Lanza error si el backend rechaza la operación (ej. código 400 por score inválido).
   */
  async postRating(userId: string, movieId: string, score: number, review?: string): Promise<PostRatingResult> {
    const response = await fetch(`${API_BASE_URL}/ratings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, movieId, score, review })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || `Error del servidor (${response.status}) al procesar la calificación`);
    }

    const json = await response.json();
    const data = json.data;
    if (data.updatedMovie) {
      data.updatedMovie.rating = typeof data.updatedMovie.averageRating === 'number'
        ? data.updatedMovie.averageRating
        : data.updatedMovie.rating;
    }
    return data;
  },

  /**
   * Obtiene el historial de calificaciones del usuario desde el backend.
   */
  async getUserRatings(userId: string): Promise<Rating[]> {
    const response = await fetch(`${API_BASE_URL}/ratings/${encodeURIComponent(userId)}`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || `Error al consultar calificaciones del usuario (${response.status})`);
    }
    const json = await response.json();
    return json.data || [];
  }
};
