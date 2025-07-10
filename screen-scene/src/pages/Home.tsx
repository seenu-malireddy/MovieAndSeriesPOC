import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { tmdbService } from '../services/tmdb';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import MovieCard from '../components/MovieCard';
import type { Movie, TVShow, Genre } from '../types';

const Home: React.FC = () => {
  const { t } = useTranslation();
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [trendingTVShows, setTrendingTVShows] = useState<TVShow[]>([]);
  const [searchResults, setSearchResults] = useState<(Movie | TVShow)[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [movies, tvShows, movieGenres, tvGenres] = await Promise.all([
          tmdbService.getTrendingMovies(),
          tmdbService.getTrendingTVShows(),
          tmdbService.getMovieGenres(),
          tmdbService.getTVGenres(),
        ]);

        setTrendingMovies(movies);
        setTrendingTVShows(tvShows);
        
        // Combine and deduplicate genres
        const allGenres = [...movieGenres, ...tvGenres];
        const uniqueGenres = allGenres.filter((genre, index, self) => 
          index === self.findIndex(g => g.id === genre.id)
        );
        setGenres(uniqueGenres);
      } catch (error) {
        console.error('Error fetching initial data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    
    if (query.trim()) {
      try {
        const results = await tmdbService.searchMulti(query);
        setSearchResults(results.results);
      } catch (error) {
        console.error('Error searching:', error);
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleGenreChange = (genreId: number | null) => {
    setSelectedGenre(genreId);
  };

  const handleYearChange = (year: number | null) => {
    setSelectedYear(year);
  };

  const handleClearFilters = () => {
    setSelectedGenre(null);
    setSelectedYear(null);
  };

  const filterContent = (items: (Movie | TVShow)[]) => {
    return items.filter(item => {
      const releaseDate = 'release_date' in item ? item.release_date : item.first_air_date;
      const itemYear = releaseDate ? new Date(releaseDate).getFullYear() : null;
      
      const matchesGenre = !selectedGenre || item.genre_ids.includes(selectedGenre);
      const matchesYear = !selectedYear || itemYear === selectedYear;
      
      return matchesGenre && matchesYear;
    });
  };

  const displayContent = searchQuery ? searchResults : [
    ...trendingMovies,
    ...trendingTVShows
  ];

  const filteredContent = filterContent(displayContent);

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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {searchQuery ? t('search') : t('home')}
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <SearchBar
              onSearch={handleSearch}
              placeholder={t('search')}
              className="flex-1"
            />
            <FilterBar
              genres={genres}
              selectedGenre={selectedGenre}
              selectedYear={selectedYear}
              onGenreChange={handleGenreChange}
              onYearChange={handleYearChange}
              onClearFilters={handleClearFilters}
            />
          </div>
        </div>

        {/* Content */}
        {searchQuery ? (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {t('search')}: "{searchQuery}"
            </h2>
            {filteredContent.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {filteredContent.map((item) => (
                  <MovieCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">{t('noResults')}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-8">
            {/* Trending Movies */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {t('trending')} {t('movies')}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {filterContent(trendingMovies).slice(0, 12).map((movie) => (
                  <MovieCard key={movie.id} item={movie} />
                ))}
              </div>
            </section>

            {/* Trending TV Shows */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {t('trending')} {t('tvShows')}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {filterContent(trendingTVShows).slice(0, 12).map((show) => (
                  <MovieCard key={show.id} item={show} />
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;