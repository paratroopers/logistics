import {WarehouseListModel} from "../member";
import {UserContext} from "../common-model";
import {BaseModelResponse} from './base';

export  interface  GetWarehouseStorageListResponse extends  BaseModelResponse<WarehouseListModel>{

}


export interface GetUserContextResponse extends  BaseModelResponse<UserContext>{

}