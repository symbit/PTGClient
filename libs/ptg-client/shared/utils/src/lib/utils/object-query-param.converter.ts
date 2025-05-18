import { toArray } from 'lodash-es';

export interface UrlQueryParameterConverter<T> {
  fromQuery(
    queryParameterValues: string[],
    defaultValue?: T[] | undefined,
    currentValue?: T[] | null,
  ): T[];
  toQuery(
    value: T,
    defaultValue?: T | undefined,
    currentQueryParameterValues?: string[],
  ): string[];
}

export const createArrayQueryParamConverter = <
  T,
>(): UrlQueryParameterConverter<T> => {
  return {
    fromQuery: (
      queryParameters: string[] = [],
      defaultValue: T[] = [],
    ): any[] => {
      return queryParameters.length > 0
        ? toArray(JSON.parse(decodeURIComponent(queryParameters[0])))
        : defaultValue;
    },
    toQuery: (value: T) => {
      const values = value
        ? Object.entries(value).filter(([, v]) => v != null)
        : [];

      return values?.length
        ? [encodeURIComponent(JSON.stringify(Object.fromEntries(values)))]
        : [];
    },
  };
};
