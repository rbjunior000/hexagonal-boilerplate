type PaginationInput = {
  page: number;
  pageSize: number;
};

type SortInput = {
  order?: 'DESC' | 'ASC';
};

export type PaginateOutput<T> = {
  docs: T[];
  page: number;
  limit: number;
  total: number;
};

export const calculateSkip = (page: number, limit: number) => {
  return +((page - 1) * limit);
};

export type SortPaginationInput<T> = T & SortInput & PaginationInput;
