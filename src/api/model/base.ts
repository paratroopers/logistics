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
    childItems?: UserNavigationsChildrenModel[];
    parentItem?: UserNavigationsChildrenModel;
}

export interface UserNavigationsChildrenModel {
    Created?: string;
    CreatedBy?: string;
    ID?: string;
    Image?: string;
    Modified?: string;
    ModifiedBy?: string;
    Name_CN?: string;
    Name_EN?: string;
    ParentID?: string;
    SortID?: string;
    Summary?: string;
    TenantID?: string;
}

interface UserRoleModel {
    reated?: string;
    CreatedBy?: string;
    Modified?: string;
    ModifiedBy?: string;
    RoleID?: string;
    TenantID?: string;
    roleName?: string;
}

interface UserInfoModel {
    reated?: string;
    CreatedBy?: string;
    Email?: string;
    LastLoginTime?: string;
    MemeberCode?: string;
    ModifiedBy?: string;
    Pwd?: string;
    Tel?: string;
    TenantID?: string;
    Ticket?: string;
    Token?: string;
    UserName?: string;
    Userid?: string;
    WebChatID?: string;
}

export interface UserModel {
    navigations?: UserNavigationsChildrenModel[];
    role?: UserRoleModel;
    userInfo?: UserInfoModel;
}