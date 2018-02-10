import * as React from 'react';
import {withRouter, hashHistory} from 'react-router';
import {Row, Col, Button} from "antd";
import {ColumnProps} from 'antd/lib/table';

import {PathConfig} from '../config/pathconfig';

export interface FormPaymentProps {
}

export interface FormPaymentStates {
}

export class FormPayment extends React.Component<FormPaymentProps, FormPaymentStates> {

    render() {
        return <div style={{height: '100px'}}>
            <Row type="flex" justify="start" className="payment" align="middle">
                <Col span={10}>
                    <h1 className="payment-title">支付:</h1>
                    <h1>135 元</h1>
                </Col>
                <Col offset={6} span={8}>
                    <Button className="payment-wx" icon="wechat">微信付款</Button>
                    <Button className="payment-zfb" icon="alipay">支付宝付款</Button>
                </Col>
            </Row>
        </div>
    }
}