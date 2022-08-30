import { Component, Input, OnInit } from '@angular/core';
import { Film } from '../../models/kinopoisk';

@Component({
  selector: 'app-movies-card-list',
  templateUrl: './movies-card-list.component.html',
  styleUrls: ['./movies-card-list.component.scss'],
})
export class MoviesCardListComponent implements OnInit {
  constructor() {}

  @Input() showedFilms: Film[];

  ngOnInit(): void {}
}
