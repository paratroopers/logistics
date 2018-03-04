import {ModelNameSpace} from './model';

export namespace ResponseNameSpace {

    //region 基类定义区
    export  interface BaseResponse{
        Data?: any;
        TotalCount?: number;
        Message?: string;
        Status?: number;
    }
    export  interface BaseModelResponse<T>{
        Data?: T;
        TotalCount?: number;
        Message?: string;
        Status?: number;
    }
    export  interface BaseModelListResonse<T>{
        Data?: T[];
        TotalCount?: number;
        Message?: string;
        Status?: number;
    }
    //endregion

    //region 系统模块定义区




    //endregion

    //region 用户或者会员模块定义区
    export interface GetUserContextResponse extends  BaseModelResponse<ModelNameSpace.UserModel>{}
    //endregion

    //region 报价定义区
    export interface QuotationResponse {
        Data?: ModelNameSpace.QuotationModel[]|ModelNameSpace.QuotationModel;
        TotalCount?: number;
        Message?: string;
        Status?: number;
    }
    //endregion

    //region 仓库入库
    export  interface  GetWarehouseInListResponse extends  BaseModelListResonse<ModelNameSpace.WarehouseListModel>{}
    export interface GetMemberOrderStatusResponse extends BaseModelResponse<ModelNameSpace.MemberOrderStatusModel>{}
    export interface GetWarehouseInStatusResponse extends BaseModelResponse<ModelNameSpace.WarehouseInStatusModel>{}
    //endregion

    //region 客户待打包定义区
    /** 审核列表，客服确认，客户付款，客服确认，仓库打包，仓库出货；都用此返回对象*/
    export  interface  GetCustomerOrderMergeListResponse extends  BaseModelListResonse<ModelNameSpace.CustomerOrderMergeModel>{}
    /** 合并订单详情*/
    export interface GetCustomerOrderMergeDetailResponse extends BaseModelResponse<ModelNameSpace.CustomerOrderMergeDetailModel>{}
    /** 渠道信息*/
    export interface GetCustomerOrderChannelListResponse extends BaseModelListResonse<ModelNameSpace.ChannelModal>{}
    //endregion

    //region 客服阶段定义区
    //endregion

    //region 报表定义区
    //endregion

    //region 财务定义区
    //endregion

    //region 附件定义区
    export  interface  GetAttachmentItemsResponse extends  BaseModelListResonse<ModelNameSpace.Attachment>{}
    //endregion
}