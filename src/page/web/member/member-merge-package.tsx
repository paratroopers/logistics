import * as React from 'react';
import {withRouter, RouteComponentProps} from 'react-router';
import {Layout, Row, Col, Button, Icon} from 'antd';
import {CustomerOrderModel} from '../../../api/model/member';
import {MemberAPI} from '../../../api/member';
import {
    FormOrderRelation,
    FormOrderDeclare,
    FormOrderAddressee,
    FormOrderInfo
} from '../../../components/form';
import {FormOrderInfoModel} from '../../../components/form/form-order-info';
import * as moment from 'moment';

export interface MemberMergePackageProps extends RouteComponentProps<any, any> {
}

export interface MemberMergePackageStates {
    selectedKeys?: string[];
    data?: CustomerOrderModel[];
    orderInfo?: FormOrderInfoModel;

}

export interface queryData {
    ids?: string[]
}

@withRouter
export class MemberMergePackage extends React.Component<MemberMergePackageProps, MemberMergePackageStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            selectedKeys: (this.props.location.query as queryData).ids
        }
    }

    componentDidMount() {
        this.getMergeOrderInfo();
    }

    initOrderInfo(data: CustomerOrderModel[]) {
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
        MemberAPI.GetOrderItemsByID(this.state.selectedKeys.join(",")).then(r => {
            r.Status === 0 && this.initOrderInfo(r.Data);
        });
    }

    render() {
        const {state: {orderInfo, data}} = this;
        return <Layout className="merge-package">
            <Layout.Header className="merge-package-header">
                <Row>
                    <Col span={24}>
                        <div className="merge-package-header-title">
                            <Icon type="tag" style={{color: '#f2804b', marginRight: '15px'}}/>
                            <span>单号：201801270052</span>
                        </div>
                        <Button.Group size="default" className="merge-package-header-button">
                            <Button type="primary">确认合并打包</Button>
                            <Button type="primary">取消</Button>
                        </Button.Group>
                    </Col>
                </Row>
            </Layout.Header>
            <Layout.Content>
                <FormOrderInfo data={orderInfo}></FormOrderInfo>
                <FormOrderRelation data={data}></FormOrderRelation>
                <FormOrderAddressee></FormOrderAddressee>
                <FormOrderDeclare></FormOrderDeclare>
            </Layout.Content>
        </Layout>;
    }
}