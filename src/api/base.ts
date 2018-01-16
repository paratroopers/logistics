import {BaseRequest, BaseResponse} from "../util/common"
import {Request} from '../util/request';

export class BaseAPI {
    // static  uatURL = "http://localhost:8090/_api/ver(1.0)/";
    static baseURL = "http://www.famliytree.cn/_api/ver(1.0)/";

    static async GetMesaageLatest() {
        let url: string = BaseAPI.baseURL + "Message/latest";
        return new Request<BaseRequest, BaseResponse>().get(url);
    }
}