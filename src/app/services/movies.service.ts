import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthResponse } from './auth.service';
import { Film } from '../models/kinopoisk';
import { SaveMoviesResponse } from '../models/movies';
import { BehaviorSubject, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private http: HttpClient) {}

  user: AuthResponse = {} as AuthResponse;
  savedMovies: BehaviorSubject<Film[]> = new BehaviorSubject<Film[]>([]);
  savedIdObject: BehaviorSubject<Record<string, Film>> = new BehaviorSubject<
    Record<string, Film>
  >({});
  showedSavedMovies: Subject<Film[]> = new Subject<Film[]>();

  saveFilm(body: Film) {
    return this.http
      .post<SaveMoviesResponse>(`${environment.apiUrl}/movies`, body, {
        withCredentials: true,
      })
      .pipe(
        tap({
          next: (film) => {
            this.savedMovies.next([...this.savedMovies.value, film]);
            this.savedIdObject.next({
              ...this.savedIdObject.value,
              [film.kinopoiskId]: film,
            });
          },
        })
      );
  }

  deleteMovie(id: string) {
    return this.http
      .delete<{
        message: string;
        movie: Film;
      }>(`${environment.apiUrl}/movies/${id}`, {
        withCredentials: true,
      })
      .pipe(
        tap((response) => {
          const kinopoiskId = response.movie.kinopoiskId;
          this.savedMovies.next(
            this.savedMovies.value.filter(
              (film) => film?.kinopoiskId !== kinopoiskId
            )
          );
          const newObj = { ...this.savedIdObject.value };
          delete newObj[kinopoiskId];
          this.savedIdObject.next(newObj);
        })
      );
  }

  getSavedFilms() {
    return this.http
      .get<Film[]>(`${environment.apiUrl}/movies`, {
        withCredentials: true,
      })
      .pipe(
        tap((data) => {
          this.savedMovies.next(data);
          const result: Record<string, Film> = {};
          data.forEach((film) => {
            result[film.kinopoiskId.toString()] = film;
          });
          this.savedIdObject.next(result);
        })
      );
  }
}
