import {BaseModel} from "./common";

export interface BaseListRequest {
    pageIndex: number;
    pageSize: number;
}

export interface MessageLaterModel {
    Created?: string;
    CreatedBy?: string;
    ID?: string;
    Modified?: string;
    ModifiedBy?: string;
    TenantID?: string;
    message?: string;
    type?: number;
    userid?: string;
}

export interface UserNavigationsModel {
    parentItem?: UserNavigationsChildrenModel;
    childItems?: UserNavigationsChildrenModel[];
}

export interface UserNavigationsChildrenModel extends BaseModel {
    ID?: number;
    Name_CN?: string;
    Name_EN?: string;
    Summary?: string;
    Image?: string;
    Url?: string;
    ParentID?: number;
    SortID?: number;
    color?: string;
}

interface UserRoleModel extends BaseModel {
    RoleID?: number;
    roleName?: string;
}

interface UserInfoModel extends BaseModel {
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

export interface UserModel {
    navigations?: UserNavigationsModel[];
    role?: UserRoleModel;
    userInfo?: UserInfoModel;
}

export enum orderMergeStepEnum {
    /*待打包*/
    WaitForPackage = 0,
    /*客户确认*/
    CustomerConfirm = 1,
    /*仓库打包*/
    WarehousePackege = 2,
    /*代付款*/
    WaitForPay = 3,
    /*代发货*/
    WaitForDelivery = 4
}

export enum waitForPackageStatusEnum {
    /*待确认*/
    WaitConfirm = 0,
    /*已确认*/
    Confirmed = 1,
    /*仓库退货*/
    WarehouseRefuse = 2
}