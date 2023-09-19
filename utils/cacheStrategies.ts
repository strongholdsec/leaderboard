import type { UseQueryOptions } from '@tanstack/react-query';

const MINUTE_MS = 1000 * 60;

type QueryConfigOptions<DataT = unknown> = Pick<
  UseQueryOptions<DataT>,
  | 'staleTime'
  | 'cacheTime'
  | 'refetchOnMount'
  | 'refetchOnWindowFocus'
  | 'refetchOnReconnect'
>;

export const STRATEGY_IMMUTABLE: QueryConfigOptions = {
  staleTime: Infinity,
  cacheTime: Infinity,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
};

export const STRATEGY_CONSTANT: QueryConfigOptions = {
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  staleTime: 10 * MINUTE_MS,
  cacheTime: 15 * MINUTE_MS,
};

export const STRATEGY_LAZY: QueryConfigOptions = {
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  refetchOnReconnect: true,
  staleTime: 5 * MINUTE_MS,
  cacheTime: 10 * MINUTE_MS,
};

export const STRATEGY_EAGER: QueryConfigOptions = {
  refetchOnWindowFocus: true,
  refetchOnReconnect: true,
  refetchOnMount: true,
  staleTime: 0,
  cacheTime: 3 * MINUTE_MS,
};
