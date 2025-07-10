export interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  media_type?: 'movie' | 'tv';
}

export interface TVShow {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  media_type?: 'movie' | 'tv';
}

export interface Genre {
  id: number;
  name: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
  avatar?: string;
}

export interface Review {
  id: string;
  movieId: number;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface Favorite {
  id: string;
  movieId: number;
  userId: string;
  addedAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface FilterState {
  genre: number | null;
  year: number | null;
  searchQuery: string;
  mediaType: 'movie' | 'tv' | 'all';
}

export interface Language {
  code: string;
  name: string;
  flag: string;
  dir: 'ltr' | 'rtl';
}