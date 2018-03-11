import * as React from 'react';
import {withRouter, RouteComponentProps, hashHistory} from 'react-router';
import {isNullOrUndefined} from "util";
import {Layout} from 'antd';
import {ModelNameSpace} from '../model/model';
import {
    FormOrderInfo,
    ContentHeaderControl,
    FormOrderRelation,
    FormOrderAddressee,
    FormOrderDeclare,
    FormRemarks,
    FormOrderChannel
} from "../components-v1/all-components-export";
import {FormComponentProps} from 'antd/lib/form/Form';

interface CustomerServiceConfirmViewPageProps extends RouteComponentProps<any, any>, FormComponentProps {
}

interface CustomerServiceConfirmViewPageStates {
    viewData?: ModelNameSpace.CustomerOrderModel
}

@withRouter
export class CustomerServiceConfirmViewPage extends React.Component<CustomerServiceConfirmViewPageProps, CustomerServiceConfirmViewPageStates> {
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
            <FormOrderAddressee readOnly={true}></FormOrderAddressee>
            <FormOrderDeclare readOnly={true}></FormOrderDeclare>
            <FormOrderChannel readOnly={true}></FormOrderChannel>
            <FormRemarks readOnly={true}></FormRemarks>
        </Layout.Content>
    }

    render() {
        const topThis = this;
        const {state: {viewData}} = topThis;
        return <Layout className="customer-service-confirm-view-page view-content-page">
            <Layout.Header className="customer-service-confirm-view-page-header view-content-page-header">
                <ContentHeaderControl title="查看"></ContentHeaderControl>
            </Layout.Header>
            {!isNullOrUndefined(viewData) ? topThis.renderForm() :
                <Layout.Content>暂无数据</Layout.Content>}
        </Layout>
    }
}