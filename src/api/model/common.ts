/** 国际化*/
export interface AppLocaleStatic {
    antd?: any;
    locale?: string;
    formats?: Object;
    messages?: Object;
    defaultLocale?: string;
    defaultFormats?: Object;
}

/** 屏幕尺寸*/
export enum ScreenModeEnum{
    xs = 0,
    sm = 1,
    md = 2,
    lg = 3,
    xl = 4
}

/** 注册类型*/
export enum RegisterEnum{
    phone = 0,
    mail = 1
}

/** 订单类型*/
export enum OrderTypeEnum{
    /** 仓库入库*/
    WarehouseIn = 0,
    /** 客服确认阶段*/
    CustomerConfirm = 1,
    /** 仓库打包阶段*/
    WarehousePackage = 2,
    /** 客服付款阶段*/
    CustomerPayment = 3,
        /** 发货阶段*/
    WaitForDelivered = 4
}

/** 基础类*/
export interface BaseModel {
    TenantID?:string;
    CreatedBy?: string;
    ModifiedBy?: string;
    Created?: Date;
    Modified?: Date;
}