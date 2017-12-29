import {NaRequest, NaResponse} from "../util/common";
import {Request} from '../util/request';
import {LoginRequest} from './model/request/login-request';

const BasicsUrl = "http://www.famliytree.cn/_api/ver(1.0)/";

export class LoginApi {
    static async Login(data: LoginRequest) {
        let url: string = BasicsUrl + "User/Login";
        return new Request<LoginRequest, NaResponse>().post(url, data);
    }
}