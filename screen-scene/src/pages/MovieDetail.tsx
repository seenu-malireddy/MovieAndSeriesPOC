import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Heart, Star, Play, ArrowLeft } from 'lucide-react';
import { tmdbService } from '../services/tmdb';
import { useFavorites } from '../contexts/FavoritesContext';
import { useReviews } from '../contexts/ReviewsContext';
import { useAuth } from '../contexts/AuthContext';
import { formatDate, formatRating, truncateText } from '../utils';
import type { Movie, TVShow, Review } from '../types';

const MovieDetail: React.FC = () => {
  const { t } = useTranslation();
  const { id, type } = useParams<{ id: string; type: 'movie' | 'tv' }>();
  const { isAuthenticated } = useAuth();
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const { getReview, addReview, updateReview, getReviewsForMovie } = useReviews();
  
  const [item, setItem] = useState<Movie | TVShow | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [allReviews, setAllReviews] = useState<Review[]>([]);

  const movieId = parseInt(id || '0');
  const isMovie = type === 'movie';
  const title = isMovie ? (item as Movie)?.title : (item as TVShow)?.name;
  const releaseDate = isMovie ? (item as Movie)?.release_date : (item as TVShow)?.first_air_date;
  const userReview = getReview(movieId);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!movieId) return;
      
      try {
        setIsLoading(true);
        const data = isMovie 
          ? await tmdbService.getMovieDetails(movieId)
          : await tmdbService.getTVShowDetails(movieId);
        setItem(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId, isMovie]);

  useEffect(() => {
    if (movieId) {
      setAllReviews(getReviewsForMovie(movieId));
    }
  }, [movieId, getReviewsForMovie]);

  useEffect(() => {
    if (userReview) {
      setReviewRating(userReview.rating);
      setReviewComment(userReview.comment);
    }
  }, [userReview]);

  const handleFavoriteClick = () => {
    if (isFavorite(movieId)) {
      removeFromFavorites(movieId);
    } else {
      addToFavorites(movieId);
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (userReview) {
      updateReview(movieId, reviewRating, reviewComment);
    } else {
      addReview(movieId, reviewRating, reviewComment);
    }
    
    setShowReviewForm(false);
    setAllReviews(getReviewsForMovie(movieId));
  };

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

  if (!item) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">{t('error')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Backdrop */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={tmdbService.getImageUrl(item.backdrop_path, 'original')}
          alt={title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        
        {/* Back Button */}
        <Link
          to="/"
          className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-black/50 px-4 py-2 text-white hover:bg-black/70"
        >
          <ArrowLeft size={20} />
          {t('back')}
        </Link>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="container mx-auto">
            <h1 className="text-4xl font-bold mb-2">{title}</h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Star className="fill-yellow-400 text-yellow-400" />
                <span>{formatRating(item.vote_average)}</span>
              </div>
              <span>•</span>
              <span>{releaseDate ? new Date(releaseDate).getFullYear() : 'N/A'}</span>
            </div>
            <p className="text-lg opacity-90 max-w-2xl">
              {truncateText(item.overview, 200)}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Overview */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('overview')}</h2>
              <p className="text-gray-700 leading-relaxed">{item.overview}</p>
            </section>

            {/* Reviews */}
            <section className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{t('reviews')}</h2>
                {isAuthenticated && (
                  <button
                    onClick={() => setShowReviewForm(!showReviewForm)}
                    className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                  >
                    {userReview ? t('editReview') : t('writeReview')}
                  </button>
                )}
              </div>

              {/* Review Form */}
              {showReviewForm && isAuthenticated && (
                <form onSubmit={handleReviewSubmit} className="mb-6 p-4 bg-white rounded-lg shadow">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('rating')}
                    </label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewRating(star)}
                          className="text-2xl"
                        >
                          <Star
                            className={star <= reviewRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('yourReview')}
                    </label>
                    <textarea
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      rows={4}
                      className="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                      placeholder={t('writeReview')}
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    >
                      {t('submitReview')}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowReviewForm(false)}
                      className="rounded bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400"
                    >
                      {t('cancel')}
                    </button>
                  </div>
                </form>
              )}

              {/* Reviews List */}
              <div className="space-y-4">
                {allReviews.length > 0 ? (
                  allReviews.map((review) => (
                    <div key={review.id} className="bg-white p-4 rounded-lg shadow">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              size={16}
                              className={star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">
                          {formatDate(review.createdAt)}
                        </span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-8">{t('noResults')}</p>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Poster */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <img
                src={tmdbService.getImageUrl(item.poster_path, 'w500')}
                alt={title}
                className="w-full"
              />
            </div>

            {/* Actions */}
            <div className="bg-white rounded-lg shadow p-4">
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center gap-2 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                  <Play size={20} />
                  {t('watchTrailer')}
                </button>
                
                {isAuthenticated && (
                  <button
                    onClick={handleFavoriteClick}
                    className={`w-full flex items-center justify-center gap-2 rounded px-4 py-2 ${
                      isFavorite(movieId)
                        ? 'bg-red-100 text-red-700 hover:bg-red-200'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Heart
                      size={20}
                      className={isFavorite(movieId) ? 'fill-red-500 text-red-500' : ''}
                    />
                    {isFavorite(movieId) ? t('removeFromFavorites') : t('addToFavorites')}
                  </button>
                )}
              </div>
            </div>

            {/* Details */}
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-semibold text-gray-900 mb-3">{t('details')}</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-500">{t('releaseDate')}:</span>
                  <span className="ml-2 text-gray-900">
                    {releaseDate ? formatDate(releaseDate) : 'N/A'}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">{t('rating')}:</span>
                  <span className="ml-2 text-gray-900">{formatRating(item.vote_average)}/10</span>
                </div>
                <div>
                  <span className="text-gray-500">{t('voteCount')}:</span>
                  <span className="ml-2 text-gray-900">{item.vote_count.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;