import {DemoRequest, GetCodeRequest, RegisterRequest, AccountValidateRequest} from "./model/request/common-request";
import {NaRequest, NaResponse} from "../util/common"
import {Request} from '../util/request';

import {LoginRequest} from './model/request/login-request';

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
        return new Request<NaRequest, NaResponse>().post(url, data);
    }

    /** 注册账号*/
    static async Register(data?: RegisterRequest) {
        let url: string = BasicsUrl + "User/Register";
        return new Request<RegisterRequest, NaResponse>().post(url, data);
    }

    /** 验证账号是否已经注册*/
    static async AccountValidate(data?: AccountValidateRequest) {
        let url: string = BasicsUrl + "User/userValidate";
        return new Request<AccountValidateRequest, NaResponse>().get(url, data);
    }
}


export class LoginApi {
    static async Login(data: LoginRequest) {
        let url: string = BasicsUrl + "User/Login";
        return new Request<LoginRequest, NaResponse>().post(url, data);
    }
}