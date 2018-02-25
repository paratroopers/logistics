import {requestNameSpace} from './request';
import {ResponseNameSpace} from './response'
import {BaseRequest} from "../util/common";
import {Request} from '../util/request';

export namespace APINameSpace {
    //region 基类定义区
    export class CommonAPI {
        // static  uatURL = "http://localhost:8090/_api/ver(1.0)/";
        static baseURL = "http://www.famliytree.cn/_api/ver(1.0)/";
        //static  baseURL = "http://localhost:8090/_api/ver(1.0)/";
    }

    //endregion

    //region 系统模块定义区

    export class SystemAPI {
        static async GetExpressTypeAll() {
            let url: string = CommonAPI.baseURL + "ExpressType/all";
            return new Request<BaseRequest, ResponseNameSpace.BaseResponse>().get(url);
        }

        static async GetChannelAll() {
            let url: string = CommonAPI.baseURL + "Channel/Items";
            return new Request<BaseRequest, ResponseNameSpace.BaseResponse>().get(url);
        }

        static async GetCustomerOrderMergeStep() {
            let url: string = CommonAPI.baseURL + "OrderMergeStep/memeberwaitforapprove";
            return new Request<BaseRequest, ResponseNameSpace.BaseResponse>().get(url);
        }


    }

    //endregion

    //region 报价定义区

    export class QuotationApi {
        static async GetCountry(data: requestNameSpace.CountryRequest) {
            let url: string = CommonAPI.baseURL + "Quotation/Country/Items";
            return new Request<BaseRequest, ResponseNameSpace.BaseResponse>().get(url, (data.request.name ? {"request.name": data.request.name} : {}));
        }

        static async GetQuotation(data: any) {
            let url: string = CommonAPI.baseURL + "Quotation/Item";
            return new Request<BaseRequest, ResponseNameSpace.BaseResponse>().get(url, data);
        }

        //enzo 写的demo;请求和相应都要定义对象；
        static GetQuotationByEnzo(reqeust: requestNameSpace.QuotationRequest): Promise<ResponseNameSpace.BaseResponse> {
            let url: string = CommonAPI.baseURL + "Quotation/Country/Items";
            return new Request<requestNameSpace.QuotationRequest, ResponseNameSpace.BaseResponse>().get(url, reqeust);
        }
    }


    //endregion

    //region 用户或者会员模块定义区

    export class RegisterAPI {
        /** 获取验证码*/
        static async GetCode(data?: requestNameSpace.GetCodeRequest) {
            let url: string = CommonAPI.baseURL + "User/Send";
            return new Request<BaseRequest, ResponseNameSpace.BaseResponse>().post(url, data);
        }

        /** 注册账号*/
        static async Register(data?: requestNameSpace.RegisterRequest) {
            let url: string = CommonAPI.baseURL + "User/Register";
            return new Request<requestNameSpace.RegisterRequest, ResponseNameSpace.BaseResponse>().post(url, data);
        }

        /** 验证账号是否已经注册*/
        static async AccountValidate(data?: requestNameSpace.AccountValidateRequest) {
            let url: string = CommonAPI.baseURL + "User/userValidate";
            return new Request<requestNameSpace.AccountValidateRequest, ResponseNameSpace.BaseResponse>().get(url, data);
        }
    }


    export class LoginApi {
        /** 登录*/
        static async Login(data: requestNameSpace.LoginRequest) {
            let url: string = CommonAPI.baseURL + "User/Login";
            return new Request<requestNameSpace.LoginRequest, ResponseNameSpace.BaseResponse>().post(url, data);
        }

        /** 重置密码*/
        static async Forget(data: requestNameSpace.ForgetRequest) {
            let url: string = CommonAPI.baseURL + "User/Forget";
            return new Request<requestNameSpace.ForgetRequest, ResponseNameSpace.BaseResponse>().post(url, data);
        }
    }

    export class MemberAPI {

