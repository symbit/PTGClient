export interface NumberOfArticlesByRelevancy {
  true: number;
  false: number;
}

export interface NumberOfArticlesBySentiment {
  positive: number;
  negative: number;
  neutral: number;
}

export interface NumberOfArticlesBySource {
  BusinessInsider: number;
  PAP: number;
}

export interface InsightSource {
  title: string;
  url: string;
}

export interface Insight {
  id: number;
  insightListId: number;
  insightText: string;
  sources: InsightSource[];
}

export interface ArticleInsights {
  id: number;
  analysisDate: string;
  numberOfArticlesAnalyzed: number;
  insights: Insight[];
}

export interface ArticlesStatistics {
  totalNumberOfArticles: number;
  numberOfArticlesByRelevancy: NumberOfArticlesByRelevancy;
  numberOfArticlesBySentiment: NumberOfArticlesBySentiment;
  numberOfArticlesBySource: NumberOfArticlesBySource;
  articleInsights: ArticleInsights;
}
