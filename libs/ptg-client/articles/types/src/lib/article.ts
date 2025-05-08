export interface Article {
  id: number;
  url: string;
  title: string;
  provider: string;
  source: string;
  publicationDate: string;
  summary: string;
  isRelevant: true;
  sentiment: 'positive' | 'negative' | 'neutral';
  sectors: string[];
}
