/// <reference types="jest" />
export declare const executeBulkSql: jest.Mock<Promise<any>, [p: any], any>;
export declare const executeSql: jest.Mock<Promise<any>, [p: any], any>;
export declare const createTable: jest.Mock<Promise<any>, [p: any], any>;
export declare const dropTable: jest.Mock<Promise<any>, [p: any], any>;
export declare const insert: jest.Mock<Promise<any>, [p: any], any>;
export declare const update: jest.Mock<Promise<{}>, [], any>;
export declare const destroy: jest.Mock<Promise<boolean>, [], any>;
export declare const destroyAll: jest.Mock<Promise<boolean>, [], any>;
export declare const find: jest.Mock<Promise<{
    id: any;
}>, [id: any], any>;
export declare const findBy: jest.Mock<Promise<{
    id: any;
    numero: any;
}>, [any], any>;
export declare const query: jest.Mock<Promise<{
    id: number;
}[]>, [any], any>;
export declare const _sanitize: jest.Mock<any, any, any>;
export declare const DatabaseLayer: jest.Mock<any, any, any>;
