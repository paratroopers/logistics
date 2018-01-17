import {BaseRequest, BaseResponse} from "../util/common";
import {Request} from '../util/request';
import {GetWarehouseStorageListRequest} from './model/request/member-request';
import {GetWarehouseStorageListResponse} from './model/response/member';
import {CommonAPI} from './common';

const BasicsUrl = CommonAPI.baseURL;

export class WarehouseAPI {
    static async GetWarehouseStorageList(data: GetWarehouseStorageListRequest) {
        let url: string = BasicsUrl + "Quotation/Country/Items";
        return new Request<BaseRequest, BaseResponse>().get(url, data);
    }
}