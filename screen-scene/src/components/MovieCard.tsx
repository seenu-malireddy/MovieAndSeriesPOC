import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star } from 'lucide-react';

import type { Movie, TVShow } from '../types';
import { tmdbService } from '../services/tmdb';
import { useFavorites } from '../contexts/FavoritesContext';
import { formatRating, truncateText } from '../utils';

interface MovieCardProps {
  item: Movie | TVShow;
  showFavoriteButton?: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({ item, showFavoriteButton = true }) => {
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  
  const isMovie = 'title' in item;
  const title = isMovie ? item.title : item.name;
  const releaseDate = isMovie ? item.release_date : item.first_air_date;
  const mediaType = isMovie ? 'movie' : 'tv';

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFavorite(item.id)) {
      removeFromFavorites(item.id);
    } else {
      addToFavorites(item.id);
    }
  };

  return (
    <Link
      to={`/${mediaType}/${item.id}`}
      className="group relative block overflow-hidden rounded-lg bg-white shadow-md transition-transform hover:scale-105 hover:shadow-lg"
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={tmdbService.getImageUrl(item.poster_path, 'w500')}
          alt={title}
          className="h-full w-full object-cover transition-transform group-hover:scale-110"
          loading="lazy"
        />
        
        {showFavoriteButton && (
          <button
            onClick={handleFavoriteClick}
            className="absolute right-2 top-2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
          >
            <Heart
              size={20}
              className={isFavorite(item.id) ? 'fill-red-500 text-red-500' : ''}
            />
          </button>
        )}
        
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
          <div className="flex items-center gap-2 text-white">
            <Star size={16} className="fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">
              {formatRating(item.vote_average)}
            </span>
          </div>
        </div>
      </div>
      
      <div className="p-3">
        <h3 className="mb-1 text-sm font-semibold text-gray-900 line-clamp-2">
          {title}
        </h3>
        <p className="text-xs text-gray-600">
          {releaseDate ? new Date(releaseDate).getFullYear() : 'N/A'}
        </p>
        {item.overview && (
          <p className="mt-2 text-xs text-gray-500 line-clamp-2">
            {truncateText(item.overview, 100)}
          </p>
        )}
      </div>
    </Link>
  );
};

export default MovieCard;