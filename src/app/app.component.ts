import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { WindowService } from './services/window.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private router: Router,
    public authService: AuthService,
    public windowService: WindowService
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.windowService.onResize();
  }

  get isAuthPage() {
    return ['/signin', '/signup'].includes(this.router.url);
  }
}
