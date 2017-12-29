//用户操作；包括注册，登录，注册，发送验证码；目前把的common-api和login的请求都放在这里；
//以后涉及到用户操作部分api都放在这里；enzo.shi 20171229

import {LoginRequest,ForgetRequest} from './model/request/login-request';
import {DemoRequest, GetCodeRequest, RegisterRequest, AccountValidateRequest} from "./model/request/common-request";
import {NaRequest, NaResponse} from "../util/common"
import {Request} from '../util/request';

const BasicsUrl = "http://www.famliytree.cn/_api/ver(1.0)/";
export class DemoAPI {
    static async GetDemo(data?: DemoRequest) {
        let url: string = "";
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
    /** 重置密码*/
    static async Forget(data: ForgetRequest) {
        let url: string = BasicsUrl + "User/Forget";
        return new Request<ForgetRequest, NaResponse>().post(url, data);
    }
}