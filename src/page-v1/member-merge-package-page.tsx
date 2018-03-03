import * as React from 'react';
import {withRouter, RouteComponentProps} from 'react-router';
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
    FormOrderChannel
} from "../components-v1/all-components-export";
import {FormComponentProps} from 'antd/lib/form/Form';
import {requestNameSpace} from '../model/request';
import {isArray} from "util";
import {ResponseNameSpace} from '../model/response';

export interface MemberMergePackagePageProps extends RouteComponentProps<any, any>, FormComponentProps {
}

export interface MemberMergePackagePageStates {
    selectedKeys?: string[] | string;
    data?: ModelNameSpace.CustomerOrderModel[];
    orderInfo?: FormOrderInfoModel;
    productList?: requestNameSpace.OrderMergeProductListModel[];
    channelList?: ModelNameSpace.ChannelModal[];
}

export interface QueryData {
    ids?: string[]
}

@withRouter
class MemberMergePackagePage extends React.Component<MemberMergePackagePageProps, MemberMergePackagePageStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            selectedKeys: (this.props.location.query as QueryData).ids
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
        const {props: {form}, state: {productList, channelList}} = topThis;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
        });
        /** 验证产品信息是否存在*/
        if (!isArray(productList) || productList.length === 0) {
            message.warning("请填写货品申报信息!");
            return;
        }
        /** 验证渠道信息是否存在*/
        if (!isArray(channelList) || channelList.length === 0) {
            message.warning("请选择渠道!");
            return;
        }

        /*        form.validateFieldsAndScroll((errors, values) => {
                    console.log(values);
                    console.log(productList);
                    console.log(channelList)
                    if (!errors) {
                        const request: requestNameSpace.CustomerOrderMergeAddRequest = {}
                        APINameSpace.CustomerOrderAPI.CustomerOrderMergeAdd(request).then((result: ResponseNameSpace.BaseResponse) => {

                        });
                    }
                });*/
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
                <FormOrderDeclare parentForm={form} onChange={(declareData) => {
                    topThis.setState({productList: declareData});
                }}></FormOrderDeclare>
                <FormOrderChannel onChange={(channelData) => {
                    topThis.setState({channelList: channelData});
                }}></FormOrderChannel>
            </Layout.Content>
        </Layout>;
    }
}

export default Form.create<any>()(MemberMergePackagePage);
