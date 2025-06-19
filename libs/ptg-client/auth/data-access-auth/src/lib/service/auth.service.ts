import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '@ptg/shared-config';
import { Login } from '@ptg/auth-types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _apiUrl = inject(ConfigService).get('apiUrl');

  login(email: string, password: string): Observable<Login> {
    return this._httpClient.post<Login>(`${this._apiUrl}/auth/login`, {
      email,
      password,
      otp: '',
    });
  }

  loginWithToken(token: string): Observable<Login> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this._httpClient.get<Login>(`${this._apiUrl}/auth/me`, { headers });
  }

  confirmInvitation(token: string, password: string): Observable<void> {
    return this._httpClient.put<void>(
      `${this._apiUrl}/auth/confirm-invitation`,
      {
        token,
        password,
      },
    );
  }

  requestPasswordReset(email: string): Observable<void> {
    return this._httpClient.put<void>(
      `${this._apiUrl}/auth/send-reset-password/${email}`,
      null,
    );
  }

  resetPassword(token: string, password: string): Observable<void> {
    return this._httpClient.put<void>(`${this._apiUrl}/auth/reset-password`, {
      token,
      password,
    });
  }
}
