import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { ConfigService } from '@ptg/shared-config';
import { Article } from '@ptg/articles-types';
import { Prediction } from '@ptg/predictions-types';
import { CurrentJobOffers } from '../types/current-job-offers';
import { DashboardChartData } from '../types/dashboard-chart-data';
import { LastYearJobOffers } from '../types/last-year-job-offers';

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

  getCurrentJobOffers(): Observable<CurrentJobOffers> {
    return this._httpClient.get<CurrentJobOffers>(
      `${this._apiUrl}/dashboard/current-job-offers`,
    );
  }

  getLastYearJobOffers(): Observable<LastYearJobOffers> {
    return combineLatest({
      gowork: this._httpClient.get<DashboardChartData[]>(
        `${this._apiUrl}/dashboard/gowork-job-offers-data`,
      ),
      pracujpl: this._httpClient.get<DashboardChartData[]>(
        `${this._apiUrl}/dashboard/pracujpl-job-offers-data`,
      ),
      cbop: this._httpClient.get<DashboardChartData[]>(
        `${this._apiUrl}/dashboard/cbop-job-offers-data`,
      ),
    });
  }

  getUnemploymentRateData(): Observable<DashboardChartData[]> {
    return this._httpClient.get<DashboardChartData[]>(
      `${this._apiUrl}/dashboard/unemployment-rate-data`,
    );
  }
}
