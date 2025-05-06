import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '@ptg/shared-config';
import { SearchCriteria, SearchResults } from '@ptg/shared-types';
import { Indicator } from '@ptg/indicators-types';

@Injectable({
  providedIn: 'root',
})
export class IndicatorsService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _apiUrl = inject(ConfigService).get('apiUrl');

  getIndicators(
    searchCriteria: SearchCriteria,
  ): Observable<SearchResults<Indicator>> {
    return this._httpClient.post<SearchResults<Indicator>>(
      `${this._apiUrl}/indicators/search`,
      searchCriteria,
    );
  }

  getIndicator(id: number): Observable<Indicator> {
    return this._httpClient.get<Indicator>(`${this._apiUrl}/indicators/${id}`);
  }

  editIndicator(indicator: Indicator): Observable<Indicator> {
    return this._httpClient.put<Indicator>(
      `${this._apiUrl}/indicators/${indicator.id}`,
      indicator,
    );
  }
}
