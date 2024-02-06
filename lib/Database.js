import * as SQLite from 'expo-sqlite';
export class Database {
    constructor(databaseName) {
        this.databaseName = databaseName;
    }
    openDatabase() {
        if (!this.database) {
            this.database = SQLite.openDatabase(this.databaseName);
        }
    }
    static instance(databaseName) {
        if (!this.instances[databaseName]) {
            this.instances[databaseName] = new Database(databaseName);
        }
        return this.instances[databaseName];
    }
    transaction(callback, errorCallback, successCallback) {
        this.openDatabase();
        return this.database.transaction(callback, errorCallback, successCallback);
    }
    async close() {
        if (!this.database)
            return;
        await this.database.closeAsync();
        this.database = undefined;
    }
    async reset() {
        this.openDatabase();
        await this.database.closeAsync();
        await this.database.deleteAsync();
        this.database = undefined;
    }
}
Database.instances = {};
