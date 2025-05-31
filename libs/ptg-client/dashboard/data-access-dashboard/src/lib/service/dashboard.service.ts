import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '@ptg/shared-config';
import { Article } from '@ptg/articles-types';
import { Prediction } from '@ptg/predictions-types';
import { Indicator } from '@ptg/indicators-types';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _apiUrl = inject(ConfigService).get('apiUrl');

  getRecentPredictions(): Observable<Prediction[]> {
    return this._httpClient.get<Prediction[]>(
      `${this._apiUrl}/dashboard/recent-predictions`,
    );
  }

  getRecentArticles(): Observable<Article[]> {
    return this._httpClient.get<Article[]>(
      `${this._apiUrl}/dashboard/recent-articles`,
    );
  }

  getRecentlyUpdatedIndicators(): Observable<Indicator[]> {
    return this._httpClient.get<Indicator[]>(
      `${this._apiUrl}/dashboard/recently-updated-indicators`,
    );
  }
}
