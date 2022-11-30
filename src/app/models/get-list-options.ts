import { Pagination } from './pagination';

export interface GetListOptions {
  pagination?: Pagination;
  filters?: any;
}

export type GetListOptionsType = GetListOptions | undefined | null;
