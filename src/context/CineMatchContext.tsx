import React, { createContext, useContext, useState, useMemo } from 'react';
import type { ActiveView, CatalogFilters, Movie, Rating, User, UserPreferences } from '../types';
import { initialMovies } from '../data/movies';
import { initialUser } from '../data/users';
import { initialRatings } from '../data/ratings';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface CineMatchContextType {
  activeView: ActiveView;
  selectedMovieId: string | null;
  selectedMovie: Movie | null;
  movies: Movie[];
  user: User;
  myList: string[];
  ratings: Rating[];
  preferences: UserPreferences;
  filters: CatalogFilters;
  navigate: (view: ActiveView) => void;
  selectMovie: (movieId: string) => void;
  toggleMyList: (movieId: string) => void;
  isInMyList: (movieId: string) => boolean;
  rateMovie: (movieId: string, score: number, review?: string) => void;
  getMovieRating: (movieId: string) => Rating | undefined;
  updatePreferences: (prefs: Partial<UserPreferences>) => void;
  setCatalogFilters: (filters: Partial<CatalogFilters>) => void;
  clearFilters: () => void;
}

const defaultFilters: CatalogFilters = {
  query: '',
  type: 'all',
  genres: [],
  yearMin: 2000,
  yearMax: 2024,
  minRating: 0
};

const CineMatchContext = createContext<CineMatchContextType | undefined>(undefined);

export const CineMatchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>('m101');
  const [movies] = useState<Movie[]>(initialMovies);

  const [myList, setMyList] = useLocalStorage<string[]>('cinematch_my_list', initialUser.myListMovieIds);
  const [ratings, setRatings] = useLocalStorage<Rating[]>('cinematch_ratings', initialRatings);
  const [preferences, setPreferences] = useLocalStorage<UserPreferences>('cinematch_preferences', initialUser.preferences);

  const [filters, setFilters] = useState<CatalogFilters>(defaultFilters);

  const user: User = useMemo(() => ({
    ...initialUser,
    myListMovieIds: myList,
    preferences
  }), [myList, preferences]);

  const selectedMovie = useMemo(() => {
    if (!selectedMovieId) return movies[0] || null;
    return movies.find(m => m.id === selectedMovieId) || movies[0] || null;
  }, [selectedMovieId, movies]);

  const navigate = (view: ActiveView) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectMovie = (movieId: string) => {
    setSelectedMovieId(movieId);
    navigate('movie-detail');
  };

  const toggleMyList = (movieId: string) => {
    setMyList(prev => 
      prev.includes(movieId) ? prev.filter(id => id !== movieId) : [...prev, movieId]
    );
  };

  const isInMyList = (movieId: string) => {
    return myList.includes(movieId);
  };

  const rateMovie = (movieId: string, score: number, review?: string) => {
    setRatings(prev => {
      const existingIndex = prev.findIndex(r => r.movieId === movieId && r.userId === user.id);
      const newRating: Rating = {
        id: existingIndex >= 0 ? prev[existingIndex].id : `r${Date.now()}`,
        userId: user.id,
        movieId,
        score,
        createdAt: new Date().toISOString().split('T')[0],
        review: review || (existingIndex >= 0 ? prev[existingIndex].review : undefined)
      };

      if (existingIndex >= 0) {
        const next = [...prev];
        next[existingIndex] = newRating;
        return next;
      }
      return [newRating, ...prev];
    });
  };

  const getMovieRating = (movieId: string) => {
    return ratings.find(r => r.movieId === movieId && r.userId === user.id);
  };

  const updatePreferences = (prefs: Partial<UserPreferences>) => {
    setPreferences(prev => ({
      ...prev,
      ...prefs
    }));
  };

  const setCatalogFilters = (newFilters: Partial<CatalogFilters>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  };

  const clearFilters = () => {
    setFilters(defaultFilters);
  };

  return (
    <CineMatchContext.Provider
      value={{
        activeView,
        selectedMovieId,
        selectedMovie,
        movies,
        user,
        myList,
        ratings,
        preferences,
        filters,
        navigate,
        selectMovie,
        toggleMyList,
        isInMyList,
        rateMovie,
        getMovieRating,
        updatePreferences,
        setCatalogFilters,
        clearFilters
      }}
    >
      {children}
    </CineMatchContext.Provider>
  );
};

export const useCineMatch = () => {
  const context = useContext(CineMatchContext);
  if (!context) {
    throw new Error('useCineMatch must be used within a CineMatchProvider');
  }
  return context;
};
