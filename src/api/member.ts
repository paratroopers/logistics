import {BaseRequest, BaseResponse} from "../util/common";
import {Request} from '../util/request';
import {GetWarehouseStorageListRequest} from './model/request/member-request';
import {GetWarehouseStorageListResponse} from './model/response/member';
import {CommonAPI} from './common';

const BasicsUrl = CommonAPI.baseURL;

export  class  MememberApi{
    static async LoginOut() {
        let url: string = BasicsUrl + "Memeber/Logout";
        return new Request<BaseRequest, BaseResponse>().post(url);
    }
    static  async GetToken(){
        let url:string = BasicsUrl +"Token/Item";
        return new Request<BaseRequest,BaseResponse>().get(url);
    }

}