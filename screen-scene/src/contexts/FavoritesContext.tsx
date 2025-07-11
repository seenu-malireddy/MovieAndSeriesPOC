import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { Favorite, Movie, TVShow } from '../types';
import { useAuth } from './AuthContext';

interface FavoritesContextType {
  favorites: Favorite[];
  addToFavorites: (movieId: number) => void;
  removeFromFavorites: (movieId: number) => void;
  isFavorite: (movieId: number) => boolean;
  getFavoriteMovies: () => (Movie | TVShow)[];
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

type FavoritesAction =
  | { type: 'ADD_FAVORITE'; payload: Favorite }
  | { type: 'REMOVE_FAVORITE'; payload: number }
  | { type: 'SET_FAVORITES'; payload: Favorite[] };

const favoritesReducer = (state: Favorite[], action: FavoritesAction): Favorite[] => {
  switch (action.type) {
    case 'ADD_FAVORITE':
      return [...state, action.payload];
    case 'REMOVE_FAVORITE':
      return state.filter(fav => fav.movieId !== action.payload);
    case 'SET_FAVORITES':
      return action.payload;
    default:
      return state;
  }
};

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, dispatch] = useReducer(favoritesReducer, []);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const storedFavorites = localStorage.getItem(`favorites_${user.id}`);
      if (storedFavorites) {
        try {
          const parsedFavorites = JSON.parse(storedFavorites);
          dispatch({ type: 'SET_FAVORITES', payload: parsedFavorites });
        } catch (error) {
          console.error('Error parsing stored favorites:', error);
        }
      }
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`favorites_${user.id}`, JSON.stringify(favorites));
    }
  }, [favorites, user]);

  const addToFavorites = (movieId: number) => {
    if (!user) return;
    
    const newFavorite: Favorite = {
      id: `${user.id}_${movieId}`,
      movieId,
      userId: user.id,
      addedAt: new Date().toISOString(),
    };
    
    dispatch({ type: 'ADD_FAVORITE', payload: newFavorite });
  };

  const removeFromFavorites = (movieId: number) => {
    dispatch({ type: 'REMOVE_FAVORITE', payload: movieId });
  };

  const isFavorite = (movieId: number): boolean => {
    return favorites.some(fav => fav.movieId === movieId);
  };

  const getFavoriteMovies = (): (Movie | TVShow)[] => {
    // This would need to be implemented with actual movie data
    // For now, return empty array
    return [];
  };

  const value: FavoritesContextType = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    getFavoriteMovies,
  };

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};