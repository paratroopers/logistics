import * as React from 'react';
import {withRouter, RouteComponentProps, hashHistory} from 'react-router';
import {Layout, Row, Col, Icon, Spin} from 'antd';
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
    FormOrderWarehousePackage,
    FormPayment,
    FormOrderReceiptDate,
    FormOrderAgent
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
    WarehousePackage?: ControlInterface = {};
    Payment?: ControlInterface = {};
    CustomerMark?: ControlInterface = {};
    ReceiptDate?: ControlInterface = {};
    Agent?: ControlInterface = {};

    constructor(step?: ModelNameSpace.OrderTypeEnum, readyOnly?: boolean) {
        if (step) {
            const controls = this.getStepDetailControl(step, readyOnly);
            for (let key of Object.keys(controls)) {
                this[key] = controls[key];
            }
        }
    }

    private getStepDetailControl(step?: ModelNameSpace.OrderTypeEnum, readyOnly?: boolean) {
        const stepApproveControl = {
            [ModelNameSpace.OrderTypeEnum.OrderConfirm]: {
                Address: {readyOnly: true},
                WarehousePackage: {hidden: true},
                CustomerMark: {readyOnly: true},
                Payment: {hidden: true},
                ReceiptDate: {hidden: true},
                Agent: {hidden: true}
            },
            [ModelNameSpace.OrderTypeEnum.OrderMerge]: {
                Address: {readyOnly: true},
                Declare: {readyOnly: true},
                Channel: {readyOnly: true},
                OtherCost: {readyOnly: true},
                PackageRemarks: {readyOnly: true},
                Payment: {hidden: true},
                CustomerMark: {readyOnly: true},
                ReceiptDate: {hidden: true},
                Agent: {hidden: true}
            },
            [ModelNameSpace.OrderTypeEnum.WaitPay]: {
                Address: {readyOnly: true},
                Declare: {readyOnly: true},
                Channel: {readyOnly: true},
                PackageRemarks: {hidden: true},
                OtherCost: {hidden: true},
                CustomerMark: {hidden: true},
                WarehousePackage: {readyOnly: true},
                Agent: {hidden: true}
            },
            [ModelNameSpace.OrderTypeEnum.OrderOut]: {
                Address: {readyOnly: true},
                Declare: {readyOnly: true},
                Channel: {readyOnly: true},
                PackageRemarks: {hidden: true},
                OtherCost: {hidden: true},
                CustomerMark: {hidden: true},
                Payment: {hidden: true},
                WarehousePackage: {readyOnly: true},
                ReceiptDate: {readyOnly: true}
            },
            [ModelNameSpace.OrderTypeEnum.OrderOutDeliver]: {
                Address: {readyOnly: true},
                Declare: {readyOnly: true},
                Channel: {readyOnly: true},
                PackageRemarks: {hidden: true},
                OtherCost: {hidden: true},
                CustomerMark: {hidden: true},
                Payment: {hidden: true},
                WarehousePackage: {readyOnly: true},
                ReceiptDate: {readyOnly: true}
            }
        };
        const stepViewControl = {
            [ModelNameSpace.OrderTypeEnum.OrderConfirm]: {
                Address: {readyOnly: true},
                WarehousePackage: {hidden: true},
                OtherCost: {hidden: true},
                PackageRemarks: {hidden: true},
                CustomerMark: {readyOnly: true},
                Payment: {hidden: true},
                ReceiptDate: {hidden: true},
                Agent: {hidden: true}
            },
            [ModelNameSpace.OrderTypeEnum.OrderMerge]: {
                Address: {readyOnly: true},
                Declare: {readyOnly: true},
                Channel: {readyOnly: true},
                OtherCost: {readyOnly: true},
                PackageRemarks: {readyOnly: true},
                WarehousePackage: {hidden: true},
                Payment: {hidden: true},
                ReceiptDate: {hidden: true},
                Agent: {hidden: true}
            },
            [ModelNameSpace.OrderTypeEnum.WaitPay]: {
                Address: {readyOnly: true},
                Declare: {readyOnly: true},
                Channel: {readyOnly: true},
                PackageRemarks: {hidden: true},
                OtherCost: {hidden: true},
                CustomerMark: {hidden: true},
                Payment: {hidden: true},
                WarehousePackage: {readyOnly: true},
                Agent: {hidden: true}
            },
            [ModelNameSpace.OrderTypeEnum.OrderOut]: {
                Address: {readyOnly: true},
                Declare: {readyOnly: true},
                Channel: {readyOnly: true},
                PackageRemarks: {hidden: true},
                OtherCost: {hidden: true},
                CustomerMark: {hidden: true},
                Payment: {hidden: true},
                WarehousePackage: {readyOnly: true},
                ReceiptDate: {readyOnly: true},
                Agent: {hidden: true}
            },
            [ModelNameSpace.OrderTypeEnum.OrderOutDeliver]: {
                Address: {readyOnly: true},
                Declare: {readyOnly: true},
                Channel: {readyOnly: true},
                PackageRemarks: {hidden: true},
                OtherCost: {hidden: true},
                CustomerMark: {hidden: true},
                Payment: {hidden: true},
                WarehousePackage: {readyOnly: true},
                ReceiptDate: {readyOnly: true}
            }
        }
        return readyOnly ? stepViewControl[step] : stepApproveControl[step];
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
        if (response.Status === 0) {
            let updateData: RequestNameSpace.CustomerOrderMergeUpdateRequest;
            if (response.Data && this.props.form) {
                const data = response.Data;
                updateData = {
                    productList: data.mergeDetailList,
                    CustomerChooseChannelID: data.mergeOrder['CustomerChooseChannelID'],
                    CustomerMark: data.mergeOrder['CustomerMark'],
                    remoteFee: data.mergeOrder['remoteFee'],
                    magneticinspectionFee: data.mergeOrder['magneticinspectionFee'],
                    customerServiceMark: data.mergeOrder['customerServiceMark'],
                    packageLength: data.mergeOrder['packageLength'],
                    packageWidth: data.mergeOrder['packageWidth'],
                    packageHeight: data.mergeOrder['packageHeight'],
                    packageWeight: data.mergeOrder['packageWeight'],
                    deliverTime: data.mergeOrder['deliverTime']
                    /*    ,agent: data.mergeOrder['agent']*/
                };
                this.props.form.getFieldDecorator('needUpdateData', {initialValue: updateData});
            }
            this.setState({data: response.Data || {}});
        }

    }

    renderContent(): JSX.Element[] {
        const {state: {data, data: {customerOrderList, mergeDetailList, mergeOrder}}, props: {Step, readyOnly}} = this;
        const _mergeOrder = mergeOrder ? mergeOrder : {};
        const content = new FormTableDetailContentModel(Step, readyOnly);
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
            emls.push(<FormOrderChannel key="Channel"
                                        form={this.props.form}
                                        fieldName="CustomerChooseChannelID"
                                        readOnly={content.Channel.readyOnly || readyOnly}
                                        ids={[_mergeOrder['CustomerChooseChannelID']]}>
            </FormOrderChannel>);
        }

        content.CustomerMark && !content.CustomerMark.hidden && emls.push(
            <FormRemarks key="CustomerMark"
                         form={this.props.form} title={"打包要求"}
                         readOnly={content.CustomerMark.readyOnly || readyOnly}
                         fieldName="CustomerMark" value={_mergeOrder['CustomerMark']}></FormRemarks>);

        content.OtherCost && !content.OtherCost.hidden && emls.push(
            <FormOrderOtherCost key="OtherCost"
                                fieldsName={['remoteFee', 'magneticinspectionFee']}
                                data={mergeOrder}
                                form={this.props.form}
                                readOnly={content.OtherCost.readyOnly || readyOnly}>
            </FormOrderOtherCost>);

        content.PackageRemarks && !content.PackageRemarks.hidden && emls.push(
            <FormRemarks key="PackageRemarks"
                         title="打包规则"
                         value={_mergeOrder['customerServiceMark']}
                         form={this.props.form}
                         readOnly={content.PackageRemarks.readyOnly || readyOnly}
                         fieldName="customerServiceMark">
            </FormRemarks>);

        content.WarehousePackage && !content.WarehousePackage.hidden && emls.push(
            <FormOrderWarehousePackage key="WarehousePackage"
                                       title="仓库打包"
                                       data={mergeOrder}
                                       form={this.props.form}
                                       readOnly={content.WarehousePackage.readyOnly || readyOnly}>
            </FormOrderWarehousePackage>);

        content.ReceiptDate && !content.ReceiptDate.hidden && emls.push(<FormOrderReceiptDate
            readOnly={content.ReceiptDate.readyOnly || readyOnly}
            data={mergeOrder}></FormOrderReceiptDate>);

        content.Payment && !content.Payment.hidden && emls.push(<FormPayment key="Payment"
                                                                             data={mergeOrder}></FormPayment>);

        content.Agent && !content.Agent.hidden && emls.push(<FormOrderAgent key="Agent"
                                                                            readyOnly={readyOnly}
                                                                            data={mergeOrder}
                                                                            form={this.props.form}></FormOrderAgent>);

        return emls;
    }

    renderForm() {
        const {state: {data}} = this;
        if (data)
            return <Layout.Content>
                <Row justify="start" type="flex" style={{margin: '10px 0px 10px 0px'}}>
                    <Icon type="tag" style={{color: '#f2804b', marginRight: '15px', fontSize: 16}}/>
                    <span className="team-mao form-label">单号</span>
                    <span className="form-value">{data.mergeOrder ? data.mergeOrder.MergeOrderNo : ''}</span>
                </Row>
                {this.renderContent()}
            </Layout.Content>
    }

    render() {
        const {state: {data}, props: {children}} = this;
        return <Layout className="customer-service-confirm-approve-page view-content-page">
            <ContentHeaderControl title={this.props.Title}
                                  extra={children ? children.props.children : null}></ContentHeaderControl>
            <Spin spinning={!Object.keys(data).length}>
                {this.renderForm()}
            </Spin>
        </Layout>
    }
}