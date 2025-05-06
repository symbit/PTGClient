import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '@ptg/shared-config';

@Injectable({
  providedIn: 'root',
})
export class ConstantsService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _apiUrl = inject(ConfigService).get('apiUrl');

  getSources(): Observable<string[]> {
    return this._httpClient.get<string[]>(`${this._apiUrl}/constants/sources`);
  }

  getSectors(): Observable<string[]> {
    return this._httpClient.get<string[]>(`${this._apiUrl}/constants/sectors`);
  }

  getRegions(): Observable<string[]> {
    return this._httpClient.get<string[]>(`${this._apiUrl}/constants/regions`);
  }

  getFrequencies(): Observable<string[]> {
    return this._httpClient.get<string[]>(
      `${this._apiUrl}/constants/frequencies`,
    );
  }
}
