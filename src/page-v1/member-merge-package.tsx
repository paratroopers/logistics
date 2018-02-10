import * as React from 'react';
import {withRouter, RouteComponentProps} from 'react-router';
import {Layout, Row, Col, Button, Icon} from 'antd';
import {ModelNameSpace} from '../model/model';
import {APINameSpace} from '../model/api';
import * as moment from 'moment';
import * as util from "util";
import {FormOrderInfo, FormOrderInfoModel} from "../components-v1/form-order-info";
import {ContentHeaderControl} from "../components-v1/common-content-header";
import {FormOrderRelation} from "../components-v1/form-order-relation";
import FormOrderAddressee from "../components-v1/form-order-addressee";
import {FormOrderDeclare} from "../components-v1/form-order-declare";
import {FormPackageRequirement} from "../components-v1/form-package-requirement";
import {FormPackageDetail} from "../components-v1/form-package-detail";
import {FormOrderChannel} from "../components-v1/form-order-channel";
import {FormDeliveredDetail} from "../components-v1/form-delivered-detail";
import {FormComponentProps} from 'antd/lib/form/Form';

export interface MemberMergePackageProps extends RouteComponentProps<any, any>,FormComponentProps{
}

export interface MemberMergePackageStates {
    selectedKeys?: string[] | string;
    data?: ModelNameSpace.CustomerOrderModel[];
    orderInfo?: FormOrderInfoModel;

}

export interface QueryData {
    ids?: string[]
}

@withRouter
export class MemberMergePackage extends React.Component<MemberMergePackageProps, MemberMergePackageStates> {
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
        const topThis=this;
        const {props:{form}}=topThis;
        const {state: {orderInfo, data}} = this;
        return <Layout className="merge-package">
            <Layout.Header className="merge-package-header">
                <ContentHeaderControl title="待打包"></ContentHeaderControl>
            </Layout.Header>
            <Layout.Content>
                <Row justify="start" type="flex" style={{margin: '10px 0px 10px 0px'}}>
                    <Col span={24}>
                        <div className="merge-package-header-title">
                            <Icon type="tag" style={{color: '#f2804b', marginRight: '15px'}}/>
                            <span>单号：201801270052</span>
                        </div>
                        <div className="merge-package-header-button">
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
                <FormPackageRequirement></FormPackageRequirement>
                <FormPackageDetail></FormPackageDetail>
                <FormDeliveredDetail form={form}></FormDeliveredDetail>
                <FormPayment></FormPayment>
            </Layout.Content>
        </Layout>;

    }
}