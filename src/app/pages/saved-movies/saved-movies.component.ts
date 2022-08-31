import { Component, OnInit } from '@angular/core';
import { Film } from '../../models/kinopoisk';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-saved-movies',
  templateUrl: './saved-movies.component.html',
  styleUrls: ['./saved-movies.component.scss'],
})
export class SavedMoviesComponent implements OnInit {
  constructor(private moviesService: MoviesService) {}

  showedFilms: Film[] = [];

  ngOnInit(): void {
    const showedSavedMovies = this.moviesService.showedSavedMovies;
    const savedMovies = this.moviesService.savedMovies;

    showedSavedMovies.subscribe((value) => {
      this.showedFilms = value;
    });

    savedMovies.subscribe((films) => showedSavedMovies.next(films));

    if (savedMovies?.value.length === 0) {
      this.moviesService
        .getSavedFilms()
        .subscribe(() => showedSavedMovies.next(savedMovies.value));
    }
  }
}
