import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment.development';
import { Auth } from '../models/auth.model';

const TOKEN_KEY = 'authToken';
const USER_KEY = 'authUser';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  
  home(): Observable<any> {
    return this.http.get(`${environment.apiUrl}`, httpOptions);
  }

  signin(user: User): Observable<Auth> {
    return this.http.post<Auth>(`${environment.apiUrl}/user/signin`,user);
  }

  signOut(): void {
    window.localStorage.clear();
  }
  saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }
  getToken(): any {
    return localStorage.getItem(TOKEN_KEY);
  }
  saveUser(user: User): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  getUser(): User {
    return JSON.parse(localStorage.getItem(USER_KEY)+'');
  }
}