        static async GetRecipientsAddressAll() {
            let url: string = CommonAPI.baseURL + "RecipientsAddress/all";
            return new Request<BaseRequest, ResponseNameSpace.BaseResponse>().get(url);
        }


        static async DeleteRecipientsAddress(data: requestNameSpace.DeleteRecipientsAddressRequest) {
            let url: string = CommonAPI.baseURL + "RecipientsAddress/Item";
            return new Request<BaseRequest, ResponseNameSpace.BaseResponse>().del(url, data);
        }

        static async UpdateRecipientsAddress(data: requestNameSpace.UpdateRecipientsAddressRequest) {
            let url: string = CommonAPI.baseURL + "RecipientsAddress/Item";
            return new Request<BaseRequest, ResponseNameSpace.BaseResponse>().put(url, data);
        }

        static async InsertRecipientsAddress(data: requestNameSpace.InsertRecipientsAddressRequest) {
            let url: string = CommonAPI.baseURL + "RecipientsAddress/Item";
            return new Request<BaseRequest, ResponseNameSpace.BaseResponse>().post(url, data);
        }


        static async GetRecipientsAddress(data: requestNameSpace.GetRecipientsAddressRequest) {
            let url: string = CommonAPI.baseURL + "RecipientsAddress/Item";
            return new Request<BaseRequest, ResponseNameSpace.BaseResponse>().get(url, data);
        }

        static async GetMesaageLatest() {
            let url: string = CommonAPI.baseURL + "Message/latest";
            return new Request<BaseRequest, ResponseNameSpace.BaseResponse>().get(url);
        }

        static async LoginOut() {
            let url: string = CommonAPI.baseURL + "Memeber/Logout";
            return new Request<BaseRequest, ResponseNameSpace.BaseResponse>().post(url);
        }

        /** 获取当前登录人的Token*/
        static async GetToken() {
            let url: string = CommonAPI.baseURL + "Token/Item";
            return new Request<BaseRequest, ResponseNameSpace.BaseResponse>().get(url);
        }

        /** 获取当前登录人的信息*/
        static async GetUserContextInfo() {
            let url: string = CommonAPI.baseURL + "Memeber/ContextInfo";
            return new Request<BaseRequest, ResponseNameSpace.GetUserContextResponse>().get(url, null);
        }

        /** 获取会员订单状态-三个Tab*/
        static async GetMemberOrderStatus() {
            let url: string = CommonAPI.baseURL + "CustomerOrder/Status";
            return new Request<BaseRequest, ResponseNameSpace.GetMemberOrderStatusResponse>().post(url, null);
        }

        /*会员,客服，仓库管理员 模糊查询*/
        static async UserSearchIndex(data: requestNameSpace.UserSearchIndexRequest) {
            let url: string = CommonAPI.baseURL + "Memeber/users/Index";
            return new Request<BaseRequest, ResponseNameSpace.BaseResponse>().get(url, data);
        }

        static async GetOrderItemsByID(data: string) {
            let url: string = CommonAPI.baseURL + "CustomerOrder/order/items";
            return new Request<BaseRequest, ResponseNameSpace.BaseResponse>().get(url, {request: data});
        }


        static async GetCustomerOrders(data: requestNameSpace.CustomerOrdersRequest) {
            let url: string = CommonAPI.baseURL + "CustomerOrder/items/page";
            return new Request<BaseRequest, ResponseNameSpace.BaseResponse>().get(url, data);
        }

        static async GetCustomerOrdersMerge(data: requestNameSpace.GetCustomerOrderMergeRequest) {
            let url: string = CommonAPI.baseURL + "CustomerOrderMerge/items/page";
            return new Request<BaseRequest, ResponseNameSpace.BaseResponse>().get(url, data);
        }

    }


    //endregion

