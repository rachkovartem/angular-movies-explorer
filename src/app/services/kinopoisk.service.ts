import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Film,
  SearchFilmParamsWithoutPage,
  SearchFilmResponse,
} from '../models/kinopoisk';
import { environment } from '../../environments/environment';
import { BehaviorSubject, catchError, tap } from 'rxjs';
import localStorageHelper from '../helpers/local-storage-helper';
import { PagesMeta } from '../models/movies';

@Injectable({
  providedIn: 'root',
})
export class KinopoiskService {
  constructor(private http: HttpClient) {}

  filmsList$ = new BehaviorSubject<Film[]>([]);
  pagesMeta: PagesMeta = localStorageHelper.getPagesMeta();
  loading = false;
  expandLoading = false;
  currentPage: number = localStorageHelper.getCurrentPage();

  previousParams: SearchFilmParamsWithoutPage =
    localStorageHelper.getSearchParams();

  searchFilm(params: SearchFilmParamsWithoutPage) {
    localStorageHelper.setSearchParams(params);
    localStorageHelper.setCurrentPage(1);
    this.currentPage = 1;
    this.previousParams = params;
    this.loading = true;
    return this.http
      .get<SearchFilmResponse>(`${environment.kinopoiskApiUrl}/v2.2/films`, {
        params: {
          ...params,
        },
        headers: {
          'X-API-KEY': environment.kinopoiskApiKey,
        },
      })
      .pipe(
        tap(({ items, ...pagesMeta }) => {
          this.loading = false;
          this.filmsList$.next(items);
          this.pagesMeta = pagesMeta;
          localStorageHelper.setFilms(items);
          localStorageHelper.setPagesMeta(pagesMeta);
        }),
        catchError((err) => {
          this.loading = false;
          throw err;
        })
      );
  }

  expandFilmsList() {
    this.expandLoading = true;
    this.currentPage = this.currentPage + 1;
    localStorageHelper.setCurrentPage(this.currentPage);
    return this.http
      .get<SearchFilmResponse>(`${environment.kinopoiskApiUrl}/v2.2/films`, {
        params: {
          ...this.previousParams,
          page: this.currentPage,
        },
        headers: {
          'X-API-KEY': environment.kinopoiskApiKey,
        },
      })
      .pipe(
        tap({
          next: ({ items, ...pagesMeta }) => {
            const currentFilmList = this.filmsList$.value;
            const newFilmsList = currentFilmList.concat(items);
            this.filmsList$.next(newFilmsList);
            this.pagesMeta = pagesMeta;
            localStorageHelper.setFilms(newFilmsList);
            localStorageHelper.setPagesMeta(pagesMeta);
            this.expandLoading = false;
          },
          error: () => {
            this.expandLoading = false;
          },
        })
      );
  }
}
