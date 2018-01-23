import {BaseListRequest} from '../base';

export interface GetWarehouseStorageListRequest {

}

export interface MemberOrderStatusRequest {

}

export interface CustomerOrdersRequest extends BaseListRequest {
    type: number;
}
