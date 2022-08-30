import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchFilmParams, SearchFilmResponse } from '../models/kinopoisk';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class KinopoiskService {
  constructor(private http: HttpClient) {}

  searchFilm(params: SearchFilmParams) {
    return this.http.get<SearchFilmResponse>(
      `${environment.kinopoiskApiUrl}/v2.2/films`,
      {
        params: {
          ...params,
        },
        headers: {
          'X-API-KEY': environment.kinopoiskApiKey,
        },
      }
    );
  }
}