    //region 仓库入库,打包，出库定义区
    /** 仓库*/
    export class WarehouseAPI {
        /** 获取仓库入库列表*/
        static async GetWarehouseInItems(data: requestNameSpace.GetWarehouseInListRequest) {
            let url: string = CommonAPI.baseURL + "CustomerOrder/items/page";
            return new Request<BaseRequest, ResponseNameSpace.GetWarehouseInListResponse>().get(url, data);
        }

        /** 获取入库状态统计*/
        static async GetWarehouseInStatus() {
            let url: string = CommonAPI.baseURL + "CustomerOrder/WarehouseInStatus";
            return new Request<BaseRequest, ResponseNameSpace.GetWarehouseInStatusResponse>().post(url, null);
        }

        /** 仓库入库*/
        static async WarehouseInAdd(data: requestNameSpace.WarehouseInAddRequest) {
            let url: string = CommonAPI.baseURL + "CustomerOrder/Item/Insert";
            return new Request<BaseRequest, ResponseNameSpace.BaseResponse>().post(url, data);
        }

        /** 入库编辑*/
        static async WarehouseInEdit(data: requestNameSpace.WarehouseInEditRequest) {
            let url: string = CommonAPI.baseURL + "CustomerOrder/Item/update";
            return new Request<BaseRequest, ResponseNameSpace.BaseResponse>().put(url, data);
        }

        /** 入库删除*/
        static async WarehouseInDelete(data: requestNameSpace.WarehouseInDeleteRequest) {
            let url: string = CommonAPI.baseURL + "CustomerOrder/Item/delete";
            return new Request<BaseRequest, ResponseNameSpace.BaseResponse>().del(url, data);
        }

        static async GetWareHouseAll() {
            let url: string = CommonAPI.baseURL + "Warehouse/all";
            return new Request<BaseRequest, ResponseNameSpace.BaseResponse>().get(url);
        }
    }

    export class CustomerOrderAPI {
        /*客户订单 入库的快递单号*/
        static async OrderSearchIndex(data: requestNameSpace.OrderSearchIndexRequest) {
            let url: string = CommonAPI.baseURL + "CustomerOrder/order/Index";
            return new Request<BaseRequest, ResponseNameSpace.BaseResponse>().get(url, data);
        }

        static async GetCustomerOrders(data: requestNameSpace.CustomerOrdersRequest) {
            let url: string = CommonAPI.baseURL + "CustomerOrder/items/page";
            return new Request<BaseRequest, ResponseNameSpace.BaseResponse>().get(url, data);
        }

        static async GetOrderItemsByID(data: string) {
            let url: string = CommonAPI.baseURL + "CustomerOrder/order/items";
            return new Request<BaseRequest, ResponseNameSpace.BaseResponse>().get(url, {request: data});
        }

        static async GetChannels() {
            let url: string = CommonAPI.baseURL + "Channel/Items";
            return new Request<BaseRequest, ResponseNameSpace.BaseResponse>().get(url);
        }

    }

    export class CustomerOrderStatusAPI {
        /*入库下拉状态列表*/
        static async GetWarehouseInStatus() {
            let url: string = CommonAPI.baseURL + "CustomerOrderStatus/items";
            return new Request<BaseRequest, ResponseNameSpace.BaseResponse>().get(url);
        }

    }

    export class CustomerOrderMergeStatusAPI {
        /*客服确认，仓库打包，仓库发货 状态 用此接口*/
        static async GetMergeStatus() {
            let url: string = CommonAPI.baseURL + "CustomerOrderMergeStatus/items";
            return new Request<BaseRequest, ResponseNameSpace.BaseResponse>().get(url);
        }

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

    //region 附件定义区
    export class AttachmentsAPI {
        static async GetAttachmentItems(data: requestNameSpace.GetAttachmentItemsRequest) {
            let url: string = CommonAPI.baseURL + "File/Attachments/items";
            return new Request<BaseRequest, ResponseNameSpace.GetAttachmentItemsResponse>().get(url, data);
        }
    }
    //endregion
}