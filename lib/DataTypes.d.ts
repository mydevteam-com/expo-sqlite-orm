import { ColumnOptions, TDataType } from "./types";
export declare const columnTypes: Record<TDataType, TDataType>;
declare function toDatabaseValue<T extends {}>(columnMapping: Record<keyof T, ColumnOptions>, resource: T): {};
declare function propertyToDatabaseValue(type: TDataType, value: any): any;
declare function toModelValue<T extends {}>(columnMapping: Record<keyof T, ColumnOptions>, obj: any): T;
declare function propertyToModelValue(type: TDataType, value: any): any;
declare const _default: {
    toDatabaseValue: typeof toDatabaseValue;
    propertyToDatabaseValue: typeof propertyToDatabaseValue;
    toModelValue: typeof toModelValue;
    propertyToModelValue: typeof propertyToModelValue;
};
export default _default;
