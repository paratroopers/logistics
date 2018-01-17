/** 国际化*/
export interface AppLocaleStatic {
    antd?: Object;
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

/** 基础类*/
export interface BaseModel {
    TenantID?:string;
    CreatedBy?: string;
    ModifiedBy?: string;
    Created?: Date;
    Modified?: Date;
}