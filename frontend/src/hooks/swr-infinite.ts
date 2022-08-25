import { fetcher } from '@libs/http/swr-fetcher';
import { KeyedMutator } from 'swr';
import _useSWRInfinite from 'swr/infinite';

function getKeyDefault(pageIndex: number, previousPageData: any) {
  if (previousPageData && !previousPageData.length) return null; // 끝에 도달
  return `?page=${pageIndex}&limit=10`; // SWR 키
}

interface useSWRInfiniteResult<T> {
  batchs: T[];
  page: number;
  count: number;
  hasNext: boolean;
  goNext: () => void;
  isLoading: boolean;
  error: any;
  mutate: KeyedMutator<any[]>;
}

export function useSWRInfinite<T>(
  getKey = getKeyDefault,
  getCount: (data: any) => number = (data) => data.count,
  parser: (data: any) => T = (data) => data,
): useSWRInfiniteResult<T> {
  const { data, isValidating, error, mutate, size, setSize } = _useSWRInfinite(
    getKey,
    fetcher,
  );

  return {
    batchs: data?.map((batch) => parser(batch)) ?? [],
    page: size,
    count: data ? getCount(data[0]) : 0,
    hasNext: data ? !!getKey(size, data[data.length - 1]) : false,
    goNext: () => setSize((page) => page + 1),
    isLoading: isValidating || !(data || error),
    error,
    mutate,
  };
}
