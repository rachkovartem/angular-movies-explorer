import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { KinopoiskService } from '../../services/kinopoisk.service';
import { catchError } from 'rxjs';
import { Film, SearchFilmResponse } from '../../models/kinopoisk';

type PagesMeta = Omit<SearchFilmResponse, 'items'>;

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent implements OnInit {
  constructor(private kinopoiskService: KinopoiskService) {}

  form = new FormGroup({
    film: new FormControl(''),
  });

  onChanges() {
    this.form.valueChanges.subscribe(() => (this.findError = null));
  }

  findError: string | null = null;

  loading = false;

  onlyTopRated = false;

  filmsList: Film[] = [];
  pagesMeta: PagesMeta = {} as PagesMeta;

  switchOnlyTopRated() {
    this.onlyTopRated = !this.onlyTopRated;
  }

  submit() {
    const inputValue = this.form.value.film;
    if (!inputValue) {
      this.findError = 'Введите ключевое слово';
      return;
    }
    this.loading = true;
    this.kinopoiskService
      .searchFilm({
        keyword: this.form.value.film || '',
        ...(this.onlyTopRated && { ratingFrom: 8 }),
      })
      .pipe(
        catchError((error) => {
          this.form.controls.film.setValue('');
          this.findError = 'Произошла ошибка';
          this.loading = false;
          throw error;
        })
      )
      .subscribe(({ items, ...pagesMeta }) => {
        this.loading = false;
        this.filmsList = items;
        this.pagesMeta = pagesMeta;
      });
  }

  ngOnInit(): void {
    this.onChanges();
  }
}
