import { Component, Input, OnInit } from '@angular/core';
import { Film } from '../../models/kinopoisk';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  constructor(private moviesService: MoviesService) {}
  @Input() film: Film;

  dbId: string | null = null;

  isLiked = false;

  saveMovie() {
    this.moviesService.saveFilm(this.film).subscribe();
  }

  deleteMovie() {
    this.moviesService.deleteMovie(this.dbId || '').subscribe();
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
