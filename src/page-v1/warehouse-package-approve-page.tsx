import * as React from 'react';
import {withRouter,RouteComponentProps,hashHistory} from 'react-router';
import {Row,Col,Icon,Button} from 'antd';
import {requestNameSpace} from '../model/request';
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
    FormPackageRequirement,
    FormPackageDetail
} from "../components-v1/all-components-export";
import {isNullOrUndefined} from "util";

interface WarehousePackageApprovePageProps extends RouteComponentProps<any, any>{

}

interface WarehousePackageApprovePageStates {
    /** 原始订单ID*/
    selectedKey?: string;
    /** 源数据*/
    data?:ModelNameSpace.CustomerOrderMergeDetailModel;
}

export interface QueryData {
    ids?: string
}


@withRouter
export class WarehousePackageApprovePage extends React.Component<WarehousePackageApprovePageProps, WarehousePackageApprovePageStates> {
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
        const request: requestNameSpace.GetCustomerOrderMergeItemRequest = {
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


        return <Row className="member-my-order-package-view-page view-content-page">
            <ContentHeaderControl title="审批"></ContentHeaderControl>
            <Row justify="start" type="flex" style={{margin: '10px 0px 10px 0px'}}>
                <Col span={24}>
                    <div className="view-content-page-header-title">
                        <Icon type="tag" style={{color: '#f2804b', marginRight: '15px'}}/>
                        <span>单号：201801270052</span>
                    </div>
                    <div className="view-content-page-header-button">
                        <Button type="primary" style={{marginRight: "10px"}}>通过</Button>
                        <Button type="primary" style={{marginRight: "10px"}}>拒绝</Button>
                        <Button type="primary">取消</Button>
                    </div>
                </Col>
            </Row>
            <FormOrderInfo {...(data ? {data: orederInfo} : {loading: true})}></FormOrderInfo>
            <FormOrderRelation {...(data ? {data: data.customerOrderList} : {loading: true})}></FormOrderRelation>
            <FormOrderAddressee selectContact={address}></FormOrderAddressee>
            <FormOrderDeclare {...(data ? {data: data.mergeDetailList} : {loading: true})} ></FormOrderDeclare>
            {data ? <FormOrderChannel ids={[data.mergeOrder.CustomerChooseChannelID]}></FormOrderChannel> : null}
            {data ? <FormPackageRequirement value={data.mergeOrder.CustomerMark} ></FormPackageRequirement> : null}
            {data ?<FormPackageDetail></FormPackageDetail>: null}
        </Row>;
    }
}
