import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '@ptg/shared-config';
import { SearchCriteria, SearchResults } from '@ptg/shared-types';
import {
  CreatePrediction,
  CreatePredictionResponse,
  Prediction,
  PredictionDefinition,
} from '@ptg/predictions-types';
import { IndicatorGroup } from '@ptg/indicators-types';

@Injectable({
  providedIn: 'root',
})
export class PredictionsService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _apiUrl = inject(ConfigService).get('apiUrl');

  getPredictions(
    searchCriteria: SearchCriteria,
  ): Observable<SearchResults<Prediction>> {
    return this._httpClient.post<SearchResults<Prediction>>(
      `${this._apiUrl}/predictions/search`,
      searchCriteria,
    );
  }

  getPrediction(id: number): Observable<Prediction> {
    return this._httpClient.get<Prediction>(
      `${this._apiUrl}/predictions/${id}`,
    );
  }

  createPrediction(
    payload: CreatePrediction,
  ): Observable<CreatePredictionResponse> {
    return this._httpClient.post<CreatePredictionResponse>(
      `${this._apiUrl}/predictions/schedule-prediction`,
      payload,
    );
  }

  deletePrediction(id: number): Observable<Prediction> {
    return this._httpClient.delete<Prediction>(
      `${this._apiUrl}/predictions/${id}`,
    );
  }

  retryPrediction(id: number): Observable<Prediction> {
    return this._httpClient.post<Prediction>(
      `${this._apiUrl}/predictions/${id}/retry`,
      null,
    );
  }

  getPredictionsDefinitions(): Observable<PredictionDefinition[]> {
    return this._httpClient.get<PredictionDefinition[]>(
      `${this._apiUrl}/prediction-definitions`,
    );
  }

  getPredictionsDefinitionsByGroup(
    group: IndicatorGroup,
  ): Observable<PredictionDefinition[]> {
    return this._httpClient.get<PredictionDefinition[]>(
      `${this._apiUrl}/prediction-definitions/get-prediction-definitions-from-group`,
      {
        params: {
          group,
        },
      },
    );
  }

  getPredictionPdf(id: number) {
    return this._httpClient.get(
      `${this._apiUrl}/predictions/${id}/export-prediction`,
      {
        responseType: 'blob',
      },
    );
  }
}
