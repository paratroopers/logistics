import * as React from 'react';
import {withRouter, RouteComponentProps, hashHistory} from 'react-router';
import {Layout, Row, Col, Button, message, Form,Spin} from 'antd';
import {ModelNameSpace} from '../model/model';
import {APINameSpace} from '../model/api';
import * as moment from 'moment';
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
import {Context, Constants} from "../util/common";
import {ResponseNameSpace} from '../model/response';
import {PathConfig}from "../config/pathconfig";

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
    loading:boolean;
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
            loading: false
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
        const request = Array.isArray(this.state.selectedKeys) ? (this.state.selectedKeys as string[]).join(",") : this.state.selectedKeys.toString();
        APINameSpace.MemberAPI.GetOrderItemsByID(request).then((r: ResponseNameSpace.BaseResponse) => {
            if (r.Status === 0)
                this.initOrderInfo(r.Data);
        });
    }

    /** 表单提交*/
    onSubmit() {
        const topThis = this;
        const {props: {form}, state: {channelList, data}} = topThis;

        form.validateFieldsAndScroll((errors, values) => {
            if (!errors) {
                /** 验证渠道信息是否存在*/
                if (!Array.isArray(channelList) || channelList.length === 0) {
                    message.warning("请选择渠道!");
                    return;
                }

                if (Array.isArray(values.productList)) {
                    const productList = values.productList.filter((product) => {
                        return ((Number.isFinite(product.declareUnitPrice) && product.declareUnitPrice === 0) || (Number.isFinite(product.productCount) && product.productCount === 0))
                    });
                    if (productList.length > 0) {
                        message.warning("申报总值不能为0");
                        return;
                    }
                }

                const request: RequestNameSpace.CustomerOrderMergeAddRequest = {
                    /** 用户ID*/
                    userid: Context.getMerchantData().userInfo.Userid.toString(),
                    /** 客户备注*/
                    CustomerMark: values.CustomerMark,
                    /** 选择渠道*/
                    CustomerChooseChannelID: channelList[0].ID,
                    /** 收件人姓名*/
                    recipient: values.recipient,
                    /** 国家Code*/
                    countryCode: values.countryModel.key,
                    /** 国家*/
                    country: values.countryModel.label,
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
                topThis.setState({loading:true});
                APINameSpace.CustomerOrderAPI.CustomerOrderMergeAdd(request).then((result: ResponseNameSpace.BaseResponse) => {
                    if (result.Status === 0) {
                        message.success("合并成功!");
                        hashHistory.push({pathname:PathConfig.MemberMyOrderPage,state:ModelNameSpace.OrderTypeEnum.WaitApprove.toString()});
                    }
                    else {
                        topThis.setState({loading:false});
                        message.warning("合并失败!");
                    }
                });
            }
        });
    }

    renderButton(){
        return <Row justify="end" type="flex" style={{margin: '10px 0px 10px 0px'}}>
            <Col>
                <div className="view-content-page-header-button">
                    <Button type="primary" style={{marginRight: "10px"}} onClick={this.onSubmit.bind(this)}>确认合并打包</Button>
                    <Button type="primary" onClick={() => {
                        hashHistory.goBack();
                    }}>取消</Button>
                </div>
            </Col>
        </Row>
    }

    renderContent() {
        const {state: {orderInfo, data, loading}, props: {form}} = this;
        return <Spin size="large" spinning={loading}>
            <Layout className="merge-package-page view-content-page">
                <ContentHeaderControl title="待打包" extra={this.renderButton()}></ContentHeaderControl>
                <Layout.Content>
                    <FormOrderInfo data={orderInfo}></FormOrderInfo>
                    <FormOrderRelation data={data}></FormOrderRelation>
                    <FormOrderAddressee form={form}></FormOrderAddressee>
                    <FormOrderDeclare form={form}></FormOrderDeclare>
                    <FormOrderChannel form={form} onChange={(channelData) => {
                        this.setState({channelList: channelData});
                    }}></FormOrderChannel>
                    <FormRemarks form={form} title={"打包要求"} fieldName="CustomerMark"></FormRemarks>
                    {this.renderButton()}
                </Layout.Content>
            </Layout>
        </Spin>
    }

    render() {
        return <div>
            {this.renderContent()}
        </div>
    }
}

export default Form.create<any>()(MemberMergePackagePage);
