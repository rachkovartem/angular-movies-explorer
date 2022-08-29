import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { consts } from 'src/consts';
import { AuthService, handleAuthRequest } from '../../services/auth.service';
import { Router } from '@angular/router';
import {
  ErrorTitles,
  getError,
  validateErrors,
} from '../../helpers/validate-errors';

type GetErrosProps = {
  inputName: 'email' | 'password';
  localeName: string;
  patternDescription?: string;
  maxlength?: number;
  minlength?: number;
};

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  form = new FormGroup({
    email: new FormControl<string>('', [
      Validators.required,
      Validators.pattern(consts.EMAIL_PATTERN),
    ]),
    password: new FormControl<string>('', [Validators.required]),
  });

  isSubmitting = false;

  requestError: string | null = null;

  requestProgress = 10;

  onChanges() {
    this.form.valueChanges.subscribe(() => (this.requestError = null));
  }

  get emailError() {
    return getError({
      form: this.form,
      inputName: 'email',
      localeName: 'email',
      patternDescription: 'корректный email в формате user@example.com',
    });
  }

  get passwordError() {
    return getError({
      form: this.form,
      inputName: 'password',
      localeName: 'пароль',
    });
  }

  get submitDisabled() {
    return !this.form.valid || this.isSubmitting;
  }

  submit() {
    this.isSubmitting = true;
    const values = this.form.value;
    const errorHandler = (error: string) => {
      this.requestError = error;
      this.isSubmitting = false;
    };
    handleAuthRequest(
      this.authService.signIn({
        email: values.email as string,
        password: values.password as string,
      }),
      this.requestProgress,
      this.requestError
    ).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.authService
          .me()
          .subscribe(() => this.router.navigate(['/movies']));
      },
      error: errorHandler,
    });
  }

  ngOnInit(): void {
    this.onChanges();
  }
}
