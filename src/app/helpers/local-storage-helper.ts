import {
  Film,
  SearchFilmParams,
  SearchFilmParamsWithoutPage,
} from '../models/kinopoisk';
import { PagesMeta } from '../models/movies';
import { validateErrors } from './validate-errors';

export default {
  setInput: (value: string | undefined | null) =>
    localStorage.setItem('searchInput', value || ''),
  setFilms: (value: Film[]) =>
    localStorage.setItem('movies', JSON.stringify(value)),
  setSwitcherValue: (value: boolean) =>
    localStorage.setItem('switcherValue', JSON.stringify(value)),
  setPagesMeta: (value: PagesMeta) =>
    localStorage.setItem('pagesMeta', JSON.stringify(value)),
  setSearchParams: (value: SearchFilmParamsWithoutPage) =>
    localStorage.setItem('searchParams', JSON.stringify(value)),
  setCurrentPage: (value: number) =>
    localStorage.setItem('currentPage', value.toString()),
  getPagesMeta: () => JSON.parse(localStorage.getItem('pagesMeta') || '{}'),
  getInput: () => localStorage.getItem('searchInput'),
  getFilms: () => JSON.parse(localStorage.getItem('movies') || '[]'),
  getSwitcherValue: () =>
    JSON.parse(localStorage.getItem('switcherValue') || 'false'),
  getSearchParams: () =>
    JSON.parse(localStorage.getItem('searchParams') || '{}'),
  getCurrentPage: () => Number(localStorage.getItem('currentPage') || 1),
};
