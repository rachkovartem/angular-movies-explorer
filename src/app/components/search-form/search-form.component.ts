import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { KinopoiskService } from '../../services/kinopoisk.service';
import { catchError } from 'rxjs';
import localStorageHelper from '../../helpers/local-storage-helper';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent implements OnInit {
  constructor(
    public kinopoiskService: KinopoiskService,
    private moviesService: MoviesService
  ) {}

  @Input() isSavedPage: undefined | true;

  form = new FormGroup({
    film: new FormControl(''),
  });

  onChanges() {
    if (!this.isSavedPage) {
      this.form.valueChanges.subscribe(() => {
        localStorageHelper.setInput(this.form.value.film);
        this.findError = null;
      });
    }
  }

  findError: string | null = null;

  onlySerials = localStorageHelper.getSwitcherValue();

  switchOnlySerials() {
    if (!this.isSavedPage) {
      localStorageHelper.setSwitcherValue(this.onlySerials);
    }
    this.onlySerials = !this.onlySerials;
    this.submit();
  }

  submit() {
    if (this.isSavedPage) {
      const savedMovies = this.moviesService.savedMovies.value;
      const inputValue = this.form.value.film?.toLowerCase() || '';
      const showedMovies = this.moviesService.showedSavedMovies;
      if (!inputValue)
        return showedMovies.next(
          savedMovies.filter((film) =>
            this.onlySerials ? film.type === 'TV_SERIES' : true
          )
        );

      showedMovies.next(
        savedMovies
          .filter((movie) => {
            return (
              movie.nameRu?.toLowerCase().includes(inputValue) ||
              movie?.nameEn?.toLowerCase().includes(inputValue) ||
              movie.nameOriginal?.toLowerCase().includes(inputValue)
            );
          })
          .filter((film) =>
            this.onlySerials ? film.type === 'TV_SERIES' : true
          )
      );
    } else {
      const inputValue = this.form.value.film;

      if (!inputValue) {
        this.findError = 'Введите ключевое слово';
        return;
      }

      this.kinopoiskService
        .searchFilm({
          keyword: this.form.value.film || '',
          ...(this.onlySerials && { type: 'TV_SERIES' }),
        })
        .pipe(
          catchError((error) => {
            this.form.controls.film.setValue('');
            this.findError = 'Произошла ошибка';
            throw error;
          })
        )
        .subscribe();
    }
  }

  ngOnInit(): void {
    if (!this.isSavedPage) {
      this.form.controls.film.setValue(localStorageHelper.getInput());
    }
    if (this.isSavedPage) {
      this.onlySerials = false;
    }
    this.kinopoiskService.filmsList$.next(localStorageHelper.getFilms());
    this.onChanges();
  }
}
