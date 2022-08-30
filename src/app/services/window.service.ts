import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { config } from 'src/consts';

@Injectable({
  providedIn: 'root',
})
export class WindowService {
  constructor() {}

  numberToAddOnMoreClick$ = new BehaviorSubject(4);
  moviesPerPage$ = new BehaviorSubject(12);

  onResize() {
    const innerWidth = window.innerWidth;
    const settings = config.RESPONSIVE_SETTINGS.find(
      (setting) => innerWidth > setting.from && innerWidth < setting.to
    );
    this.moviesPerPage$.next(settings?.moviesPerPage || 12);
    this.numberToAddOnMoreClick$.next(settings?.showMore || 4);
  }
}
