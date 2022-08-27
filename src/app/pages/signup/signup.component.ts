import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormControlName,
  FormGroup,
  Validators,
} from '@angular/forms';
import { consts } from 'src/consts';
import { AuthResponse, AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ErrorTitles, validateErrors } from '../../helpers/validate-errors';
import { catchError, last, map, Observable, tap } from 'rxjs';
import { HttpEvent, HttpEventType } from '@angular/common/http';

type GetErrosProps = {
  inputName: 'name' | 'email' | 'password';
  localeName: string;
  patternDescription?: string;
  maxlength?: number;
  minlength?: number;
};

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

  getError = ({
    inputName,
    localeName,
    patternDescription,
    maxlength,
  }: GetErrosProps) => {
    const errors = this.form.controls[inputName].errors || {};
    const touched = this.form.controls[inputName].touched;
    const firstError = Object.keys(errors)[0] as ErrorTitles;
    return (
      touched &&
      validateErrors(localeName)?.[firstError]?.({
        maxlength,
        patternDescription,
      })
    );
  };

  get nameError() {
    return this.getError({
      inputName: 'name',
      localeName: 'имя',
      maxlength: 30,
      patternDescription: 'кирилицу, латиницу и дефиз',
    });
  }

  get emailError() {
    return this.getError({
      inputName: 'email',
      localeName: 'email',
      patternDescription: 'корректный email в формате user@example.com',
    });
  }

  get passwordError() {
    return this.getError({
      inputName: 'password',
      localeName: 'пароль',
    });
  }

  get submitDisabled() {
    return !this.form.valid || this.isSubmitting;
  }

  handleAuthRequest(request: Observable<HttpEvent<AuthResponse>>) {
    return request.pipe(
      tap((event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.requestProgress = event.total
            ? Math.round((100 * event.loaded) / event.total)
            : 100;
        }
      }),
      last(),
      catchError((error) => {
        throw (this.requestError =
          error?.error?.message || 'Что-то пошло не так');
      })
    );
  }

  submit() {
    this.isSubmitting = true;
    const values = this.form.value;
    const errorHandler = (error: string) => {
      this.requestError = error;
      this.isSubmitting = false;
    };
    this.handleAuthRequest(
      this.authService.signUn({
        name: values.name as string,
        email: values.email as string,
        password: values.password as string,
      })
    ).subscribe({
      next: () => {
        this.handleAuthRequest(
          this.authService.signIn({
            email: values.email as string,
            password: values.password as string,
          })
        ).subscribe({
          next: () => {
            this.isSubmitting = false;
            this.router.navigate(['/movies']);
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
