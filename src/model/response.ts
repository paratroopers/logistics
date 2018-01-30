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

    //region 仓库入库，打包，出库定义区
    export  interface  GetWarehouseInListResponse extends  BaseModelListResonse<ModelNameSpace.WarehouseListModel>{}
    export interface GetMemberOrderStatusResponse extends BaseModelResponse<ModelNameSpace.MemberOrderStatusModel>{}
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