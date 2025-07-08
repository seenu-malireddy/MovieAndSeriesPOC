import React, { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import { useTranslation } from 'react-i18next'
import { Tabs, Filter, Grid, List, ChevronDown } from 'lucide-react'
import { api, filterHelpers } from '../services/tmdbApi'
import MovieCard from '../components/MovieCard'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'

const Home = () => {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState('trending')
  const [viewMode, setViewMode] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    genre: '',
    year: '',
    sortBy: 'popularity.desc'
  })

  // Fetch genres
  const { data: movieGenres } = useQuery('movieGenres', api.getMovieGenres, {
    select: data => data.data.genres,
    staleTime: 60 * 60 * 1000 // 1 hour
  })

  const { data: tvGenres } = useQuery('tvGenres', api.getTVGenres, {
    select: data => data.data.genres,
    staleTime: 60 * 60 * 1000
  })

  // Fetch data based on active tab
  const { data, isLoading, error, refetch } = useQuery(
    ['homeData', activeTab, filters],
    () => {
      switch (activeTab) {
        case 'trending':
          return api.getTrending('all', 'day')
        case 'movies':
          if (filters.genre || filters.year || filters.sortBy !== 'popularity.desc') {
            const params = filterHelpers.buildDiscoverParams(filters)
            return api.discoverMovies(params)
          }
          return api.getPopularMovies()
        case 'tv':
          if (filters.genre || filters.year || filters.sortBy !== 'popularity.desc') {
            const params = filterHelpers.buildDiscoverParams(filters)
            return api.discoverTVShows(params)
          }
          return api.getPopularTVShows()
        default:
          return api.getTrending('all', 'day')
      }
    },
    {
      select: data => data.data.results,
      staleTime: 5 * 60 * 1000 // 5 minutes
    }
  )

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }))
  }

  const clearFilters = () => {
    setFilters({
      genre: '',
      year: '',
      sortBy: 'popularity.desc'
    })
  }

  const getGenres = () => {
    if (activeTab === 'movies') return movieGenres || []
    if (activeTab === 'tv') return tvGenres || []
    return [...(movieGenres || []), ...(tvGenres || [])]
  }

  const sortOptions = [
    { value: 'popularity.desc', label: t('popularity') + ' (High to Low)' },
    { value: 'popularity.asc', label: t('popularity') + ' (Low to High)' },
    { value: 'vote_average.desc', label: t('rating') + ' (High to Low)' },
    { value: 'vote_average.asc', label: t('rating') + ' (Low to High)' },
    { value: 'release_date.desc', label: t('releaseDate') + ' (Newest)' },
    { value: 'release_date.asc', label: t('releaseDate') + ' (Oldest)' }
  ]

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorMessage 
          message="Failed to load content" 
          onRetry={refetch}
        />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {t('home')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Discover trending movies and TV shows, explore by genre, and find your next favorite watch.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center justify-between mb-6">
        <div className="flex space-x-1 rtl:space-x-reverse bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('trending')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'trending'
                ? 'bg-primary-600 text-white'
                : 'text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400'
            }`}
          >
            Trending
          </button>
          <button
            onClick={() => setActiveTab('movies')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'movies'
                ? 'bg-primary-600 text-white'
                : 'text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400'
            }`}
          >
            {t('movies')}
          </button>
          <button
            onClick={() => setActiveTab('tv')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'tv'
                ? 'bg-primary-600 text-white'
                : 'text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400'
            }`}
          >
            {t('shows')}
          </button>
        </div>

        {/* View Controls */}
        <div className="flex items-center space-x-2 rtl:space-x-reverse mt-4 sm:mt-0">
          {/* Filter Toggle */}
          {activeTab !== 'trending' && (
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-1 rtl:space-x-reverse px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <Filter className="h-4 w-4" />
              <span>{t('filterBy')}</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          )}

          {/* View Mode */}
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'grid'
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-primary-600'
              }`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'list'
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-primary-600'
              }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      {showFilters && activeTab !== 'trending' && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Genre Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('genres')}
              </label>
              <select
                value={filters.genre}
                onChange={(e) => handleFilterChange('genre', e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
              >
                <option value="">{t('allGenres')}</option>
                {getGenres().map(genre => (
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Year Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('year')}
              </label>
              <select
                value={filters.year}
                onChange={(e) => handleFilterChange('year', e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
              >
                <option value="">{t('allYears')}</option>
                {filterHelpers.getYearOptions().map(year => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('sortBy')}
              </label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Clear Filters */}
          {(filters.genre || filters.year || filters.sortBy !== 'popularity.desc') && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={clearFilters}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* Content */}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className={
          viewMode === 'grid'
            ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4'
            : 'space-y-4'
        }>
          {data?.map((item) => (
            <MovieCard
              key={`${item.id}-${item.media_type || (item.title ? 'movie' : 'tv')}`}
              item={{
                ...item,
                media_type: item.media_type || (item.title ? 'movie' : 'tv')
              }}
            />
          ))}
        </div>
      )}

      {/* No Results */}
      {!isLoading && data?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            {t('noResults')}
          </p>
          {(filters.genre || filters.year || filters.sortBy !== 'popularity.desc') && (
            <button
              onClick={clearFilters}
              className="mt-4 btn-primary"
            >
              Clear Filters
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Home