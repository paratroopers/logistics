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
    FormRemarks,
    FormPackageDetail,
    FormOrderChannel,
    FormDeliveredDetail,
    FormPayment
} from "../components-v1/all-components-export";
import {FormComponentProps} from 'antd/lib/form/Form';

interface WarehouseOutApprovePageProps extends RouteComponentProps<any, any>, FormComponentProps {}

interface WarehouseOutApprovePageStates {
    viewData?: ModelNameSpace.CustomerOrderModel
}

@withRouter
export class WarehouseOutApprovePage extends React.Component<WarehouseOutApprovePageProps, WarehouseOutApprovePageStates> {
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
            <FormOrderInfo></FormOrderInfo>
            <FormOrderRelation></FormOrderRelation>
            <FormOrderAddressee></FormOrderAddressee>
            <FormOrderDeclare></FormOrderDeclare>
            <FormOrderChannel></FormOrderChannel>
            <FormRemarks></FormRemarks>
            <FormPackageDetail></FormPackageDetail>
            <FormDeliveredDetail form={form}></FormDeliveredDetail>
        </Layout.Content>
    }

    render() {
        const topThis = this;
        const {state: {viewData}} = topThis;
        return <Layout className="warehouse-out-approve-page view-content-page">
            <Layout.Header className="warehouse-out-approve-page-header view-content-page-header">
                <ContentHeaderControl title="审批"></ContentHeaderControl>
            </Layout.Header>
            {!isNullOrUndefined(viewData) ? topThis.renderForm() :
                <Layout.Content>暂无数据</Layout.Content>}
        </Layout>
    }
}