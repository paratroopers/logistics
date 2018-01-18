import {WarehouseListModel} from "../member";

export interface GetWarehouseStorageListResponse {
    Data?: WarehouseListModel[]|WarehouseListModel;
    TotalCount?: number;
    Message?: string;
    Status?: number;
}