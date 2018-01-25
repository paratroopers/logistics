import {BaseRequest, BaseResponse} from "../util/common";
import {Request} from '../util/request';
import {OrderSearchIndexRequest} from './model/request/member-request';
import {GetUserContextResponse, GetMemberOrderStatusResponse} from './model/response/member';
import {CommonAPI} from './common';
import  {BaseAPI} from './base';

export namespace API{
    export class CustomerOrderAPI extends BaseAPI{
        /*客户订单 入库的快递单号*/
        static  async  OrderSearchIndex(data:OrderSearchIndexRequest){
            let url:string = this.baseURL + "CustomerOrder/order/Index";
            return new Request<BaseRequest, BaseResponse>().get(url, data);
        }
    }
}


