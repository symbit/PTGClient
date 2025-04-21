export interface SearchResults<T> {
  total: number;
  maxPage: number;
  results: T[];
}
