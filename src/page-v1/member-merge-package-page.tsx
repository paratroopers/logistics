import * as React from 'react';
import {withRouter, RouteComponentProps,hashHistory} from 'react-router';
import {Layout, Row, Col, Button, Icon, message, Form} from 'antd';
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
    FormPackageRequirement
} from "../components-v1/all-components-export";
import {FormComponentProps} from 'antd/lib/form/Form';
import {requestNameSpace} from '../model/request';
import {Context} from "../util/common";
import {isArray} from "util";
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
    CustomerMark?:string;
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
            CustomerMark:""
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
            created: moment().format('YYYY-MM-DD')
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
        const {props: {form}, state: {channelList, data,CustomerMark}} = topThis;

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

        form.validateFieldsAndScroll((errors, values) => {
            if (!errors) {
                const request: requestNameSpace.CustomerOrderMergeAddRequest = {
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
                    currentStep: "0",
                    currentStatus: "1",
                    isAdmin: false
                }
                APINameSpace.CustomerOrderAPI.CustomerOrderMergeAdd(request).then((result: ResponseNameSpace.BaseResponse) => {
                    if (result.Status === 0) {
                        message.success("合并成功!");
                        setTimeout(()=>{
                            hashHistory.goBack();
                        },1000);
                    }
                    else
                    {
                        message.warning("合并失败!");
                    }
                });
            }
        });
    }

    render() {
        const topThis = this;
        const {props: {form}} = topThis;
        const {state: {orderInfo, data}} = this;
        return <Layout className="merge-package-page view-content-page">
            <Layout.Header className="merge-package-page-header view-content-page-header">
                <ContentHeaderControl title="待打包"></ContentHeaderControl>
            </Layout.Header>
            <Layout.Content>
                <Row justify="start" type="flex" style={{margin: '10px 0px 10px 0px'}}>
                    <Col span={24}>
                        <div className="view-content-page-header-title">
                            <Icon type="tag" style={{color: '#f2804b', marginRight: '15px'}}/>
                            <span>单号：201801270052</span>
                        </div>
                        <div className="view-content-page-header-button">
                            <Button type="primary" style={{marginRight: "10px"}} onClick={topThis.onSubmit.bind(this)}>确认合并打包</Button>
                            <Button type="primary">取消</Button>
                        </div>
                    </Col>
                </Row>
                <FormOrderInfo data={orderInfo}></FormOrderInfo>
                <FormOrderRelation data={data}></FormOrderRelation>
                <FormOrderAddressee form={form}></FormOrderAddressee>
                <FormOrderDeclare form={form}></FormOrderDeclare>
                <FormOrderChannel onChange={(channelData) => {
                    topThis.setState({channelList: channelData});
                }}></FormOrderChannel>
                <FormPackageRequirement onChange={(mark)=>{
                    topThis.setState({CustomerMark:mark})
                }}></FormPackageRequirement>
            </Layout.Content>
        </Layout>;
    }
}

export default Form.create<any>()(MemberMergePackagePage);
