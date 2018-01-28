import {OrderTypeEnum}from "../common";

export interface GetWarehouseInListRequest {
    type:OrderTypeEnum;
    pageIndex:number;
    pageSize:number;
}

export interface WarehouseInAddRequest {
    /** 会员ID*/
    userid: number,
    /** 快递单号*/
    expressNo: string,
    /** 快递类型ID*/
    expressTypeID: number,
    /** 快递类型名称*/
    expressTypeName: string,
    /** 交接单号*/
    TransferNo: string,
    /** 件数*/
    InPackageCount: number,
    /** 入库重量*/
    InWeight: number,
    /** 入库体积*/
    InVolume: number,
    /** 入库长度*/
    InLength: number,
    /** 入库宽度*/
    InWidth: number,
    /** 入库高度*/
    InHeight: number,
    /** 仓库ID*/
    WareHouseID: number,
    /** 客服ID*/
    CustomerServiceID: number,
    /** 入库状态*/
    InWareHouseStatus: string,
    /** 备注*/
    WarehouseAdminRemark:string
}
