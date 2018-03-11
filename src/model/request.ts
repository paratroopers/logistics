 import {ModelNameSpace} from './model';

export namespace RequestNameSpace {

    //region 基类定义区
    export interface BaseListRequest {
        pageIndex: number;
        pageSize: number;
        isAdmin?: boolean;
    }
    //endregion

    //region 用户或者会员模块定义区

    /** 验证账号是否已经注册*/
    export interface GetRecipientsAddressRequest {
        id: string;
    }

    export interface InsertRecipientsAddressRequest {
        country: string;
        recipient: string;
        City: string;
        postalcode: string;
        Tel: string;
        taxno: string;
        companyName: string;
        Address: string;
    }

    export interface UpdateRecipientsAddressRequest {
        id: string;
        country: string;
        recipient: string;
        City: string;
        postalcode: string;
        Tel: string;
        taxno: string;
        companyName: string;
        Address: string;
    }

    export interface DeleteRecipientsAddressRequest {
        id: string;
    }

    export interface AccountValidateRequest {
        user?: string;
        tenantID?: string;
    }

    export interface LoginRequest {
        user: string;
        pwd: string;
    }

    export interface ForgetRequest {
        mail?: string;
        tel?: string;
        pwd?: string;
        code?: string;
    }

    export interface UserSearchIndexRequest {
        name: string;
        type: number;
    }

    //endregion

    //region 系统模块定义区
    /** 获取验证码*/
    export interface GetCodeRequest {
        tel?: string;
        mail?: string;
        type?: string;
        tenantID?: string;
    }

    /** 注册账号*/
    export interface RegisterRequest {
        mail?: string;
        tel?: string;
        pwd?: string;
        rePwd?: string;
        code?: string;
        tenantID?: string;
    }


    //endregion

    //region 报价定义区
    export interface CountryModal {
        name: string;
    }

    export interface CountryRequest {
        request: CountryModal;
    }

    export interface QuotationRequest {
        request: {
            country?: string,
            weight?: string,
            length?: string,
            width?: string,
            height?: string
        };
    }
    //endregion

    //region 订单和合并订单（仓库入库，待打包，待审核，客服确认，仓库打包，客户付款，仓库打包 所有的接口区域；

    /** 获取各阶段订单数量*/
    export interface GetOrderStatusCountRequest{
        currentStep:number;
        isAdmin:boolean;
    }

    /** 获取合并之后的订单列表*/
    export interface GetCustomerOrderMergeRequest extends BaseListRequest {
        country?: string;
        currentStep?: number;
        currentStatus?:string;
        expressNo?: string;
        customerOrderMergeNo?: string;
        customerChooseChannelID?: number;
        recipient?: string;
        channelID?: string;
        deliverTimeBegin?: Date;
        deliverTimeEnd?: Date;
        agentID?: number;
        orderMergeTimeBegin?: Date;
        orderMergeTimeEnd?: Date,
        customerServiceID?: number;
    }

    /** 获取入库订单列表*/
    export interface GetWarehouseInListRequest extends BaseListRequest {
        step: number;
        /** 会员*/
        memberID?: string;
        /** 客户订单号*/
        customerOrderNo?: string;
        /** 订单状态*/
        customerOrderStatus?: number;
        /** 快递单号*/
        expressNo?: string;
        /** 交接单*/
        transferNo?: string;
        /** 仓库*/
        warehouseID?: number;
        /** 开始时间*/
        inWarehouseIimeBegin?: Date;
        /** 结束时间*/
        inWarehouseIimeEnd?: Date;
        /** 客服*/
        customerServiceID?: number;
        /** 仓库管理员*/
        warehouseAdmin?: string;
        isAdmin?: boolean;
    }

    /** 新增入库订单*/
    export interface WarehouseInAddRequest {
        /** 会员ID*/
        userid: number,
        /** 快递单号*/
        expressNo: string,
        /** 快递类型ID*/
        expressTypeID: number,
        /** 快递类型名称*/
        expressTypeName: string,
        /** 交接单号*/
        TransferNo: string,
        /** 件数*/
        InPackageCount: number,
        /** 入库重量*/
        InWeight: number,
        /** 入库体积*/
        InVolume: number,
        /** 入库长度*/
        InLength: number,
        /** 入库宽度*/
        InWidth: number,
        /** 入库高度*/
        InHeight: number,
        /** 仓库ID*/
        WareHouseID: number,
        /** 客服ID*/
        CustomerServiceID: number,
        /** 入库状态*/
        InWareHouseStatus: string,
        /** 备注*/
        WarehouseAdminRemark: string
        /** 附件*/
        AttachmentIDList?: string[];
    }

    /** 编辑入库订单*/
    export interface WarehouseInEditRequest {
        /** 主键*/
        ID: number,
        /** 会员ID*/
        userid: number,
        /** 快递单号*/
        expressNo: string,
        /** 快递类型ID*/
        expressTypeID: number,
        /** 快递类型名称*/
        expressTypeName: string,
        /** 交接单号*/
        TransferNo: string,
        /** 件数*/
        InPackageCount: number,
        /** 入库重量*/
        InWeight: number,
        /** 入库体积*/
        InVolume: number,
        /** 入库长度*/
        InLength: number,
        /** 入库宽度*/
        InWidth: number,
        /** 入库高度*/
        InHeight: number,
        /** 仓库ID*/
        WareHouseID: number,
        /** 客服ID*/
        CustomerServiceID: number,
        /** 入库状态*/
        InWareHouseStatus: string,
        /** 备注*/
        WarehouseAdminRemark: string,
        AttachmentIDList?: string[]
    }

    /** 删除入库订单*/
    export interface WarehouseInDeleteRequest {
        ID?: string;
    }

    /** 获取客服订单*/
    export interface CustomerOrdersRequest extends BaseListRequest {
        step: number;
        customerOrderStatus:number;
        /** 快递单号*/
        expressNo?: string,
        /** 开始时间*/
        inWarehouseIimeBegin?: Date;
        /** 结束时间*/
        inWarehouseIimeEnd?: Date;
        isAdmin?:boolean;
    }

    export interface OrderSearchIndexRequest {
        name: string;
        type: number;
    }
    //endregion

    //region 客户待打包定义区

    /** 客户合并订单*/
    export interface CustomerOrderMergeAddRequest {
        /** 用户ID*/
        userid?: string;
        /** 客户备注*/
        CustomerMark?: string;
        /** 选择渠道*/
        CustomerChooseChannelID?: string;
        /** 收件人姓名*/
        recipient?: string;
        /** 国家*/
        country?: string;
        /** 地址*/
        address?: string;
        /** 城市*/
        city?: string;
        /** 税号*/
        code?: string;
        /** 电话*/
        tel?: string;
        /** 公司*/
        company?: string;
        /** 邮编*/
        taxNo?: string;
        /** 客户关联订单列表*/
        customerOrderList?: { customerOrderID: string }[];
        /** 产品申报列表*/
        productList?: ModelNameSpace.CustomerOrderMergeProductModel[];
        currentStep?: number,
        currentStatus?: number,
        isAdmin?: boolean;
    }

    /** 查询已合并订单详情*/
    export interface GetCustomerOrderMergeItemRequest{
        customerOrderMergeID?:string;
        isAdmin?:boolean;
    }
    //endregion

    //region 客服阶段定义区

    //endregion

    //region 报表定义区
    //endregion

    //region 财务定义区
    //endregion

    //region 附件定义区
    export interface GetAttachmentItemsRequest {
        customerOrderID: string;
        isAdmin: boolean;
    }
    //endregion
}
