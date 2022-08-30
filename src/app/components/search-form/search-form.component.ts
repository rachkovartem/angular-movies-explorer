import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent implements OnInit {
  constructor() {}

  form = new FormGroup({
    film: new FormControl('', [Validators.required]),
  });

  findError = false;

  shorts = false;

  switchShorts() {
    this.shorts = !this.shorts;
  }

  submit() {}

  ngOnInit(): void {}
}
