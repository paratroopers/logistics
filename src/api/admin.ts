import {BaseRequest} from "../util/common";
import {Request} from '../util/request';
import {GetWarehouseInListRequest,WarehouseInAddRequest} from './model/request/admin';
import {GetWarehouseInListResponse} from './model/response/admin';
import {CommonAPI} from './common';
const BasicsUrl = CommonAPI.baseURL;

/** 仓库*/
export class WarehouseAPI {
    /** 获取仓库入库列表*/
    static async  GetWarehouseInItems(data: GetWarehouseInListRequest) {
        let url: string = BasicsUrl + "CustomerOrder/items/page";
        return new Request<BaseRequest, GetWarehouseInListResponse>().get(url, data);
    }

    /** 仓库入库*/
    static async  WarehouseInAdd(data: WarehouseInAddRequest) {
        let url: string = BasicsUrl + "CustomerOrder/Item/Insert";
        return new Request<BaseRequest, GetWarehouseInListResponse>().post(url, data);
    }
}
