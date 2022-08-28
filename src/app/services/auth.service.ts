import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { IUser } from '../models/user';
import { environment } from '../../environments/environment';
import { catchError, last, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

type SignUpParams = Omit<IUser, '_id'>;
type SignInParams = Omit<SignUpParams, 'name'>;
export type AuthResponse = Omit<IUser, 'password'>;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  user: AuthResponse = {} as AuthResponse;
  authLoading = true;

  signUp(body: SignUpParams) {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/signup`, body, {
      withCredentials: true,
      reportProgress: true,
      observe: 'events',
    });
  }

  signIn(body: SignInParams) {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/signin`, body, {
      withCredentials: true,
      reportProgress: true,
      observe: 'events',
    });
  }

  me() {
    const request = this.http.get<AuthResponse>(
      `${environment.apiUrl}/users/me`,
      {
        withCredentials: true,
      }
    );
    request
      .pipe(
        catchError((error) => {
          this.user = {} as AuthResponse;
          this.authLoading = false;
          throw error;
        })
      )
      .subscribe((user) => {
        this.authLoading = false;
        this.user = user;
      });

    return request;
  }

  signOut() {
    const response = this.http.get<AuthResponse>(
      `${environment.apiUrl}/signout`,
      {
        withCredentials: true,
      }
    );

    response.subscribe(() => {
      this.me();
      this.router.navigate(['/']);
    });

    return response;
  }

  updateUser(body: Pick<IUser, 'name' | 'email'>) {
    const request = this.http.patch<AuthResponse>(
      `${environment.apiUrl}/users/me`,
      body,
      {
        withCredentials: true,
      }
    );

    request.subscribe(
      ({ name, email }) =>
        (this.user = {
          ...this.user,
          name,
          email,
        })
    );

    return request;
  }
}

export function handleAuthRequest(
  request: Observable<HttpEvent<AuthResponse>>,
  progress: number,
  reqError: string | null
) {
  return request.pipe(
    tap((event) => {
      if (event.type === HttpEventType.UploadProgress) {
        progress = event.total
          ? Math.round((100 * event.loaded) / event.total)
          : 100;
      }
    }),
    last(),
    catchError((error) => {
      throw (reqError = error?.error?.message || 'Что-то пошло не так');
    })
  );
}
