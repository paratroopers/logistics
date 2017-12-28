import {NaRequest, NaResponse} from "../util/common";
import {Request} from '../util/request';
import {LoginRequest,ForgetRequest} from './model/request/login-request';

const BasicsUrl = "http://www.famliytree.cn/_api/ver(1.0)/";

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