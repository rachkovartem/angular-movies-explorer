import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { AuthResponse } from './auth.service';
import { Film } from '../models/kinopoisk';
import { SaveMoviesResponse } from '../models/movies';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private http: HttpClient, private router: Router) {}

  user: AuthResponse = {} as AuthResponse;

  saveFilm(body: Film) {
    return this.http.post<SaveMoviesResponse>(
      `${environment.apiUrl}/movies`,
      body,
      {
        withCredentials: true,
      }
    );
  }
}
