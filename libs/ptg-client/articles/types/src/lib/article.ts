export interface Article {
  id: string;
  source: string;
  author: string;
  title: string;
  industry: string[];
  date: string;
  relevancy: boolean;
  sentiment: string;
}
