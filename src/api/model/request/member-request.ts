import {BaseListRequest} from '../base';

export interface GetWarehouseStorageListRequest {

}

export interface MemberOrderStatusRequest {

}

export interface CustomerOrdersRequest extends BaseListRequest {
    type: number;
}

export interface  UserSearchModel{
    name:string;
    type:number;
}

export  interface UserSearchIndexRequest {
    name:string;
    type:number;
}
