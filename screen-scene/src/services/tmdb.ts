import axios from 'axios';
import type { Movie, TVShow, Genre } from '../types';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'YOUR_TMDB_API_KEY'; // Replace with your actual API key

const tmdbApi = axios.create({
  baseURL: API_BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
});

export const tmdbService = {
  // Get trending movies
  getTrendingMovies: async (): Promise<Movie[]> => {
    const response = await tmdbApi.get('/trending/movie/week');
    return response.data.results;
  },

  // Get trending TV shows
  getTrendingTVShows: async (): Promise<TVShow[]> => {
    const response = await tmdbApi.get('/trending/tv/week');
    return response.data.results;
  },

  // Get popular movies
  getPopularMovies: async (page = 1): Promise<{ results: Movie[]; total_pages: number }> => {
    const response = await tmdbApi.get('/movie/popular', {
      params: { page },
    });
    return response.data;
  },

  // Get popular TV shows
  getPopularTVShows: async (page = 1): Promise<{ results: TVShow[]; total_pages: number }> => {
    const response = await tmdbApi.get('/tv/popular', {
      params: { page },
    });
    return response.data;
  },

  // Get movie details
  getMovieDetails: async (movieId: number): Promise<Movie> => {
    const response = await tmdbApi.get(`/movie/${movieId}`);
    return response.data;
  },

  // Get TV show details
  getTVShowDetails: async (tvId: number): Promise<TVShow> => {
    const response = await tmdbApi.get(`/tv/${tvId}`);
    return response.data;
  },

  // Search movies and TV shows
  searchMulti: async (query: string, page = 1): Promise<{ results: (Movie | TVShow)[]; total_pages: number }> => {
    const response = await tmdbApi.get('/search/multi', {
      params: { query, page },
    });
    return response.data;
  },

  // Get movie genres
  getMovieGenres: async (): Promise<Genre[]> => {
    const response = await tmdbApi.get('/genre/movie/list');
    return response.data.genres;
  },

  // Get TV genres
  getTVGenres: async (): Promise<Genre[]> => {
    const response = await tmdbApi.get('/genre/tv/list');
    return response.data.genres;
  },

  // Get movies by genre
  getMoviesByGenre: async (genreId: number, page = 1): Promise<{ results: Movie[]; total_pages: number }> => {
    const response = await tmdbApi.get('/discover/movie', {
      params: { with_genres: genreId, page },
    });
    return response.data;
  },

  // Get TV shows by genre
  getTVShowsByGenre: async (genreId: number, page = 1): Promise<{ results: TVShow[]; total_pages: number }> => {
    const response = await tmdbApi.get('/discover/tv', {
      params: { with_genres: genreId, page },
    });
    return response.data;
  },

  // Get image URL
  getImageUrl: (path: string, size: 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original' = 'w500') => {
    if (!path) return '';
    return `https://image.tmdb.org/t/p/${size}${path}`;
  },
};