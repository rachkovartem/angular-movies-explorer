import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../models/user';
import { environment } from '../../environments/environment';

type SignUpParams = Omit<IUser, '_id'>;
type SignInParams = Omit<SignUpParams, 'name'>;
export type AuthResponse = Omit<IUser, 'password'>;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signUn(body: SignUpParams) {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/signup`, body, {
      reportProgress: true,
      observe: 'events',
    });
  }

  signIn(body: SignInParams) {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/signin`, body, {
      reportProgress: true,
      observe: 'events',
    });
  }
}
