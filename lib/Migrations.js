import { Database } from './Database';
import { columnTypes } from './DataTypes';
import QueryBuilder from './query_builder';
import { Repository } from './Repository';
// Install the extension thebearingedge.vscode-sql-lit
const lit = (s, ...args) => s.map((ss, i) => `${ss}${args[i] || ''}`).join('');
export const sql = lit;
const TABLE_NAME = '_migrations';
const columnMapping = {
    name: { type: columnTypes.TEXT },
};
export class Migrations {
    constructor(databaseName, statements) {
        this.database = Database.instance(databaseName);
        this.statements = statements;
        this.repository = new Repository(databaseName, TABLE_NAME, columnMapping);
    }
    async migrate() {
        await this.setupMigrationsTable();
        const { sqls, params } = this.statementsExecutionAdapter(await this.getPendingStatements());
        return this.repository.databaseLayer.executeBulkSql(sqls, params);
    }
    async hasPendingMigrations() {
        return Object.keys(await this.getPendingStatements()).length > 0;
    }
    async reset() {
        await this.database.reset();
    }
    async setupMigrationsTable() {
        const sql = `CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (name TEXT NOT NULL)`;
        await this.repository.databaseLayer.executeSql(sql).then(() => true);
    }
    async getExecutedMigrationNames() {
        await this.setupMigrationsTable();
        return this.repository.query({
            order: { name: 'DESC' },
        }).then(migrations => migrations.map(migration => migration.name));
    }
    async getPendingStatements() {
        const executedMigrationNames = await this.getExecutedMigrationNames();
        return Object.keys(this.statements).sort().reduce((statements, name) => {
            if (executedMigrationNames.includes(name))
                return statements;
            return {
                ...statements,
                [name]: this.statements[name]
            };
        }, {});
    }
    statementsExecutionAdapter(statements) {
        return Object.entries(statements).reduce((accumulator, [name, sql]) => {
            return {
                sqls: [
                    ...accumulator.sqls,
                    sql,
                    QueryBuilder.insert(TABLE_NAME, { name })
                ],
                params: [
                    ...accumulator.params,
                    [],
                    [name]
                ]
            };
        }, { sqls: [], params: [] });
    }
}
