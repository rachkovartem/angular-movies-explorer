import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { consts } from 'src/consts';
import { getError } from '../../helpers/validate-errors';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(public authService: AuthService) {}

  form = new FormGroup({
    name: new FormControl<string>(
      { value: this.authService.user.name, disabled: true },
      [
        Validators.required,
        Validators.maxLength(30),
        Validators.pattern(consts.NAME_PATTERN),
      ]
    ),
    email: new FormControl<string>(
      { value: this.authService.user.email, disabled: true },
      [Validators.required, Validators.pattern(consts.EMAIL_PATTERN)]
    ),
  });

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

  get nameError() {
    return getError({
      form: this.form,
      inputName: 'name',
      localeName: 'имя',
      maxlength: 30,
      patternDescription: 'кирилицу, латиницу и дефиз',
    });
  }

  editMode = false;

  requestError: string | null = null;

  get ButtonDisabled() {
    const noChangesInData =
      this.editMode &&
      this.form.value.email === this.authService.user.email &&
      this.form.value.name === this.authService.user.name;

    return noChangesInData || !this.form.valid;
  }

  submit() {
    const { name, email } = this.form.value;
    const controlName = this.form.get('name');
    const controlEmail = this.form.get('email');
    if (this.editMode && name && email) {
      this.authService
        .updateUser({
          name,
          email,
        })
        .pipe(
          catchError((error) => {
            this.requestError = error?.error?.message || 'Что-то пошло не так';
            throw error;
          })
        )
        .subscribe(() => {
          this.editMode = false;
          controlName?.disable();
          controlEmail?.disable();
        });
    }
    if (!this.editMode) {
      this.editMode = true;
      controlName?.enable();
      controlEmail?.enable();
    }
  }

  signOut() {
    this.authService.signOut();
  }

  ngOnInit(): void {
    this.onChanges();
  }
}
