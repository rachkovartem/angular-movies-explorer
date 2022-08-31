import { Component, Input, OnInit } from '@angular/core';
import { Film } from '../../models/kinopoisk';
import { MoviesService } from '../../services/movies.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  constructor(private moviesService: MoviesService, private router: Router) {}
  @Input() film: Film;

  dbId: string | null = null;

  isLiked = false;

  loading = false;

  get isSavedMovieCard() {
    return this.router.url === '/saved-movies';
  }

  saveMovie() {
    this.loading = true;
    this.moviesService
      .saveFilm(this.film)
      .pipe(
        tap({
          complete: () => (this.loading = false),
        })
      )
      .subscribe();
  }

  deleteMovie() {
    this.loading = true;
    this.moviesService
      .deleteMovie(this.dbId || '')
      .pipe(
        tap({
          complete: () => (this.loading = false),
        })
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.moviesService.savedIdObject.subscribe((data) => {
      const liked = !!data[this.film.kinopoiskId];
      this.isLiked = liked;
      if (liked) {
        this.dbId = data[this.film.kinopoiskId]?._id || '';
      }
    });
  }
}
