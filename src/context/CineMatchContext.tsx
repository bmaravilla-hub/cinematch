import React, { createContext, useContext, useState, useMemo, useEffect, useCallback } from 'react';
import type { ActiveView, CatalogFilters, Movie, Rating, User, UserPreferences, CreateUserDTO } from '../types';
import { initialMovies } from '../data/movies';
import { initialUser } from '../data/users';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { apiService } from '../services/api';

interface CineMatchContextType {
  activeView: ActiveView;
  selectedMovieId: string | null;
  selectedMovie: Movie | null;
  movies: Movie[];
  user: User;
  allUsers: User[];
  myList: string[];
  ratings: Rating[];
  preferences: UserPreferences;
  filters: CatalogFilters;
  isLoadingData: boolean;
  serverError: string | null;
  isBackendConnected: boolean;
  isSampleData: boolean;
  isRegisterModalOpen: boolean;
  setIsRegisterModalOpen: (open: boolean) => void;
  navigate: (view: ActiveView) => void;
  selectMovie: (movieId: string) => void;
  toggleMyList: (movieId: string) => void;
  isInMyList: (movieId: string) => boolean;
  rateMovie: (movieId: string, score: number, review?: string) => Promise<boolean>;
  getMovieRating: (movieId: string) => Rating | undefined;
  updatePreferences: (prefs: Partial<UserPreferences>) => void;
  setCatalogFilters: (filters: Partial<CatalogFilters>) => void;
  clearFilters: () => void;
  refreshData: () => Promise<void>;
  registerUser: (dto: CreateUserDTO) => Promise<User>;
  switchUser: (userId: string) => Promise<void>;
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

  const [currentUserId, setCurrentUserId] = useLocalStorage<string>('cinematch_current_user_id', 'u001');
  const [allUsers, setAllUsers] = useState<User[]>([initialUser]);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState<boolean>(false);

  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isBackendConnected, setIsBackendConnected] = useState<boolean>(false);
  const [isSampleData, setIsSampleData] = useState<boolean>(true);

  const [myList, setMyList] = useLocalStorage<string[]>('cinematch_my_list', initialUser.myListMovieIds);
  const [preferences, setPreferences] = useLocalStorage<UserPreferences>('cinematch_preferences', initialUser.preferences);

  const [filters, setFilters] = useState<CatalogFilters>(defaultFilters);

  const user: User = useMemo(() => {
    const found = allUsers.find(u => u.id === currentUserId);
    if (found) {
      return {
        ...found,
        myListMovieIds: myList,
        preferences
      };
    }
    return {
      ...initialUser,
      id: currentUserId,
      myListMovieIds: myList,
      preferences
    };
  }, [allUsers, currentUserId, myList, preferences]);

  const refreshData = useCallback(async (targetUserId?: string) => {
    setIsLoadingData(true);
    setServerError(null);

    const activeId = targetUserId || currentUserId;

    try {
      const [fetchedMovies, fetchedRatings, fetchedUsers] = await Promise.all([
        apiService.getMovies(),
        apiService.getUserRatings(activeId).catch(() => []),
        apiService.getUsers().catch(() => [initialUser])
      ]);

      setMovies(fetchedMovies);
      setRatings(fetchedRatings);
      if (fetchedUsers && fetchedUsers.length > 0) {
        setAllUsers(fetchedUsers);
      }
      setIsBackendConnected(true);
      setIsSampleData(false);
      setServerError(null);
    } catch (err: any) {
      console.warn('[CineMatchContext] No se pudo sincronizar con el backend:', err.message);
      setIsBackendConnected(false);
      setIsSampleData(true);
      setServerError('Servidor backend desconectado (http://localhost:3001). Mostrando datos locales de muestra.');
    } finally {
      setIsLoadingData(false);
    }
  }, [currentUserId]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const registerUser = async (dto: CreateUserDTO): Promise<User> => {
    const created = await apiService.registerUser(dto);
    setAllUsers(prev => [...prev.filter(u => u.id !== created.id), created]);
    setCurrentUserId(created.id);
    await refreshData(created.id);
    return created;
  };

  const switchUser = async (newUserId: string) => {
    setCurrentUserId(newUserId);
    await refreshData(newUserId);
  };

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


  const rateMovie = async (movieId: string, score: number, review?: string): Promise<boolean> => {
    const result = await apiService.postRating(user.id, movieId, score, review);
    if (!result || !result.rating) {
      throw new Error('El servidor no retornó confirmación válida de la calificación');
    }

    setRatings(prev => {
      const existingIndex = prev.findIndex(r => r.movieId === movieId && r.userId === user.id);
      if (existingIndex >= 0) {
        const next = [...prev];
        next[existingIndex] = result.rating;
        return next;
      }
      return [result.rating, ...prev];
    });

    if (result.updatedMovie) {
      const updated = result.updatedMovie;
      setMovies(prev =>
        prev.map(m => (m.id === updated.id ? { ...m, rating: updated.rating, ratingCount: updated.ratingCount } : m))
      );
    }

    return true;
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
        allUsers,
        myList,
        ratings,
        preferences,
        filters,
        isLoadingData,
        serverError,
        isBackendConnected,
        isSampleData,
        isRegisterModalOpen,
        setIsRegisterModalOpen,
        navigate,
        selectMovie,
        toggleMyList,
        isInMyList,
        rateMovie,
        getMovieRating,
        updatePreferences,
        setCatalogFilters,
        clearFilters,
        refreshData,
        registerUser,
        switchUser
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
