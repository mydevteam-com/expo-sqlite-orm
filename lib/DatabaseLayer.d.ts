import { IQueryOptions } from './types';
export declare class DatabaseLayer<T = any> {
    private database;
    private tableName;
    constructor(databaseName: string, tableName: string);
    executeBulkSql(sqls: string[], params?: any[]): Promise<unknown>;
    executeSql(sql: string, params?: any[]): Promise<any>;
    insert<P = any>(obj: P): Promise<any>;
    update<P = any>(obj: P): Promise<any>;
    bulkInsertOrReplace(objs: any): Promise<unknown>;
    destroy(id: any): Promise<boolean>;
    destroyAll(): Promise<boolean>;
    find(id: any): Promise<any>;
    findBy(where?: {}): Promise<any>;
    query(options?: IQueryOptions<T>): Promise<any>;
}
