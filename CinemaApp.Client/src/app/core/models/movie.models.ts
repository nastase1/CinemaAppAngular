export interface Movie {
  id: number;
  title: string;
  description: string;
  duration: number; // minutes
  releaseDate: string;
  genre: string[];
  rating: number; // 0-10
  posterUrl: string;
  backdropUrl: string;
  trailerUrl?: string;
  director: string;
  cast: string[];
  language: string;
  isNowShowing: boolean;
  isComingSoon: boolean;
}

export interface MovieFilter {
  genre?: string;
  searchTerm?: string;
  isNowShowing?: boolean;
  isComingSoon?: boolean;
}
