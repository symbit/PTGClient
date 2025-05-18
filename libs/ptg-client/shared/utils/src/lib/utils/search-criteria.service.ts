import { computed, inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

import { createArrayQueryParamConverter } from './object-query-param.converter';
import { Filters, SearchCriteria } from '@ptg/shared-types';

function injectRouteSearchParams() {
  const { snapshot, queryParamMap } = inject(ActivatedRoute);
  const page = Number(snapshot.queryParamMap.get('page')) || 1;
  const pageSize = Number(snapshot.queryParamMap.get('pageSize')) || 20;
  const term = snapshot.queryParamMap.get('term') || '';
  const sort = snapshot.queryParamMap.get('sort') || '';

  const filters = snapshot.queryParamMap.get('filters')?.length
    ? createArrayQueryParamConverter().fromQuery([
        snapshot.queryParamMap.get('filters')!,
      ])
    : [];

  const page$ = queryParamMap.pipe(
    map((params) => Number(params.get('page')) || 1),
  );
  const pageSize$ = queryParamMap.pipe(
    map((params) => Number(params.get('pageSize')) || 20),
  );
  const term$ = queryParamMap.pipe(map((params) => params.get('term') || ''));
  const sort$ = queryParamMap.pipe(map((params) => params.get('sort') || ''));

  const filters$ = queryParamMap.pipe(
    map((params) =>
      params.get('filters')
        ? createArrayQueryParamConverter().fromQuery([params.get('filters')!])
        : [],
    ),
  );

  return {
    page,
    pageSize,
    term,
    sort,
    filters,
    page$,
    pageSize$,
    term$,
    sort$,
    filters$,
  };
}

@Injectable()
export class SearchCriteriaService {
  readonly routeParams = injectRouteSearchParams();

  readonly searchPayload = computed<SearchCriteria>(() => {
    return {
      page: this._page(),
      pageSize: this._pageSize(),
      term: this._term(),
      sort: this._sort(),
      filters: this._filters() as Filters,
    };
  });
  private readonly _pageSize = toSignal(this.routeParams.pageSize$, {
    initialValue: this.routeParams.pageSize,
  });
  private readonly _page = toSignal(this.routeParams.page$, {
    initialValue: this.routeParams.page,
  });
  private readonly _term = toSignal(this.routeParams.term$, {
    initialValue: this.routeParams.term,
  });
  private readonly _sort = toSignal(this.routeParams.sort$, {
    initialValue: this.routeParams.sort,
  });
  private readonly _filters = toSignal(this.routeParams.filters$, {
    initialValue: this.routeParams.filters,
  });
}
