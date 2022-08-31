import { Component, OnInit } from '@angular/core';
import { links } from 'src/consts';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  constructor() {}

  links = links;
  currentYear = new Date().getFullYear();

  ngOnInit(): void {}
}
