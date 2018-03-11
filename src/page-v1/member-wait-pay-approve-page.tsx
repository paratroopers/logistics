import * as React from 'react';
import {withRouter, RouteComponentProps, hashHistory} from 'react-router';
import {Layout, Spin} from 'antd';
import {ModelNameSpace} from '../model/model';
import {
    FormOrderInfo,
    ContentHeaderControl,
    FormOrderRelation,
    FormOrderAddressee,
    FormOrderDeclare,
    FormRemarks,
    FormPackageDetail,
    FormOrderChannel,
    FormDeliveredDetail,
    FormPayment
} from "../components-v1/all-components-export";
import {FormComponentProps} from 'antd/lib/form/Form';
import {APINameSpace} from '../model/api';
import {RequestNameSpace} from '../model/request';

interface MemberWaitPayApprovePageProps extends RouteComponentProps<any, any>, FormComponentProps {
}

interface MemberWaitPayApprovePageStates {
    viewData?: ModelNameSpace.CustomerOrderModel;
    /** 原始订单ID*/
    selectedKey?: string;
    /** 源数据*/
    data?: ModelNameSpace.CustomerOrderMergeDetailModel;
}

export interface QueryData {
    id?: string;
}

@withRouter
export class MemberWaitPayApprovePage extends React.Component<MemberWaitPayApprovePageProps, MemberWaitPayApprovePageStates> {
    constructor(props) {
        super(props);
        this.state = {
            selectedKey: (this.props.location.query as QueryData).id,
            data: {}
        }
    }

    componentDidMount() {
        const {state: {selectedKey}} = this;
        /** 未传值则返回*/
        !selectedKey && hashHistory.goBack();
        this.getOrderInfo();
    }

    async getOrderInfo() {
        /** 通过ID获取表单数据*/
        const request: RequestNameSpace.GetCustomerOrderMergeItemRequest = {
            customerOrderMergeID: this.state.selectedKey,
            isAdmin: false
        }
        const response = await APINameSpace.CustomerOrderAPI.GetCustomerOrderMergeItem(request);
        response.Status === 0 && this.setState({data: response.Data || {}});
    }

    renderForm() {
        const {state: {data, data: {customerOrderList, mergeDetailList, mergeOrder}}, props: {form}} = this;
        const _mergeOrder = mergeOrder ? mergeOrder : {};
        return <Layout.Content>
            <FormOrderInfo data={new ModelNameSpace.FormOrderInfoModel(data)}></FormOrderInfo>
            <FormOrderRelation data={customerOrderList}></FormOrderRelation>
            <FormOrderAddressee selectContact={new ModelNameSpace.AddressModel(data)} readOnly></FormOrderAddressee>
            <FormOrderDeclare data={mergeDetailList} readOnly></FormOrderDeclare>
            <FormOrderChannel ids={[_mergeOrder['CustomerChooseChannelID']]} readOnly></FormOrderChannel>
            <FormRemarks value={_mergeOrder['CustomerMark']} readOnly></FormRemarks>
            <FormPackageDetail readOnly></FormPackageDetail>
            <FormDeliveredDetail form={form} readOnly></FormDeliveredDetail>
            <FormPayment></FormPayment>
        </Layout.Content>
    }

    render() {
        const topThis = this;
        const {state: {data}} = topThis;
        return <Layout className="member-wait-pay-approve-page view-content-page">
            <Layout.Header className="member-wait-pay-approve-page-header view-content-page-header">
                <ContentHeaderControl title="审批"></ContentHeaderControl>
            </Layout.Header>
            <Spin spinning={!Object.keys(data).length}>
                {this.renderForm()}
            </Spin>
        </Layout>
    }
}