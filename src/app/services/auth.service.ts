import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../models/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signUn(body: IUser) {
    return this.http.post<IUser>(`${environment.apiUrl}/signup`, body, {
      reportProgress: true,
      observe: 'events',
    });
  }
}
