import * as React from 'react';
import {withRouter, RouteComponentProps, hashHistory} from 'react-router';
import {Layout, Row, Col, Icon, Spin, Button} from 'antd';
import {WrappedFormUtils} from 'antd/lib/form/Form';
import {
    FormOrderInfo,
    ContentHeaderControl,
    FormOrderRelation,
    FormOrderAddressee,
    FormOrderDeclare,
    FormRemarks,
    FormOrderChannel,
    FormOrderOtherCost,
    FormOrderWarehousePackage
} from "../components-v1/all-components-export";
import {RequestNameSpace} from '../model/request';
import {ModelNameSpace} from '../model/model';
import {APINameSpace} from '../model/api';

interface ControlInterface {
    hidden?: boolean;
    readyOnly?: boolean;
}

export class FormTableDetailContentModel {
    Info?: ControlInterface = {};
    Relation?: ControlInterface = {};
    Address?: ControlInterface = {};
    Declare?: ControlInterface = {};
    Channel?: ControlInterface = {};
    OtherCost?: ControlInterface = {};
    PackageRemarks?: ControlInterface = {};
    CustomerRemarks?: ControlInterface = {};
    WarehousePackage?: ControlInterface = {};

    constructor(step?: ModelNameSpace.OrderTypeEnum) {
        if (step) {
            const controls = this.getStepDetailControl(step);
            for (let key of Object.keys(controls)) {
                this[key] = controls[key];
            }
        }
    }

    private getStepDetailControl(step?: ModelNameSpace.OrderTypeEnum) {
        const stepApproveControl = {
            [ModelNameSpace.OrderTypeEnum.OrderConfirm]: {
                CustomerRemarks: {hidden: true},
                Address: {readyOnly: true},
                WarehousePackage: {hidden: true}
            },
            [ModelNameSpace.OrderTypeEnum.OrderMerge]: {
                Address: {readyOnly: true},
                Declare: {readyOnly: true},
                Channel: {readyOnly: true},
                OtherCost: {readyOnly: true},
                CustomerRemarks: {hidden: true},
                PackageRemarks: {readyOnly: true}
            },
            [ModelNameSpace.OrderTypeEnum.WaitPay]: {
                Address: {readyOnly: true},
                Declare: {readyOnly: true},
                Channel: {readyOnly: true},
                OtherCost: {readyOnly: true},
                CustomerRemarks: {readyOnly: true},
                PackageRemarks: {readyOnly: true}
            },
            [ModelNameSpace.OrderTypeEnum.OrderOut]: {
                Address: {readyOnly: true},
                Declare: {readyOnly: true},
                Channel: {readyOnly: true},
                OtherCost: {readyOnly: true},
                CustomerRemarks: {readyOnly: true},
                PackageRemarks: {readyOnly: true}
            }
        };
        const stepViewControl = {
            [ModelNameSpace.OrderTypeEnum.OrderConfirm]: {
                CustomerRemarks: {hidden: true},
                Address: {readyOnly: true},
                WarehousePackage: {hidden: true}
            },
        }
        return stepApproveControl[step];
    }
}

class HeaderGenerator extends React.Component<any, any> {
}

interface FormTableDetailPageProps extends RouteComponentProps<any, any> {
    /** 原始订单ID*/
    ID: string;
    /*阶段*/
    Step?: ModelNameSpace.OrderTypeEnum;
    /*标题*/
    Title?: string;
    /*是否整个组件只读*/
    readyOnly?: boolean;
    /*回调事件*/
    onSubmit?: <T>(values?: T) => void;
    /*form表单*/
    form?: WrappedFormUtils;
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

    getFormData() {
        this.props.form.validateFields((err, values) => {
            console.log(err);
            this.props.onSubmit && this.props.onSubmit();
        })
    }

    renderContent(): JSX.Element[] {
        const {state: {data, data: {customerOrderList, mergeDetailList, mergeOrder}}, props: {Step, readyOnly}} = this;
        const _mergeOrder = mergeOrder ? mergeOrder : {};
        const content = new FormTableDetailContentModel(Step);
        let emls: JSX.Element[] = [];
        content.Info && !content.Info.hidden && emls.push(
            <FormOrderInfo key="Info"
                           data={new ModelNameSpace.FormOrderInfoModel(data)}>
            </FormOrderInfo>);

        content.Relation && !content.Relation.hidden && emls.push(
            <FormOrderRelation key="Relation"
                               data={customerOrderList}>
            </FormOrderRelation>);

        content.Address && !content.Address.hidden && emls.push(
            <FormOrderAddressee key="Address"
                                form={this.props.form}
                                selectContact={new ModelNameSpace.AddressModel(data)}
                                readOnly={content.Address.readyOnly || readyOnly}>
            </FormOrderAddressee>);

        content.Declare && !content.Declare.hidden && emls.push(
            <FormOrderDeclare key="Declare"
                              data={mergeDetailList}
                              form={this.props.form}
                              readOnly={content.Declare.readyOnly || readyOnly}>
            </FormOrderDeclare>);

        if (content.Channel && !content.Channel.hidden) {
            if (this.props.form)
                this.props.form.getFieldDecorator('Channel');
            emls.push(
                <FormOrderChannel key="Channel"
                                  onChange={(select) => {
                                      this.props.form.setFieldsValue({'Channel': select});
                                  }}
                                  readOnly={content.Channel.readyOnly || readyOnly}
                                  ids={[_mergeOrder['CustomerChooseChannelID']]}>
                </FormOrderChannel>);
        }

        content.OtherCost && !content.OtherCost.hidden && emls.push(
            <FormOrderOtherCost key="OtherCost"
                                form={this.props.form}
                                readOnly={content.OtherCost.readyOnly || readyOnly}>
            </FormOrderOtherCost>);

        content.PackageRemarks && !content.PackageRemarks.hidden && emls.push(
            <FormRemarks key="PackageRemarks"
                         title="打包规则"
                         form={this.props.form}
                         readOnly={content.PackageRemarks.readyOnly || readyOnly}
                         fieldName="customerServiceMark">
            </FormRemarks>);

        content.CustomerRemarks && !content.CustomerRemarks.hidden && emls.push(
            <FormRemarks key="CustomerRemarks"
                         title="客户备注"
                         form={this.props.form}
                         fieldName="customerServiceMark"
                         readOnly={content.CustomerRemarks.readyOnly || readyOnly}>
            </FormRemarks>);

        content.WarehousePackage && !content.WarehousePackage.hidden && emls.push(
            <FormOrderWarehousePackage key="WarehousePackage"
                                       title="仓库打包"
                                       form={this.props.form}
                                       readOnly={content.WarehousePackage.readyOnly || readyOnly}>
            </FormOrderWarehousePackage>);
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
                            <strong>单号：{data.mergeOrder ? data.mergeOrder.MergeOrderNo : ''}</strong>
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