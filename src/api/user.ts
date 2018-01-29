// import {DemoRequest, GetCodeRequest, RegisterRequest, AccountValidateRequest} from "./model/request/common-request";
// import {BaseRequest, BaseResponse} from "../util/common"
// import {Request} from '../util/request';
// import {CommonAPI} from './common';
//
// import {LoginRequest,ForgetRequest} from './model/request/login-request';
//
// const BasicsUrl = CommonAPI.baseURL;
//
// export class DemoAPI {
//     static async GetDemo(data?: DemoRequest) {
//         let url: string = "sockjs-node/info";
//         return new Request<BaseRequest, BaseResponse>().get(url, data);
//     }
// }
//
// export class RegisterAPI {
//     /** 获取验证码*/
//     static async GetCode(data?: GetCodeRequest) {
//         let url: string = BasicsUrl + "User/Send";
//         return new Request<BaseRequest, BaseResponse>().post(url, data);
//     }
//
//     /** 注册账号*/
//     static async Register(data?: RegisterRequest) {
//         let url: string = BasicsUrl + "User/Register";
//         return new Request<RegisterRequest, BaseResponse>().post(url, data);
//     }
//
//     /** 验证账号是否已经注册*/
//     static async AccountValidate(data?: AccountValidateRequest) {
//         let url: string = BasicsUrl + "User/userValidate";
//         return new Request<AccountValidateRequest, BaseResponse>().get(url, data);
//     }
// }
//
//
// export class LoginApi {
//     /** 登录*/
//     static async Login(data: LoginRequest) {
//         let url: string = BasicsUrl + "User/Login";
//         return new Request<LoginRequest, BaseResponse>().post(url, data);
//     }
//     /** 重置密码*/
//     static async Forget(data: ForgetRequest) {
//         let url: string = BasicsUrl + "User/Forget";
//         return new Request<ForgetRequest, BaseResponse>().post(url, data);
//     }
// }
//
//
