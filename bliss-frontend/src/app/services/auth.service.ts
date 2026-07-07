import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = `${environment.apiUrl}/api/auth`;

  constructor(private http: HttpClient) { }

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.authUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response && response.token) {
          // Store token and username cleanly in local browser storage
          localStorage.setItem('auth_token', response.token);
          localStorage.setItem('username', response.username);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('username');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth_token');
  }
}