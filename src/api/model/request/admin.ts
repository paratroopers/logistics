import {OrderTypeEnum}from "../common";

export interface GetWarehouseInListRequest {
    type:OrderTypeEnum;
    pageIndex:number;
    pageSize:number;
}