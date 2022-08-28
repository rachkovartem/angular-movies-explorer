import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private authService: AuthService) {}

  get isAuthenticated() {
    console.log(this.authService.user._id);
    return this.authService.user._id;
  }

  ngOnInit(): void {}
}
