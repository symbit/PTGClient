export type Sentiment = 'positive' | 'negative' | 'neutral';

export interface Article {
  id: number;
  url: string;
  title: string;
  provider: string;
  source: string;
  publicationDate: string;
  summary: string;
  isRelevant: true;
  sentiment: Sentiment;
  sectors: string[];
}
