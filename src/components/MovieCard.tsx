import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Star, Heart, Calendar, Play } from 'lucide-react'
import { getImageUrl } from '../services/tmdbApi'
import { useAuth } from '../context/AuthContext'
import { favoritesService } from '../services/favoritesService'
import { MovieCardProps } from '../types'
import toast from 'react-hot-toast'

const MovieCard = ({ item, onFavoriteChange }: MovieCardProps) => {
  const { t } = useTranslation()
  const { user } = useAuth()
  const [isFavorite, setIsFavorite] = useState(
    user ? favoritesService.isFavorite(user.id, item.id, item.media_type) : false
  )

  const title = 'title' in item ? item.title : item.name
  const releaseDate = 'release_date' in item ? item.release_date : item.first_air_date
  const mediaType = item.media_type
  const detailPath = mediaType === 'movie' ? `/movie/${item.id}` : `/tv/${item.id}`

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!user) {
      toast.error('Please sign in to add favorites')
      return
    }

    let success
    if (isFavorite) {
      success = favoritesService.removeFromFavorites(user.id, item.id, mediaType)
      if (success) {
        setIsFavorite(false)
        toast.success(t('removedFromFavorites'))
        onFavoriteChange?.(item, false)
      }
    } else {
      success = favoritesService.addToFavorites(user.id, { ...item, media_type: mediaType })
      if (success) {
        setIsFavorite(true)
        toast.success(t('addedToFavorites'))
        onFavoriteChange?.(item, true)
      }
    }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return ''
    return new Date(dateString).getFullYear()
  }

  const formatRating = (rating: number) => {
    return rating ? rating.toFixed(1) : 'N/A'
  }

  return (
    <div className="movie-card bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden group">
      <Link to={detailPath} className="block">
        {/* Poster Image */}
        <div className="relative aspect-[2/3] overflow-hidden">
          {item.poster_path ? (
            <img
              src={getImageUrl(item.poster_path, 'medium', 'poster') || ''}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <Play className="h-12 w-12 text-gray-400" />
            </div>
          )}
          
          {/* Overlay with play icon on hover */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
            <Play className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Rating Badge */}
          {item.vote_average > 0 && (
            <div className="absolute top-2 left-2 bg-black bg-opacity-75 rounded-full px-2 py-1 flex items-center space-x-1">
              <Star className="h-3 w-3 text-yellow-400 fill-current" />
              <span className="text-white text-xs font-medium">
                {formatRating(item.vote_average)}
              </span>
            </div>
          )}

          {/* Favorite Button */}
          <button
            onClick={handleFavoriteClick}
            className={`absolute top-2 right-2 p-2 rounded-full transition-all duration-200 ${
              isFavorite
                ? 'bg-red-500 text-white'
                : 'bg-black bg-opacity-50 text-white hover:bg-red-500'
            }`}
            aria-label={isFavorite ? t('removeFromFavorites') : t('addToFavorites')}
          >
            <Heart 
              className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} 
            />
          </button>

          {/* Media Type Badge */}
          <div className="absolute bottom-2 right-2">
            <span className="bg-primary-600 text-white text-xs px-2 py-1 rounded-full font-medium">
              {mediaType === 'movie' ? t('movies') : t('shows')}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2 mb-2 min-h-[2.5rem] leading-tight">
            {title}
          </h3>
          
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            {releaseDate && (
              <div className="flex items-center space-x-1 rtl:space-x-reverse">
                <Calendar className="h-3 w-3" />
                <span>{formatDate(releaseDate)}</span>
              </div>
            )}
            
            {item.vote_count > 0 && (
              <span className="text-xs">
                {item.vote_count} {item.vote_count === 1 ? 'vote' : 'votes'}
              </span>
            )}
          </div>

          {/* Overview - truncated */}
          {item.overview && (
            <p className="text-gray-600 dark:text-gray-300 text-xs mt-2 line-clamp-2 leading-relaxed">
              {item.overview}
            </p>
          )}
        </div>
      </Link>
    </div>
  )
}

export default MovieCard