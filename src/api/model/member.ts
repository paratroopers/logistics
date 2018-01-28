import {BaseModel} from "./common";

/** 附件*/
export interface Attachment extends BaseModel {
    /** 主键*/
    ID?: string;
    /** 路径*/
    path?: string;
    customerOrderID?: string;
}

/** 新建入库*/
export interface WarehouseInModel extends BaseModel {
    /** 会员号*/
    MemeberCode?: string;
    /** 物流方式*/
    LogisticsType?: string;
    /** 物流单号*/
    LogisticsOrder?: string;
    /** 客服*/
    UserID?: number;
    /** 长*/
    Length?: number;
    /** 宽*/
    Width?: number;
    /** 高*/
    Height?: number;
    /** 入库重量*/
    WarehouseInWeight?: number;
    /** 状态*/
    Status?: string;
    /** 附件*/
    Attachment?: Attachment[];
}

/** 入库列表*/
export interface WarehouseListModel extends BaseModel {
    /** 主键*/
    ID?: number;
    /** 会员ID*/
    userid?: string;
    /** 客户订单号*/
    CustomerOrderNo?: string,
    /** 快递单号*/
    expressNo?: string,
    /** 快递类型ID*/
    expressTypeID?: number,
    /** 快递类型Name*/
    expressTypeName?: string,
    /** 交接单*/
    TransferNo?: string,
    /** 件数*/
    InPackageCount?: number,
    /** 入库重量*/
    InWeight?: number,
    /** 入库体积*/
    InVolume?: number,
    /** 入库长度*/
    InLength?: number,
    /** 入库宽度*/
    InWidth?: number,
    /** 入库高度*/
    InHeight?: number,
    /** 仓库ID*/
    WareHouseID?: number,
    /** 入库时间*/
    InWareHouseTime?: Date,
    /** 客服ID*/
    CustomerServiceID?: number
}

/** 客户订单状态*/
export interface MemberOrderStatusModel extends BaseModel {
    DeliveryDoneCount?: number;
    waitForCustomerPackgeCount?: number;
    waitForPayCount?: number;
}

export interface CustomerOrderModel extends BaseModel {
    CustomerOrderNo?: string;
    CustomerServiceID?: string;
    ID?: string;
    InHeight?: number;
    InLength?: number;
    InPackageCount?: number;
    InVolume?: number;
    InWareHouseTime?: string;
    InWeight?: number;
    InWidth?: number;
    TransferNo?: string;
    WareHouseID?: string;
    expressNo?: string;
    expressTypeID?: string;
    expressTypeName?: string;
    userid?: string;
}