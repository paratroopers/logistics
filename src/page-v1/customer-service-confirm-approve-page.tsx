import * as React from 'react';
import {withRouter, RouteComponentProps, hashHistory} from 'react-router';
import {Layout, Row, Col, Button, Icon, Spin} from 'antd';
import {
    FormOrderInfo,
    ContentHeaderControl,
    FormOrderRelation,
    FormOrderAddressee,
    FormOrderDeclare,
    FormPackageRequirement,
    FormOrderChannel
} from "../components-v1/all-components-export";
import {FormComponentProps} from 'antd/lib/form/Form';
import {RequestNameSpace} from '../model/request';
import {ModelNameSpace} from '../model/model';
import {APINameSpace} from '../model/api';

interface CustomerServiceConfirmApprovePageProps extends RouteComponentProps<any, any>, FormComponentProps {
}

interface CustomerServiceConfirmApprovePageStates {
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
export class CustomerServiceConfirmApprovePage extends React.Component<CustomerServiceConfirmApprovePageProps, CustomerServiceConfirmApprovePageStates> {
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
        const {state: {data, data: {customerOrderList, mergeDetailList, mergeOrder}}} = this;
        const _mergeOrder = mergeOrder ? mergeOrder : {};
        return <Layout.Content>
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
            <FormOrderInfo data={new ModelNameSpace.FormOrderInfoModel(data)}></FormOrderInfo>
            <FormOrderRelation data={customerOrderList}></FormOrderRelation>
            <FormOrderAddressee selectContact={new ModelNameSpace.AddressModel(data)} readOnly></FormOrderAddressee>
            <FormOrderDeclare data={mergeDetailList}></FormOrderDeclare>
            <FormOrderChannel ids={[_mergeOrder['CustomerChooseChannelID']]}></FormOrderChannel>
            <FormPackageRequirement value={_mergeOrder['CustomerMark']} readOnly></FormPackageRequirement>
        </Layout.Content>
    }

    render() {
        const {state: {data}} = this;
        return <Layout className="customer-service-confirm-approve-page view-content-page">
            <Layout.Header className="customer-service-confirm-approve-page-header view-content-page-header">
                <ContentHeaderControl title="审批"></ContentHeaderControl>
            </Layout.Header>
            <Spin spinning={!Object.keys(data).length}>
                {this.renderForm()}
            </Spin>
        </Layout>
    }
}