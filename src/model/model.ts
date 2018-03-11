import {Util} from '../util/util';

export namespace ModelNameSpace {

    //region 基类定义区
    export interface BaseModel {
        TenantID?: string;
        CreatedBy?: string;
        CreatedByName?: string;
        ModifiedBy?: string;
        ModifiedByName?: string;
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

    export interface UserSearchModel {
        name: string;
        type: number;
    }

    export interface UserSearchIndexRequest {
        name: string;
        type: number;
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
    /** 定义类对象*/
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
        WeightLimit?: string,
        SizeLimit?: string
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
        WeightLimit?: string,
        SizeLimit?: string
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
        WeightLimit?: string,
        SizeLimit?: string
    }

    //endregion

    //region 用户或者会员模块定义区

    //endregion

    //region 仓库入库
    /** 附件*/
    export interface Attachment extends BaseModel {
        /** 主键*/
        ID?: string;
        /** 路径*/
        path?: string;
        customerOrderNo?: string;
        customerOrderID?: string;
    }

    /** 入库状态统计*/
    export interface WarehouseInStatusModel {
        unconfirmedCount?: number,
        confirmedCount?: number,
        retrunGoodsCount?: number
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
        ID?: string;
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
        /** 仓库名称*/
        WareHouseName?: string;
        /** 入库时间*/
        InWareHouseTime?: Date;
        /** 客服ID*/
        CustomerServiceID?: number;
        /** 客服名称*/
        CustomerServiceName?: string;
        /** 会员编号*/
        MemeberCode?: string;
        /** 状态编号*/
        currentStatus?: string;
        /** 状态名称*/
        currentStep?: string;
        /** 备注*/
        WarehouseAdminRemark?: string;
    }

    /** 客户订单 客户合并订单*/
    export interface MemberOrderStatusModel extends BaseModel {
        DeliveryDoneCount?: number;
        waitForCustomerPackgeCount?: number;
        waitForPayCount?: number;
    }

    /** 渠道选择基本类*/
    export interface ChannelModal extends BaseModel {
        TenantID?: string;
        ID?: string;
        Name?: string;
        code?: string;
        Prescription?: string;
        Remark?: string;
        Clause?: string;
        WeightLimit?: string;
        SizeLimit?: string;
    }

    export interface FormDeliveredModel {
        agentID?: number;
        agentName?: string;
        channelNo?: string;
    }

    export interface UploadModel {
        uid?: string;
        url?: string;
        name?: string;
        size?: number;
        status?: string;
    }

    //endregion

    //region 泛型定义区

    /** 表单类型枚举*/
    export  enum FormOpertationEnum {
        view = 0,
        edit = 1,
        add = 2
    }

    // OrderIn	    0	仓库管理-订单入库	step=0、isAdmin=true	                        0待确认、1已确认、2仓库退货
    // WaitPackage	1	我的订单-待打包	    step=1、customerOrderStatus=1、isAdmin=false	1待打包
    // WaitApprove	2	我的订单-待审核	    step=12、isAdmin=false	                        1客户确认、2仓库打包
    // OrderConfirm	3	客服管理-订单确认	step=1、isAdmin=true	                        0待确认
    // OrderMerge	4	仓库管理-合并打包	step=2、isAdmin=true	                        0待确认
    // WaitPay	    5	我的订单-待付款	    step=3、isAdmin=false	                        0待确认
    // OrderOut 	6	仓库管理-订单出库	step=4、isAdmin=true	                        0待确认、1已确认

    /** 自定义模块类型*/
    export enum OrderTypeEnum {
        /** 仓库管理-订单入库*/
        OrderIn = 0,
            /** 我的订单-待打包*/
        WaitPackage = 1,
            /** 我的订单-待审核*/
        WaitApprove = 2,
            /** 我的订单-待付款*/
        WaitPay = 3,
            /** 客服管理-订单确认*/
        OrderConfirm = 4,
            /** 仓库管理-合并打包*/
        OrderMerge = 5,
            /** 仓库管理-订单出库*/
        OrderOut = 6
    }

    /** 自定义模块状态*/
    export enum OrderStatusEnum{
        StatusA=0,
        StatusB=1,
        StatusC=2
    }

    /** 注册类型*/
    export enum RegisterEnum {
        phone = 0,
        mail = 1
    }

    /** 屏幕尺寸枚举*/
    export enum ScreenModeEnum {
        xs = 0,
        sm = 1,
        md = 2,
        lg = 3,
        xl = 4
    }

    /** 按钮类型枚举*/
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
        saveascontact = 10,
        choosecontact = 11,
        view = 12,
        search = 13,
        reset = 14,
        pay = 15

    }

    //endregion

    //region 客户定义区

    /** 客户订单Model*/
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

