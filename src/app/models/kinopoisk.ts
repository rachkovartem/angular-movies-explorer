type FilmType = 'FILM' | 'TV_SHOW' | 'TV_SERIES' | 'MINI_SERIES' | 'ALL';

export interface Film {
  kinopoiskId: number;
  imdbId: string | null;
  nameRu: string | null;
  nameEn: string | null;
  nameOriginal: string | null;
  countries: {
    country: string;
  }[];
  genres: { genre: string }[];
  ratingKinopoisk: number | null;
  ratingImdb: number | null;
  year: number | null;
  type: FilmType;
  posterUrl: string;
  posterUrlPreview: string;
}

export interface SearchFilmParams {
  countries?: number;
  genres?: number;
  order?: 'RATING' | 'NUM_VOTE' | 'YEAR';
  type?: FilmType;
  ratingFrom?: number;
  ratingTo?: number;
  yearFrom?: number;
  yearTo?: number;
  imdbId?: string;
  keyword?: string;
  page?: number;
}

export interface SearchFilmResponse {
  total: number;
  totalPages: number;
  items: Film[];
}
