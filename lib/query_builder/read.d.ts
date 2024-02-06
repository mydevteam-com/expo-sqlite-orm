import { IQueryOperation, IQueryOptions, IQueryWhere } from "../types";
export declare function find(tableName: string): string;
export declare function query<T = {}>(tableName: string, options?: IQueryOptions<T>): string;
export declare function propertyOperation<T extends {}>(property: keyof T, options: Partial<Record<IQueryOperation, any>>): string;
export declare function queryWhere<T = any>(options: IQueryWhere<T>): string;
declare const _default: {
    find: typeof find;
    query: typeof query;
};
export default _default;
