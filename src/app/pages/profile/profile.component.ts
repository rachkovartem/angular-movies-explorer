import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { consts } from 'src/consts';

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

  editMode = false;

  submit() {
    const { name, email } = this.form.value;
    const controlName = this.form.get('name');
    const controlEmail = this.form.get('email');
    controlName?.disabled ? controlName.enable() : controlName?.disable();
    controlEmail?.disabled ? controlEmail.enable() : controlEmail?.disable();
    if (this.editMode && name && email) {
      this.authService.updateUser({
        name,
        email,
      });
    }
    this.editMode = !this.editMode;
  }

  signOut() {
    this.authService.signOut();
  }

  ngOnInit(): void {}
}
