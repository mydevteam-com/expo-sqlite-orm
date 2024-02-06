import { DatabaseLayer } from './DatabaseLayer';
import { ColumnMapping, IQueryOptions } from './types';
export declare class Repository<T = Record<string, any> | {
    id: any;
}> {
    private columnMapping;
    private tableName;
    readonly databaseLayer: DatabaseLayer<T>;
    constructor(databaseName: string, tableName: string, columnMapping: ColumnMapping<T>);
    insert(data: Omit<T, 'id'>): Promise<T>;
    update(data: T): Promise<T>;
    destroy(id: any): Promise<boolean>;
    destroyAll(): Promise<boolean>;
    find(id: any): Promise<T | null>;
    findBy(where?: {}): Promise<T | null>;
    query(options?: IQueryOptions<T>): Promise<T[]>;
    private _sanitize;
}
