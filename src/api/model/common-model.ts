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

/** 基础类*/
export interface BaseModel {
    TenantID?:string;
    CreatedBy?: string;
    ModifiedBy?: string;
    Created?: Date;
    Modified?: Date;
}

/** 用户类*/
export interface UserInfo extends BaseModel{
    Email?: string;
    Tel?: string;
    UserName?: string;
    Userid?: number;
    Pwd?: string;
    WebChatID?: string;
    Token?: string;
    MemeberCode?: string;
    LastLoginTime?: string
    Ticket?: string;
}

/** 角色类*/
export interface RoleInfo extends BaseModel{
    RoleID?: number;
    roleName?: string;
}

/** 用户导航类*/
export interface MemberNavigationModel{
    parentItem?:MemberParentNavigationModel;
    childItems?:MemberChildNavigationModel[];
}

/** 用户导航父级类*/
export interface MemberParentNavigationModel{
    ID?: number;
    Name_CN?: string;
    Name_EN?: string;
    Summary?: string;
    Image?: string;
    Url?: string;
    ParentID?: number;
    SortID?: number;
}

/** 用户导航子级类*/
export interface MemberChildNavigationModel extends BaseModel{
    ID?: number;
    Name_CN?: string;
    Name_EN?: string;
    Summary?: string;
    Image?: string;
    Url?: string;
    ParentID?: number;
    SortID?: number;
}

/** 用户Context*/
export interface UserContext{
    userInfo?: UserInfo;
    role?: RoleInfo;
    navigations?: MemberNavigationModel[];
}