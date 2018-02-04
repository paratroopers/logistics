import * as React from 'react';
import {withRouter, RouteComponentProps} from 'react-router';
import {Layout, Row, Col, Button, Icon} from 'antd';
// import {ContentHeaderControl} from "../components-v1/common-cancel-control";
import {ModelNameSpace} from '../model/model';
import {APINameSpace} from '../model/api';

// import {
//     FormOrderRelation,
//     FormOrderDeclare,
//     FormOrderAddressee,
//     FormOrderInfo
// } from '../components-v1/form-order-relation';

// import {FormOrderInfoModel} from '../../../components/form/form-order-info';
import * as moment from 'moment';
import * as util from "util";
import {FormOrderInfo, FormOrderInfoModel} from "../components-v1/form-order-info";
import {ContentHeaderControl} from "../components-v1/common-content-header";
import {FormOrderRelation} from "../components-v1/form-order-relation";
import FormOrderAddressee from "../components-v1/form-order-addressee";
import {FormOrderDeclare} from "../components-v1/form-order-declare";

export interface MemberMergePackageProps extends RouteComponentProps<any, any> {
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
            </Layout.Content>
        </Layout>;
    }
}