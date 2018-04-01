import * as React from 'react';
import {hashHistory} from 'react-router';
import {Row, Col, Button} from "antd";
import {FormSettingGroup} from './form-setting-group';
import {ModelNameSpace} from '../model/model';

import {PathConfig} from '../config/pathconfig';

export interface FormPaymentProps {
    data: ModelNameSpace.CustomerOrderMergeModel;
    readyOnly?: boolean;
}

export interface FormPaymentStates {
    money?: number;
}

export class FormPayment extends React.Component<FormPaymentProps, FormPaymentStates> {

    constructor(props, context) {
        super(props, context);
        this.state = {
            money: 0
        }
    }

    onPayClick() {
        hashHistory.push({
            pathname: PathConfig.MemberPaymentPage,
            query: {
                money: this.props.data.totalFee + this.props.data.serviceFee,
                deliverTime: this.props.data.deliverTime,
                CustomerOrderMergeID: this.props.data.ID
            }
        })
    }

    render() {
        const {props: {data, readyOnly}} = this;
        const payInfo: any = data ? data : {};
        return <FormSettingGroup title={"支付信息"}>
            <Row type="flex" justify="start" className="payment">
                <Col offset={16} span={8} className="payment-info">
                    <div className="payment-info-cost">
                        <span className="title">1个包裹，总金额:</span>
                        <span className="count">¥{payInfo['totalFee'] ? payInfo.totalFee.toFixed(2) : '0.00'}</span>
                    </div>
                    <div>
                        <span className="title">服务费:</span>
                        <span className="count">¥{payInfo['serviceFee'] ? payInfo.serviceFee.toFixed(2) : '0.00'}</span>
                    </div>
                </Col>
                <Col offset={18} span={6} className="payment-total">
                    <div className="payment-total-cost">
                        <span className="title">应付总额:</span>
                        <span
                            className="count">¥{payInfo ? (payInfo.totalFee + payInfo.serviceFee).toFixed(2) : '0.00'}</span>
                    </div>
                </Col>
                <Col span={24} className="payment-address">
                    <span
                        className="address">寄送至： {`${payInfo['country']} ${payInfo['city']} ${payInfo['address']}`}</span>
                    <span className="consignee">收货人：{payInfo['recipient']}</span>
                    <span className="tel">{payInfo['tel']}</span>
                </Col>
                {
                    readyOnly ? null :
                        <Col offset={19} span={5} className="payment-go">
                            <Button type="primary" onClick={this.onPayClick.bind(this)}>去支付</Button>
                        </Col>
                }
            </Row>
        </FormSettingGroup>
    }
}