import {DemoRequest, GetCodeRequest} from "./model/request/common-request";
import {NaRequest, NaResponse} from "../util/common"
import {Request} from '../util/request';

const BasicsUrl = "http://www.famliytree.cn/_api/ver(1.0)/";

export class DemoAPI {
    static async GetDemo(data?: DemoRequest) {
        let url: string = "sockjs-node/info";
        return new Request<NaRequest, NaResponse>().get(url, data);
    }
}

export class RegisterAPI {
    /** 获取验证码*/
    static async GetCode(data?: GetCodeRequest) {
        let url: string = BasicsUrl + "User/Send";
        return new Request<GetCodeRequest, NaResponse>().post(url, data);
    }
}