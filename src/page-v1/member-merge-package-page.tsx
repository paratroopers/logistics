import * as React from 'react';
import {withRouter, RouteComponentProps} from 'react-router';
import {Layout, Row, Col, Button, Icon} from 'antd';
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

export interface MemberMergePackagePageProps extends RouteComponentProps<any, any>, FormComponentProps {
}

export interface MemberMergePackagePageStates {
    selectedKeys?: string[] | string;
    data?: ModelNameSpace.CustomerOrderModel[];
    orderInfo?: FormOrderInfoModel;

}

export interface QueryData {
    ids?: string[]
}

@withRouter
export class MemberMergePackagePage extends React.Component<MemberMergePackagePageProps, MemberMergePackagePageStates> {
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
        APINameSpace.MemberAPI.GetOrderItemsByID(request).then(r => {
            r.Status === 0 && this.initOrderInfo(r.Data);
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
                            <Button type="primary" style={{marginRight: "10px"}}>确认合并打包</Button>
                            <Button type="primary">取消</Button>
                        </div>
                    </Col>
                </Row>
                <FormOrderInfo data={orderInfo}></FormOrderInfo>
                <FormOrderRelation data={data}></FormOrderRelation>
                <FormOrderAddressee></FormOrderAddressee>
                <FormOrderDeclare></FormOrderDeclare>
                <FormOrderChannel></FormOrderChannel>
            </Layout.Content>
        </Layout>;
    }
}