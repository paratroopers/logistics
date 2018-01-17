import {BaseRequest, BaseResponse} from "../util/common"
import {Request} from '../util/request';
import {CommonAPI} from './common';

export class BaseAPI {
    // static  uatURL = "http://localhost:8090/_api/ver(1.0)/";
    static baseURL =  CommonAPI.baseURL;

    static async GetMesaageLatest() {
        let url: string = BaseAPI.baseURL + "Message/latest";
        return new Request<BaseRequest, BaseResponse>().get(url);
    }
}