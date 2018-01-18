import {BaseModel} from "./common-model";

/** 附件*/
export interface Attachment extends BaseModel {
    /** 主键*/
    ID?: string;
    /** 路径*/
    path?: string;
    customerOrderID?: string;
}

/** 新建入库*/
export interface WarehouseInModel extends BaseModel{
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
    /** 入库单号*/
    WareHouseOrder?: string;
    /** 客户订单号*/
    CustomerOrder?: string;
    /** 会员号*/
    MemeberCode?: string;
    /** 物流方式*/
    LogisticsType?: string;
    /** 物流单号*/
    LogisticsOrder?: string;
    /** 验收单号*/
    AcceptanceNumber?: string;
    /** 入库体积*/
    WarehouseInVolume?: string;
    /** 入库重量*/
    WarehouseInWeight?: string;
    /** 入库时间*/
    WarehouseInTime?: string;
    /** 状态*/
    Status?: string;
    /** 备注*/
    Remark?: string;
    /** 附件*/
    Attachment?: Attachment[];
}