export  namespace  ModelNameSpace{

    //region 基类定义区
    /** 基础类*/
    export interface BaseModel {
        TenantID?:string;
        CreatedBy?: string;
        ModifiedBy?: string;
        Created?: Date;
        Modified?: Date;
    }

    //endregion

    //region 用户登录，注册，找回密码，用户相关信息 定义区，
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

    export interface  AddressModel{
        taxno?:string;
        companyName?:string;
        recipient?:string;
        country?:string;
        ID?:string;
        Userid?:string;
        ProvinceID?:string;
        City?:string;
        postalcode?:string;
        Tel?:string;
        Address?:string;
        Created?:string;
        Modified?:string;
        CreatedBy?:string;
        ModifiedBy?:string;
    }

    export interface  UserSearchModel{
        name:string;
        type:number;
    }


    export  interface UserSearchIndexRequest {
        name:string;
        type:number;
    }

    //endregion

    //region 系统模块定义区

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

    /** 国际化*/
    export interface AppLocaleStatic {
        antd?: any;
        locale?: string;
        formats?: Object;
        messages?: Object;
        defaultLocale?: string;
        defaultFormats?: Object;
    }




    //endregion

    //region 报价定义区
    /*定义类对象*/
    export interface CountryModel {
        ID?: string;
        chineseName?: string;
        code?: string;
        englishName?: string;
    }

    export interface CostModal {
        country?: string;
        weight?: string;
        length?: string;
        width?: string;
        height?: string;
        volume?: string;
        searchName?: string;
    }

    export interface CostTableModal {
        Amount?: number;
        Clause?: string;
        Prescription?: string;
        Remark?: string;
        ServiceAmount?: number;
        channelID?: string;
        channelName?: string;
        weight?: number;
        WeightLimit?:string,
        SizeLimit?:string
    }


    export interface QuotationModel {
        Amount?: number;
        Clause?: string;
        Prescription?: string;
        Remark?: string;
        ServiceAmount?: number;
        channelID?: string;
        channelName?: string;
        weight?: number;
        WeightLimit?:string,
        SizeLimit?:string
    }

    export interface QuotationModel {
        Amount?: number;
        Clause?: string;
        Prescription?: string;
        Remark?: string;
        ServiceAmount?: number;
        channelID?: string;
        channelName?: string;
        weight?: number;
        WeightLimit?:string,
        SizeLimit?:string
    }



    //endregion

    //region 用户或者会员模块定义区





    //endregion

    //region 仓库入库,打包，出库定义区
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
        CustomerOrderNo?: string;
        /** 快递单号*/
        expressNo?: string;
        /** 快递类型ID*/
        expressTypeID?: number;
        /** 快递类型Name*/
        expressTypeName?: string;
        /** 交接单*/
        TransferNo?: string;
        /** 件数*/
        InPackageCount?: number;
        /** 入库重量*/
        InWeight?: number;
        /** 入库体积*/
        InVolume?: number;
        /** 入库长度*/
        InLength?: number;
        /** 入库宽度*/
        InWidth?: number;
        /** 入库高度*/
        InHeight?: number;
        /** 仓库ID*/
        WareHouseID?: number;
        /** 入库时间*/
        InWareHouseTime?: Date;
        /** 客服ID*/
        CustomerServiceID?: number;
        /** 会员编号*/
        MemeberCode?:string;
        /** 状态编号*/
        currentStatus?:string;
        /** 状态名称*/
        currentStep?:string;
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
    //endregion

    //region 泛型定义区
    export  enum  FormOpertationEnum{
        view = 0,
        edit = 1,
        add = 2
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

    /** 屏幕尺寸*/
    export enum ScreenModeEnum{
        xs = 0,
        sm = 1,
        md = 2,
        lg = 3,
        xl = 4
    }

    export  enum ButtonTypeEnum {
        confirm = 1,
        cancel = 2,
        approve = 3,
        reject = 4,
        confirmApprove = 5,
        package = 6,
        export = 7,
        delete = 8,
        add = 9,
        saveascontact =10,
        choosecontact =11,
        view = 12,
        search = 13,
        reset =14,
        pay = 15

    }


    //endregion

    //region 客户待打包定义区
    //endregion

    //region 客服阶段定义区
    //endregion

    //region 报表定义区
    //endregion

    //region 财务定义区
    //endregion

}