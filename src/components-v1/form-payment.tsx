import * as React from 'react';
import {hashHistory} from 'react-router';
import {Row, Col, Button} from "antd";
import {FormSettingGroup} from './form-setting-group';

import {PathConfig} from '../config/pathconfig';

export interface FormPaymentProps {
}

export interface FormPaymentStates {
    money?: number;
}

export class FormPayment extends React.Component<FormPaymentProps, FormPaymentStates> {

    constructor(props, context) {
        super(props, context);
        this.state = {
            money: 407
        }
    }

    onPayClick() {
        hashHistory.push({
            pathname: PathConfig.MemberPaymentPage,
            query: {
                money:this.state.money
            }
        })
    }

    render() {
        return <FormSettingGroup title={"支付信息"}>
            <Row type="flex" justify="start" className="payment">
                <Col offset={16} span={8} className="payment-info">
                    <div className="payment-info-cost">
                        <span className="title">1个包裹，总金额:</span>
                        <span className="count">¥329.00</span></div>
                    <div>
                        <span className="title">服务费:</span>
                        <span className="count">¥78.00</span>
                    </div>
                </Col>
                <Col offset={18} span={6} className="payment-total">
                    <div className="payment-total-cost">
                        <span className="title">应付总额:</span>
                        <span className="count">¥{this.state.money.toFixed(2)}</span></div>
                </Col>
                <Col span={24} className="payment-address">
                    <span className="address">寄送至： 上海 闵行区 浦江镇 江汉路200弄26号302</span>
                    <span className="consignee">收货人：许珂</span>
                    <span className="tel">183****5640</span>
                </Col>
                <Col offset={19} span={5} className="payment-go">
                    <Button type="primary" onClick={this.onPayClick.bind(this)}>去支付</Button>
                </Col>
            </Row>
        </FormSettingGroup>
    }
}