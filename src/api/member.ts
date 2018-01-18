import {BaseRequest, BaseResponse} from "../util/common";
import {Request} from '../util/request';
import {GetWarehouseStorageListRequest} from './model/request/member-request';
import {GetWarehouseStorageListResponse,GetUserContextResponse} from './model/response/member';
import {CommonAPI} from './common';

const BasicsUrl = CommonAPI.baseURL;

export class MememberAPI {
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

}