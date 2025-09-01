import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '@ptg/shared-config';
import { SearchCriteria, SearchResults } from '@ptg/shared-types';
import { RealizationData } from '@ptg/indicators-types';

@Injectable({
  providedIn: 'root',
})
export class IndicatorRealizationDataService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _apiUrl = inject(ConfigService).get('apiUrl');

  getRealizationData(
    searchCriteria: SearchCriteria,
    id: number,
  ): Observable<SearchResults<RealizationData>> {
    return this._httpClient.post<SearchResults<RealizationData>>(
      `${this._apiUrl}/indicator-realization-data/${id}/search-data`,
      searchCriteria,
    );
  }

  importDataPoints(file: File, id: number): Observable<RealizationData[]> {
    const uploadData = new FormData();
    uploadData.append('file', file);

    return this._httpClient.post<RealizationData[]>(
      `${this._apiUrl}/indicator-realization-data/${id}/import-data`,
      uploadData,
    );
  }

  addRealizationDataPoint(
    data: RealizationData,
    id: number,
  ): Observable<RealizationData> {
    return this._httpClient.post<RealizationData>(
      `${this._apiUrl}/indicator-realization-data/${id}/add-data-point`,
      data,
    );
  }

  editRealizationDataPoint(data: RealizationData): Observable<RealizationData> {
    return this._httpClient.put<RealizationData>(
      `${this._apiUrl}/indicator-realization-data/${data.id}`,
      data,
    );
  }

  removeRealizationDataPoint(id: number): Observable<void> {
    return this._httpClient.delete<void>(
      `${this._apiUrl}/indicator-realization-data/${id}`,
    );
  }

  exportExcel(id: number): Observable<Blob> {
    return this._httpClient.get(
      `${this._apiUrl}/indicator-realizations/${id}/export-excel`,
      {
        responseType: 'blob',
      },
    );
  }
}
