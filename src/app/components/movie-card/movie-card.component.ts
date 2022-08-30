import { Component, Input } from '@angular/core';
import { Film } from '../../models/kinopoisk';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  constructor(private moviesService: MoviesService) {}
  @Input() film: Film;

  saveMovie() {
    this.moviesService.saveFilm(this.film).subscribe();
  }
}
