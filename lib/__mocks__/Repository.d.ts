/// <reference types="jest" />
export declare const executeBulkSql: jest.Mock<any, any, any>;
export declare const executeSql: jest.Mock<any, any, any>;
export declare const createTable: jest.Mock<any, any, any>;
export declare const dropTable: jest.Mock<any, any, any>;
export declare const insert: jest.Mock<Promise<{}>, [], any>;
export declare const update: jest.Mock<Promise<{}>, [], any>;
export declare const destroy: jest.Mock<Promise<boolean>, [], any>;
export declare const destroyAll: jest.Mock<Promise<boolean>, [], any>;
export declare const find: jest.Mock<Promise<{}>, [id: any], any>;
export declare const findBy: jest.Mock<Promise<{}>, [any], any>;
export declare const query: jest.Mock<Promise<any[]>, [], any>;
export declare const _sanitize: jest.Mock<any, any, any>;
export declare const databaseLayer: any;
export declare const Repository: jest.Mock<any, any, any>;
