import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '@ptg/shared-config';
import { Article, ArticlesStatistics, Sentiment } from '@ptg/articles-types';
import { SearchCriteria, SearchResults } from '@ptg/shared-types';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _apiUrl = inject(ConfigService).get('apiUrl');

  getArticles(
    searchCriteria: SearchCriteria,
  ): Observable<SearchResults<Article>> {
    return this._httpClient.post<SearchResults<Article>>(
      `${this._apiUrl}/news/search`,
      searchCriteria,
    );
  }

  setRelevancy(id: number, relevancy: boolean): Observable<Article> {
    return this._httpClient.put<Article>(
      `${this._apiUrl}/news/${id}/set-relevancy`,
      null,
      {
        params: {
          relevancy,
        },
      },
    );
  }

  setSentiment(id: number, sentiment: Sentiment): Observable<Article> {
    return this._httpClient.put<Article>(
      `${this._apiUrl}/news/${id}/set-sentiment`,
      null,
      {
        params: {
          sentiment,
        },
      },
    );
  }

  setSectors(id: number, sectors: string[]): Observable<Article> {
    return this._httpClient.put<Article>(
      `${this._apiUrl}/news/${id}/set-sectors`,
      sectors,
    );
  }

  getNewsDashboard(): Observable<ArticlesStatistics> {
    return this._httpClient.get<ArticlesStatistics>(
      `${this._apiUrl}/news/get-news-dashboard`,
    );
  }
}
