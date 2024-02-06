export declare function insert<T = {}>(tableName: string, object: T): string;
export declare function insertOrReplace<T>(tableName: string, object: T): string;
declare const _default: {
    insert: typeof insert;
    insertOrReplace: typeof insertOrReplace;
};
export default _default;
