import {ModelNameSpace} from './model';
import {Util} from '../util/util';

export namespace requestNameSpace {

    //region 基类定义区
    import Guid = SP.Guid;

    export interface BaseListRequest {
        pageIndex: number;
        pageSize: number;
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

    export interface QuotationModel {
        country?: string,
        weight?: string,
        length?: string,
        width?: string,
        height?: string
    }

    export interface QuotationRequest {
        request: QuotationModel;
    }


    //endregion

    //region 仓库入库，打包，出库定义区
    export interface GetWarehouseInListRequest {
        type: ModelNameSpace.OrderTypeEnum;
        pageIndex: number;
        pageSize: number;
    }

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
    }

    export interface CustomerOrdersRequest extends BaseListRequest {
        type: number;
    }

    export interface OrderSearchIndexRequest {
        name: string;
        type: number;
    }

    export interface OrderMergeCustomerOrderListModel {
        customerOrderID?: string;
    }

    export class OrderMergeProductListModel {
        constructor() {
            this.productName = "";
            this.productNameEN = "";
            this.HSCode = "美元";
            this.declareUnitPrice = 0;
            this.count = 0;
            this.ID = Util.guid();
            this.total = '00.00';
        }

        ID?: string;
        total?: string;
        productName?: string;
        productNameEN?: string;
        HSCode?: string;
        declareUnitPrice?: number;
        count?: number;
    }

    export interface OrderMergeRequest {
        userid?: string;
        CustomerMark?: string;
        CustomerChooseChannelID?: string;
        recipient?: string;
        country?: string;
        address?: string;
        city?: string;
        code?: string;
        tel?: string;
        company?: string;
        taxNo?: string;
        customerOrderList?: OrderMergeCustomerOrderListModel[];
        productList?: OrderMergeProductListModel[];
        TenantID?: string;
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
