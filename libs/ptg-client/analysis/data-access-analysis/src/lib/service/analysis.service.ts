import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '@ptg/shared-config';
import { Analysis, CreateAnalysis } from '@ptg/analysis-types';

@Injectable({
  providedIn: 'root',
})
export class AnalysisService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _apiUrl = inject(ConfigService).get('apiUrl');

  createAnalysis(payload: CreateAnalysis): Observable<Analysis> {
    return this._httpClient.post<Analysis>(
      `${this._apiUrl}/indicator-realizations/get-analysis`,
      payload,
    );
  }
}
