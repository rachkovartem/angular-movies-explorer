import { Component, OnInit } from '@angular/core';
import { KinopoiskService } from '../../services/kinopoisk.service';
import { Film } from '../../models/kinopoisk';
import { WindowService } from '../../services/window.service';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  constructor(
    private moviesService: MoviesService,
    public kinopoiskService: KinopoiskService,
    private windowsService: WindowService
  ) {}

  showedFilms: Film[] = [];
  numberOfShowed = 0;
  numberToAddOnMoreClick = 0;

  get isShowMoreShowed() {
    return !(this.showedFilms.length === this.kinopoiskService.pagesMeta.total);
  }

  onClickMore() {
    const currentLoadedFilms = this.kinopoiskService.filmsList$.value;
    this.numberOfShowed = this.showedFilms.length + this.numberToAddOnMoreClick;
    if (currentLoadedFilms.length >= this.numberOfShowed) {
      this.showedFilms = currentLoadedFilms.slice(0, this.numberOfShowed);
    } else {
      this.kinopoiskService.expandFilmsList().subscribe();
    }
  }

  ngOnInit(): void {
    this.moviesService.getSavedFilms().subscribe();
    this.kinopoiskService.filmsList$.subscribe((films) => {
      const isNewSearch = this.kinopoiskService.currentPage === 1;
      if (isNewSearch) {
        this.numberOfShowed = this.windowsService.moviesPerPage$.value;
      }
      this.showedFilms = films.slice(0, this.numberOfShowed);
    });

    this.windowsService.moviesPerPage$.subscribe((value) => {
      this.numberOfShowed = value;
      this.showedFilms = this.kinopoiskService.filmsList$.value.slice(
        0,
        this.numberOfShowed
      );
    });

    this.windowsService.numberToAddOnMoreClick$.subscribe(
      (value) => (this.numberToAddOnMoreClick = value)
    );
  }
}
