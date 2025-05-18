export type Filters = {
  name: string;
  value: string | number | boolean | object;
  behaviour?: 'AND' | 'OR' | 'NOT';
  operator?: 'ilike' | '==' | '<=' | '>=';
}[];

export interface SearchCriteria {
  page?: number;
  pageSize?: number;
  term?: string;
  sort?: string;
  searchType?: string;
  filters?: Filters | null;
}

export const DefaultSearchCriteria: SearchCriteria = {
  page: 1,
  pageSize: 20,
  term: '',
  filters: [],
};
