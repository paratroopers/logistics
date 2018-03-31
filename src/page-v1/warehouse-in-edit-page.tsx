import * as React from 'react';
import {withRouter, hashHistory, RouteComponentProps} from 'react-router';
import {Row, message} from 'antd';
import {ContentHeaderControl} from "../components-v1/common-content-header";
import WarehouseInForm from "../components-v1/warehouse-in-form";
import {RequestNameSpace} from '../model/request';
import {APINameSpace} from '../model/api';
import {ResponseNameSpace} from '../model/response';
import {PathConfig} from "../config/pathconfig";
import {isNullOrUndefined} from "util";

interface WarehouseInEditPageProps extends RouteComponentProps<any, any> {

}

interface WarehouseInEditPageStates {
    loading?: boolean;
}

@withRouter
export class WarehouseInEditPage extends React.Component<WarehouseInEditPageProps, WarehouseInEditPageStates> {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }

    onSubmit = (values) => {
        const topThis = this;
        const request: RequestNameSpace.WarehouseInEditRequest = {
            ID: topThis.props.location.state.ID,
            /** 会员ID*/
            userid: values.user[0].key,
            /** 快递单号*/
            expressNo: values.expressNo,
            /** 快递类型ID*/
            expressTypeID: values.expressType.key,
            /** 快递类型名称*/
            expressTypeName: values.expressType.label,
            /** 交接单号*/
            TransferNo: values.transferNo,
            /** 件数*/
            InPackageCount: values.inPackageCount,
            /** 入库重量*/
            InWeight: values.inWeight,
            /** 入库体积*/
            InVolume: values.InVolume,
            /** 入库长度*/
            InLength: values.inLength,
            /** 入库宽度*/
            InWidth: values.inWidth,
            /** 入库高度*/
            InHeight: values.inHeight,
            /** 仓库ID*/
            WareHouseID: values.wareHouse.key,
            /** 客服ID*/
            CustomerServiceID: values.customerService[0].key,
            /** 入库状态*/
            InWareHouseStatus: values.inWareHouseStatus,
            /** 备注*/
            WarehouseAdminRemark: values.warehouseAdminRemark,
            AttachmentIDList: values.AttachmentIDList
        }
        topThis.setState({loading: true});
        APINameSpace.WarehouseAPI.WarehouseInEdit(request).then((result: ResponseNameSpace.BaseResponse) => {
            if (result.Status === 0) {
                message.success("编辑成功!");
                topThis.setState({loading: false}, () => {
                    hashHistory.push(PathConfig.WarehouseInPage);
                });
            }
        })
    }

    render() {
        const topThis = this;
        return <Row className="warehouse-in-edit-page">
            <ContentHeaderControl title="编辑"></ContentHeaderControl>
            <WarehouseInForm type={"edit"}
                             ID={topThis.props.location.state.ID} readOnly={true}
                             onSubmit={topThis.onSubmit.bind(this)}></WarehouseInForm>
        </Row>;
    }
}