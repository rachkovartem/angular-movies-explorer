import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { consts } from 'src/consts';
import { AuthService, handleAuthRequest } from '../../services/auth.service';
import { Router } from '@angular/router';
import { getError } from '../../helpers/validate-errors';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  form = new FormGroup({
    name: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(30),
      Validators.pattern(consts.NAME_PATTERN),
    ]),
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

  get nameError() {
    return getError({
      form: this.form,
      inputName: 'name',
      localeName: 'имя',
      maxlength: 30,
      patternDescription: 'кирилицу, латиницу и дефиз',
    });
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
      this.authService.signUp({
        name: values.name as string,
        email: values.email as string,
        password: values.password as string,
      }),
      this.requestProgress,
      this.requestError
    ).subscribe({
      next: () => {
        handleAuthRequest(
          this.authService.signIn({
            email: values.email as string,
            password: values.password as string,
          }),
          this.requestProgress,
          this.requestError
        ).subscribe({
          next: () => {
            this.authService.me().subscribe(() => {
              this.isSubmitting = false;
              this.router.navigate(['/movies']);
            });
          },
          error: errorHandler,
        });
      },
      error: errorHandler,
    });
  }

  ngOnInit(): void {
    this.onChanges();
  }
}
