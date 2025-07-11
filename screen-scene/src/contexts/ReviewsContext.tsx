import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { Review } from '../types';
import { useAuth } from './AuthContext';

interface ReviewsContextType {
  reviews: Review[];
  addReview: (movieId: number, rating: number, comment: string) => void;
  updateReview: (movieId: number, rating: number, comment: string) => void;
  removeReview: (movieId: number) => void;
  getReview: (movieId: number) => Review | undefined;
  getReviewsForMovie: (movieId: number) => Review[];
}

const ReviewsContext = createContext<ReviewsContextType | undefined>(undefined);

type ReviewsAction =
  | { type: 'ADD_REVIEW'; payload: Review }
  | { type: 'UPDATE_REVIEW'; payload: Review }
  | { type: 'REMOVE_REVIEW'; payload: number }
  | { type: 'SET_REVIEWS'; payload: Review[] };

const reviewsReducer = (state: Review[], action: ReviewsAction): Review[] => {
  switch (action.type) {
    case 'ADD_REVIEW':
      return [...state, action.payload];
    case 'UPDATE_REVIEW':
      return state.map(review =>
        review.movieId === action.payload.movieId ? action.payload : review
      );
    case 'REMOVE_REVIEW':
      return state.filter(review => review.movieId !== action.payload);
    case 'SET_REVIEWS':
      return action.payload;
    default:
      return state;
  }
};

export const ReviewsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reviews, dispatch] = useReducer(reviewsReducer, []);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const storedReviews = localStorage.getItem(`reviews_${user.id}`);
      if (storedReviews) {
        try {
          const parsedReviews = JSON.parse(storedReviews);
          dispatch({ type: 'SET_REVIEWS', payload: parsedReviews });
        } catch (error) {
          console.error('Error parsing stored reviews:', error);
        }
      }
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`reviews_${user.id}`, JSON.stringify(reviews));
    }
  }, [reviews, user]);

  const addReview = (movieId: number, rating: number, comment: string) => {
    if (!user) return;

    const newReview: Review = {
      id: `${user.id}_${movieId}`,
      movieId,
      userId: user.id,
      rating,
      comment,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    dispatch({ type: 'ADD_REVIEW', payload: newReview });
  };

  const updateReview = (movieId: number, rating: number, comment: string) => {
    if (!user) return;

    const existingReview = reviews.find(review => review.movieId === movieId && review.userId === user.id);
    if (existingReview) {
      const updatedReview: Review = {
        ...existingReview,
        rating,
        comment,
        updatedAt: new Date().toISOString(),
      };
      dispatch({ type: 'UPDATE_REVIEW', payload: updatedReview });
    }
  };

  const removeReview = (movieId: number) => {
    dispatch({ type: 'REMOVE_REVIEW', payload: movieId });
  };

  const getReview = (movieId: number): Review | undefined => {
    if (!user) return undefined;
    return reviews.find(review => review.movieId === movieId && review.userId === user.id);
  };

  const getReviewsForMovie = (movieId: number): Review[] => {
    return reviews.filter(review => review.movieId === movieId);
  };

  const value: ReviewsContextType = {
    reviews,
    addReview,
    updateReview,
    removeReview,
    getReview,
    getReviewsForMovie,
  };

  return <ReviewsContext.Provider value={value}>{children}</ReviewsContext.Provider>;
};

export const useReviews = (): ReviewsContextType => {
  const context = useContext(ReviewsContext);
  if (context === undefined) {
    throw new Error('useReviews must be used within a ReviewsProvider');
  }
  return context;
};