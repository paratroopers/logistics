import * as React from 'react';
import {withRouter, RouteComponentProps} from 'react-router';
import {Row, Col, Card, Button, Radio} from "antd";
import {FormSettingGroup} from '../components-v1/form-setting-group';
import {APINameSpace} from '../model/api';

export interface MemberPaymentPageProps extends RouteComponentProps<any, any> {

}

export interface MemberPaymentPageStates {
    data?: any;
}

@withRouter
export class MemberPaymentPage extends React.Component<MemberPaymentPageProps, MemberPaymentPageStates> {

    constructor(props, context) {
        super(props, context);
        const query: any = props.location.query;
        this.state = {
            data: {
                amount: Number(query.money),
                payMethod: 0,
                CustomerOrderMergeID: query.CustomerOrderMergeID,
                deliverTime: query.deliverTime,
                isAdmin: true
            }
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    renderPayImage() {

    }

    onClick() {
        APINameSpace.CustomerOrderAPI.CustomerOrderItemPay(this.state.data).then(result => {
            console.log(result);
        });
    }

    render() {
        return <FormSettingGroup title={"选择付款方式"} telescopic={false}>
            <Row type="flex" justify="start" className="payment-paypage">
                <Col span={10} className="payment-paypage-code">
                    <span>交易号：20180210220255-DL-SZ-7846841</span>
                </Col>
                <Col span={14} className="payment-paypage-money">
                    <span>实付：</span>
                    <span className="money">{this.state.data.amount.toFixed(2)}</span>
                </Col>
                <Col span={24} className="payment-paypage-mode">
                    <Card style={{marginTop: 16}}
                          type="inner"
                          title="支付方式">
                        <Radio.Group>
                            <Radio value={1} style={{marginRight: '15px'}}>
                                <img src="http://www.famliytree.cn/icon/pay-zfb.jpg"></img>
                            </Radio>
                            <Radio value={2}>
                                <img src="http://www.famliytree.cn/icon/pay-wx.jpg"></img>
                            </Radio>
                        </Radio.Group>
                    </Card>
                </Col>
                <Col offset={20} span={4} className="payment-go">
                    <Button type="primary" onClick={this.onClick.bind(this)}>立即付款</Button>
                    <div className="time">
                        <span>剩余付款时间:</span>
                        <span className="count-down">45分12秒</span>
                    </div>
                </Col>
            </Row>
        </FormSettingGroup>
    }
}