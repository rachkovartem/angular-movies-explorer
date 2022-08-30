import { Film, SearchFilmResponse } from './kinopoisk';

export interface SaveMoviesResponse extends Film {
  _id: string;
  owner: string;
}

export type PagesMeta = Omit<SearchFilmResponse, 'items'>;
