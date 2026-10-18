export type MovieType = 'movie' | 'series';

export interface Movie {
  id: string;
  title: string;
  year: number;
  genres: string[];
  duration: string;
  synopsis: string;
  director: string;
  cast: string[];
  posterUrl: string;
  backdropUrl: string;
  rating: number;
  ratingCount: number;
  releaseDate: string;
  type: MovieType;
  trending?: boolean;
}

export interface UserPreferences {
  notifications: boolean;
  autoplayTrailers: boolean;
  adultContent: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  myListMovieIds: string[];
  preferences: UserPreferences;
}

export interface Rating {
  id: string;
  userId: string;
  movieId: string;
  score: number;
  createdAt: string;
  review?: string;
}

export type ActiveView =
  | 'home'
  | 'catalog'
  | 'recommendations'
  | 'movie-detail'
  | 'my-list'
  | 'profile';

export interface CatalogFilters {
  query: string;
  type: 'all' | 'movie' | 'series';
  genres: string[];
  yearMin: number;
  yearMax: number;
  minRating: number;
}
