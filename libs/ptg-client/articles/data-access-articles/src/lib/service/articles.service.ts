import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '@ptg/shared-config';
import { Article } from '@ptg/articles-types';
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
}
