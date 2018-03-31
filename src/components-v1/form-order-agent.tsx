import * as React from 'react';
import {Row, Col, Form, Input} from 'antd';
import {FormComponentProps} from 'antd/lib/form/Form';
import {FormSettingGroup} from './form-setting-group'
import {FormAgentDropDown} from '../components-v1/all-components-export';
import {SelectType} from "../util/common";
import {ModelNameSpace} from '../model/model';

export interface FormOrderAgentProps extends FormComponentProps {
    readyOnly?: boolean;
    data?: ModelNameSpace.CustomerOrderMergeModel;
    defaultAgent?: string;
}

export interface FormOrderAgentStates {
}


export default class FormOrderAgent extends React.Component<FormOrderAgentProps, FormOrderAgentStates> {
    static defaultProps = {
        defaultAgent: "0"
    }

    constructor(props, context) {
        super(props, context);
    }

    componentWillReceiveProps(nextProps) {
        if ('data' in nextProps && nextProps.data !== this.props.data && this.props.form) {
            this.props.form.setFieldsValue({
                AgentID: nextProps.data.AgentID !== this.props.defaultAgent ? nextProps.data.AgentID : undefined,
                channelNo: nextProps.data.channelNo
            });
        }
    }

    renderFormIndexControl(isDis?: boolean, val?: any) {
        return <FormAgentDropDown mode="default"
                                  value={val}
                                  disabled={isDis}
                                  placeholder="代理商"></FormAgentDropDown>;
    }

    render() {
        const {props: {form, readyOnly, data}} = this;
        if (readyOnly && !data) return null;
        return <FormSettingGroup title={"代理商选择"}>
            <Form>
                <Row gutter={16}>
                    <Col xs={24} sm={12} md={8} style={{paddingLeft: '8px'}}>
                        <Form.Item required={!readyOnly}>
                            {readyOnly ? this.renderFormIndexControl(true, data.AgentID) :
                                form.getFieldDecorator("AgentID", {
                                    initialValue: 'AgentID',
                                    rules: [{required: true, message: '请选择代理商!'}],
                                })(<FormAgentDropDown mode="default"
                                                      placeholder="代理商"></FormAgentDropDown>)}
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} style={{paddingLeft: '8px'}}>
                        <Form.Item required={!readyOnly}>
                            {readyOnly ?
                                <Input disabled value={data.channelNo}></Input> : form.getFieldDecorator("channelNo", {
                                    initialValue: 'channelNo',
                                    rules: [{required: true, message: '请输入渠道单号!'}],
                                })(<Input placeholder="请输入渠道单号"/>)}
                        </Form.Item>
                    </Col>

                </Row>
            </Form>
        </FormSettingGroup>
    }
}