// import {BaseRequest, BaseResponse} from "../util/common"
// import {Request} from '../util/request';
// import {CommonAPI} from './common';
// import {BaseReqeust} from './model/request/base-request';
//
// export class BaseAPI {
//     // static  uatURL = "http://localhost:8090/_api/ver(1.0)/";
//     static baseURL =  CommonAPI.baseURL;
//
//     static async GetMesaageLatest() {
//         let url: string = BaseAPI.baseURL + "Message/latest";
//         return new Request<BaseRequest, BaseResponse>().get(url);
//     }
//
//     static async GetWareHouseAll(){
//         let url: string = BaseAPI.baseURL + "Warehouse/all";
//         return new Request<BaseRequest, BaseResponse>().get(url);
//     }
//
//     static  async  GetExpressTypeAll(){
//         let url: string = BaseAPI.baseURL + "ExpressType/all";
//         return new Request<BaseRequest, BaseResponse>().get(url);
//     }
//
//     static  async  GetRecipientsAddressAll(){
//         let url:string = BaseAPI.baseURL +"RecipientsAddress/all";
//         return new Request<BaseRequest, BaseResponse>().get(url);
//     }
//
//
//     static  async  DeleteRecipientsAddress(data:BaseReqeust.DeleteRecipientsAddressRequest){
//         let url:string = BaseAPI.baseURL +"RecipientsAddress/Item";
//         return new Request<BaseRequest, BaseResponse>().del(url,data);
//     }
//
//     static  async  UpdateRecipientsAddress(data:BaseReqeust.UpdateRecipientsAddressRequest){
//         let url:string = BaseAPI.baseURL +"RecipientsAddress/Item";
//         return new Request<BaseRequest, BaseResponse>().put(url,data);
//     }
//
//     static  async  InsertRecipientsAddress(data:BaseReqeust.InsertRecipientsAddressRequest){
//         let url:string = BaseAPI.baseURL +"RecipientsAddress/Item";
//         return new Request<BaseRequest, BaseResponse>().post(url,data);
//     }
//
//
//     static  async  GetRecipientsAddress(){
//         let url:string = BaseAPI.baseURL +"RecipientsAddress/Item";
//         return new Request<BaseRequest, BaseResponse>().get(url);
//     }
//
//
// }