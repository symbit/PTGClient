import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '@ptg/shared-config';
import { SearchCriteria, SearchResults, User } from '@ptg/shared-types';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _apiUrl = inject(ConfigService).get('apiUrl');

  getUsers(searchCriteria: SearchCriteria): Observable<SearchResults<User>> {
    return this._httpClient.post<SearchResults<User>>(
      `${this._apiUrl}/auth/get-users`,
      searchCriteria,
    );
  }

  getUser(id: number): Observable<User> {
    return this._httpClient.get<User>(`${this._apiUrl}/auth/get-user/${id}`);
  }

  deleteUser(id: number): Observable<User> {
    return this._httpClient.delete<User>(`${this._apiUrl}/auth/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this._httpClient.post<User>(`${this._apiUrl}/auth/register`, user);
  }

  editUser(user: User): Observable<User> {
    return this._httpClient.put<User>(`${this._apiUrl}/auth/update-user`, user);
  }

  updatePassword(email: string, newPassword: string): Observable<void> {
    return this._httpClient.put<void>(`${this._apiUrl}/auth/update-password`, {
      email,
      newPassword,
    });
  }

  inviteUser(id: number): Observable<void> {
    return this._httpClient.put<void>(
      `${this._apiUrl}/auth/invite/${id}`,
      null,
    );
  }
}