    /** 合并订单Model*/
    export interface CustomerOrderMergeModel extends BaseModel {
        currentStatus: string,
        currentStep: string,
        ID: string,
        UserID: string,
        /** 合并订单编号*/
        MergeOrderNo: string,
        /** 备注*/
        CustomerMark: string,
        /** 渠道ID*/
        CustomerChooseChannelID: string,
        /** 客户选择渠道Name*/
        CustomerChooseChannelName: string,
        /** 渠道Name*/
        ChannelName: string,
        /** 总重量*/
        InWeightTotal: number,
        /** 总体积*/
        InVolumeTotal: number,
        /** 总打包数量*/
        InPackageCountTotal: number,
        /** 收件人姓名*/
        recipient: string,
        /** 国家*/
        country: string,
        /** 地址*/
        address: string,
        /** 城市*/
        city: string,
        code: string,
        /** 电话*/
        tel: string,
        /** 公司*/
        company: string,
        /** 邮编*/
        taxNo: string,
        /** 申报总数*/
        declareTotal: number,
        /** 客服备注*/
        customerServiceMark: string,
        /** 打包备注*/
        packageMark: string,
        /** 打包重量*/
        packageWeight: number,
        /** 打包体积*/
        packageVolume: number,
        /** 打包长度*/
        packageLength: number,
        /** 打包高度*/
        packageHeight: number,
        /** 打包宽度*/
        packageWidth: number,
        settlementWeight: number,
        freightFee: number,
        tax: number,
        serviceFee: number,
        remoteFee: number,
        magneticinspectionFee: number,
        totalFee: number,
        /** 渠道ID*/
        ChannelID: string,
        /** 渠道编号*/
        channelNo: string,
        deliverTime: Date,
        AgentID: string,
    }

    /** 合并订单状态Model*/
    export interface CustomerOrderMergeStatusModel extends BaseModel {
        ID: string,
        mergeOrderID: string,
        mergeOrderNo: string,
        currentStep: string,
        currentStatus: string
    }

    /** 合并订单货品申报Model*/
    export class CustomerOrderMergeProductModel {
        constructor() {
            this.productName = "";
            this.productNameEN = "";
            this.HSCode = "";
            this.declareUnitPrice = 0;
            this.productCount = 0;
            this.ID = Util.guid();
            this.declareTotal = '00.00';
        }

        ID?: string;
        total?: string;
        productName?: string;
        productNameEN?: string;
        HSCode?: string;
        declareUnitPrice?: number;
        productCount?: number;
        mergeOrderID?: string;
        declareTotal?: string;
    }

    /** 合并订单详情Model*/
    export interface CustomerOrderMergeDetailModel {
        mergeOrder?: CustomerOrderMergeModel,
        mergeStatus?: CustomerOrderMergeStatusModel,
        customerOrderList?: CustomerOrderModel[],
        mergeDetailList?: CustomerOrderMergeProductModel[]
    }

    //endregion

    //region 客服阶段定义区

    /** 合并详情*/
    export class PackageDetailListModel {
        constructor() {
            this.ID = Util.guid();
            this.PackageName = "";
            this.PackageLength = 0;
            this.PackageWidth = 0;
            this.PackageHeight = 0;
            this.PackageWeight = 0;
        }

        ID?: string;
        PackageName?: string;
        PackageLength?: number;
        PackageWidth?: number;
        PackageHeight?: number;
        PackageWeight?: number;
    }

    //endregion

    //region 报表定义区
    //endregion

    //region 财务定义区
    //endregion

    /*订单详情*/
    export class FormOrderInfoModel {
        constructor(defaultValue = undefined) {
            try {
                if (defaultValue) {
                    const orderInfo = defaultValue['mergeOrder'] ? defaultValue.mergeOrder : defaultValue;
                    this.created = orderInfo.Created.toString();
                    this.weight = orderInfo.InWeightTotal;
                    this.volume = orderInfo.InVolumeTotal;
                    this.count = orderInfo.InPackageCountTotal;
                }
            } catch (err) {
                return new Error('必须传入正确参数');
            }
        }

        created ?: string;
        weight ?: number;
        volume ?: number;
        count ?: number;
    }

    /*收货人信息*/
    export class AddressModel {
        constructor(defaultValue = undefined) {
            if (defaultValue) {
                const mergeOrder = defaultValue['mergeOrder'] ? defaultValue.mergeOrder : defaultValue;
                this.Tel = mergeOrder.tel;
                this.taxno = mergeOrder.taxNo;
                this.country = mergeOrder.country;
                this.City = mergeOrder.city;
                this.companyName = mergeOrder.company;
                this.recipient = mergeOrder.recipient;
                this.Address = mergeOrder.address;
                this.postalcode = mergeOrder.code;
            }
        }

        ID?: string;
        Userid?: string;
        ProvinceID?: string;
        /** 邮编*/
        taxno?: string;
        /** 公司*/
        companyName?: string;
        /** 收件人姓名*/
        recipient?: string;
        /** 国家*/
        country?: string;
        /** 城市*/
        City?: string;
        /** 税号*/
        postalcode?: string;
        /** 电话*/
        Tel?: string;
        /** 地址*/
        Address?: string;
        TenantID?: string;
        CreatedBy?: string;
        CreatedByName?: string;
        ModifiedBy?: string;
        ModifiedByName?: string;
        Created?: Date;
        Modified?: Date;
    }
}