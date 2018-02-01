import * as React from 'react';
import {withRouter,hashHistory} from 'react-router';
import {Row,message} from 'antd';
import {ContentHeaderControl}from "../../../components/controls/common/content-header-control";
import WarehouseInForm from "../../../components/controls/warehouseadmin/warehouse-in-form";
import {requestNameSpace} from '../../../model/request';
import {APINameSpace} from '../../../model/api';
import {ResponseNameSpace} from '../../../model/response';
import {PathConfig}from "../../../config/pathconfig";

interface WarehouseInAddPageProps {

}

interface WarehouseInAddPageStates {

}

@withRouter
export class WarehouseInAddPage extends React.Component<WarehouseInAddPageProps, WarehouseInAddPageStates> {
    constructor(props) {
        super(props);
    }

    onSubmit=(values)=>{
        const topThis = this;
        const request: requestNameSpace.WarehouseInAddRequest = {
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
            InVolume: values.inLength*values.inWidth*values.inHeight,
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
            WarehouseAdminRemark: values.warehouseAdminRemark
        }
        topThis.setState({loading: true});
        APINameSpace.WarehouseAPI.WarehouseInAdd(request).then((result: ResponseNameSpace.BaseResponse) => {
            if (result.Status === 0) {
                message.success("新增成功!");
                hashHistory.push(PathConfig.WarehouseInPage);
            }
        })
    }

    render() {
        const topThis = this;
        return <Row className="warehouse-in-page">
            <ContentHeaderControl title="新增入库"></ContentHeaderControl>
            <WarehouseInForm onSubmit={topThis.onSubmit.bind(this)}></WarehouseInForm>
        </Row>;
    }
}