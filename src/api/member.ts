import {BaseRequest, BaseResponse} from "../util/common";
import {Request} from '../util/request';
import {GetUserContextResponse,GetMemberOrderStatusResponse} from './model/response/member';
import {CommonAPI} from './common';

const BasicsUrl = CommonAPI.baseURL;

export class MemberAPI {
    /** 注销*/
    static async LoginOut() {
        let url: string = BasicsUrl + "Memeber/Logout";
        return new Request<BaseRequest, BaseResponse>().post(url);
    }

    /** 获取当前登录人的Token*/
    static async GetToken() {
        let url: string = BasicsUrl + "Token/Item";
        return new Request<BaseRequest, BaseResponse>().get(url);
    }

    /** 获取当前登录人的信息*/
    static async GetUserContextInfo() {
        let url: string = BasicsUrl + "Memeber/ContextInfo";
        return new Request<BaseRequest, GetUserContextResponse>().get(url, null);
    }

    /** 获取会员订单状态-三个Tab*/
    static async GetMemberOrderStatus() {
        let url: string = BasicsUrl + "CustomerOrderStatus/OrderSummary";
        return new Request<BaseRequest, GetMemberOrderStatusResponse>().post(url, null);
    }
}