import {WarehouseListModel,MemberOrderStatusModel} from "../member";
import {UserModel} from "../base";
import {BaseModelResponse} from './base';

export  interface  GetWarehouseStorageListResponse extends  BaseModelResponse<WarehouseListModel>{}

export interface GetUserContextResponse extends  BaseModelResponse<UserModel>{}

export interface GetMemberOrderStatusResponse extends BaseModelResponse<MemberOrderStatusModel>{}

