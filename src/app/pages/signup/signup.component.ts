import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormControlName,
  FormGroup,
  Validators,
} from '@angular/forms';
import { consts } from 'src/consts';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  constructor() {}

  form = new FormGroup({
    name: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(30),
      Validators.pattern(consts.NAME_PATTERN),
    ]),
  });

  ngOnInit(): void {}
}
