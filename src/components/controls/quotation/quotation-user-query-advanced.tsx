import * as React from 'react';
import {InjectedIntlProps} from "react-intl";
import {Row, Col, InputNumber, Form, Input} from 'antd';
import {FormComponentProps} from 'antd/lib/form/Form';

interface QuotationUserQueryAdvancedProps extends FormComponentProps, ReactRouter.RouteComponentProps<any, any>, InjectedIntlProps {
    onChange?: (long?: any, width?: any, height?: any) => {};
    visible?: boolean;
}

interface QuotationUserQueryAdvancedStates {
    visible?: boolean;
}

export class QuotationUserQueryAdvanced extends React.Component<QuotationUserQueryAdvancedProps, QuotationUserQueryAdvancedStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            visible: props ? props.visible : false
        }
    }

    componentWillReceiveProps(nextProps) {
        if ('visible' in nextProps && nextProps.visible !== this.props.visible) {
            this.setState({visible: nextProps.visible});
        }
    }

    render() {
        const {props: {form: {getFieldDecorator}, visible}} = this;
        return visible ? <div>
                <Form.Item>
                    <Row type="flex" justify="center" align="top">
                        <Col span={7}>
                            {getFieldDecorator('length', {
                                rules: [{required: true, message: '请填写长度!'}],
                            })(<InputNumber min={0} style={{width: "100%"}} onChange={v => {
                                this.props.onChange && this.props.onChange(v)
                            }} placeholder="长（cm）"
                                            size="large"/>)}
                        </Col>
                        <Col span={7} offset={1}>
                            {getFieldDecorator('width', {
                                rules: [{required: true, message: '请填写宽度!'}],
                            })(<InputNumber min={0} style={{width: "100%"}} onChange={v => {
                                this.props.onChange && this.props.onChange(null, v)
                            }} placeholder="宽（cm）" size="large"/>)}
                        </Col>
                        <Col span={8} offset={1}>
                            {getFieldDecorator('height', {
                                rules: [{required: true, message: '请填写高度!'}],
                            })(<InputNumber min={0} style={{width: "100%"}} onChange={v => {
                                this.props.onChange && this.props.onChange(null, null, v)
                            }} placeholder="高（cm）" size="large"/>)}
                        </Col>
                        <Col span={1}></Col>
                    </Row>
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('volume', {
                        rules: [{required: true, message: '请填写体积!'}],
                    })(<Input readOnly={true} placeholder="体积（cm3）" size="large"/>)}
                </Form.Item>
            </div>
            : null;
    }
}
