import {BaseModel}from "./common";

export interface MessageLaterModel{
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

export interface UserNavigationsModel{
    parentItem?:UserNavigationsChildrenModel;
    childItems?:UserNavigationsChildrenModel[];
}

export interface UserNavigationsChildrenModel extends BaseModel{
    ID?: number;
    Name_CN?: string;
    Name_EN?: string;
    Summary?: string;
    Image?: string;
    Url?: string;
    ParentID?: number;
    SortID?: number;
}

interface UserRoleModel extends BaseModel{
    RoleID?: number;
    roleName?: string;
}

interface UserInfoModel extends BaseModel{
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