import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { IUser } from '../models/user';
import { environment } from '../../environments/environment';
import { catchError, last, Observable, tap } from 'rxjs';

type SignUpParams = Omit<IUser, '_id'>;
type SignInParams = Omit<SignUpParams, 'name'>;
export type AuthResponse = Omit<IUser, 'password'>;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  user: IUser = {} as IUser;

  signUp(body: SignUpParams) {
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

  me() {
    return this.http.get<AuthResponse>(`${environment.apiUrl}/signin`);
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
