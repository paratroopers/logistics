import * as React from 'react';
import {hashHistory} from 'react-router';
import {Button, Select, Row, Col, Form, Input, Spin} from 'antd';
import {PathConfig} from '../../config/pathconfig';
import {FormComponentProps} from 'antd/lib/form/Form';


interface HomeCostQueryProps extends FormComponentProps {
    className?: string;
    style?: any;
    isHeard?: boolean;
}

interface HomeCostQueryStates {
}


class HomeCostQueryForm extends React.Component<HomeCostQueryProps, HomeCostQueryStates> {
    constructor(props, context) {
        super(props, context);
    }

    onOk() {
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            } else
                hashHistory.push(PathConfig.CostEstimatePage);
        });
    }

    render() {
        const topThis = this;
        const {props: {isHeard, form: {getFieldDecorator}}} = topThis;
        return <Row type="flex" justify="center" align="top" className={this.props.className} style={this.props.style}>
            {isHeard && <Col xs={0} sm={0} md={0} lg={24} xl={24}>
                <div className="banner-form-header">
                    <Row type="flex" justify="start" style={{paddingTop: '13px', paddingLeft: '21px'}}>
                        <h2>
                            <i className="iconfont icon-feiyong"></i>
                            <span>费用估算/Cost estimate</span>
                        </h2>
                    </Row>
                </div>
            </Col>}
            <Col xs={0} sm={0} md={0} lg={24} xl={24} className="banner-form-parent">
                <Form layout="vertical" style={{padding: 24}}>
                    <Form.Item>
                        {getFieldDecorator('city', {
                            rules: [{required: true, message: '请填写收货国家!'}]
                        })(<Select
                            mode="multiple"
                            notFoundContent={<Spin size="small"/>}
                            filterOption={false}
                            onSearch={() => {
                            }} placeholder="收货国家" size="large"/>)}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('kg', {
                            rules: [{required: true, message: '请填写重量!'}],
                        })(<Input placeholder="重量（kg）公斤" size="large"/>)}
                    </Form.Item>
                    <Form.Item>
                        <Row type="flex" justify="center" align="top">
                            <Col span={7}>
                                {getFieldDecorator('long', {
                                    rules: [{required: true, message: '请填写长度!'}],
                                })(<Input placeholder="长（cm）" size="large"/>)}
                            </Col>
                            <Col span={7} offset={1}>
                                {getFieldDecorator('width', {
                                    rules: [{required: true, message: '请填写宽度!'}],
                                })(<Input placeholder="宽（cm）" size="large"/>)}
                            </Col>
                            <Col span={8} offset={1}>
                                {getFieldDecorator('height', {
                                    rules: [{required: true, message: '请填写高度!'}],
                                })(<Input placeholder="高（cm）" size="large"/>)}
                            </Col>
                            <Col span={1}></Col>
                        </Row>
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('volume', {
                            rules: [{required: true, message: '请填写体积!'}],
                        })(<Input placeholder="体积（m3）" size="large"/>)}
                    </Form.Item>
                    <Form.Item>
                        <Row type="flex" justify="center">
                            <Button size="large" type="primary" onClick={this.onOk.bind(this)}>开始计算</Button>
                        </Row>
                    </Form.Item>
                </Form>
            </Col>
        </Row>;
    }
}

const HomeCostQuery = Form.create<any>()(HomeCostQueryForm);
export default HomeCostQuery;
