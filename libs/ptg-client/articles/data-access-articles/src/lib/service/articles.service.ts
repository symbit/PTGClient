import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ConfigService } from '@ptg/shared-config';
import { Article } from '@ptg/articles-types';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _apiUrl = inject(ConfigService).get('apiUrl');

  getArticles(): Observable<Article[]> {
    // return this._httpClient.post<SearchResults<Exhibition>>(
    //   `${this._apiUrl}/exhibitions/search`,
    //   searchCriteria,
    // );
    return of([
      {
        id: '1',
        source: 'TechCrunch',
        author: 'Jane Doe',
        title: 'AI Revolutionizing Healthcare',
        industry: ['Healthcare', 'Technology'],
        date: '2025-04-15',
        relevancy: false,
        sentiment: 'Neutral',
      },
      {
        id: '2',
        source: 'Forbes',
        author: 'John Smith',
        title: 'Economic Outlook for 2025',
        industry: ['Finance', 'Economy'],
        date: '2025-04-10',
        relevancy: true,
        sentiment: 'Negative',
      },
      {
        id: '3',
        source: 'The Verge',
        author: 'Emily Zhang',
        title: 'New Smartphone Launch Faces Criticism',
        industry: ['Technology', 'Consumer Electronics'],
        date: '2025-04-12',
        relevancy: true,
        sentiment: 'Negative',
      },
      {
        id: '4',
        source: 'Bloomberg',
        author: 'Michael Chen',
        title: 'Green Energy Stocks on the Rise',
        industry: ['Energy', 'Finance'],
        date: '2025-04-13',
        relevancy: true,
        sentiment: 'Positive',
      },
      {
        id: '5',
        source: 'Reuters',
        author: 'Samantha Lee',
        title: 'Retail Sector Struggles in Q1',
        industry: ['Retail', 'Economy'],
        date: '2025-04-09',
        relevancy: true,
        sentiment: 'Negative',
      },
      {
        id: '6',
        source: 'Wired',
        author: 'Carlos Gomez',
        title: 'Breakthrough in Quantum Computing',
        industry: ['Technology'],
        date: '2025-04-11',
        relevancy: true,
        sentiment: 'Positive',
      },
      {
        id: '7',
        source: 'BBC News',
        author: 'Anita Kapoor',
        title: 'Tourism Industry Rebounds Post-COVID',
        industry: ['Travel', 'Hospitality'],
        date: '2025-04-08',
        relevancy: true,
        sentiment: 'Positive',
      },
      {
        id: '8',
        source: 'CNN',
        author: 'David Li',
        title: 'Tech Layoffs Continue in Silicon Valley',
        industry: ['Technology', 'Employment'],
        date: '2025-04-07',
        relevancy: true,
        sentiment: 'Negative',
      },
      {
        id: '9',
        source: 'Business Insider',
        author: 'Laura Kim',
        title: 'Startups See Surge in Venture Capital',
        industry: ['Finance', 'Startups'],
        date: '2025-04-14',
        relevancy: true,
        sentiment: 'Positive',
      },
      {
        id: '10',
        source: 'The Guardian',
        author: 'Raj Patel',
        title: 'Climate Change Concerns Escalate',
        industry: ['Environment', 'Policy'],
        date: '2025-04-06',
        relevancy: true,
        sentiment: 'Negative',
      },
    ]);
  }
}
