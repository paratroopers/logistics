import * as React from 'react';
import {withRouter,RouteComponentProps,hashHistory} from 'react-router';
import {isNullOrUndefined} from "util";
import {Layout, Row, Col, Button, Icon} from 'antd';
import {ModelNameSpace} from '../model/model';
import {
    FormOrderInfo,
    ContentHeaderControl,
    FormOrderRelation,
    FormOrderAddressee,
    FormOrderDeclare,
    FormPackageRequirement,
    FormPackageDetail,
    FormOrderChannel,
    FormDeliveredDetail,
    FormPayment
} from "../components-v1/all-components-export";
import {FormComponentProps} from 'antd/lib/form/Form';

interface MemberWaitPayApprovePageProps extends RouteComponentProps<any, any>, FormComponentProps {}

interface MemberWaitPayApprovePageStates {
    viewData?: ModelNameSpace.CustomerOrderModel
}

@withRouter
export class MemberWaitPayApprovePage extends React.Component<MemberWaitPayApprovePageProps, MemberWaitPayApprovePageStates> {
    constructor(props) {
        super(props);
        this.state = {
            viewData: {}
        }
    }

    componentDidMount() {
        const topThis = this;
        const {props: {location}} = topThis;
        /** 获取页面传值*/
        const viewData: ModelNameSpace.CustomerOrderModel = location.state;
        /** 未传值则返回*/
        if (isNullOrUndefined(viewData)) hashHistory.goBack();
        topThis.setState({viewData: viewData});
    }

    renderForm() {
        const topThis = this;
        const {props: {form}} = topThis;
        return <Layout.Content>
            <FormOrderInfo></FormOrderInfo>
            <FormOrderRelation></FormOrderRelation>
            <FormOrderAddressee></FormOrderAddressee>
            <FormOrderDeclare></FormOrderDeclare>
            <FormOrderChannel></FormOrderChannel>
            <FormPackageRequirement></FormPackageRequirement>
            <FormPackageDetail></FormPackageDetail>
            <FormDeliveredDetail form={form}></FormDeliveredDetail>
            <FormPayment></FormPayment>
        </Layout.Content>
    }

    render() {
        const topThis = this;
        const {state: {viewData}} = topThis;
        return <Layout className="member-wait-pay-approve-page view-content-page">
            <Layout.Header className="member-wait-pay-approve-page-header view-content-page-header">
                <ContentHeaderControl title="审批"></ContentHeaderControl>
            </Layout.Header>
            {!isNullOrUndefined(viewData) ? topThis.renderForm() :
                <Layout.Content>暂无数据</Layout.Content>}
        </Layout>
    }
}