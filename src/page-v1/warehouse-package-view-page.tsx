import * as React from 'react';
import {withRouter,RouteComponentProps,hashHistory} from 'react-router';
import {Row} from 'antd';
import {RequestNameSpace} from '../model/request';
import {ResponseNameSpace} from '../model/response'
import {ModelNameSpace} from '../model/model';
import {APINameSpace} from '../model/api';
import {
    ContentHeaderControl,
    FormOrderInfo,
    FormOrderInfoModel,
    FormOrderRelation,
    FormOrderAddressee,
    FormOrderDeclare,
    FormOrderChannel,
    FormRemarks,
    FormPackageDetail
} from "../components-v1/all-components-export";
import {isNullOrUndefined} from "util";

interface WarehousePackageViewPageProps extends RouteComponentProps<any, any>{

}

interface WarehousePackageViewPageStates {
    /** 原始订单ID*/
    selectedKey?: string;
    /** 源数据*/
    data?:ModelNameSpace.CustomerOrderMergeDetailModel;
}

export interface QueryData {
    ids?: string
}


@withRouter
export class WarehousePackageViewPage extends React.Component<WarehousePackageViewPageProps, WarehousePackageViewPageStates> {
    constructor(props) {
        super(props);
        this.state = {
            selectedKey: (this.props.location.query as QueryData).ids
        }
    }

    componentDidMount() {
        const topThis = this;
        const {state: {selectedKey}} = topThis;
        /** 未传值则返回*/
        if (isNullOrUndefined(selectedKey)) hashHistory.goBack();

        /** 通过ID获取表单数据*/
        const request: RequestNameSpace.GetCustomerOrderMergeItemRequest = {
            customerOrderMergeID: selectedKey,
            isAdmin: false
        }

        APINameSpace.CustomerOrderAPI.GetCustomerOrderMergeItem(request).then((result: ResponseNameSpace.GetCustomerOrderMergeDetailResponse) => {
            if (result.Status === 0) {
                console.log(result);
                topThis.setState({data: result.Data});
            }
        });
    }

    render() {
        const topThis = this;
        const {state: {data}} = topThis;

        /** 订单基本信息*/
        const orederInfo: FormOrderInfoModel = data ? {
            created: data.mergeOrder.Created.toString(),
            weight: data.mergeOrder.InWeightTotal,
            volume: data.mergeOrder.InVolumeTotal,
            count: data.mergeOrder.InPackageCountTotal
        } : {};

        /** 收件人基本信息*/
        const address: ModelNameSpace.AddressModel = data ? {
            Tel: data.mergeOrder.tel,
            taxno: data.mergeOrder.taxNo,
            country: data.mergeOrder.country,
            City: data.mergeOrder.city,
            companyName: data.mergeOrder.company,
            recipient: data.mergeOrder.recipient,
            Address: data.mergeOrder.address,
            postalcode: data.mergeOrder.code,
        } : {};


        return <Row className="warehouse-package-view-page view-content-page">
            <ContentHeaderControl title="查看"></ContentHeaderControl>
            <FormOrderInfo {...(data ? {data: orederInfo} : {loading: true})}></FormOrderInfo>
            <FormOrderRelation {...(data ? {data: data.customerOrderList} : {loading: true})}></FormOrderRelation>
            <FormOrderAddressee selectContact={address} readOnly={true}></FormOrderAddressee>
            <FormOrderDeclare {...(data ? {data: data.mergeDetailList} : {loading: true})}
                              readOnly={true}></FormOrderDeclare>
            {data ? <FormOrderChannel ids={[data.mergeOrder.CustomerChooseChannelID]}
                                      readOnly={true}></FormOrderChannel> : null}
            {data ? <FormRemarks value={data.mergeOrder.CustomerMark}
                                 readOnly={true}></FormRemarks> : null}
            {data ?<FormPackageDetail readOnly={true}></FormPackageDetail>: null}
        </Row>;
    }
}
