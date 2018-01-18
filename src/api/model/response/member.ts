import {WarehouseListModel} from "../member";
import {UserContext} from "../common-model";

export interface GetWarehouseStorageListResponse {
    Data?: WarehouseListModel[]|WarehouseListModel;
    TotalCount?: number;
    Message?: string;
    Status?: number;
}

export interface GetUserContextResponse{
    Data?: UserContext;
    TotalCount?: number;
    Message?: string;
    Status?: number;
}