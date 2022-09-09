export type IQueryOperation = 'equals' | 'notEquals' | 'lt' | 'lte' | 'gt' | 'gte' | 'contains' | 'in' | 'notIn';

export type IQueryWhere<T extends {} = {}> = {
  [P in keyof T]?: Partial<Record<IQueryOperation, T[P]>>
}

export type IQueryOrderBy<T = {}> = {
  [P in keyof T]?: 'ASC' | 'DESC'
}

export interface IQueryOptions<T> {
  columns?: (keyof T | '*')[];
  page?: number;
  limit?: number;
  where?: IQueryWhere<T>;
  order?: IQueryOrderBy<T>;
}
