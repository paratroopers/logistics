import * as React from 'react';
import {withRouter, RouteComponentProps, hashHistory} from 'react-router';
import {Layout, Row, Col, Button, message, Form} from 'antd';
import {ModelNameSpace} from '../model/model';
import {APINameSpace} from '../model/api';
import * as moment from 'moment';
import * as util from "util";
import {
    FormOrderInfo,
    FormOrderInfoModel,
    ContentHeaderControl,
    FormOrderRelation,
    FormOrderAddressee,
    FormOrderDeclare,
    FormOrderChannel,
    FormRemarks
} from "../components-v1/all-components-export";
import {FormComponentProps} from 'antd/lib/form/Form';
import {RequestNameSpace} from '../model/request';
import {Context,Constants} from "../util/common";
import {isArray, isNullOrUndefined} from "util";
import {ResponseNameSpace} from '../model/response';

export interface MemberMergePackagePageProps extends RouteComponentProps<any, any>, FormComponentProps {
}

export interface MemberMergePackagePageStates {
    /** 原始订单ID*/
    selectedKeys?: string[] | string;
    /** 原始订单信息*/
    data?: ModelNameSpace.CustomerOrderModel[];
    /** 订单基本信息*/
    orderInfo?: FormOrderInfoModel;
    /** 渠道选择*/
    channelList?: ModelNameSpace.ChannelModal[];
    /** 客户备注*/
    CustomerMark?: string;
}

export interface QueryData {
    ids?: string[]
}

@withRouter
class MemberMergePackagePage extends React.Component<MemberMergePackagePageProps, MemberMergePackagePageStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            selectedKeys: (this.props.location.query as QueryData).ids,
            CustomerMark: ""
        }
    }

    componentDidMount() {
        this.getMergeOrderInfo();
    }

    initOrderInfo(data: ModelNameSpace.CustomerOrderModel[]) {
        let orderInfo: FormOrderInfoModel = {
            weight: 0,
            volume: 0,
            count: data.length,
            created: moment().format('YYYY-MM-DD HH:mm')
        };
        data.forEach(d => {
            orderInfo.weight += d.InWeight;
            orderInfo.volume += d.InVolume;
        });
        this.setState({orderInfo: orderInfo, data: data});
    }

    getMergeOrderInfo() {
        const request = util.isArray(this.state.selectedKeys) ? (this.state.selectedKeys as string[]).join(",") : this.state.selectedKeys.toString();
        APINameSpace.MemberAPI.GetOrderItemsByID(request).then((r: ResponseNameSpace.BaseResponse) => {
            if (r.Status === 0)
                this.initOrderInfo(r.Data);
        });
    }

    /** 表单提交*/
    onSubmit() {
        const topThis = this;
        const {props: {form}, state: {channelList, data, CustomerMark}} = topThis;

        /** 验证产品信息是否存在*/
        if (!isArray(form.getFieldValue("productList")) || form.getFieldValue("productList").length === 0) {
            message.warning("请填写货品申报信息!");
            return;
        }

        /** 验证渠道信息是否存在*/
        if (!isArray(channelList) || channelList.length === 0) {
            message.warning("请选择渠道!");
            return;
        }

        /** 验证渠道信息是否存在*/
        if (isNullOrUndefined(CustomerMark)||CustomerMark==="") {
            message.warning("请填写打包要求!");
            return;
        }

        form.validateFieldsAndScroll((errors, values) => {
            if (!errors) {
                const request: RequestNameSpace.CustomerOrderMergeAddRequest = {
                    /** 用户ID*/
                    userid: Context.getCurrentUser().userInfo.Userid.toString(),
                    /** 客户备注*/
                    CustomerMark: CustomerMark,
                    /** 选择渠道*/
                    CustomerChooseChannelID: channelList[0].ID,
                    /** 收件人姓名*/
                    recipient: values.recipient,
                    /** 国家*/
                    country: values.country,
                    /** 地址*/
                    address: values.Address,
                    /** 城市*/
                    city: values.City,
                    /** 税号*/
                    code: values.postalcode,
                    /** 电话*/
                    tel: values.Tel,
                    /** 公司*/
                    company: values.companyName,
                    /** 邮编*/
                    taxNo: values.taxno,
                    /** 客户关联订单列表*/
                    customerOrderList: data.map((item) => {
                        return {customerOrderID: item.ID}
                    }),
                    /** 产品申报列表*/
                    productList: values.productList,
                    currentStep: Constants.getOrderStep(ModelNameSpace.OrderTypeEnum.WaitPackage),
                    currentStatus: ModelNameSpace.OrderStatusEnum.StatusA,
                    isAdmin: false
                }
                APINameSpace.CustomerOrderAPI.CustomerOrderMergeAdd(request).then((result: ResponseNameSpace.BaseResponse) => {
                    if (result.Status === 0) {
                        message.success("合并成功!");
                        setTimeout(() => {
                            hashHistory.goBack();
                        }, 1000);
                    }
                    else {
                        message.warning("合并失败!");
                    }
                });
            }
        });
    }

    renderContent() {
        const {state: {orderInfo, data}, props: {form}} = this;
        return <Layout className="merge-package-page view-content-page">
            <ContentHeaderControl title="待打包"></ContentHeaderControl>
            <Layout.Content>
                <Row justify="start" type="flex" style={{margin: '10px 0px 10px 0px'}}>
                    <Col span={24}>
                        <div className="view-content-page-header-button">
                            <Button type="primary" style={{marginRight: "10px"}} onClick={this.onSubmit.bind(this)}>确认合并打包</Button>
                            <Button type="primary" onClick={()=>{
                                hashHistory.goBack();
                            }}>取消</Button>
                        </div>
                    </Col>
                </Row>
                <FormOrderInfo data={orderInfo}></FormOrderInfo>
                <FormOrderRelation data={data}></FormOrderRelation>
                <FormOrderAddressee form={form}></FormOrderAddressee>
                <FormOrderDeclare form={form}></FormOrderDeclare>
                <FormOrderChannel onChange={(channelData) => {
                    this.setState({channelList: channelData});
                }}></FormOrderChannel>
                <FormRemarks title={"打包要求"} onChange={(mark) => {
                    this.setState({CustomerMark: mark})
                }}></FormRemarks>
            </Layout.Content>
        </Layout>
    }

    render() {
        return <div>
            {this.renderContent()}
        </div>
    }
}

export default Form.create<any>()(MemberMergePackagePage);
