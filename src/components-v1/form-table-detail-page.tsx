import * as React from 'react';
import {withRouter, RouteComponentProps, hashHistory} from 'react-router';
import {Layout, Row, Col, Icon, Spin} from 'antd';
import {
    FormOrderInfo,
    ContentHeaderControl,
    FormOrderRelation,
    FormOrderAddressee,
    FormOrderDeclare,
    FormRemarks,
    FormOrderChannel,
    FormOrderOtherCost
} from "../components-v1/all-components-export";
import {RequestNameSpace} from '../model/request';
import {ModelNameSpace} from '../model/model';
import {APINameSpace} from '../model/api';

export class FormTableDetailContentModel {
    Info?: boolean = true;
    Relation?: boolean = true;
    Address?: boolean = true;
    Declare?: boolean = true;
    Channel?: boolean = true;
    OtherCost?: boolean = true;
    PackageRemarks?: boolean = true;
    CustomerRemarks?: boolean = true;

    constructor(step?: ModelNameSpace.OrderTypeEnum) {
        if (step) {
            const controls = this.getStepDetailControl(step);
            for (let key of Object.keys(controls)) {
                this[key] = controls[key];
            }
        }
    }

    private getStepDetailControl(step?: ModelNameSpace.OrderTypeEnum) {
        const stepControl = {
            [ModelNameSpace.OrderTypeEnum.OrderConfirm]: {CustomerRemarks: false}
        };
        return stepControl[step];
    }
}

class HeaderGenerator extends React.Component<any, any> {
    render() {
        return this.props.children;
    }
}

interface FormTableDetailPageProps extends RouteComponentProps<any, any> {
    /** 原始订单ID*/
    ID: string;
    /*阶段*/
    Step?: ModelNameSpace.OrderTypeEnum;
    /*标题*/
    Title?: string;
}

interface FormTableDetailPageStates {
    viewData?: ModelNameSpace.CustomerOrderModel;
    /** 源数据*/
    data?: ModelNameSpace.CustomerOrderMergeDetailModel;
}

@withRouter
export class FormTableDetailPage extends React.Component<FormTableDetailPageProps, FormTableDetailPageStates> {
    static Header?: React.ComponentClass<any> = HeaderGenerator;

    constructor(props) {
        super(props);
        this.state = {
            data: {}
        }
    }

    componentDidMount() {
        const {props: {ID}} = this;
        /** 未传值则返回*/
        !ID && hashHistory.goBack();
        this.getOrderInfo();
    }

    async getOrderInfo() {
        /** 通过ID获取表单数据*/
        const request: RequestNameSpace.GetCustomerOrderMergeItemRequest = {
            customerOrderMergeID: this.props.ID,
            isAdmin: false
        }
        const response = await APINameSpace.CustomerOrderAPI.GetCustomerOrderMergeItem(request);
        response.Status === 0 && this.setState({data: response.Data || {}});
    }

    renderContent(): JSX.Element[] {
        const {state: {data, data: {customerOrderList, mergeDetailList, mergeOrder}}, props: {Step}} = this;
        const _mergeOrder = mergeOrder ? mergeOrder : {};
        const content = new FormTableDetailContentModel(Step);
        let emls: JSX.Element[] = [];
        content.Info && emls.push(<FormOrderInfo key="Info"
                                                 data={new ModelNameSpace.FormOrderInfoModel(data)}></FormOrderInfo>);
        content.Relation && emls.push(<FormOrderRelation key="Relation" data={customerOrderList}></FormOrderRelation>);
        content.Address && emls.push(<FormOrderAddressee key="Address"
                                                         selectContact={new ModelNameSpace.AddressModel(data)}
                                                         readOnly></FormOrderAddressee>);
        content.Declare && emls.push(<FormOrderDeclare key="Declare" data={mergeDetailList}></FormOrderDeclare>);
        content.Channel && emls.push(<FormOrderChannel key="Channel"
                                                       ids={[_mergeOrder['CustomerChooseChannelID']]}></FormOrderChannel>);
        content.OtherCost && emls.push(<FormOrderOtherCost key="OtherCost"></FormOrderOtherCost>);
        content.PackageRemarks && emls.push(<FormRemarks key="PackageRemarks" title="打包规则"
                                                         fieldName="customerServiceMark"></FormRemarks>);
        content.CustomerRemarks && emls.push(<FormRemarks key="CustomerRemarks" title="客户备注"
                                                          fieldName="customerServiceMark"></FormRemarks>);
        return emls;
    }

    renderForm() {
        const {state: {data}, props: {children}} = this;
        if (data)
            return <Layout.Content>
                <Row justify="start" type="flex" style={{margin: '10px 0px 10px 0px'}}>
                    <Col span={24}>
                        <div className="view-content-page-header-title">
                            <Icon type="tag" style={{color: '#f2804b', marginRight: '15px'}}/>
                            <strong>单号：{data.mergeOrder ? data.mergeOrder.code : ''}</strong>
                        </div>
                        <div className="view-content-page-header-button">
                            {children ? children.props.children : null}
                        </div>
                    </Col>
                </Row>
                {this.renderContent()}
            </Layout.Content>
    }

    render() {
        const {state: {data}} = this;
        return <Layout className="customer-service-confirm-approve-page view-content-page">
            <Layout.Header className="customer-service-confirm-approve-page-header view-content-page-header">
                <ContentHeaderControl title={this.props.Title}></ContentHeaderControl>
            </Layout.Header>
            <Spin spinning={!Object.keys(data).length}>
                {this.renderForm()}
            </Spin>
        </Layout>
    }
}