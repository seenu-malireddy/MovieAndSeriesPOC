import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Heart, Trash2 } from 'lucide-react';
import { tmdbService } from '../services/tmdb';
import { useFavorites } from '../contexts/FavoritesContext';
import { useAuth } from '../contexts/AuthContext';
import MovieCard from '../components/MovieCard';
import type { Movie, TVShow } from '../types';

const Favorites: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { favorites, removeFromFavorites } = useFavorites();
  const [favoriteItems, setFavoriteItems] = useState<(Movie | TVShow)[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFavoriteItems = async () => {
      if (!favorites.length) {
        setFavoriteItems([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const items = await Promise.all(
          favorites.map(async (favorite) => {
            try {
              // Try to fetch as movie first, then as TV show
              const movie = await tmdbService.getMovieDetails(favorite.movieId);
              return movie;
            } catch {
              try {
                const tvShow = await tmdbService.getTVShowDetails(favorite.movieId);
                return tvShow;
              } catch {
                // If both fail, return null
                return null;
              }
            }
          })
        );

        // Filter out null items (failed fetches)
        const validItems = items.filter((item): item is Movie | TVShow => item !== null);
        setFavoriteItems(validItems);
      } catch (error) {
        console.error('Error fetching favorite items:', error);
        setFavoriteItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavoriteItems();
  }, [favorites]);

  const handleRemoveFavorite = (movieId: number) => {
    removeFromFavorites(movieId);
  };

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">{t('pleaseSignIn')}</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t('loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {t('myFavorites')}
              </h1>
              <p className="text-gray-600">
                {favoriteItems.length} {favoriteItems.length === 1 ? t('item') : t('items')}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        {favoriteItems.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {favoriteItems.map((item) => (
              <div key={item.id} className="relative group">
                <MovieCard item={item} showFavoriteButton={false} />
                <button
                  onClick={() => handleRemoveFavorite(item.id)}
                  className="absolute top-2 right-2 z-10 rounded-full bg-red-500 p-2 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Heart className="mx-auto h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {t('noFavorites')}
            </h3>
            <p className="text-gray-500 mb-6">
              {t('noFavoritesDescription')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;