import { SQLTransactionCallback, SQLTransactionErrorCallback } from 'expo-sqlite';
export declare class Database {
    private databaseName;
    private database;
    private static instances;
    private constructor();
    private openDatabase;
    static instance(databaseName: string): Database;
    transaction(callback: SQLTransactionCallback, errorCallback?: SQLTransactionErrorCallback, successCallback?: () => void): void;
    close(): Promise<void>;
    reset(): Promise<void>;
}
