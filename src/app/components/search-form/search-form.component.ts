import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { KinopoiskService } from '../../services/kinopoisk.service';
import { catchError } from 'rxjs';
import localStorageHelper from '../../helpers/local-storage-helper';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent implements OnInit {
  constructor(public kinopoiskService: KinopoiskService) {}

  form = new FormGroup({
    film: new FormControl(''),
  });

  onChanges() {
    this.form.valueChanges.subscribe(() => {
      localStorageHelper.setInput(this.form.value.film);
      this.findError = null;
    });
  }

  findError: string | null = null;

  onlySerials = localStorageHelper.getSwitcherValue();

  switchOnlyTopRated() {
    this.onlySerials = !this.onlySerials;
    localStorageHelper.setSwitcherValue(this.onlySerials);
    this.submit();
  }

  submit() {
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

  ngOnInit(): void {
    this.form.controls.film.setValue(localStorageHelper.getInput());
    this.kinopoiskService.filmsList$.next(localStorageHelper.getFilms());
    this.onChanges();
  }
}
