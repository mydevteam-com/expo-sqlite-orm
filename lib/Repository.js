import { DatabaseLayer } from './DatabaseLayer';
import DataTypes from './DataTypes';
export class Repository {
    constructor(databaseName, tableName, columnMapping) {
        this.columnMapping = columnMapping;
        this.tableName = tableName;
        this.databaseLayer = new DatabaseLayer(databaseName, tableName);
    }
    insert(data) {
        // @ts-ignore
        const obj = DataTypes.toDatabaseValue(this.columnMapping, this._sanitize(data));
        return this.databaseLayer.insert(obj).then(res => DataTypes.toModelValue(this.columnMapping, res));
    }
    update(data) {
        const obj = DataTypes.toDatabaseValue(this.columnMapping, this._sanitize(data));
        return this.databaseLayer.update(obj);
    }
    destroy(id) {
        return this.databaseLayer.destroy(id);
    }
    destroyAll() {
        return this.databaseLayer.destroyAll();
    }
    find(id) {
        return this.databaseLayer.find(id).then(res => (res ? DataTypes.toModelValue(this.columnMapping, res) : null));
    }
    findBy(where = {}) {
        return this.databaseLayer.findBy(where).then(res => (res ? DataTypes.toModelValue(this.columnMapping, res) : null));
    }
    query(options = {}) {
        return this.databaseLayer.query(options).then(res => res.map((p) => DataTypes.toModelValue(this.columnMapping, p)));
    }
    _sanitize(obj) {
        const allowedKeys = Object.keys(this.columnMapping);
        return Object.keys(obj).reduce((ret, key) => {
            return allowedKeys.includes(key) ? { ...ret, [key]: obj[key] } : ret;
        }, {});
    }
}
